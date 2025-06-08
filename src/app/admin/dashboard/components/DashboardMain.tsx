'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';  
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import envConfig from '../../../../../config';
import { DashboardCard } from './card';
import { StatsCard } from './StatsCard';
import { RevenueLineChart } from './RevenueLineChart';
import { PopularItemsChart } from './PopularItemsChart';
import fetchPro from '../fetch/fectPro';
import fetchAcc from '../fetch/fetchAcc';
import fetchOrder, { UserCountItem } from '../fetch/fetchOrder'; 
import fetchUser from '../fetch/fetchUser';


interface RevenueDataPoint {
  name: string;
  revenue: number;
}

interface DashboardData {
  data: RevenueDataPoint[];
  total: number;
  totalOrders: number;
}

interface TopCustomer {
  name: string | undefined;
  value: number;
}

interface DashboardState {
  dashboardData: DashboardData | null;
  totalPro: number;
  totalAcc: number;
  topCustomers: TopCustomer[];
}

interface DashboardFilters {
    status: string;
    condition: string;
    fromDate: Date | null;
    toDate: Date | null;
}



const useDashboardLogic = (filters: DashboardFilters) => {
    const [data, setData] = useState<DashboardState>({
        dashboardData: null,
        totalPro: 0,
        totalAcc: 0,
        topCustomers: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [proCount, accCount, userOrderCounts] = await Promise.all([
                    fetchPro(),
                    fetchAcc(),
                    fetchOrder(),
                ]);
                
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                const url = new URL(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/statistics`);
                const fromDateStr = filters.fromDate ? format(filters.fromDate, 'yyyy-MM-dd') : '';
                const toDateStr = filters.toDate ? format(filters.toDate, 'yyyy-MM-dd') : '';
                
                url.searchParams.append('status', filters.status);
                url.searchParams.append('condition', filters.condition);
                url.searchParams.append('fromDate', fromDateStr);
                url.searchParams.append('toDate', toDateStr);

                const response = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
                if (!response.ok) throw new Error('Không thể tải dữ liệu thống kê');
                const dashboardStats: DashboardData = await response.json();

                const topCustomersData: TopCustomer[] = await Promise.all(
                    userOrderCounts.map(async (user: UserCountItem) => {
                        const userInfo = await fetchUser(user.userId);
                        return { name: userInfo?.last_name, value: user.count };
                    })
                );

                setData({
                    dashboardData: dashboardStats,
                    totalPro: proCount,
                    totalAcc: accCount,
                    topCustomers: topCustomersData,
                });

            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Đã có lỗi không mong muốn xảy ra');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [filters.status, filters.condition, filters.fromDate, filters.toDate]);

    return { ...data, loading, error };
};

const sampleRevenueData: RevenueDataPoint[] = [ { name: '01', revenue: 1200 }, /* ... */ ];
const sampleBrowserData = [ { name: 'chrome', value: 58, color: '#4285F4' }, /* ... */ ];


export function Dashboard() {
    const [status, setStatus] = useState('Done');
    const [condition, setCondition] = useState('month');
    const [fromDate, setFromDate] = useState<Date | null>(new Date('2025-01-01'));
    const [toDate, setToDate] = useState<Date | null>(new Date('2025-12-01'));

    const { dashboardData, totalPro, totalAcc, topCustomers, loading, error } = useDashboardLogic({
        status, condition, fromDate, toDate
    });
    const chartData = useMemo(() => {
    return topCustomers.map(customer => ({
        ...customer, 
        name: customer.name || 'Không xác định', 
    }));
}, [topCustomers]);

    const totalRevenue = useMemo(() => 
        dashboardData?.data?.reduce((sum, item) => sum + item.revenue, 0),
    [dashboardData]);

    const handleResetFilters = useCallback(() => {
        setStatus('Done');
        setCondition('month');
        setFromDate(new Date('2025-01-01'));
        setToDate(new Date('2025-12-01'));
    }, []);

    if (error) {
        return <div className="text-red-500 text-center p-8">Lỗi tải dữ liệu: {error}</div>;
    }

    return (
        <div className="container lg:mx-20 md:mx-20 sm:mx-20 p-4 space-y-4">
            <DashboardCard title="Bộ lọc">
                 <div className="flex flex-col space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium mb-1 text-gray-300">Trạng thái</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="bg-[#0E1420] border-gray-600 text-white"><SelectValue placeholder="Chọn trạng thái" /></SelectTrigger>
                                <SelectContent className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectItem value="Done">Đã hoàn thành</SelectItem>
                                    <SelectItem value="Pending">Đang xử lý</SelectItem>
                                    <SelectItem value="Cancelled">Đã hủy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium mb-1 text-gray-300">Theo</label>
                            <Select value={condition} onValueChange={setCondition}>
                                <SelectTrigger className="bg-[#0E1420] border-gray-600 text-white"><SelectValue placeholder="Chọn điều kiện" /></SelectTrigger>
                                <SelectContent className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectItem value="day">Ngày</SelectItem>
                                    <SelectItem value="month">Tháng</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 bg-[#0E1420] px-4 py-2 rounded-lg">
                        <label className="text-white text-sm">Từ</label>
                        <div className="w-[200px]"><Calendar selected={fromDate} onChange={setFromDate} placeholderText="Chọn ngày" /></div>
                        <label className="text-white text-sm">Đến</label>
                        <div className="w-[200px]"><Calendar selected={toDate} onChange={setToDate} minDate={fromDate || undefined} placeholderText="Chọn ngày" /></div>
                        <Button onClick={handleResetFilters} variant="outline" className="text-white border-gray-600 bg-transparent hover:bg-white/10">Reset</Button>
                        <div className="flex-1"></div>
                        <Button onClick={() => {}} className="bg-blue-600 hover:bg-blue-700 text-white">Áp dụng</Button> {/* Nút này có thể không cần nữa vì useEffect tự chạy */}
                    </div>
                </div>
            </DashboardCard>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Tổng doanh thu" value={totalRevenue?.toLocaleString() ?? '0'} icon={<DollarSign size={20} />} />
                <StatsCard title="Khách hàng" value={totalAcc.toLocaleString()} icon={<Users size={20} />} />
                <StatsCard title="Đơn hàng" value={dashboardData?.totalOrders?.toLocaleString() ?? '0'} subtitle="Đã thanh toán" icon={<ShoppingCart size={20} />} />
                <StatsCard title="Tổng sản phẩm" value={totalPro.toLocaleString()} icon={<Activity size={20} />} />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                <DashboardCard title="Doanh thu" className="lg:col-span-2">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">Đang tải...</div>
                    ) : (
                        <RevenueLineChart data={dashboardData?.data || sampleRevenueData} />
                    )}
                </DashboardCard>
                <DashboardCard title="Xếp hạng khách hàng" className="lg:col-span-1">
                     <p className="text-sm text-gray-400 mb-4">Top khách hàng mua nhiều nhất</p>
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">Đang tải...</div>
                    ) : (
                         <PopularItemsChart data={chartData.length > 0 ? chartData : sampleBrowserData} />
                    )}
                </DashboardCard>
            </div>
        </div>
    );
}