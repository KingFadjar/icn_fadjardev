import { create } from 'zustand';
import { api } from '@/lib/api';

type Todo = { id: string; title: string; description?: string; done: boolean; };
type CreateTodo = { title: string; description?: string; };

type State = {
  items: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (data: CreateTodo) => Promise<void>;
  updateTodo: (id: string, data: Partial<Todo>) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  suggestTasks: (prompt: string) => Promise<string[]>;
};

export const useTodoStore = create<State>((set, get) => ({
  items: [],
  fetchTodos: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await api.get('/todos');
    set({ items: res.data });
  },
  addTodo: async (data) => {
    const res = await api.post('/todos', data);
    set({ items: [res.data, ...get().items] });
  },
  updateTodo: async (id, data) => {
    const res = await api.patch(`/todos/${id}`, data);
    set({ items: get().items.map(t => t.id === id ? res.data : t) });
  },
  removeTodo: async (id) => {
    await api.delete(`/todos/${id}`);
    set({ items: get().items.filter(t => t.id !== id) });
  },
  suggestTasks: async (prompt) => {
    const res = await api.post('/ai/suggest', { prompt });
    return res.data.suggestions as string[];
  }
}));
