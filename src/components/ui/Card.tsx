import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}>
      {(title || subtitle) && (
        <div className="p-6 pb-4">
          {title && <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className={title || subtitle ? 'px-6 pb-6' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};