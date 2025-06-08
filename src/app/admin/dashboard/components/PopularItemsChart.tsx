interface ChartItem {
  name: string;
  value: number;
  color?: string; 
}

interface PopularItemsChartProps {
  data: ChartItem[];
}

export function PopularItemsChart({ data }: PopularItemsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        Không có dữ liệu
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-3">
      {sortedData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-20 text-gray-400 truncate">{item.name}</div>
          <div className="flex-1 ml-2">
            <div className="h-8 relative bg-gray-700 rounded-md">
              <div 
                className="absolute inset-0 rounded-md transition-all duration-500"
                style={{ 
                  backgroundColor: item.color || '#3B82F6',
                  width: `${(item.value / sortedData[0].value) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}