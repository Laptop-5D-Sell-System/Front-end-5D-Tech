import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    name: string;
    category_name: string;
    price: number;
    stock_quantity: number;
    description: string;
    product_image: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: "Cart" | "View";
    product?: Product | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { fetchCart } = useCart();
    const descriptionProduct = product?.description.split(". ").filter(item => item);
    const router = useRouter();

    const handleIncrease = () => {
        if(product && quantity < product.stock_quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleAddToCart = async () => {
        if (!product) return;
    
        try {
            const token = localStorage.getItem("token"); // lấy token nếu cần xác thực
            if (token) {
                const decoded = jwt.decode(token) as { exp: number };
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    console.error("Token has expired");
                    toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    router.push("/login");
                    return;
                }
            }
    
            const response = await fetch("https://localhost:44303/cart/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity,
                }),
            });
    
            const data = await response.json();
            console.log("Response data:", data);
            
            if (data.HttpStatus === 201) {
                toast.success("Đã thêm vào giỏ hàng", {
                    closeButton: true,
                });

                fetchCart(); 

                onClose();
            } else {
                console.error("Thêm giỏ hàng thất bại:", data);
                toast.error(data.message || "Không thể thêm sản phẩm vào giỏ hàng");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            toast.error("Lỗi kết nối đến server");
        }
    };
    

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
            {/* Nền mờ */}
            <div 
                className={`fixed inset-0 bg-gray-800/50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} 
                aria-hidden="true"
            ></div>
            {/* Nội dung Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel 
                    className={`bg-white w-[800px] px-6 pt-3 pb-6 rounded shadow-lg relative transition-transform duration-500 ${
                        isOpen ? "translate-y-0" : "-translate-y-10"
                    }`}
                >
                    <Dialog.Title className="text-xl font-[500] mb-4 flex justify-between items-center">
                        {content === "Cart" ? "Thêm vào giỏ hàng" : "Xem chi tiết sản phẩm"}
                        <button onClick={onClose} className="rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent border border-black hover:bg-black hover:text-white hover:rotate-180 text-md transition-all duration-300">&times;</button>
                    </Dialog.Title>
                    <div>
                        {product && (
                            <div className="flex justify-between">
                                <Image src={'/images/laptop.jpeg'} alt={product.name} width={320} height={150} quality={100} className="object-cover w-[320px] h-[150px]" />
                                <div className="ml-4">
                                    <span className="text-2xl text-red-500 font-[500] mb-2">{product.name}</span>
                                    <div className="featured_products_price flex gap-2 mb-2">
                                        <div className="new_price text-red-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</div>
                                        {/* <div className="old_price text-gray-500 text-sm line-through">{product.oldPrice} ₫</div> */}
                                    </div>
                                    {/* <span className="text-gray-500 text-sm w-90 mb-2">{product.description}</span> */}
                                    {/* <ul>
                                        <li className="text-gray-500 text-sm">Thông tin sản phẩm:</li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">CPU: <span className="text-red-500">{product.cpu}</span></li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">RAM: <span className="text-red-500">{product.ram}</span></li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">Storage: <span className="text-red-500">{product.storage}</span></li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">Screen: <span className="text-red-500">{product.screen}</span></li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">GPU: <span className="text-red-500">{product.gpu}</span></li>
                                        <li className="text-gray-500 text-sm list-disc ml-4">Battery: <span className="text-red-500">{product.battery}</span></li>
                                    </ul> */}
                                    <p className="text-md w-90 mb-2">Thông tin sản phẩm:</p>
                                    <ul>
                                        {descriptionProduct?.map((item, index) => (
                                            <li className="text-gray-500 text-sm list-disc ml-4" key={index}>{item}</li>
                                        ))}
                                    </ul>

                                    {/* Chỉnh số lượng */}
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 mb-2">
                                            Có sẵn: <span className="text-red-500">{product.stock_quantity}</span>
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-500 text-sm">
                                                Số lượng:
                                            </span>
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
                                    <Link href={`/product-detail?id=${product.id}`}>
                                        <Button className="hover:bg-red-500 rounded text-white mt-4 w-full transition-all duration-300 cursor-pointer">Xem chi tiết sản phẩm</Button>
                                    </Link>
                                    <div className="flex gap-2 mt-2 w-full">
                                        <Button onClick={handleAddToCart} variant="outline" className="flex-1 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
                                            <ShoppingCart size={16} className="mr-2" />
                                            Thêm vào giỏ
                                        </Button>
                                        <Button className="flex-1 rounded bg-red-500 text-white transition-all duration-300 cursor-pointer hover:bg-black">
                                            <ShoppingBasket size={16} className="mr-2" />
                                            Mua hàng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default Modal;
