'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import './Checkout.scss';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    account: {
        email: string;
    };
}

export default function Checkout() {
    const [user, setUser] = useState<User | null>(null);
    const { cart, fetchCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay'>('cod');;
    const router = useRouter();

    // Fetch user information
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Vui lòng đăng nhập để tiếp tục.');
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('https://localhost:44303/user/my-information', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.user) {
                    setUser(data.user);

                    if (!data.user.phone_number || !data.user.address) {
                        toast.warning('Vui lòng cập nhật thông tin cá nhân trước khi thanh toán.');
                        router.push('/edit-information');
                        return;
                    }

                    fetchCart();
                    setLoading(false);
                } else {
                    toast.error('Không thể lấy thông tin người dùng.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
                toast.error('Không thể lấy thông tin người dùng.');
            }
        };

        fetchUserInfo();
    }, [router]);

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://localhost:44303/order/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderItems: cart.map((item) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })),
                }),
            });

            const dataCreate = await response.json();

            console.log(dataCreate);

            if (dataCreate.HttpStatus === 201) {
                if (paymentMethod === 'cod') {
                    toast.success('Đặt hàng thành công!');
                } else if (paymentMethod === 'vnpay') {
                    const response = await fetch('https://localhost:44303/payment/create', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Amount: cart.reduce((total, item) => total + item.product_price * item.quantity, 0),
                            OrderId: dataCreate.OrderId,
                            OrderDescription : "Test"
                        }),
                    });

                    const dataPay = await response.json();
                    console.log(dataPay);
                    
                    if (dataPay.HttpStatus === 200) {
                        // Redirect to VNPay URL
                        window.location.href = dataPay.url;
                    }
                }
            } else {
                toast.error(dataCreate.mess || 'Không thể đặt hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            toast.error('Đã xảy ra lỗi khi đặt hàng.');
        }
    };

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

    if (!user) {
        return <p>Không thể tải thông tin người dùng.</p>;
    }

    return (
        <div className="checkout-page mx-[100px] pt-8">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Thanh toán</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-[500] mb-4">Thanh toán đơn hàng</h1>

            <div className="flex gap-8">
                {/* User Information */}
                <div className="user-info mb-8 flex-1">
                    <div className="mb-8 border p-4 rounded-lg">
                        <h2 className="text-xl font-[500] mb-2">Thông tin người dùng</h2>
                        <p className="border-b mb-4">
                            Họ tên: {user.first_name} {user.last_name}
                        </p>
                        <p className="border-b mb-4">Email: {user?.account?.email}</p>
                        <p className="border-b mb-4">Số điện thoại: {user.phone_number}</p>
                        <p className="border-b mb-4">Địa chỉ giao hàng: {user.address}</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <h2 className="text-xl font-[500] mb-2">Phương thức thanh toán</h2>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                Thanh toán khi nhận hàng (COD)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="vnpay"
                                    checked={paymentMethod === 'vnpay'}
                                    onChange={() => setPaymentMethod('vnpay')}
                                />
                                Thanh toán qua VNPay
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border-2 border-red-500 rounded-lg p-4">
                    {/* Cart Items */}
                    <div className="cart-items mb-8">
                        <h2 className="text-xl font-[500] mb-2">Sản phẩm trong giỏ hàng</h2>
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex items-center gap-4 border-b pb-2">
                                    <img
                                        src={item.product_image}
                                        alt={item.product_name}
                                        className="w-20 h-20 object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="text-lg font-medium">{item.product_name}</p>
                                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                        <p className="text-sm text-red-500">
                                            Đơn giá:{' '}
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(item.product_price)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary mb-8">
                        <h2 className="text-xl font-[500] mb-2 flex items-center justify-between">
                            Thanh toán đơn hàng:{' '}
                            <span className="text-red-500 font-semibold">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                    cart.reduce((total, item) => total + item.product_price * item.quantity, 0),
                                )}
                            </span>
                        </h2>
                    </div>

                    {/* Place Order Button */}
                    <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-black cursor-pointer transition-all duration-300"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}
