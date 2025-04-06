'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import './Checkout.scss';
interface User {
    id: number;
    full_name: string;
    phone_number: string;
    address: string;
    account: {
        email: string;
    }
}

export default function Checkout() {
    const [user, setUser] = useState<User | null>(null);
    // const [cart, setCart] = useState<CartItem[]>([]);
    const { cart, fetchCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');
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
                
                setUser(data.user);
                setAddress(data.user.address || '');
                fetchCart(); 
                setLoading(false); 
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
                        product_id: item.id,
                        quantity: item.quantity,
                    }))
                }),
            });

            console.log(response);
            
            const data = await response.json();

            console.log(data);
            
            if (data.HttpStatus === 201) {
                toast.success('Đặt hàng thành công!');
                // router.push('/paymemt');
            } else {
                toast.error(data.message || 'Không thể đặt hàng.');
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
                    <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
                </svg>
            </div>
        );
    }

    if (!user) {
        return <p>Không thể tải thông tin người dùng.</p>;
    }

    return (
        <div className="checkout-page mx-[100px] pt-8">
            <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

            {/* User Information */}
            <div className="user-info mb-8">
                <h2 className="text-xl font-semibold mb-2">Thông tin người dùng</h2>
                <p>Họ tên: {user.full_name}</p>
                <p>Email: {user?.account?.email}</p>
                <p>Số điện thoại: {user.phone_number}</p>
                <div className="mt-4">
                    <label htmlFor="address" className="block mb-2">Địa chỉ giao hàng:</label>
                    <Input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ giao hàng"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Cart Items */}
            <div className="cart-items mb-8">
                <h2 className="text-xl font-semibold mb-2">Sản phẩm trong giỏ hàng</h2>
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 border-b pb-2">
                            <img src={item.product_image} alt={item.product_name} className="w-20 h-20 object-cover" />
                            <div className="flex-1">
                                <p className="text-lg font-medium">{item.product_name}</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                <p className="text-sm text-red-500">
                                    Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Order Summary */}
            <div className="order-summary mb-8">
                <h2 className="text-xl font-semibold mb-2">Tóm tắt đơn hàng</h2>
                <p className="text-lg">
                    Tổng tiền:{' '}
                    <span className="text-red-500 font-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            cart.reduce((total, item) => total + item.product_price * item.quantity, 0)
                        )}
                    </span>
                </p>
            </div>

            {/* Place Order Button */}
            <Button
                onClick={handlePlaceOrder}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all"
            >
                Đặt hàng
            </Button>
        </div>
    );
}