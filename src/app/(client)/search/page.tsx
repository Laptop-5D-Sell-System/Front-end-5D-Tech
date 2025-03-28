'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import axios from 'axios';

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
    description: string;
    image: string;
}

export default function Search() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Gọi API tìm kiếm
                const response = await axios.get(`http://localhost:8080/search/${query}`);
                setProducts(response.data?.pros || []); 
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]); // Gọi lại khi `query` thay đổi

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

    return (
        <div className="pt-5">
            <div className="px-[100px]">
                <div className="">Kết quả tìm kiếm cho: {query}</div>
                {loading ? (
                    <p>Đang tải...</p>
                ) : products.length > 0 ? (
                    <div className="featured_products_list grid grid-cols-4 gap-5 mt-[50px]">
                        {products.map((product) => (
                            <div key={product.id} className="featured_products_item group rounded border overflow-hidden">
                                {/* Img item */}
                                <div className="featured_products_img relative w-full h-[200px] overflow-hidden">
                                    <div className="featured_products_sale absolute top-4 left-4 bg-red-500 text-white font-light z-10 text-sm p-1 rounded">
                                        -{product.discount}%
                                    </div>

                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        quality={100}
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
                                <div className="p-4">
                                    <div className="featured_products_category mb-2 text-gray-500 text-sm">
                                        {product.category}
                                    </div>
                                    <div className="featured_products_name h-[50px] text-sm">{product.name}</div>
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
                                        Có sẵn:{' '}
                                        <span className="text-red-500">
                                            {product.available}/{product.quantity}
                                        </span>
                                    </div>
                                    <div className="featured_products_price flex gap-2">
                                        <div className="new_price text-red-500">{product.price} ₫</div>
                                        <div className="old_price text-gray-500 text-sm line-through">
                                            {product.oldPrice} ₫
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không tìm thấy kết quả</p>
                )}
            </div>
            {/* Gọi Modal */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} content={modalContent} product={selectedProduct} />
            {/* End modal */}
        </div>
    );
}