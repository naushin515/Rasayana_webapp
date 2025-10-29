import { useState, useEffect } from 'react';
import { User, AdminUser } from '../types';

interface StoredUser extends User {
  password: string;
}

interface StoredAdminUser extends AdminUser {
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  location: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const currentSession = localStorage.getItem('ayurveda_current_user');
    if (currentSession) {
      const userData = JSON.parse(currentSession);
      // Remove password from user object for security
      const { password, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
    }
    
    // Initialize admin user if not exists
    const adminUsers = JSON.parse(localStorage.getItem('ayurveda_admins') || '[]');
    if (adminUsers.length === 0) {
      const defaultAdmin: StoredAdminUser = {
        id: 'admin-1',
        email: 'admin@ayurveda.com',
        password: 'admin123',
        role: 'admin',
        name: 'System Administrator'
      };
      localStorage.setItem('ayurveda_admins', JSON.stringify([defaultAdmin]));
    }
    
    setIsLoading(false);
  }, []);

  const register = (userData: RegisterData): boolean => {
    setError(null);
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find((u: StoredUser) => u.email === userData.email)) {
      setError('Email already exists. Please use a different email or login.');
      return false;
    }

    const newUser: StoredUser = {
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString(),
      ...userData
    };

    // Save to users database
    existingUsers.push(newUser);
    localStorage.setItem('ayurveda_users', JSON.stringify(existingUsers));
    
    // Auto-login after registration
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('ayurveda_current_user', JSON.stringify(newUser));
    
    return true;
  };

  const login = (credentials: LoginCredentials): boolean => {
    setError(null);
    
    // Check admin users first
    const adminUsers = JSON.parse(localStorage.getItem('ayurveda_admins') || '[]');
    const foundAdmin = adminUsers.find((admin: StoredAdminUser) => 
      admin.email === credentials.email && admin.password === credentials.password
    );

    if (foundAdmin) {
      const { password, ...adminWithoutPassword } = foundAdmin;
      setUser(adminWithoutPassword);
      localStorage.setItem('ayurveda_current_user', JSON.stringify(foundAdmin));
      return true;
    }
    
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    
    // Find user with matching email and password
    const foundUser = existingUsers.find((u: StoredUser) => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!foundUser) {
      setError('Invalid email or password. Please try again.');
      return false;
    }

    // Login successful
    const { password, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('ayurveda_current_user', JSON.stringify(foundUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayurveda_current_user');
    setError(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user && 'age' in user) { // Only for regular users, not admins
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update in users database
      const existingUsers = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
      const userIndex = existingUsers.findIndex((u: StoredUser) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem('ayurveda_users', JSON.stringify(existingUsers));
        localStorage.setItem('ayurveda_current_user', JSON.stringify(existingUsers[userIndex]));
      }
    }
  };

  const clearError = () => setError(null);

  return { 
    user, 
    login, 
    register, 
    logout, 
    updateProfile, 
    isLoading, 
    error, 
    clearError 
  };
};