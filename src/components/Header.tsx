'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import {
    LogOut,
    Search,
    ShoppingBasket,
    UserRound,
    UserRoundPlus,
    ShoppingBag,
    History,
    Headset,
    ChevronDown,
    LogIn,
    UserPlus,
    SearchCheck,
    Trash2,
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import '../styles/Header.scss';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [userName, setUserName] = useState('');
    const router = useRouter();

    // Check token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        // Fetch user details from API
        axios
            .get(`https://localhost:44303/user/my-information`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.data.httpStatus === 200) {
                    const { first_name, last_name } = response.data.user;
                    setUserName(`${first_name} ${last_name}`);
                    setIsLoggedIn(true);
                } else {
                    console.error('Failed to fetch user details:', response.data);
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
                setIsLoggedIn(false);
            });
    }, []);

    const route = useRouter();

    const logout = async () => {
        try {
          const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message || 'Lỗi khi gọi API logout');
          }
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
      
          route.push('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

    // Handle search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/search?q=${searchTerm}`);
        }
    };

    // handle cart
    const { cart, removeFromCart, updateCartItemQuantity } = useCart();

    return (
        <div className="header shadow fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow">
            {/* Băng dôn chạy */}
            <div className="marquee-container">
                <ul className="marquee text-white flex justtify-around">
                    <li className="list-disc mr-16">Đặt hàng trực tuyến gọi cho chúng tôi 0313728397</li>
                    <li className="list-disc mr-16">Giao hàng miễn phí cho đơn hàng trên 1,000,000 ₫</li>
                    <li className="list-disc mr-16">
                        Đăng ký tài khoản để được giảm giá -15% cho tất cả các sản phẩm đang thịnh hành
                    </li>
                </ul>
            </div>

            {/* Nội dung header */}
            <div className="header_content h-20 flex items-center justify-between">
                {/* Menu header left */}
                <ul className="header_menu h-full flex items-center justify-between w-2/5">
                    <Link
                        href="/"
                        className="header_menu_item outline-none text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
                    >
                        Trang Chủ
                    </Link>
                    <Link
                        href="/about"
                        className="header_menu_item outline-none text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
                    >
                        Giới Thiệu
                    </Link>
                    <li
                        className="header_menu_item outline-none text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer relative get_menu_secondary"
                    >
                        <Link href={'/product-list'} className='flex gap-1 items-center'>Sản Phẩm <ChevronDown className="ml-1" strokeWidth={1} /></Link>
                        {/* Menu secondary */}
                        <div className="menu_secondary w-[700px] lg:w-[800px] xl:w-[1000px] absolute top-full left-0 bg-white shadow-md rounded-sm p-5 hidden z-50">
                            <ul className="menu_secondary_list w-1/5">
                                <li className="menu_secondary_item font-semibold mb-4">Máy tính</li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Mackbook
                                    </Link>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Thinkbook
                                    </Link>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Asus Gaming
                                    </Link>
                                </li>
                            </ul>
                            <ul className="menu_secondary_list w-1/5">
                                <li className="menu_secondary_item font-semibold mb-4">Phụ Kiện</li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Màn hình
                                    </Link>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Tai nghe
                                    </Link>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Lót chuột
                                    </Link>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <Link
                                        href="/"
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Bàn phím
                                    </Link>
                                </li>
                            </ul>
                            <div className="relative w-3/5 h-[300px] overflow-hidden group">
                                {/* Nội dung trên ảnh */}
                                <div className="about_menu_secondary absolute top-8 left-4 z-50">
                                    <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                                    <h2 className="font-bold text-2xl mb-4">Dell XPS 13 9340</h2>
                                    <Button>Mua Ngay</Button>
                                </div>

                                {/* Ảnh với hiệu ứng zoom */}
                                <Image
                                    src="/images/laptop.jpeg"
                                    alt="Banner"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority
                                />
                            </div>
                        </div>
                    </li>
                    <Link
                        href="/contact"
                        className="header_menu_item outline-none text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
                    >
                        Liên Hệ
                    </Link>
                </ul>

                {/* Logo */}
                <h1 className="header_logo text-2xl font-bold text-red-500 w-1/5 text-center">
                    <span className="bg-red-500 text-white p-2 rounded-md">5D</span> - Tech
                </h1>

                {/* Menu header right */}
                <ul className="header_user flex justify-end gap-8 w-2/5">
                    <li className={`search_btn cursor-pointer ${showSearch ? 'active' : ''}`}>
                        <Search onClick={() => setShowSearch(true)} />
                        <div
                            className={`search_container flex items-center justify-between ${showSearch ? 'show' : ''}`}
                        >
                            <h2 className="header_logo text-2xl font-bold text-red-500 text-center w-1/5">
                                <Link href="/">
                                    <span className="bg-red-500 text-white p-2 rounded-md">5D</span> - Tech
                                </Link>
                            </h2>
                            <div className="flex items-center justify-between w-[500px] border outline-none pl-3">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="outline-none w-[430px]"
                                />
                                {searchTerm && (
                                    <Button
                                        variant="ghost"
                                        onClick={() => setSearchTerm('')}
                                        className="text-lg hover:bg-transparent cursor-pointer"
                                    >
                                        &times;
                                    </Button>
                                )}
                                <Button
                                    className="rounded-none cursor-pointer w-[70px] outline-none"
                                    onClick={handleSearch}
                                >
                                    <Search />
                                </Button>
                            </div>
                            <div className="w-1/5 flex items-center justify-center">
                                <div className="close-btn" onClick={() => setShowSearch(false)}>
                                    &times;
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="cursor-pointer">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer outline-none">
                                    <UserRound />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-[32px]">
                                    <DropdownMenuLabel>Xin chào, {userName}</DropdownMenuLabel>

                                    <Link href="/edit-information">
                                        <DropdownMenuItem className='cursor-pointer'>
                                            <UserRoundPlus stroke="black" />
                                            Chỉnh sửa thông tin
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href="/cart">
                                        <DropdownMenuItem className='cursor-pointer'>
                                            <ShoppingBag stroke="black" />
                                            Giỏ hàng của bạn
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href="/history">
                                        <DropdownMenuItem className='cursor-pointer'>
                                            <History stroke="black" />
                                            Lịch sửa mua hàng
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href="/support">
                                        <DropdownMenuItem className='cursor-pointer'>
                                            <Headset stroke="black" />
                                            Hỗ trợ khách hàng
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                                        <LogOut stroke="black" />
                                        Đăng Xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer outline-none">
                                    <UserRound />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-[32px]">
                                    <Link href="/signup">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <UserPlus stroke="black" />
                                            Đăng ký
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link href="/login">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <LogIn stroke="black" />
                                            Đăng nhập
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </li>

                    <li>
                        <Sheet>
                            <SheetTrigger className="relative">
                                <ShoppingBasket className="cursor-pointer" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-3 -right-2 bg-red-500 text-white text-[12px] w-4 h-4 flex items-center justify-center rounded-full">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                            </SheetTrigger>
                            <SheetContent className="gap-0">
                                <SheetHeader>
                                    <SheetTitle className="text-xl">Giỏ hàng của bạn</SheetTitle>
                                </SheetHeader>
                                <Separator />
                                <div className="px-4 pt-2">
                                    {cart.length > 0 ? (
                                        <ul className="space-y-4">
                                            {cart.map((item) => (
                                                <li key={item.product_id} className="flex items-center gap-4 border-b pb-2">
                                                    <Image
                                                        src={'/images/laptop.jpeg'}
                                                        alt={item.product_name}
                                                        width={120}
                                                        height={80}
                                                        className="object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-[14px] font-medium mb-1">{item.product_name}</p>
                                                        <p className="text-[14px] text-red-500 mb-1">
                                                            Giá tiền:{' '}
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(item.product_price)}
                                                        </p>
                                                        <div className="flex items-center justify-between gap-2 text-[12px] w-[100px]">
                                                            <div
                                                                className="text-red-500 bg-red-500 text-white transition-all duration-300 border px-2 border-red-500 cursor-pointer"
                                                                onClick={() =>
                                                                    updateCartItemQuantity(item.id, item.quantity - 1)
                                                                }
                                                            >
                                                                -
                                                            </div>
                                                            <span className="w-[20px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <div
                                                                className="text-red-500 bg-red-500 text-white transition-all duration-300 border px-2 border-red-500 cursor-pointer"
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
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Giỏ hàng của bạn đang trống</p>
                                    )}
                                </div>
                                {/* Tính tổng tiền */}
                                <div className="mt-auto border-t p-1 pt-4">
                                    <p className="text-lg flex items-center justify-between">
                                        <span>Tổng tiền: </span>
                                        <span className="text-red-500">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(
                                                cart.reduce((total, item) => total + item.product_price * item.quantity, 0),
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between gap-1 p-1">
                                    <Link href="/cart">
                                        <Button className="rounded-none w-[208px] cursor-pointer hover:bg-red-500 transition-all duration-300">
                                            Xem giỏ hàng
                                        </Button>
                                    </Link>
                                    <Link href="/checkout">
                                        <Button className="rounded-none w-[208px] cursor-pointer hover:bg-red-500 transition-all duration-300">
                                            Thanh toán
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </li>
                </ul>
            </div>
        </div>
    );
}
