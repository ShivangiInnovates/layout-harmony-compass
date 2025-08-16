import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
from datetime import datetime
import bcrypt
from bson import ObjectId

# Load environment variables
load_dotenv()

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        self.connect()
    
    def connect(self):
        """Connect to MongoDB Atlas"""
        try:
            mongodb_uri = os.getenv('MONGODB_URI')
            database_name = os.getenv('DATABASE_NAME', 'smartgrid_plannerx_db')
            
            if not mongodb_uri:
                raise ValueError("MONGODB_URI not found in environment variables")
            
            self.client = MongoClient(mongodb_uri)
            self.db = self.client[database_name]
            
            # Test the connection
            self.client.admin.command('ping')
            print(f"✅ Successfully connected to MongoDB Atlas database: {database_name}")
            
            # Create indexes for better performance
            self.create_indexes()
            
        except ConnectionFailure as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            raise
        except Exception as e:
            print(f"❌ Database connection error: {e}")
            raise
    
    def create_indexes(self):
        """Create database indexes for better performance"""
        try:
            # User collection indexes
            self.db.users.create_index("email", unique=True)
            self.db.users.create_index("created_at")
            
            # Department areas collection indexes
            self.db.department_areas.create_index("user_id")
            self.db.department_areas.create_index("created_at")
            
            # Relationship matrix collection indexes
            self.db.relationship_matrices.create_index("user_id")
            self.db.relationship_matrices.create_index("created_at")
            
            # Optimization results collection indexes
            self.db.optimization_results.create_index("user_id")
            self.db.optimization_results.create_index("created_at")
            
            print("✅ Database indexes created successfully")
        except Exception as e:
            print(f"⚠️ Warning: Could not create indexes: {e}")

class UserModel:
    def __init__(self, db):
        self.collection = db.users
    
    def create_user(self, email, password, name, role="user"):
        """Create a new user"""
        try:
            # Check if user already exists
            if self.collection.find_one({"email": email}):
                return {"success": False, "message": "User already exists with this email"}
            
            # Hash password
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            user_data = {
                "email": email,
                "password": hashed_password,
                "name": name,
                "role": role,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(user_data)
            
            return {
                "success": True,
                "user_id": str(result.inserted_id),
                "message": "User created successfully"
            }
        except Exception as e:
            return {"success": False, "message": f"Error creating user: {str(e)}"}
    
    def authenticate_user(self, email, password):
        """Authenticate user login"""
        try:
            user = self.collection.find_one({"email": email})
            if not user:
                return {"success": False, "message": "Invalid email or password"}
            
            # Check password
            if bcrypt.checkpw(password.encode('utf-8'), user['password']):
                # Remove password from response
                user['_id'] = str(user['_id'])
                del user['password']
                return {"success": True, "user": user}
            else:
                return {"success": False, "message": "Invalid email or password"}
        except Exception as e:
            return {"success": False, "message": f"Authentication error: {str(e)}"}
    
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        try:
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])
                del user['password']  # Never return password
                return {"success": True, "user": user}
            return {"success": False, "message": "User not found"}
        except Exception as e:
            return {"success": False, "message": f"Error fetching user: {str(e)}"}

class DepartmentAreaModel:
    def __init__(self, db):
        self.collection = db.department_areas
    
    def save_department_areas(self, user_id, department_data):
        """Save department areas for a user"""
        try:
            data = {
                "user_id": user_id,
                "department_data": department_data,
                "created_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(data)
            return {
                "success": True,
                "id": str(result.inserted_id),
                "message": "Department areas saved successfully"
            }
        except Exception as e:
            return {"success": False, "message": f"Error saving department areas: {str(e)}"}
    
    def get_user_department_areas(self, user_id, limit=10):
        """Get department areas for a user"""
        try:
            cursor = self.collection.find({"user_id": user_id}).sort("created_at", -1).limit(limit)
            areas = []
            for area in cursor:
                area['_id'] = str(area['_id'])
                areas.append(area)
            
            return {"success": True, "department_areas": areas}
        except Exception as e:
            return {"success": False, "message": f"Error fetching department areas: {str(e)}"}

class RelationshipMatrixModel:
    def __init__(self, db):
        self.collection = db.relationship_matrices
    
    def save_relationship_matrix(self, user_id, relationship_data):
        """Save relationship matrix for a user"""
        try:
            data = {
                "user_id": user_id,
                "relationship_data": relationship_data,
                "created_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(data)
            return {
                "success": True,
                "id": str(result.inserted_id),
                "message": "Relationship matrix saved successfully"
            }
        except Exception as e:
            return {"success": False, "message": f"Error saving relationship matrix: {str(e)}"}
    
    def get_user_relationship_matrices(self, user_id, limit=10):
        """Get relationship matrices for a user"""
        try:
            cursor = self.collection.find({"user_id": user_id}).sort("created_at", -1).limit(limit)
            matrices = []
            for matrix in cursor:
                matrix['_id'] = str(matrix['_id'])
                matrices.append(matrix)
            
            return {"success": True, "relationship_matrices": matrices}
        except Exception as e:
            return {"success": False, "message": f"Error fetching relationship matrices: {str(e)}"}

class OptimizationResultModel:
    def __init__(self, db):
        self.collection = db.optimization_results
    
    def save_optimization_result(self, user_id, department_data, relationship_data, result_data):
        """Save optimization result for a user"""
        try:
            data = {
                "user_id": user_id,
                "department_data": department_data,
                "relationship_data": relationship_data,
                "result_data": result_data,
                "created_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(data)
            return {
                "success": True,
                "id": str(result.inserted_id),
                "message": "Optimization result saved successfully"
            }
        except Exception as e:
            return {"success": False, "message": f"Error saving optimization result: {str(e)}"}
    
    def get_user_optimization_results(self, user_id, limit=10):
        """Get optimization results for a user"""
        try:
            cursor = self.collection.find({"user_id": user_id}).sort("created_at", -1).limit(limit)
            results = []
            for result in cursor:
                result['_id'] = str(result['_id'])
                results.append(result)
            
            return {"success": True, "optimization_results": results}
        except Exception as e:
            return {"success": False, "message": f"Error fetching optimization results: {str(e)}"}

# Initialize database connection
db_instance = Database()
user_model = UserModel(db_instance.db)
department_area_model = DepartmentAreaModel(db_instance.db)
relationship_matrix_model = RelationshipMatrixModel(db_instance.db)
optimization_result_model = OptimizationResultModel(db_instance.db)
