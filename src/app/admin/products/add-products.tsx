'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import envConfig from "../../../../config";

export function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStock_Quantity] = useState("");
  const [picture, setPicture] = useState<File | null>(null); // Handle file input for picture
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name || !price || !stock_quantity || !description || !picture) {
      setMessage("Vui lòng điền đầy đủ thông tin và chọn ảnh sản phẩm");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock_quantity", stock_quantity);
    formData.append("picture", picture);

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Thêm sản phẩm thành công");
        setName("");
        setDescription("");
        setPrice("");
        setStock_Quantity("");
        setPicture(null);

        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 1000);
      } else {
        setMessage("Có lỗi xảy ra khi thêm sản phẩm");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Có lỗi xảy ra khi thêm sản phẩm");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm sản phẩm</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Thêm Thông Tin Sản Phẩm</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin về sản phẩm.
          </DialogDescription>
        </DialogHeader>
        
        {/* Avatar Image */}
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Avatar>
            <AvatarImage
              src={picture ? URL.createObjectURL(picture) : "https://example.com/default-product-image.jpg"}
              alt="Ảnh sản phẩm"
              className="w-30"
            />
            <AvatarFallback className="bg-gray-500">Ảnh Sản Phẩm</AvatarFallback>
          </Avatar>
          
          <div className="w-full">
            <Label htmlFor="picture">Chọn ảnh sản phẩm</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setPicture(file);
              }}
            />
          </div>
        </div>

        {/* Product Info Form */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="col-span-3"
            />
          </div>
        </div>

        {/* Message */}
        {message && <p className="text-red-500">{message}</p>}

        {/* Footer */}
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
