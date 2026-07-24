// - Компонент списка задач
// - Отображает переданный массив задач
// - Обрабатывает пустое состояние

import React from 'react';
import { Todo } from '../../hooks/useTodos';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete 
}) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
      {todos.length === 0 && <p className="empty-message">No tasks</p>}
    </div>
  );
};