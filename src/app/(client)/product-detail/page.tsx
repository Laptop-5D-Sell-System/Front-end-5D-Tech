'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useCart } from '@/context/CartContext';
import { ShoppingBasket, ShoppingCart, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import './ProductDetail.scss';
import envConfig from '../../../../config';

interface Product {
    id: number;
    name: string;
    category_name: string;
    price: number;
    stock_quantity: number;
    description: string;
    product_image: string;
}

export default function ProductDetailPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const {fetchCart, addToCart} = useCart();
    const descriptionProduct = product?.description.split('. ').filter((item) => item);

    useEffect(() => {
        if (!productId) {
            router.push('/');
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/detail?id=${productId}`);
                if (!response.ok) throw new Error('Không thể lấy thông tin sản phẩm');
                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                toast.error('Không thể lấy thông tin sản phẩm');
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, router]);


    useEffect(() => {
        if (!productId) return;

        const fetchSimilarProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/similar/${productId}`);
                console.log(response);

                if (!response.ok) throw new Error('Không thể lấy danh sách sản phẩm tương tự');
                const data = await response.json();
                console.log(data);

                setSimilarProducts(data.pros || []);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm tương tự:', error);
            }
        };

        fetchSimilarProducts();
    }, [productId]);

    if (loading) return (
        <div className="w-full h-[200px] flex items-center justify-center">
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            </svg>
        </div>
    );
    if (!product) return <p>Không tìm thấy sản phẩm</p>;
    const handleIncrease = () => {
        if (product && quantity < product.stock_quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (product) {
            try {
                const token = localStorage.getItem('token');
    
                const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cart/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: product.id,
                        quantity: quantity,
                    }),
                });
    
                const data = await response.json();
                if (response.ok && data.HttpStatus === 201) {
                    toast.success('Đã thêm vào giỏ hàng', {
                        closeButton: true,
                    });
                } else {
                    toast.error(data.message || 'Không thể thêm sản phẩm vào giỏ hàng');
                }
            } catch (error) {
                console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
                toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
            }
        }
        fetchCart();
    };
    return (
        <div className="mx-[100px] pt-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/product-list">Sản phẩm</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-8 mt-4">
                <Image
                    src={product.product_image}
                    alt={product.name}
                    width={500}
                    height={250}
                    quality={100}
                    className="object-cover h-full"
                />
                <div className="flex-1">
                    <p className="text-2xl text-red-500 font-[500] mb-2">{product.name}</p>
                    <div className="featured_products_price flex gap-2 mb-2">
                        <div className="new_price text-red-500">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                product.price,
                            )}
                        </div>
                        {/* <div className="old_price text-gray-500 text-sm line-through">{product.oldPrice} ₫</div> */}
                    </div>
                    {/* <p className="text-gray-500 text-sm w-90 mb-2">{product.description}</p>
                    <ul>
                        <li className="text-gray-500 text-sm">Thông tin sản phẩm:</li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            CPU: <span className="text-red-500">{product.cpu}</span>
                        </li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            RAM: <span className="text-red-500">{product.ram}</span>
                        </li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            Storage: <span className="text-red-500">{product.storage}</span>
                        </li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            Screen: <span className="text-red-500">{product.screen}</span>
                        </li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            GPU: <span className="text-red-500">{product.gpu}</span>
                        </li>
                        <li className="text-gray-500 text-sm list-disc ml-4">
                            Battery: <span className="text-red-500">{product.battery}</span>
                        </li>
                    </ul> */}
                    <p className="text-md w-90 mb-2">Thông tin sản phẩm:</p>
                    <ul>
                        {descriptionProduct?.map((item, index) => (
                            <li className="text-gray-500 text-sm list-disc ml-4" key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Chỉnh số lượng */}
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">
                            Có sẵn: <span className="text-red-500">{product.stock_quantity}</span>
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 text-sm">Số lượng:</span>
                            <div className="flex items-center justify-between w-[150px] border">
                                <Button
                                    onClick={handleDecrease}
                                    className="rounded-none hover:bg-red-500 cursor-pointer text-md"
                                >
                                    -
                                </Button>
                                <span className="text-sm">{quantity}</span>
                                <Button
                                    onClick={handleIncrease}
                                    className="rounded-none hover:bg-red-500 cursor-pointer text-md"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Nút thêm vào giỏ hàng */}
                    <div className="flex gap-2 mt-4 w-full">
                        <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            className="flex-1 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            <ShoppingCart size={16} className="mr-2" />
                            Thêm vào giỏ
                        </Button>
                        <Button className="flex-1 rounded text-white transition-all duration-300 cursor-pointer hover:bg-red-500">
                            <ShoppingBasket size={16} className="mr-2" />
                            Mua hàng
                        </Button>
                    </div>
                </div>
            </div>

            {/* 🟢 Slider hiển thị sản phẩm tương tự */}
            <div className="mt-[120px]">
                <div className="text-center text-2xl font-semibold flex justify-center items-center gap-3 mb-4">
                    <div className="w-[50px] h-[2px] bg-black"></div>
                    CÓ THỂ BẠN CŨNG THÍCH
                    <div className="w-[50px] h-[2px] bg-black"></div>
                </div>

                <div className="mt-6">
                    <Swiper 
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    speed={800} // Làm mượt chuyển động
                    effect="coverflow" // Hiệu ứng 3D
                    grabCursor={true} // Con trỏ thay đổi khi rê chuột
                    centeredSlides={true} // Căn giữa slide
                    coverflowEffect={{
                        rotate: 30, // Góc xoay
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }} // Thêm thanh chấm điều hướng
                    modules={[Navigation, Autoplay, EffectCoverflow, Pagination]}
                    className="mySwiper"
                    >
                        {similarProducts.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="border rounded shadow cursor-pointer">
                                    <div className="featured_products_img relative w-full h-[200px] overflow-hidden">
                                        {/* <div className="featured_products_sale absolute top-4 left-4 bg-red-500 text-white font-light z-10 text-sm p-1 rounded">
                                            -{product.discount}%
                                        </div> */}

                                        <Image
                                            src={product.product_image}
                                            alt={item.name}
                                            fill
                                            quality={100}
                                            loading="lazy"
                                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                                        />
                                        
                                    </div>
                                    {/* Content item */}
                                    <Link href={`/product-detail?id=${item.id}`}>
                                        <div className="p-4">
                                            <div className="featured_products_category mb-2 text-gray-500 text-sm">
                                                {item.category_name}
                                            </div>
                                            <div className="featured_products_name h-[50px] text-sm">{item.name}</div>
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
                                                Có sẵn: <span className="text-red-500">{item.stock_quantity}/100</span>
                                            </div>
                                            <div className="featured_products_price flex gap-2">
                                                <div className="new_price text-red-500">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item.price)}
                                                </div>
                                                {/* <div className="old_price text-gray-500 text-sm line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.oldPrice)}</div> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
