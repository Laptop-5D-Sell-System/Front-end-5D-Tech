import { DashboardCard } from "./card";

export function StatsCard({ title, value, subtitle, icon }) {
  return (
    <DashboardCard className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
          {icon}
        </div>
      </div>
    </DashboardCard>
  );
}