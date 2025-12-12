import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Mock user storage (will be replaced with Supabase)
const mockUsers: Map<string, { user: User; password: string }> = new Map();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 500));
        
        const userData = mockUsers.get(email);
        if (userData && userData.password === password) {
          set({ user: userData.user, isAuthenticated: true });
          return true;
        }
        
        // For demo, auto-create user on first login
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
          createdAt: new Date(),
        };
        mockUsers.set(email, { user: newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      register: async (email: string, password: string, name: string) => {
        await new Promise((r) => setTimeout(r, 500));
        
        if (mockUsers.has(email)) {
          return false;
        }
        
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name,
          createdAt: new Date(),
        };
        mockUsers.set(email, { user: newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'lostfound-auth',
    }
  )
);
