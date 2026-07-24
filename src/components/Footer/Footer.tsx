// - Нижняя панель с информацией и управлением
// - Счетчик оставшихся задач
// - Кнопка очистки выполненных задач

import React from 'react';

interface FooterProps {
  totalCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  totalCount, 
  completedCount, 
  onClearCompleted 
}) => {
  const remainingCount = totalCount - completedCount;

  return (
    <div className="footer">
      <span className="remaining-count">
        Осталось задач: {remainingCount}
      </span>
      {completedCount > 0 && (
        <button onClick={onClearCompleted} className="clear-btn">
          Очистить выполненные ({completedCount})
        </button>
      )}
    </div>
  );
};