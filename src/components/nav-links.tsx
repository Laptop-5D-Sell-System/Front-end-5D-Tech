"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "@radix-ui/react-tooltip";
import menuItems from "@/app/admin/menu-items";



export default function NavLinks() {
  const pathname = usePathname();

  return (
    <TooltipProvider>

    <aside className='fixed inset-y-0 left-0 2-10 max-w-24 flex-col border-r bg-background sm:flex hidden sm:block'>
    <nav className="fixed  top-0 h-full max-w-24 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6 ">
        <Link
          href="#"
          className={cn(
            "grid items-center gap-3 px-4 py-2 rounded-md transition-all w-full",
           
          )}
        >
            {/* <Package2 className="h-5 w-5" /> */}
            <span className="">5D-Tech</span>
        </Link>
        {menuItems.map((Item, index) => {
        const isActive = pathname === Item.href;

            return (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <Link
                            key={index}
                            href={Item.href}
                            className={cn(
                                "flex items-center justify-center h-9 w-9 rounded-lg transition-colors hover:text-foreground",
                                {
                                "bg-accent text-accent-foreground": isActive,
                                "text-muted-foreground": !isActive
                                }
                            )}
                            >
                                <Item.Ion className="h-5 w-5" />
                                <span className="sr-only">{Item.title}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side='right'>{Item.title}</TooltipContent>
                </Tooltip>
                
            );
        })}
    </nav>
    </aside>
    </TooltipProvider>
  );
}