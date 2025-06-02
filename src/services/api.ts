const API_BASE_URL = 'http://localhost:5000';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Create headers with auth token
const createHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// API request wrapper
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = createHeaders();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authentication API
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await apiRequest('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    if (response.success && response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await apiRequest('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  getProfile: async () => {
    return apiRequest('/api/profile');
  },
};

// Data storage API
export const dataAPI = {
  saveDepartmentAreas: async (departmentData: Record<string, number>) => {
    return apiRequest('/api/save-department-areas', {
      method: 'POST',
      body: JSON.stringify({ department_data: departmentData }),
    });
  },

  getDepartmentAreas: async () => {
    return apiRequest('/api/get-department-areas');
  },

  saveRelationshipMatrix: async (relationshipData: any[]) => {
    return apiRequest('/api/save-relationship-matrix', {
      method: 'POST',
      body: JSON.stringify({ relationship_data: relationshipData }),
    });
  },

  getRelationshipMatrices: async () => {
    return apiRequest('/api/get-relationship-matrices');
  },

  getOptimizationResults: async () => {
    return apiRequest('/api/get-optimization-results');
  },
};

// Optimization API
export const optimizationAPI = {
  optimize: async (data: {
    departments: Record<string, number>;
    relationships: any[];
    sequence?: string[];
    popSize?: number;
    generations?: number;
    mutationRate?: number;
    elitism?: number;
  }) => {
    return apiRequest('/optimize', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };
