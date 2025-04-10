'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import '../history/History.scss'; // Import your CSS file for styling
interface Product {
    ProductName: string;
    Quantity: number;
}

interface OrderDetail {
    user_id: number;
    order_date: string;
    status: string;
    products: Product[];
    total_quantity: number;
    total: number;
}

export default function OrderDetailPage() {
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('id'); // Get the order ID from the query parameter

    useEffect(() => {
        if (!orderId) {
            toast.error('Không tìm thấy mã đơn hàng.');
            router.push('/history'); // Redirect to history page if no order ID is provided
            return;
        }

        const fetchOrderDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Vui lòng đăng nhập để xem chi tiết đơn hàng.');
                router.push('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`https://oms-5d-tech.azurewebsites.net/order/detail?id=${orderId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setOrder(data.order || null);
                } else {
                    toast.error(data.mess || 'Không thể lấy chi tiết đơn hàng.');
                    router.push('/history');
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
                toast.error('Đã xảy ra lỗi khi lấy chi tiết đơn hàng.');
                router.push('/history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId, router]);

    if (loading) {
        return (
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
        );
    }

    if (!order) {
        return <p className="text-center text-red-500">Không tìm thấy chi tiết đơn hàng.</p>;
    }

    return (
        <div className="order-detail-page mx-[100px] pt-8">
            <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>

            {/* Order Summary */}
            <div className="mb-8 border p-4 rounded-lg shadow-md">
                <p className="text-lg mb-2">
                    <strong>Mã người dùng:</strong> {order.user_id}
                </p>
                <p className="text-lg mb-2">
                    <strong>Ngày đặt hàng:</strong> {new Date(order.order_date).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-lg mb-2">
                    <strong>Trạng thái:</strong>{' '}
                    <span
                        className={`px-2 py-1 rounded ${
                            order.status === 'Done'
                                ? 'bg-green-500 text-white'
                                : order.status === 'Processing'
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
                </p>
                <p className="text-lg mb-2">
                    <strong>Tổng số lượng:</strong> {order.total_quantity}
                </p>
                <p className="text-lg">
                    <strong>Tổng tiền:</strong>{' '}
                    <span className="text-red-500 font-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                    </span>
                </p>
            </div>

            {/* Order Items */}
            <div className="order-items">
                <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[70%]">Tên sản phẩm</TableHead>
                            <TableHead className="text-center">Số lượng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.ProductName}</TableCell>
                                <TableCell className="text-center">{product.Quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Back to History Button */}
            <div className="mt-8">
                <Button onClick={() => router.push('/history')} className="bg-red-500 text-white">
                    Quay lại lịch sử đơn hàng
                </Button>
            </div>
        </div>
    );
}
