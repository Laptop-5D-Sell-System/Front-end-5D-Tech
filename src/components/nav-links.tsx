"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getAccessTokenFromLocalStorage } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "@radix-ui/react-tooltip";
import menuItems from "@/components/menu-items";

export default function NavLinks() {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuth(Boolean(getAccessTokenFromLocalStorage()));
    }
  }, []);

  // Nếu isAuth chưa xác định -> Hiển thị loading
  if (isAuth === null) {
    return <div className="text-center text-gray-500 p-4">Đang kiểm tra...</div>;
  }

  // Nếu chưa đăng nhập -> Chỉ hiển thị "Vui lòng đăng nhập"
  if (!isAuth) {
    return (
      <aside className="fixed inset-y-0 left-0 max-w-24 flex-col border-r bg-background sm:flex hidden sm:block">
        <nav className="fixed top-0 h-full max-w-24 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
          <span className="text-red-500 font-semibold text-sm">Vui lòng đăng nhập</span>
          <Link href="/login">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
              Đăng Nhập
            </button>
          </Link>
        </nav>
      </aside>
    );
  }

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 max-w-24 flex-col border-r bg-background sm:flex hidden sm:block">
        <nav className="fixed top-0 h-full max-w-24 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
          <Link href="#" className="grid items-center gap-3 px-4 py-2 rounded-md transition-all w-full">
            <span className="">5D-Tech</span>
          </Link>

          {menuItems
            .filter((Item) => (Item.authApiRequired ? isAuth : true)) // 🛑 Lọc menu trước khi hiển thị
            .map((Item, index) => {
              const isActive = pathname === Item.href;

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={Item.href}
                      className={cn(
                        "flex items-center justify-center h-9 w-9 rounded-lg transition-colors hover:text-foreground",
                        {
                          "bg-accent text-accent-foreground": isActive,
                          "text-muted-foreground": !isActive,
                        }
                      )}
                    >
                      <Item.Ion className="h-5 w-5" />
                      <span className="sr-only">{Item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{Item.title}</TooltipContent>
                </Tooltip>
              );
            })}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
