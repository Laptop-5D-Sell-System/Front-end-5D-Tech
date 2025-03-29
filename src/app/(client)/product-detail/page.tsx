'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ShoppingBasket, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from "@/context/CartContext";

interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    oldPrice: number;
    discount: number;
    available: number;
    quantity: number;
    cpu?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    gpu?: string;
    battery?: string;
    os?: string;
    description: string;
    image: string;
}

export default function ProductDetailPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (!productId) {
            router.push('/');
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                console.log(data);
                const foundProduct = data.find((p: Product) => p.id === parseInt(productId, 10));
                if (!foundProduct) {
                    console.error('Không tìm thấy sản phẩm');
                    router.push('/'); // Nếu không tìm thấy sản phẩm, chuyển hướng về trang chủ
                } else {
                    setProduct(foundProduct);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, router]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (!product) {
        return <p>Không tìm thấy sản phẩm</p>;
    }

    const handleIncrease = () => {
        if (product && quantity < product.available) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image,
            });
            toast.success('Đã thêm vào giỏ hàng', {
                closeButton: true,
            });
        }
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
                    src={product.image}
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
                        <div className="old_price text-gray-500 text-sm line-through">{product.oldPrice} ₫</div>
                    </div>
                    <p className="text-gray-500 text-sm w-90 mb-2">{product.description}</p>
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
                    </ul>

                    {/* Chỉnh số lượng */}
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">
                            Có sẵn: <span className="text-red-500">{product.available}</span>
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
        </div>
    );
}
