'use client'
import { Role } from "@/constants/type";
import { Home, LineChart, ShoppingCart, User2, Salad } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    Ion: Home, 
    href: "/admin/dashboard",
    authApiRequired: true,
    role: [Role.admin]
  },
  {
    title: "Đơn Hàng",
    Ion: ShoppingCart,
    href: "/admin/orders",
    authApiRequired: true,
    role: [Role.admin]
  },
  {
    title: "Sản Phẩm",
    Ion: Salad,
    href: "/admin/products",
    authApiRequired: true,
    role: [Role.admin]

  },
  {
    title: "Tài Khoản",
    Ion: User2,
    href: "/admin/accounts",
    authApiRequired: true,
    role: [Role.admin]

  },
  {
    title: "Danh Mục",
    Ion: LineChart,
    href: "/admin/categories",
    authApiRequired: true,
    role: [Role.admin]

  },
  // {
  //   title: "Cài Đặt",
  //   Ion: Settings,
  //   href: "/admin/settings",
  //   authApiRequired: true,
  //   role: [Role.admin]

  // }
];

export default menuItems;