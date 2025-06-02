from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import json
import base64
from io import BytesIO
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os
from datetime import timedelta
from dotenv import load_dotenv

from python_script import run_facility_layout_optimization, plot_layout
from database import (
    user_model,
    department_area_model,
    relationship_matrix_model,
    optimization_result_model
)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-super-secret-jwt-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 24)))
jwt = JWTManager(app)

# Authentication Routes
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')

        if not email or not password or not name:
            return jsonify({'success': False, 'message': 'Email, password, and name are required'}), 400

        result = user_model.create_user(email, password, name)

        if result['success']:
            # Create access token
            access_token = create_access_token(identity=result['user_id'])
            return jsonify({
                'success': True,
                'message': result['message'],
                'access_token': access_token,
                'user': {
                    'id': result['user_id'],
                    'email': email,
                    'name': name,
                    'role': 'user'
                }
            })
        else:
            return jsonify(result), 400

    except Exception as e:
        return jsonify({'success': False, 'message': f'Registration error: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400

        result = user_model.authenticate_user(email, password)

        if result['success']:
            # Create access token
            access_token = create_access_token(identity=result['user']['_id'])
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'access_token': access_token,
                'user': result['user']
            })
        else:
            return jsonify(result), 401

    except Exception as e:
        return jsonify({'success': False, 'message': f'Login error: {str(e)}'}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        result = user_model.get_user_by_id(user_id)

        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 404

    except Exception as e:
        return jsonify({'success': False, 'message': f'Profile error: {str(e)}'}), 500

# Data Storage Routes
@app.route('/api/save-department-areas', methods=['POST'])
@jwt_required()
def save_department_areas():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        department_data = data.get('department_data')

        if not department_data:
            return jsonify({'success': False, 'message': 'Department data is required'}), 400

        result = department_area_model.save_department_areas(user_id, department_data)
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error saving department areas: {str(e)}'}), 500

@app.route('/api/get-department-areas', methods=['GET'])
@jwt_required()
def get_department_areas():
    try:
        user_id = get_jwt_identity()
        result = department_area_model.get_user_department_areas(user_id)
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error fetching department areas: {str(e)}'}), 500

@app.route('/api/save-relationship-matrix', methods=['POST'])
@jwt_required()
def save_relationship_matrix():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        relationship_data = data.get('relationship_data')

        if not relationship_data:
            return jsonify({'success': False, 'message': 'Relationship data is required'}), 400

        result = relationship_matrix_model.save_relationship_matrix(user_id, relationship_data)
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error saving relationship matrix: {str(e)}'}), 500

@app.route('/api/get-relationship-matrices', methods=['GET'])
@jwt_required()
def get_relationship_matrices():
    try:
        user_id = get_jwt_identity()
        result = relationship_matrix_model.get_user_relationship_matrices(user_id)
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error fetching relationship matrices: {str(e)}'}), 500

@app.route('/optimize', methods=['POST'])
@jwt_required()
def optimize():
    try:
        data = request.get_json()
        
        
        department_data = data.get('departments', {})
        relationship_data = data.get('relationships', [])
        user_initial_sequence = data.get('sequence', [])
        
        
        pop_size = data.get('popSize', 50)
        generations = data.get('generations', 100)
        mutation_rate = data.get('mutationRate', 0.2)
        elitism = data.get('elitism', 2)
        
        print(f"Received request: {len(department_data)} departments, {len(relationship_data)} relationships")
        
        
        best_seq, best_pos, best_score, history = run_facility_layout_optimization(
            department_areas_info=department_data,
            relationship_definitions=relationship_data,
            initial_user_sequence=user_initial_sequence,
            pop_size=pop_size,
            generations=generations,
            mutation_rate=mutation_rate,
            elitism=elitism
        )
        
        
        if best_pos:
            plot_title = f"Optimal Layout (Score: {best_score:.0f})"
            fig = plot_layout(best_pos, title=plot_title)
            
            
            buf = BytesIO()
            fig.savefig(buf, format='png', dpi=100)
            plt.close(fig)  # Close figure to free memory
            buf.seek(0)
            
            # Convert to base64
            img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        else:
            img_base64 = None
        
        # Save optimization result to database
        user_id = get_jwt_identity()
        result_data = {
            'bestSequence': best_seq,
            'bestScore': best_score if best_score > -float('inf') else 0,
            'plotImage': img_base64,
            'success': best_seq is not None
        }

        # Save to database (optional - don't fail if this fails)
        try:
            optimization_result_model.save_optimization_result(
                user_id, department_data, relationship_data, result_data
            )
        except Exception as save_error:
            print(f"Warning: Could not save optimization result: {save_error}")

        # Return results
        return jsonify({
            'success': best_seq is not None,
            'bestSequence': best_seq,
            'bestScore': best_score if best_score > -float('inf') else 0,
            'plotImage': img_base64,
            'message': 'Success' if best_seq else 'No valid layout found'
        })
    except Exception as e:
        print(f"Error during optimization: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Error during optimization: {str(e)}'
        }), 500

@app.route('/api/get-optimization-results', methods=['GET'])
@jwt_required()
def get_optimization_results():
    try:
        user_id = get_jwt_identity()
        result = optimization_result_model.get_user_optimization_results(user_id)
        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'message': f'Error fetching optimization results: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
