"use client";

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent
  } from "@/components/ui/menubar"

  

export default function AdminDashBoard() {


  return (
      <Menubar>
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