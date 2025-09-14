'use client';

import { useAuthStore } from '@/store/auth';
import { useTodoStore } from '@/store/todos';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const token = useAuthStore(s => s.token);
  const logout = useAuthStore(s => s.logout);
  const { items, fetchTodos, addTodo, updateTodo, removeTodo, suggestTasks } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => { if (token) fetchTodos(); }, [token, fetchTodos]);

  if (!token) return <p>Please login first.</p>;

  return (
    <main>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section style={{ marginTop: 16, padding: 12, background: '#121a2b', borderRadius: 8 }}>
        <h3>Add Todo</h3>
        <div style={{ display:'grid', gap:8, maxWidth: 520 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" />
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => { if (title.trim()) { addTodo({ title, description }); setTitle(''); setDescription(''); } }}>Add</button>
            <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Generate task suggestion (goal)" />
            <button onClick={async () => { const res = await suggestTasks(prompt); setSuggestions(res); }}>Suggest</button>
          </div>
          {suggestions.length > 0 && (
            <div style={{ background:'#0e1524', padding:10, borderRadius:6 }}>
              <b>Suggestions:</b>
              <ul>
                {suggestions.map((s, i) => (
                  <li key={i} style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ flex: 1 }}>{s}</span>
                    <button onClick={()=> addTodo({ title: s })}>Add</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Your Todos</h3>
        <ul style={{ display:'grid', gap:8 }}>
          {items.map(todo => (
            <li key={todo.id} style={{ background:'#121a2b', borderRadius:8, padding:10, display:'grid', gap:6 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <strong style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</strong>
                <div style={{ display:'flex', gap:6 }}>
                  <button onClick={()=> updateTodo(todo.id, { done: !todo.done })}>
                    {todo.done ? 'Mark Undone' : 'Mark Done'}
                  </button>
                  <button onClick={()=> removeTodo(todo.id)}>Delete</button>
                </div>
              </div>
              {todo.description && <p style={{ opacity:.9 }}>{todo.description}</p>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
