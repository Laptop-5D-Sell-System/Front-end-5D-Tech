import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function RevenueLineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          tick={{ fill: "#9CA3AF" }}
        />
        <YAxis 
          stroke="#9CA3AF"
          tick={{ fill: "#9CA3AF" }}
          tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
          labelStyle={{ color: '#fff' }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ fill: '#3B82F6', stroke: '#fff', strokeWidth: 2, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}