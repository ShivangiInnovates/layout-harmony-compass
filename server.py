from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import base64
from io import BytesIO
import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt


from python_script import run_facility_layout_optimization, plot_layout

app = Flask(__name__)
CORS(app)  

@app.route('/optimize', methods=['POST'])
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
            fig = plot_layout(best_pos, title=plot_title, score_history=history)
            
            
            buf = BytesIO()
            fig.savefig(buf, format='png', dpi=100)
            plt.close(fig)  # Close figure to free memory
            buf.seek(0)
            
            # Convert to base64
            img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        else:
            img_base64 = None
        
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
