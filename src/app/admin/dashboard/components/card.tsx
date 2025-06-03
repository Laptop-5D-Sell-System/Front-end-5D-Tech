export function DashboardCard({ children, title, className = "", icon }) {
  return (
    <div className={`bg-[#0E1420] rounded-lg shadow-lg p-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
      )}
      {children}
    </div>
  );
}