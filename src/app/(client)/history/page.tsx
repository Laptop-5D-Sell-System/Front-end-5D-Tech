'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import './History.scss';

interface Order {
    id: number;
    status: string;
    total: number;
    order_date: string;
}

export default function History() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [statusOrder, setStatusOrder] = useState<'done' | 'processing' | 'cancel'>('done'); // Default status
    const [loading, setLoading] = useState(true);

    const fetchOrders = async (status: 'done' | 'processing' | 'cancel') => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Vui lòng đăng nhập để xem lịch sử đơn hàng.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`https://localhost:44303/order/my-orders?status=${status}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setOrders(data.myOrders || []);
            } else {
                toast.error(data.message || 'Không thể lấy lịch sử đơn hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
            toast.error('Đã xảy ra lỗi khi lấy lịch sử đơn hàng.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(statusOrder);
    }, [statusOrder]);

    return (
        <div className="history-page mx-[100px] pt-8">
            <h1 className="text-2xl font-[500] mb-4">Lịch sử đặt hàng</h1>

            {/* Status Filter */}
            <div className="mb-4 flex gap-4">
                <Button
                    onClick={() => setStatusOrder('done')}
                    className={`py-2 px-4 rounded hover:bg-red-500 cursor-pointer ${
                        statusOrder === 'done' ? 'bg-red-500 text-white' : 'bg-black'
                    }`}
                >
                    Hoàn thành
                </Button>
                <Button
                    onClick={() => setStatusOrder('processing')}
                    className={`py-2 px-4 rounded hover:bg-red-500 cursor-pointer ${
                        statusOrder === 'processing' ? 'bg-red-500 text-white' : 'bg-black'
                    }`}
                >
                    Đang xử lý
                </Button>
                <Button
                    onClick={() => setStatusOrder('cancel')}
                    className={`py-2 px-4 rounded hover:bg-red-500 cursor-pointer ${
                        statusOrder === 'cancel' ? 'bg-red-500 text-white' : 'bg-black'
                    }`}
                >
                    Đã hủy
                </Button>
            </div>

            {/* Orders List */}
            {loading ? (
                <div className="w-full h-[200px] flex items-center justify-center">
                    <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                        <circle
                            className="pl__ring pl__ring--a"
                            cx="120"
                            cy="120"
                            r="105"
                            fill="none"
                            stroke="#000"
                            strokeWidth="20"
                            strokeDasharray="0 660"
                            strokeDashoffset="-330"
                            strokeLinecap="round"
                        ></circle>
                        <circle
                            className="pl__ring pl__ring--b"
                            cx="120"
                            cy="120"
                            r="35"
                            fill="none"
                            stroke="#000"
                            strokeWidth="20"
                            strokeDasharray="0 220"
                            strokeDashoffset="-110"
                            strokeLinecap="round"
                        ></circle>
                        <circle
                            className="pl__ring pl__ring--c"
                            cx="85"
                            cy="120"
                            r="70"
                            fill="none"
                            stroke="#000"
                            strokeWidth="20"
                            strokeDasharray="0 440"
                            strokeLinecap="round"
                        ></circle>
                        <circle
                            className="pl__ring pl__ring--d"
                            cx="155"
                            cy="120"
                            r="70"
                            fill="none"
                            stroke="#000"
                            strokeWidth="20"
                            strokeDasharray="0 440"
                            strokeLinecap="round"
                        ></circle>
                    </svg>
                </div>
            ) : orders.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <div className="orders-list space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Mã đơn hàng</TableHead>
                                <TableHead className="text-center">Ngày đặt hàng</TableHead>
                                <TableHead className="text-center">Tổng tiền</TableHead>
                                <TableHead className="text-center">Trạng thái</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium text-center">{order.id}</TableCell>
                                    <TableCell className="text-center">{order.order_date ? order.order_date.split('T')[0] : ''}</TableCell>
                                    <TableCell className="text-center">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            order.total,
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                order.status === 'done'
                                                    ? 'bg-green-500 text-white'
                                                    : order.status === 'processing'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            }`}
                                        >
                                            {order.status === 'Done'
                                                ? 'Hoàn thành'
                                                : order.status === 'Processing'
                                                ? 'Đang xử lý'
                                                : 'Đã hủy'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
