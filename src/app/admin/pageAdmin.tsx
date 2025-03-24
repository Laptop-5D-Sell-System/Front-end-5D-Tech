import { MenubarContent, MenubarMenu, MenubarTrigger, Menubar } from "@radix-ui/react-menubar";
import AdminLayOut from "./layout";

export default function AdminMagane() {


    return (
        <Menubar>
        <AdminLayOut/>
            <MenubarMenu>
                <MenubarTrigger>Sản Phẩm</MenubarTrigger>
                <MenubarContent>     
                      
                  </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Đơn Hàng</MenubarTrigger>
                
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Quản Lý</MenubarTrigger>
                
            </MenubarMenu>
        </Menubar>
    );
  }