import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../api/types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
           
            setUser: (user) => set({ 
                user, 
                isAuthenticated: !!user 
            }),
            
            setToken: (token) => set({ token })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                token: state.token, 
                user: state.user 
            }), 
        }
    )
);