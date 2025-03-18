import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import { ThemeProvider } from "../../components/ui/theme-provider";
import { ModeToggle } from "./manage/mode";

export default function AdminLayOut() {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <div className="flex w-full justify-between items-center">
                <div className="grid grid-cols-4 gap-4 w-full">
                    <a href="/admin/manage/products">Sản Phẩm</a>
                    <a href="/admin/manage/products">Sản Phẩm</a>
                    <a href="/admin/manage/products">Sản Phẩm</a>
                    <a href="/admin/manage/products">Sản Phẩm</a>
                </div>

                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >      
                    <ModeToggle />
                    </ThemeProvider>
                </div>
               
            </body>
        </html>
    );
}