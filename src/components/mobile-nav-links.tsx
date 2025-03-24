'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft, Package2, AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';
import menuItems from '@/app/admin/menu-items';
import { cn } from '@/lib/utils';

export default function MobileNavLinks() {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">

                    <AlignJustify className="h-5 w-5" />
                    <span className="sr-only"></span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-4">
                <nav className="grid gap-4 text-lg font-medium">
                    <Link
                        href="#"
                        className="group flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                        <Package2 className="h-5 w-5" />
                        <span className="sr-only">Acme inc</span>
                    </Link>

                    {menuItems.map((Item, index) => {
                        const isActive = pathname === Item.href;

                        return (
                            <Link
                                key={index}
                                href={Item.href}
                                className={cn('flex items-center gap-3 px-4 py-2 rounded-lg transition-all', {
                                    'bg-accent text-accent-foreground': isActive,
                                    'text-muted-foreground hover:bg-muted hover:text-foreground': !isActive,
                                })}
                            >
                                <Item.Ion className="h-5 w-5" />
                                <span>{Item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
