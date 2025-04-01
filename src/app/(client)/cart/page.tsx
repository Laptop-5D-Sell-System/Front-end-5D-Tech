'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function Cart() {
    const { cart, updateCartItemQuantity, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-normal my-8">Giỏ hàng của bạn</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Danh sách sản phẩm */}
                    <div className="col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 border-b pb-4"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={240}
                                    height={150}
                                    className="object-cover"
                                />
                                <div className="flex-1">
                                    <p className="text-lg font-medium">{item.name}</p>
                                    <p className="text-sm text-red-500">
                                        Giá tiền:{' '}
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.price)}
                                    </p>
                                    <div className="flex items-center justify-between gap-2 mt-2 w-[100px]">
                                        <div
                                            className="px-2 text-red-500 bg-red-500 text-white transition-all duration-300 border-red-500 cursor-pointer"
                                            onClick={() =>
                                                updateCartItemQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </div>
                                        <span className='text-center'>{item.quantity}</span>
                                        <div
                                            className="px-2 text-red-500 bg-red-500 text-white transition-all duration-300 border-red-500 cursor-pointer"
                                            onClick={() =>
                                                updateCartItemQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 border-red-500 cursor-pointer"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Tổng tiền */}
                    <div className="p-4 border rounded-lg shadow-md h-[200px]">
                        <h2 className="text-xl font-semibold mb-4">Thanh toán đơn hàng</h2>
                        <hr />
                        <p className="flex justify-between my-4">
                            <span>Tổng tiền:</span>
                            <span className="text-red-500 font-medium">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(totalPrice)}
                            </span>
                        </p>
                        <Link href="/checkout">
                            <Button className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300">
                                Thanh toán
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
            )}
        </div>
    );
}