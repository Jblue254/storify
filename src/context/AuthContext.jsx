// src/context/AuthContext.jsx
import { createContext, useContext, useReducer } from 'react';

// 1. Initial State & Lazy Initializer for Persisting Login Session
const initialState = {
  user: null,
};

const initializer = (initial) => {
  try {
    const storedUser = localStorage.getItem('storify_user');
    const storedToken = localStorage.getItem('storify_token');

    if (storedUser && storedToken) {
      return { user: JSON.parse(storedUser) };
    }
  } catch (error) {
    console.error("Failed to parse initialized Storify auth session:", error);
    localStorage.removeItem('storify_user');
    localStorage.removeItem('storify_token');
  }
  return initial;
};

// 2. State Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, initializer);

  // Helper Selectors
  const isAuthenticated = !!state.user;

  // Actions
  const login = (token, userData) => {
    localStorage.setItem('storify_token', token);
    localStorage.setItem('storify_user', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const register = (token, userData) => {
    localStorage.setItem('storify_token', token);
    localStorage.setItem('storify_user', JSON.stringify(userData));
    dispatch({ type: 'REGISTER', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('storify_token');
    localStorage.removeItem('storify_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, isAuthenticated, login, register, logout }}>
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