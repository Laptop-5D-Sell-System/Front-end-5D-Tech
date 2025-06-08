import { ReactNode, ElementType } from 'react';

interface DashboardCardProps {
  children: ReactNode;
  title?: string;     
  icon?: ElementType; 
  className?: string;
}

export function DashboardCard({ children, title, className = "", icon: Icon }: DashboardCardProps) {
  return (
    <div className={`bg-[#0E1420] rounded-lg shadow-lg p-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {Icon && <Icon className="h-6 w-6 text-gray-400" />}
        </div>
      )}
      <div className="text-gray-200">
        {children}
      </div>
    </div>
  );
}