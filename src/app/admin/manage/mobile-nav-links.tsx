"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only"></span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
            <Link
              href='#'
              className={`group flex items-center shrink-0 justify-center rounded-full gap-3 px-4 py-2 transition-all`}
              
            >
                <Package2 className="h-5 w-5" />
                <span className="sr-only">Acme inc</span>
            </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}