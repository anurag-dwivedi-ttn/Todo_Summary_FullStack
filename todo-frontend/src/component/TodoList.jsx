import React, { useState } from 'react';
import { deleteTodo, updateTodo } from '../api';
import { toast } from 'react-toastify';

export default function TodoList({ todos, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      onDelete(id);
    } catch {
      toast.error('Failed to delete todo');
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateTodo(id, { title: editTitle });
      onUpdate(res.data);
      setEditingId(null);
      toast.success('Todo updated');
    } catch {
      toast.error('Failed to update todo');
    }
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <li key={todo.id} style={{ marginBottom: '1rem' }}>
          {editingId === todo.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <button onClick={() => handleUpdate(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
            </>
          ) : (
            <>
              {todo.title}
              <button onClick={() => handleEdit(todo)} style={{ marginLeft: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
