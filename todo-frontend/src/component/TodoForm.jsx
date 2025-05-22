import React, { useState } from 'react';
import { addTodo } from '../api';
import { toast } from 'react-toastify';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await addTodo({ title });
      onAdd(res.data);
      setTitle('');
    } catch {
      toast.error('Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
