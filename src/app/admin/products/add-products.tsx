'use client'


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useState } from "react"

export function AddProduct() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock_quantity, setStock_Quantity] = useState("")
  const [picture, setPicture] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    if(!name || !price || !stock ||!description ) {
      setMessage("Vui lòng điền đầy đủ thông tin")
      return
    }

   
    setLoading(true)

    try {
      const respone = await fetch("http://localhost:4000/Products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now().toString(), name: name, description, price, stock}),
      })
      if(respone.ok) {
        setMessage("Thêm sản phẩm thành công")

        setName("")
        setDescription("")
        setPrice("")
        setStock_Quantity("")
        setTimeout(() => {
          setOpen(false)
          window.location.reload()
        }, 1000)
        
      } else {
        setMessage("Có lỗi xảy ra")
      }
    } catch (error) {
      console.error("Error adding user:", error)
      setMessage("Có lỗi xảy ra")
    }

    setLoading(false)

  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm sản phẩm</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Thêm Thông Tin Sản Phẩm</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full max-w-sm items-center gap-1.5">
            
            <Avatar>
      <AvatarImage src="https://example.com/images/laptop-dell-xps13.jpg" alt="@shadcn" className="w-30"/>
      <AvatarFallback className=" bg-gray-500">Ảnh Sản Phẩm</AvatarFallback>

    </Avatar>
        
      <Label htmlFor="picture"></Label>
      <Input id="picture" type="file" />
    </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô Tả
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Giá
            </Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock_quantity" className="text-right">
              Số lượng còn lại
            </Label>
            <Input
              id="stock_quantity"
              value={stock_quantity} 
              onChange={(e) => setStock_Quantity(e.target.value)}
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? " Đang Thêm..." : "Thêm" }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

