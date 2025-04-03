'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import { Eye, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    category_id: string;
    price: number;
    stock_quantity: number;
    description: string;
    product_image: string;
    processWidth?: number;
}
export default function ProductListlPage() {
    const [products, setProducts] = useState<Product[]>([]);

    // Filter products
    const [filterCategory, setFilterCategory] = useState<string | null>(null);
    // const [filterBrand, setFilterBrand] = useState<string | null>(null);
    const [filterPrice, setFilterPrice] = useState<number | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Display dialog
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'Cart' | 'View'>('Cart');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Handle open modal
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
    const filteredProducts = products.filter((product) => {
        const matchesCategory = filterCategory ? product.category_id === filterCategory : true;
        // const matchesBrand = filterBrand ? product.brand === filterBrand : true;
        const matchesPrice = filterPrice ? product.price <= filterPrice : true;

        // return matchesCategory && matchesBrand && matchesPrice;
        return matchesCategory && matchesPrice;
    });

    // Handle pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:44303/product/all-products?sortOrder=null');
                const fetchedProducts: Product[] = response.data.products;

                // Cập nhật processWidth dựa trên available và quantity
                const updatedProducts = fetchedProducts.map((product) => {
                    const percent = product.stock_quantity > 0 ? (product.stock_quantity / 100) * 100 : 0;
                    return { ...product, processWidth: percent };
                });

                setProducts(updatedProducts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);
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
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex">
                {/* Bộ lọc */}
                <div className="w-[300px] h-full p-4 border-r">
                    <h2 className="text-lg font-[500] mb-4">Tìm kiếm theo: </h2>

                    {/* Lọc theo category */}
                    <div className="mb-4">
                        <h3 className="text-md font-semibold text-red-500 mb-2">Danh mục</h3>
                        <ul>
                            {Array.from(new Set(products.map((product) => product.category_id))).map((category) => (
                                <li key={category}>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            onChange={() => setFilterCategory(category)}
                                            checked={filterCategory === category}
                                            className="mr-2"
                                        />
                                        {category}
                                    </label>
                                </li>
                            ))}
                            <li>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="category"
                                        value=""
                                        onChange={() => setFilterCategory(null)}
                                        checked={filterCategory === null}
                                        className="mr-2"
                                    />
                                    Tất cả
                                </label>
                            </li>
                        </ul>
                    </div>

                    {/* Lọc theo brand */}
                    {/* <div className="mb-4">
                        <h3 className="text-md font-semibold text-red-500 mb-2">Thương hiệu</h3>
                        <ul>
                            {Array.from(new Set(products.map((product) => product.brand))).map((brand) => (
                                <li key={brand}>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="brand"
                                            value={brand}
                                            onChange={() => setFilterBrand(brand)}
                                            checked={filterBrand === brand}
                                            className="mr-2"
                                        />
                                        {brand}
                                    </label>
                                </li>
                            ))}
                            <li>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="brand"
                                        value=""
                                        onChange={() => setFilterBrand(null)}
                                        checked={filterBrand === null}
                                        className="mr-2"
                                    />
                                    Tất cả
                                </label>
                            </li>
                        </ul>
                    </div> */}

                    {/* Lọc theo price */}
                    <div className="mb-4">
                        <h3 className="text-md font-semibold text-red-500 mb-2">Giá sản phẩm</h3>
                        <ul>
                            <li>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="price"
                                        value="5000000"
                                        onChange={() => setFilterPrice(5000000)}
                                        checked={filterPrice === 5000000}
                                        className="mr-2"
                                    />
                                    Dưới 5 triệu
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="price"
                                        value="10000000"
                                        onChange={() => setFilterPrice(10000000)}
                                        checked={filterPrice === 10000000}
                                        className="mr-2"
                                    />
                                    Dưới 10 triệu
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="price"
                                        value=""
                                        onChange={() => setFilterPrice(null)}
                                        checked={filterPrice === null}
                                        className="mr-2"
                                    />
                                    Tất cả
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* List items */}
                <div className="featured_products_list grid grid-cols-2 md:grid-cols-3 gap-5 ml-5">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="featured_products_item h-100 group rounded border overflow-hidden"
                        >
                            {/* Img item */}
                            <div className="featured_products_img relative w-[300px] h-[180px] overflow-hidden">
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
                                        {product.category_id}
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
                                            {product.stock_quantity}/100
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-1 mb-4">
                                        <div
                                            className="bg-red-500 h-1 transition-all duration-500"
                                            style={{ width: `${product.processWidth}%` }}
                                        ></div>
                                    </div>
                                    <div className="featured_products_price flex gap-2">
                                        <div className="new_price text-red-500">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(product.price)}
                                        </div>
                                        {/* <div className="old_price text-gray-500 text-sm line-through">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(product.oldPrice)}
                                        </div> */}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pagination */}
            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination>
                    <PaginationContent>
                        {/* Nút Previous */}
                        {currentPage > 1 && (
                            <PaginationItem className='cursor-pointer'>
                                <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                            </PaginationItem>
                        )}

                        {/* Trang đầu tiên */}
                        <PaginationItem className='cursor-pointer'>
                            <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {/* Hiển thị dấu "..." nếu currentPage > 3 */}
                        {currentPage > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Hiển thị trang trước, trang hiện tại, và trang sau */}
                        {[currentPage - 1, currentPage, currentPage + 1]
                            .filter((page) => page > 1 && page < totalPages)
                            .map((page) => (
                                <PaginationItem className='cursor-pointer' key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                        {/* Hiển thị dấu "..." nếu currentPage < totalPages - 2 */}
                        {currentPage < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Trang cuối cùng */}
                        {totalPages > 1 && (
                            <PaginationItem className='cursor-pointer'>
                                <PaginationLink
                                    onClick={() => setCurrentPage(totalPages)}
                                    isActive={currentPage === totalPages}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Nút Next */}
                        {currentPage < totalPages && (
                            <PaginationItem className='cursor-pointer'>
                                <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Gọi Modal */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} content={modalContent} product={selectedProduct} />
            {/* End modal */}
        </div>
    );
}
