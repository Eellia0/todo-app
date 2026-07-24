import React from 'react';
import { Todo } from '../../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        id={`todo-${todo.id}`}
      />
      <label htmlFor={`todo-${todo.id}`} className="custom-checkbox" />
      <span>{todo.text}</span>
      <button 
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        ×
      </button>
    </div>
  );
};