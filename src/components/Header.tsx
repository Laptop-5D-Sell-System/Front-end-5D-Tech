'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
} from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

export default function Header() {
    const [showSearch, setShowSearch] = useState(false);

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
                        className="header_menu_item text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
                    >
                        Trang Chủ
                    </Link>
                    <Link
                        href="/about"
                        className="header_menu_item text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
                    >
                        Giới Thiệu
                    </Link>
                    <li className="header_menu_item text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer relative get_menu_secondary">
                        Sản Phẩm <ChevronDown className="ml-1" strokeWidth={1} />
                        {/* Menu secondary */}
                        <div className="menu_secondary w-[700px] lg:w-[800px] xl:w-[1000px] absolute top-full left-0 bg-white shadow-md rounded-sm p-5 hidden z-50">
                            <ul className="menu_secondary_list w-1/5">
                                <li className="menu_secondary_item font-semibold mb-4">Máy tính</li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Mackbook
                                    </a>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Thinkbook
                                    </a>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Asus Gaming
                                    </a>
                                </li>
                            </ul>
                            <ul className="menu_secondary_list w-1/5">
                                <li className="menu_secondary_item font-semibold mb-4">Phụ Kiện</li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Màn hình
                                    </a>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Tai nghe
                                    </a>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Lót chuột
                                    </a>
                                </li>
                                <li className="menu_secondary_item mb-4">
                                    <a
                                        href=""
                                        className="hover:text-red-500 hover:tracking-wide transition-all duration-150 font-xl"
                                    >
                                        Bàn phím
                                    </a>
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
                        className="header_menu_item text-sm lg:text-base h-full relative flex items-center justify-center cursor-pointer"
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
                                <span className="bg-red-500 text-white p-2 rounded-md">5D</span> - Tech
                            </h2>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-[400px] border outline-none p-1 pl-3"
                            />
                            <div className="w-1/5 flex items-center justify-center">
                                <div className="close-btn" onClick={() => setShowSearch(false)}>
                                    &times;
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer outline-none">
                                <UserRound />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-[32px]">
                                <DropdownMenuLabel>Xin chào, Nguyễn Thái Dương</DropdownMenuLabel>

                                {/* Edit information */}
                                <Link href="/edit-information">
                                    <DropdownMenuItem>
                                        <UserRoundPlus />
                                        Chỉnh sửa thông tin
                                    </DropdownMenuItem>
                                </Link>

                                {/* Cart */}
                                <Link href="/cart">
                                    <DropdownMenuItem>
                                        <ShoppingBag />
                                        Giỏ hàng của bạn
                                    </DropdownMenuItem>
                                </Link>

                                {/* History */}
                                <Link href="/history">
                                    <DropdownMenuItem>
                                        <History />
                                        Lịch sửa mua hàng
                                    </DropdownMenuItem>
                                </Link>

                                {/* Support */}
                                <Link href="/support">
                                    <DropdownMenuItem>
                                        <Headset />
                                        Hỗ trợ khách hàng
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer outline-none">
                                <UserRound />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='mt-[32px]'>
                                <Link href="/signup">
                                    <DropdownMenuItem>
                                        <UserPlus/>Đăng ký
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href="/login">
                                    <DropdownMenuItem>
                                        <LogIn />Đăng nhập
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </li>

                    <li>
                        <Sheet>
                            <SheetTrigger>
                                <ShoppingBasket className="cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent className="gap-0">
                                <SheetHeader>
                                    <SheetTitle className="text-xl">Giỏ hàng của bạn</SheetTitle>
                                </SheetHeader>
                                <Separator />
                                <SheetDescription>
                                    <p>Giỏ hàng của bạn đang trống</p>
                                </SheetDescription>
                            </SheetContent>
                        </Sheet>
                    </li>
                </ul>
            </div>
        </div>
    );
}
