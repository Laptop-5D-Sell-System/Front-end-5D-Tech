import { Home, LineChart, ShoppingCart, User2, Salad, Settings } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    Ion: Home, 
    href: "/admin/dashboard"
  },
  {
    title: "Orders",
    Ion: ShoppingCart,
    href: "/admin/orders"
  },
  {
    title: "Products",
    Ion: Salad,
    href: "/admin/products"
  },
  {
    title: "accounts",
    Ion: User2,
    href: "/admin/accounts"
  },
  {
    title: "Analytics",
    Ion: LineChart,
    href: "/admin/analytics"
  },
  {
    title: "Settings",
    Ion: Settings,
    href: "/admin/settings"
  }
];

export default menuItems;