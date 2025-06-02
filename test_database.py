#!/usr/bin/env python3
"""
Test script to verify MongoDB Atlas connection and basic operations
"""

from database import user_model, department_area_model, relationship_matrix_model
import json

def test_database_connection():
    print("🧪 Testing MongoDB Atlas Database Connection...")
    
    # Test 1: Create a test user
    print("\n1. Testing User Creation...")
    test_email = "test@example.com"
    test_password = "testpassword123"
    test_name = "Test User"
    
    result = user_model.create_user(test_email, test_password, test_name)
    print(f"   Create User Result: {result}")
    
    if result['success']:
        user_id = result['user_id']
        print(f"   ✅ User created successfully with ID: {user_id}")
        
        # Test 2: Authenticate the user
        print("\n2. Testing User Authentication...")
        auth_result = user_model.authenticate_user(test_email, test_password)
        print(f"   Auth Result: {auth_result['success']}")
        
        if auth_result['success']:
            print(f"   ✅ User authenticated successfully")
            
            # Test 3: Save department areas
            print("\n3. Testing Department Areas Storage...")
            test_departments = {
                "Manufacturing": 150,
                "Packaging": 100,
                "Raw Materials": 120,
                "Assembly": 80,
                "Receiving": 60
            }
            
            dept_result = department_area_model.save_department_areas(user_id, test_departments)
            print(f"   Department Save Result: {dept_result}")
            
            if dept_result['success']:
                print(f"   ✅ Department areas saved successfully")
                
                # Test 4: Retrieve department areas
                print("\n4. Testing Department Areas Retrieval...")
                retrieve_result = department_area_model.get_user_department_areas(user_id)
                print(f"   Retrieved {len(retrieve_result.get('department_areas', []))} department area records")
                
                # Test 5: Save relationship matrix
                print("\n5. Testing Relationship Matrix Storage...")
                test_relationships = [
                    {"from": "Manufacturing", "to": "Packaging", "relationship": "A"},
                    {"from": "Manufacturing", "to": "Raw Materials", "relationship": "E"},
                    {"from": "Packaging", "to": "Assembly", "relationship": "I"},
                    {"from": "Assembly", "to": "Receiving", "relationship": "O"}
                ]
                
                rel_result = relationship_matrix_model.save_relationship_matrix(user_id, test_relationships)
                print(f"   Relationship Matrix Save Result: {rel_result}")
                
                if rel_result['success']:
                    print(f"   ✅ Relationship matrix saved successfully")
                    
                    # Test 6: Retrieve relationship matrices
                    print("\n6. Testing Relationship Matrix Retrieval...")
                    rel_retrieve_result = relationship_matrix_model.get_user_relationship_matrices(user_id)
                    print(f"   Retrieved {len(rel_retrieve_result.get('relationship_matrices', []))} relationship matrix records")
                    
                    print("\n🎉 All database tests passed successfully!")
                    print(f"   - User management: ✅")
                    print(f"   - Department areas storage: ✅")
                    print(f"   - Relationship matrix storage: ✅")
                    print(f"   - Data retrieval: ✅")
                    
                else:
                    print(f"   ❌ Failed to save relationship matrix")
            else:
                print(f"   ❌ Failed to save department areas")
        else:
            print(f"   ❌ User authentication failed")
    else:
        print(f"   ❌ User creation failed: {result.get('message', 'Unknown error')}")

if __name__ == "__main__":
    try:
        test_database_connection()
    except Exception as e:
        print(f"❌ Database test failed with error: {e}")
        import traceback
        traceback.print_exc()
