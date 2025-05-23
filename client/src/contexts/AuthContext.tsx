import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadUserData, saveUserData, clearUserData } from '@/utils/localStorage';

interface User {
  username: string;
  isAdmin: boolean;
  rollCount: number;
  inventory: string[];
  coins: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const defaultUser: User = {
  username: '',
  isAdmin: false,
  rollCount: 0,
  inventory: [],
  coins: 0
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  register: () => false,
  logout: () => {},
  updateUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    // Auto-logout when page is refreshed or accessed
    clearUserData();
    setUser(null);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Check if this is the admin account
    if (username === 'AdminWest' && password === 'password') {
      const adminUser: User = {
        username: 'AdminWest',
        isAdmin: true,
        rollCount: 0,
        inventory: [],
        coins: 10000 // Admin gets lots of coins
      };
      setUser(adminUser);
      saveUserData(adminUser);
      return true;
    }

    // Regular user login logic
    const users = JSON.parse(localStorage.getItem('reflectionUsers') || localStorage.getItem('onlineGoUsers') || '[]');
    const foundUser = users.find((u: any) => 
      u.username === username && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        username: foundUser.username,
        isAdmin: false,
        rollCount: foundUser.rollCount || 0,
        inventory: foundUser.inventory || [],
        coins: foundUser.coins || 0
      };
      setUser(userData);
      saveUserData(userData);
      return true;
    }

    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('reflectionUsers') || localStorage.getItem('onlineGoUsers') || '[]');
    const usernameExists = users.some((u: any) => u.username === username);
    
    if (usernameExists) {
      return false;
    }

    // Create new user
    const newUser = {
      username,
      email,
      password,
      rollCount: 0,
      inventory: [],
      coins: 10 // New users get 10 coins to start with
    };

    // Save to local storage
    users.push(newUser);
    localStorage.setItem('reflectionUsers', JSON.stringify(users));

    // Log the user in
    const userData: User = {
      username,
      isAdmin: false,
      rollCount: 0,
      inventory: [],
      coins: 10
    };
    setUser(userData);
    saveUserData(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    clearUserData();
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    saveUserData(updatedUser);

    // If it's not admin, also update in the users list
    if (!user.isAdmin) {
      const users = JSON.parse(localStorage.getItem('reflectionUsers') || localStorage.getItem('onlineGoUsers') || '[]');
      const updatedUsers = users.map((u: any) => {
        if (u.username === user.username) {
          return { 
            ...u, 
            rollCount: updatedUser.rollCount, 
            inventory: updatedUser.inventory,
            coins: updatedUser.coins 
          };
        }
        return u;
      });
      localStorage.setItem('reflectionUsers', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
