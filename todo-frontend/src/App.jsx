import React, { useEffect, useState } from 'react';
import { getTodos } from './api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import SummaryButton from './component/SummaryButton';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(res => setTodos(res.data));
  }, []);

  const handleAdd = (todo) => setTodos(prev => [...prev, todo]);
  const handleDelete = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  const handleUpdate = (updateTodo) =>
    setTodos(prev =>
      prev.map(todo => (todo.id === updateTodo.id ? updateTodo : todo))
    );

  return (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4'
    }}
  >
    <div
      style={{
        maxWidth: 600,
        width: '100%',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}
    >
      <h1>Todo Summary Assistant</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      <SummaryButton />
      <ToastContainer />
    </div>
  </div>
);

}

export default App;
