'use client';

import {
    ArrowRight,
    Camera,
    Eye,
    Gamepad2,
    Headphones,
    Keyboard,
    Laptop,
    Mail,
    Monitor,
    Mouse,
    PlugZap,
    ShoppingCart,
    Star,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import Modal from '../../components/Modal';
import Link from 'next/link';
import envConfig from '../../../config';

interface Product {
    id: number;
    name: string;
    category_name: string;
    price: number;
    stock_quantity: number;
    description: string;
    product_image: string;
    processWidth?: number;
}


export default function Home() {
    // Handle dialog
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'Cart' | 'View'>('Cart');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleModalOpen = (content: 'Cart' | 'View', product?: Product) => {
        setModalContent(content);
        if (product) {
            setSelectedProduct(product);
        }
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Render products
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/all-products?sortOrder=null`);
                const fetchedProducts: Product[] = response.data.products;

                // Cập nhật processWidth dựa trên available và quantity
                const updatedProducts = fetchedProducts.map(product => {
                    const percent = product.stock_quantity > 0 ? (product.stock_quantity / 100) * 100 : 0;
                    return { ...product, processWidth: percent };
                });

                setProducts(updatedProducts.slice(0, 8));
            }
            catch (error) {
                console.error(error);
            }
        }; 
        fetchProducts();
    }, []);


    return (
        <div className="pt-5">
            <div className="px-[100px]">
                {/* Start Banner */}
                <div className="grid lg:grid-cols-2 gap-5 overflow-hidden">
                    <div className="relative h-[380px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute top-8 left-8 z-1">
                            <span className="text-red-500 text-sm mb-4 p-1">Mua chỉ với 6,000,000 ₫</span>
                            <h2 className="font-semibold text-3xl mb-4 mt-4">
                                Samsung <br /> Galaxy Tab A8
                            </h2>
                            <div className="mb-4 text-gray-500 font-light text-sm">
                                Samsung Galaxy Tab A8 64GB <br /> WiFi Grey là máy tính bảng tầm trung
                            </div>
                            <Button className="bg-red-500 hover:cursor-pointer transition-all duration-500">
                                Mua Ngay <ArrowRight />
                            </Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/banner-1.jpg"
                            alt="Banner"
                            fill
                            quality={100}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                    <div className="relative h-[380px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute top-8 left-8 z-1">
                            <span className="text-black-500 text-sm mb-4 bg-yellow-300 rounded p-1">
                                Mua ngay với 4.990.000 ₫
                            </span>
                            <h2 className="font-semibold text-3xl mb-4 mt-4">
                                Meta Quest 2 <br /> 256GB
                            </h2>
                            <div className="mb-4 text-gray-500 font-light text-sm">
                                Meta là cái tên mới <br /> thay thế Oculus
                            </div>
                            <Button className="bg-white text-black hover:cursor-pointer hover:text-white transition-all duration-500">
                                Mua Ngay <ArrowRight />
                            </Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/banner-2.jpg"
                            alt="Banner"
                            fill
                            quality={100}
                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_2fr_1fr]  gap-5 overflow-hidden mt-5">
                    <div className="relative h-[300px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute inset-0 flex flex-col items-center justify-end z-10 text-center mb-8">
                            <span className="text-white text-sm bg-red-500 p-1 rounded">Hàng mới về</span>
                            <h2 className="font-semibold text-2xl mb-3 mt-3 text-red-500">
                                Apple AirPods Max Space Orange
                            </h2>
                            <Button
                                variant="outline"
                                className="bg-transparent border-red-500 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                            >
                                Mua Ngay <ArrowRight />
                            </Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/banner-3.jpg"
                            alt="Banner"
                            fill
                            quality={100}
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                    <div className="relative h-[300px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute top-4 left-4 z-1">
                            <span className="text-white text-center text-sm bg-green-500 rounded p-1">Ưu đãi hấp dẫn</span>
                            <h2 className="font-semibold text-2xl mb-3 mt-3">
                                Apple Smart <br /> Watch Pro
                            </h2>
                            <div className="text-green-500 font-light mb-3">
                                6.990.000 ₫ <span className="line-through text-gray-500 text-sm">7.990.000 ₫</span>
                            </div>
                            <Button className="cursor-pointer">
                                Mua Ngay <ArrowRight />
                            </Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/banner-4.jpg"
                            alt="Banner"
                            fill
                            quality={100}
                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                    <div className="relative h-[300px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute inset-0 flex flex-col items-center justify-end z-10 text-center mb-8">
                            <span className="text-white text-sm bg-black p-1 rounded">Hàng mới về</span>
                            <h2 className="font-semibold text-2xl mb-3 mt-3">
                                Máy ảnh lấy liền <br /> Fujifilm
                            </h2>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/banner-5.jpg"
                            alt="Banner"
                            fill
                            quality={100}
                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>
                {/* End Banner */}

                {/* Start menu category */}
                <div className="w-full mt-[100px] flex">
                    <div className="w-4/10">
                        <p className="text-red-500">DANH MỤC HÀNG ĐẦU</p>
                        <h2 className="text-3xl font-semibold mb-4">Danh Mục Phổ Biến</h2>
                        <p className="text-gray-500 font-light text-sm mb-8">
                            Electronics stores are renowned for being the first to <br /> showcase new gadgets and devices.
                        </p>
                        <Link href={'/product-list'}>
                            <Button className="bg-red-500 text-white hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
                                Khám Phá Ngay <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                    <div className="w-6/10">
                        <div className="menu_category_list grid grid-cols-4 grid-rows-2 gap-6">
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Laptop color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Máy Tính</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        8 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Mouse color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">
                                        Chuột máy tính
                                    </p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        3 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Keyboard color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Bàn phím</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        5 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Monitor color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Màn hình</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        7 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Headphones color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Tai nghe</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        5 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Gamepad2 color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">
                                        Bộ điều khiển
                                    </p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        8 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <Camera color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Máy ảnh</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        4 sản phẩm
                                    </p>
                                </div>
                            </Link>
                            <Link href={'/product-list'} className="menu_category_item border border-red-500 rounded p-4 text-center cursor-pointer group transition-all duration-300 relative hover:bg-red-500">
                                <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                                <div className="relative z-10 transition-all duration-300 group-hover:text-white">
                                    <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:text-red-500 group-hover:bg-white">
                                        <PlugZap color="currentColor" strokeWidth={1} />
                                    </div>
                                    <p className="text-sm group-hover:text-white transition-all duration-200">Dây sạc</p>
                                    <p className="text-gray-500 text-sm group-hover:text-white transition-all duration-200">
                                        8 sản phẩm
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* End menu category */}

                {/* Start banner two */}
                <div className="grid grid-cols-10 gap-5 mt-[100px]">
                    <div className="col-span-6 rounded overflow-hidden">
                        <div className="relative h-[350px] overflow-hidden rounded-sm group">
                            {/* Nội dung trên ảnh */}
                            <div className="about_menu_secondary absolute top-8 left-8 z-1">
                                <span className="text-white text-sm bg-red-500 rounded p-1">Khuyến mãi lên đến 60%</span>
                                <h2 className="font-semibold text-3xl mb-6 mt-6 text-white">
                                    Sản phẩm công <br /> nghệ đa dạng
                                </h2>
                                <div className="text-white mb-4">
                                    26.000.000 ₫{' '}
                                    <span className="text-gray-500 text-sm font-light line-through">30.000.000 ₫</span>
                                </div>
                                <Button className="bg-yellow-300 cursor-pointer hover:bg-red-500 text-black hover:text-white transition-all duration-300">
                                    Mua Ngay <ArrowRight />
                                </Button>
                            </div>

                            {/* Ảnh với hiệu ứng zoom */}
                            <Image
                                src="/images/banner-6.jpg"
                                alt="Banner"
                                fill
                                quality={100}
                                className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                                priority
                            />
                        </div>
                    </div>

                    <div className="col-span-4 rounded overflow-hidden">
                        <div className="relative h-[350px] overflow-hidden rounded-sm group">
                            {/* Nội dung trên ảnh */}
                            <div className="about_menu_secondary absolute inset-0 flex flex-col items-center justify-center z-10 text-center mb-8">
                                <h2 className="font-semibold text-2xl mb-3 mt-3">Tai nghe thịnh hành</h2>
                                <Button className="cursor-pointer">
                                    Mua Ngay <ArrowRight />
                                </Button>
                            </div>

                            {/* Ảnh với hiệu ứng zoom */}
                            <Image
                                src="/images/banner-7.jpeg"
                                alt="Banner"
                                fill
                                quality={100}
                                className="object-cover object-end transition-transform duration-500 group-hover:scale-110"
                                priority
                            />
                        </div>
                    </div>
                </div>
                {/* End banner two */}

                {/* Start featured products */}
                <div className="featured_products mt-[100px]">
                    <div className="header_featured_products">
                        <div className="">
                            <p className="text-red-500">KHUYẾN MÃI LỚN</p>
                            <h2 className="font-semibold text-3xl">Sản Phẩm Nổi Bật</h2>
                        </div>
                        {/* List items */}
                        <div className="featured_products_list grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-[50px]">
                            {products.map((product) => (
                                <div key={product.id} className="featured_products_item group rounded border overflow-hidden">
                                    {/* Img item */}
                                    <div className="featured_products_img relative w-full h-[200px] overflow-hidden">
                                        {/* <div className="featured_products_sale absolute top-4 left-4 bg-red-500 text-white font-light z-10 text-sm p-1 rounded">
                                            -{product.discount}%
                                        </div> */}
                                        
                                        <Image
                                            src={product.product_image}
                                            alt={product.name}
                                            fill
                                            quality={100}
                                            loading="lazy"
                                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                                        />

                                        <div className="featured_products_btns absolute top-4 -right-10 group-hover:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
                                            <Button
                                                onClick={() => handleModalOpen('Cart', product)}
                                                className="cursor-pointer bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-500"
                                            >
                                                <ShoppingCart />
                                            </Button>
                                            <Button
                                                onClick={() => handleModalOpen('View', product)}
                                                className="cursor-pointer bg-white text-black hover:bg-black hover:text-white transition-all duration-500"
                                            >
                                                <Eye />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Content item */}
                                    <Link href={`/product-detail?id=${product.id}`}>
                                        <div className="p-4">
                                            <div className="featured_products_category mb-2 text-gray-500 text-sm">
                                                {product.category_name}
                                            </div>
                                            <div className="featured_products_name h-[50px] text-sm">
                                                {product.name}
                                            </div>
                                            <div className="featured_products_rate flex items-center my-2 text-yellow-300">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={16}
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        className="mr-1"
                                                    />
                                                ))}
                                            </div>
                                            <div className="featured_products_quantity text-sm mb-2">
                                                Có sẵn: <span className="text-red-500">{product.stock_quantity}/100</span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-1 mb-4">
                                                <div
                                                    className="bg-red-500 h-1 transition-all duration-500"
                                                    style={{ width: `${product.processWidth}%` }}
                                                ></div>
                                            </div>
                                            <div className="featured_products_price flex gap-2">
                                                <div className="new_price text-red-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</div>
                                                {/* <div className="old_price text-gray-500 text-sm line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}</div> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="btn w-full text-center mt-5">
                            <Link href={`/product-list`}>
                                <Button className="cursor-pointer mt-[50px] bg-red-500 border border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300">
                                    Xem Thêm <ArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* End featured products */}

                {/* Start banner three */}
                <div className="banner_three group mt-[100px] h-[200px] relative overflow-hidden rounded bg-yellow-300 text-white flex items-center justify-center">
                    <Image
                        src="/images/earphone-2-1-1.png"
                        alt="tai nghe"
                        width={300}
                        height={100}
                        quality={100}
                        className="absolute bottom-0 left-[100px] transition-transform duration-500 group-hover:scale-110"
                    ></Image>
                    <p className="font-semibold text-3xl mx-[100px]">
                        Super Friendly <br /> Electronics Store
                    </p>
                    <Button className="cursor-pointer">
                        Mua Ngay <ArrowRight />
                    </Button>
                    <Image
                        src="/images/watch-1.png"
                        alt="dong ho"
                        width={150}
                        height={150}
                        quality={100}
                        className="absolute top-3 right-[100px] transition-transform duration-500 group-hover:scale-110"
                    ></Image>
                </div>
                {/* End banner three */}

                {/* Start brands */}
                <div className="brand_list grid grid-cols-5 grid-rows-2 gap-6 mt-[100px]">
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-1.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-2.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-3-1-1.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-4.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-5.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-6.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-7.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-8.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-9.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                    <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                        <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                        <Image src="/images/brand-10.svg" alt='brand' width={150} height={80}></Image>
                    </div>
                </div>
                <div className="w-full h-[200px] mt-5 relative overflow-hidden">
                    <Image src="/images/fake1.png" alt="" fill className="absolute " quality={100}></Image>
                </div>
                {/* End brands */}

                {/* Gọi Modal */}
                <Modal isOpen={isModalOpen} onClose={handleModalClose} content={modalContent} product={selectedProduct} />
                {/* End modal */}
            </div>
            {/* Start contact */}
            <div className="contact mt-[100px] relative w-full h-[400px] flex items-center justify-center gap-5 overflow-hidden bg-[#f3f4f8]">
                <Image src="/images/drone.png" width={700} height={600} quality={100} className='object-cover' alt='cotact' />
                <div className="info_contact">
                    <h2 className='font-[500] text-4xl mb-4'>Nhận Mọi Cập Nhật</h2>
                    <p className='text-gray-500 text-sm mb-4'>Become a premium member and get 20% off your <br /> next purchase!</p>
                    <form action="" className='w-full'>
                        <div className="flex gap-3 border border-black mb-4 flex items-center">
                            <Mail color='currentColor' strokeWidth={1} className='ml-4' />
                            <input type="text" placeholder='Enter your email' className='w-full p-3 outline-none' />
                        </div>
                        <Button className='bg-red-500 text-white cursor-pointer hover:bg-black'>Đăng Ký <ArrowRight /></Button>
                    </form>
                </div>
            </div>
            {/* End contact */}
        </div>
    );
}
