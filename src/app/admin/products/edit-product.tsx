'use client';

import * as React from 'react';
import { useEditProductForm } from './use-edit-product';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Định nghĩa props cho component
interface EditProductProps {
  id?: string;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}

export default function EditProduct({ id, setId, onSubmitSuccess }: EditProductProps) {
  // Gọi hook để lấy tất cả logic, state và các hàm xử lý
  const {
    form,
    isLoading,
    categories,
    previewImage,
    avatarInputRef,
    handleFormSubmit,
    setFile
  } = useEditProductForm({ id, onClose: () => setId(undefined), onSubmitSuccess });
  
  return (
    <Dialog open={!!id} onOpenChange={(open) => !open && setId(undefined)}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
          <DialogDescription>Điền đầy đủ các trường để cập nhật sản phẩm.</DialogDescription>
        </DialogHeader>

        {/* Component Form từ shadcn/ui tích hợp với react-hook-form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto pr-4">
            
            <FormField
              name="product_image"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Ảnh sản phẩm</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={previewImage} className="object-cover"/>
                      <AvatarFallback>{form.watch('name')?.charAt(0) || 'P'}</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarInputRef}
                      onChange={(e) => setFile(e.target.files?.[0])}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => avatarInputRef.current?.click()}>
                      Thay đổi ảnh
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl><Input placeholder="Ví dụ: Macbook Pro M4" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl><Input placeholder="Mô tả chi tiết sản phẩm..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="stock_quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng tồn kho</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="category_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="-- Chọn danh mục --" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}