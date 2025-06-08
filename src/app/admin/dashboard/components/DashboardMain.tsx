'use client';
import { format } from 'date-fns';
import { Calendar as DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import envConfig from '../../../../../config';

import { DashboardCard } from './card';
import { StatsCard } from './StatsCard';
import { RevenueLineChart } from './RevenueLineChart';
import { PopularItemsChart } from './PopularItemsChart';
import fetchPro from '../fetch/fectPro';
import fetchAcc from '../fetch/fetchAcc';
import fetchOrder from '../fetch/fetchOrder';
import fetchUser from '../fetch/fetchUser';

export function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [totalPro, setTotalPro] = useState(0);
    const [totalAcc, setTotalAcc] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [topCustomers, setTopCustomers] = useState([]);

    const [status, setStatus] = useState('Done');
    const [condition, setCondition] = useState('month');
    const [fromDate, setFromDate] = useState(new Date('2025-01-01'));
    const [toDate, setToDate] = useState(new Date('2025-12-01'));

    const sampleRevenueData = [
        { name: '01', revenue: 1200 },
        { name: '02', revenue: 1900 },
        { name: '03', revenue: 1800 },
        { name: '04', revenue: 2400 },
        { name: '05', revenue: 2700 },
        { name: '06', revenue: 3500 },
        { name: '07', revenue: 3200 },
        { name: '08', revenue: 3800 },
        { name: '09', revenue: 4500 },
        { name: '10', revenue: 4700 },
    ];

    const sampleBrowserData = [
        { name: 'chrome', value: 58, color: '#4285F4' },
        { name: 'safari', value: 45, color: '#34A853' },
        { name: 'firefox', value: 42, color: '#FF9500' },
        { name: 'edge', value: 35, color: '#A142F4' },
        { name: 'other', value: 20, color: '#EA4C89' },
    ];
    // const color = [{ cl1: '#4285F4' }, { cl2: '#34A853' }, { cl3: '#FF9500' }, { cl4: '#A142F4' }, { cl5: '#EA4C89' }];

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const url = new URL(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/statistics`);

            const fromDateStr = fromDate ? format(fromDate, 'yyyy-MM-dd') : '';
            const toDateStr = toDate ? format(toDate, 'yyyy-MM-dd') : '';

            url.searchParams.append('status', status);
            url.searchParams.append('condition', condition);
            url.searchParams.append('fromDate', fromDateStr);
            url.searchParams.append('toDate', toDateStr);
            console.log('status', url.toString());

            const response = await fetch(url.toString(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            console.log(data);

            setDashboardData(data);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [status, condition, fromDate, toDate]);

    useEffect(() => {
        const loadTotal = async () => {
            try {
                const count = await fetchPro();
                setTotalPro(count);
                console.log(count);
            } catch (err) {
                console.error(err);
            }
        };

        loadTotal();
    }, []);

    useEffect(() => {
        const loadTotal = async () => {
            try {
                const count = await fetchAcc();
                setTotalAcc(count);
                console.log(count);
            } catch (err) {
                console.error(err);
            }
        };

        loadTotal();
    }, []);

    useEffect(() => {
        const loadTotal = async () => {
            try {
                const count = await fetchOrder();
                setUserCount(count);
            } catch (err) {
                console.error(err);
            }
        };

        loadTotal();
    }, []);

    // const userOrderCounts = {};

    console.log('userCount', userCount);
    useEffect(() => {
        const loadTopCustomers = async () => {
            try {
                const result = await Promise.all(
                    userCount.map(async (user) => {
                        const userInfo = await fetchUser(user.userId);
                        return {
                            name: userInfo?.last_name,
                            value: user.count,
                        };
                    }),
                );

                setTopCustomers(result);
            } catch (error) {
                console.error('Lỗi khi lấy tên người dùng:', error);
            }
        };

        loadTopCustomers();
    }, [userCount]);

    console.log('topCustomers', topCustomers);

    const totalRevenue = dashboardData?.data?.reduce((sum, item) => sum + item.revenue, 0);

    // console.log('user', userCount)

    const handleResetFilters = () => {
        setStatus('Done');
        setCondition('month');
        setFromDate(new Date('2025-01-01'));
        setToDate(new Date('2025-12-01'));
    };

    return (
        <div className="container mx-auto p-4 space-y-4">
            {/* Filters */}
            <DashboardCard title="Bộ lọc" className="lg:col-span-3">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-wrap gap-4">
                        {/* Status filter */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium mb-1 text-gray-300">Trạng thái</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectItem value="Done">Đã hoàn thành</SelectItem>
                                    <SelectItem value="Pending">Đang xử lý</SelectItem>
                                    <SelectItem value="Cancelled">Đã hủy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Condition filter */}
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium mb-1 text-gray-300">Theo</label>
                            <Select value={condition} onValueChange={setCondition}>
                                <SelectTrigger className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectValue placeholder="Chọn điều kiện" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0E1420] border-gray-600 text-white">
                                    <SelectItem value="day">Ngày</SelectItem>
                                    {/* <SelectItem value="week">Tuần</SelectItem> */}
                                    <SelectItem value="month">Tháng</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Date filters with Calendar Popover */}
                    <div className="flex flex-wrap items-center gap-2 bg-[#0E1420] px-4 py-2 rounded-lg">
                        <label className="text-white text-sm">Từ</label>
                        <div className="w-[200px]">
                            <Calendar selected={fromDate} onChange={setFromDate} placeholderText="Chọn ngày" />
                        </div>

                        <label className="text-white text-sm">Đến</label>
                        <div className="w-[200px]">
                            <Calendar selected={toDate} onChange={setToDate} minDate={fromDate || undefined} placeholderText="Chọn ngày" />
                        </div>

                        <Button
                            onClick={handleResetFilters}
                            variant="outline"
                            className="text-white border-gray-600 bg-transparent hover:bg-white/10"
                        >
                            Reset
                        </Button>

                        <div className="flex-1"></div>

                        <Button onClick={fetchDashboardData} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Áp dụng
                        </Button>
                        </div>

                </div>
            </DashboardCard>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Tổng doanh thu"
                    value={totalRevenue?.toLocaleString() || dashboardData?.total.toLocaleString() || '0'}
                    icon={<DollarSign size={20} />}
                />
                <StatsCard
                    title="Khách"
                    value={totalAcc.toLocaleString() || '0'}
                    subtitle="Gọi món"
                    icon={<Users size={20} />}
                />
                <StatsCard
                    title="Đơn hàng"
                    value={dashboardData?.totalOrders?.toLocaleString() || '0'}
                    subtitle="Đã thanh toán"
                    icon={<ShoppingCart size={20} />}
                />
                <StatsCard
                    title="Tổng sản phẩm"
                    value={totalPro.toLocaleString() || '0'}
                    icon={<Activity size={20} />}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                {/* Revenue Chart */}
                <DashboardCard title="Doanh thu" className="lg:col-span-2">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">Đang tải...</div>
                    ) : (
                        <RevenueLineChart data={dashboardData?.data || sampleRevenueData} />
                    )}
                </DashboardCard>

                <DashboardCard title="Xếp hạng khách hàng" className="lg:col-span-1">
                    <p className="text-sm text-gray-400 mb-4">Mua nhiều nhất sản phẩm nhấtt</p>
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">Đang tải...</div>
                    ) : (
                        <PopularItemsChart data={topCustomers || sampleBrowserData} />
                    )}
                </DashboardCard>
            </div>
        </div>
    );
}
