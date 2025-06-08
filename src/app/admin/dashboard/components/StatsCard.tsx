import { ReactNode } from 'react';
import { DashboardCard } from "./card";

interface StatsCardProps {
  title: string;
  value: string | number; 
  icon: ReactNode;      
  subtitle?: string;   
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <DashboardCard className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
          {/* Chỉ render khi subtitle tồn tại */}
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
          {icon}
        </div>
      </div>
    </DashboardCard>
  );
}