import { create } from 'zustand';
import { api } from '@/lib/api';

type State = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token as string;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      set({ token });
      return true;
    } catch {
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    set({ token: null });
  }
}));
