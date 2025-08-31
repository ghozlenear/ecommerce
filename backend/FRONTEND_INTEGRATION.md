# Frontend Integration Guide

This guide explains how to integrate your React Native ecommerce app with the backend API.

## 🔗 API Base URL

Set your API base URL in your React Native app:

```typescript
// config/api.ts
export const API_BASE_URL = 'http://localhost:8080/api';
export const API_TIMEOUT = 10000;
```

## React Native Integration

### 1. Install Required Dependencies

```bash
npm install axios @react-native-async-storage/async-storage
```

### 2. Create API Service

```typescript
// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('authToken');
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create Auth Service

```typescript
// services/auth.ts
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export const authService = {
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    const { token, user } = response.data;
    
    // Store token
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  // Signup
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', data);
    const { token, user } = response.data;
    
    // Store token
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  // Logout
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      return null;
    }
  },

  // Update profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', data);
    return response.data.user;
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  }
};
```

### 4. Update Your Login Screen

```jsx
// app/auth/login.jsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../../services/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await authService.login({ email, password });
      router.push('/tabs/home');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... your existing JSX
    <TextInput
      value={email}
      onChangeText={setEmail}
      // ... other props
    />
    <TextInput
      value={password}
      onChangeText={setPassword}
      // ... other props
    />
    <TouchableOpacity 
      style={styles.primaryButton} 
      onPress={handleLogin}
      disabled={loading}
    >
      <Text style={styles.primaryButtonText}>
        {loading ? 'Logging in...' : 'Login'}
      </Text>
    </TouchableOpacity>
  );
}
```

### 5. Update Your Signup Screen

```jsx
// app/auth/signup.jsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../../services/auth';

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber
      });
      router.push('/tabs/home');
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... your existing JSX with updated form handling
  );
}
```

### 6. Create Auth Context

```typescript
// app/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '../../services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
  };

  const signup = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    const response = await authService.signup({ email, password, fullName, phoneNumber });
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 🔧 Environment Configuration

### For Development (Android Emulator)
- Use `http://10.0.2.2:5000` as your API base URL
- This allows the Android emulator to connect to your local machine

### For Development (iOS Simulator)
- Use `http://localhost:5000` as your API base URL

### For Physical Device
- Use your computer's local IP address (e.g., `http://192.168.1.100:5000`)

## 🚀 Testing the Integration

1. Start your backend server: `npm run dev`
2. Start your React Native app
3. Try to signup/login
4. Check the network tab in your browser's dev tools to see API calls

## 📱 Error Handling

Implement proper error handling for network issues:

```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return 'An unexpected error occurred.';
  }
};
```

## 🔒 Security Notes

- Never store sensitive data in AsyncStorage without encryption
- Consider using react-native-keychain for secure token storage
- Implement token refresh logic for long-lived sessions
- Add request/response logging for debugging
