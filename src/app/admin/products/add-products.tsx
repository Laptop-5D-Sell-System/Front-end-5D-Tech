'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
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
  const [category_id, setCategory_id] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [product_image, setProduct_image] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name || !price || !stock_quantity || !description || !product_image) {
      setMessage("Vui lòng điền đầy đủ thông tin và chọn ảnh sản phẩm");
      return;
    }
    console.log(message)

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock_quantity", stock_quantity);
    formData.append("category_id", category_id);
    formData.append("product_image", product_image);

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Thêm sản phẩm thành công");
        setName("");
        setDescription("");
        setPrice("");
        setStock_Quantity("");
        setProduct_image(null);

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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/get-all-categories`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
  
    fetchCategories();
  }, []);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl px-6 py-2 text-base font-medium">
          Thêm sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Thêm Thông Tin Sản Phẩm</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Vui lòng điền đầy đủ thông tin bên dưới để tạo sản phẩm mới.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex flex-col items-center gap-2 w-full sm:w-[40%]">
            <Avatar className="w-32 h-32 rounded-xl overflow-hidden border">
              <AvatarImage
                src={product_image ? URL.createObjectURL(product_image) : ""}
                alt="Ảnh sản phẩm"
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="bg-gray-300 text-sm flex items-center justify-center">
                Ảnh Sản Phẩm
              </AvatarFallback>
            </Avatar>

            <Input
              id="picture"
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setProduct_image(file);
              }}
              className="mt-2 w-full"
            />
          </div>

          <div className="grid gap-4 w-full sm:w-[60%]">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Giá</Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock_quantity">Tồn kho</Label>
                <Input
                  id="stock_quantity"
                  value={stock_quantity}
                  onChange={(e) => setStock_Quantity(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
  <Label htmlFor="category_id">Danh mục</Label>
  <Select onValueChange={(value) => setCategory_id(value)} value={category_id}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Chọn danh mục" />
    </SelectTrigger>
    <SelectContent>
      {categories.map((cat) => (
        <SelectItem key={cat.id} value={String(cat.id)}>
          {cat.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base"
          >
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}