"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    product_image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    fetchCart: () => void;
    addToCart: (item: CartItem, quantity: number) => void;
    removeFromCart: (id: number) => void;
    updateCartItemQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const fetchCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("https://localhost:44303/cart/get-my-cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                setCart(data.data || []);
            } else {
                console.error("Lỗi khi lấy giỏ hàng:", data.message);
            }
        } catch (error) {
            console.error("Lỗi fetch giỏ hàng:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (item: CartItem, quantity: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("https://localhost:44303/cart/create", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: item.id,
                    quantity,
                }),
            });

            const data = await response.json();
            if (response.ok && data.httpStatus === 200) {
                fetchCart();
            } else {
                console.error("Thêm vào giỏ hàng thất bại:", data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    const removeFromCart = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`https://localhost:44303/cart/delete?id=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setCart((prevCart) => prevCart.filter((item) => item.id !== id));
            } else {
                const data = await response.json();
                console.error("Xoá sản phẩm thất bại:", data.message);
            }
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm:", error);
        }
    };

    const updateCartItemQuantity = async (id: number, quantity: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`https://localhost:44303/cart/update?id=${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: Math.max(1, quantity),
                }),
            });

            if (response.ok) {
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    )
                );
            } else {
                const data = await response.json();
                console.error("Cập nhật thất bại:", data.message);
            }
        } catch (error) {
            console.error("Lỗi cập nhật giỏ hàng:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải được dùng bên trong CartProvider");
    }
    return context;
};
