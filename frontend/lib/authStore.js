import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: typeof window !== 'undefined' ? 
    JSON.parse(localStorage.getItem('user') || 'null') : 
    null,
  token: typeof window !== 'undefined' ? 
    localStorage.getItem('token') || null : 
    null,
  isAuthenticated: typeof window !== 'undefined' ? 
    !!localStorage.getItem('token') : 
    false,

  setUser: (user) => {
    set({ user });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  },
}));

export default useAuthStore;
