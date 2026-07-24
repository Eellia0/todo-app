// - Корневой компонент приложения
// - Управление состоянием вкладок
// - Композиция всех компонентов

import React, { useState } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import './App.css';

type TabType = 'all' | 'active' | 'completed';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [currentTab, setCurrentTab] = useState<TabType>('all');

  const filteredTodos = {
    all: todos,
    active: todos.filter(todo => !todo.completed),
    completed: todos.filter(todo => todo.completed)
  };

  const remainingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <h1>Todo App</h1>
      
      <AddTodo onAdd={addTodo} />
      
      <TodoList 
        todos={filteredTodos[currentTab]} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo}
      />
      
      <div className="bottom-panel">
        <span className="remaining-count">
          {remainingCount} items left
        </span>
        
        <div className="filter-buttons">
          <button 
            className={currentTab === 'all' ? 'active' : ''}
            onClick={() => setCurrentTab('all')}
          >
            All
          </button>
          <button 
            className={currentTab === 'active' ? 'active' : ''}
            onClick={() => setCurrentTab('active')}
          >
            Active
          </button>
          <button 
            className={currentTab === 'completed' ? 'active' : ''}
            onClick={() => setCurrentTab('completed')}
          >
            Completed
          </button>
        </div>

        <button 
          onClick={clearCompleted} 
          className={`clear-btn ${completedCount === 0 ? 'disabled' : ''}`}
          disabled={completedCount === 0}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;