import { useState, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upProductBody, UpdateProductBodyType } from '@/schemaValidations/product.schema';

import envConfig from '../../../../config';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditProduct({
    id,
    setId,
    onSubmitSuccess,
}: {
    id?: string;
    setId: (value: string) => void;
    onSubmitSuccess?: () => void;
}) {
    const [file, setFile] = useState<File>();
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [initialCategory, setInitialCategory] = useState<string>(''); 
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<UpdateProductBodyType>({
        resolver: zodResolver(upProductBody),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock_quantity: 0,
            category_id: '',
            product_image: '',
        },
    });

    const { handleSubmit, setValue, watch, reset } = form;
    const name = watch('name');
    const productImage = watch('product_image');

    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : typeof productImage === 'string' ? productImage : '';
    }, [file, productImage]);

    const handleFormSubmit = async (data: UpdateProductBodyType) => {
      setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', String(data.price));
            formData.append('stock_quantity', String(data.stock_quantity));
            const categoryId = data.category_id || initialCategory; 
            formData.append('category_id', categoryId);

            if (!file) {
                formData.append('product_image', data.product_image);
            } else {
                formData.append('product_image', file);
            }

            await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/update?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            setFile(undefined);
            onSubmitSuccess?.();
            setId('');
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        } finally {
          setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/detail?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const product = await res.json();
                reset({
                    name: product.product.name,
                    description: product.product.description,
                    price: Number(product.product.price),
                    stock_quantity: Number(product.product.stock_quantity),
                    category_id: product.product.category_id,
                    product_image: product.product.product_image,
                });
                setInitialCategory(product.product.category_id);
            } catch (err) {
                console.error('Lỗi khi lấy sản phẩm:', err);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/get-all-categories`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const result = await res.json();

                if (!res.ok) throw new Error(result.message || 'Lỗi khi lấy danh mục');

                setCategories(Array.isArray(result) ? result : []);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách danh mục:', err);
                setCategories([]);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id, reset]);

    return (
        <Dialog open={!!id} onOpenChange={(open) => !open && setId('')}>
            <DialogContent className="sm:max-w-[625px]">
                <AlertDialogHeader>
                    <DialogTitle>Cập nhật sản phẩm</DialogTitle>

                    <DialogDescription>Điền đầy đủ các trường để cập nhật sản phẩm</DialogDescription>
                </AlertDialogHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        <FormField
                            name="product_image"
                            control={form.control}
                            render={() => (
                                <FormItem className="flex items-center space-x-4">
                                    <div className="relative w-32 h-32">
                                        <Avatar className="w-32 h-32 rounded-full border-4 border-blue-500">
                                            <AvatarImage src={previewImage} />
                                            <AvatarFallback>{name || 'Ảnh'}</AvatarFallback>
                                        </Avatar>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={avatarInputRef}
                                            onChange={(e) => {
                                                const selectedFile = e.target.files?.[0];
                                                if (selectedFile) {
                                                    setFile(selectedFile); // Lưu file vào state
                                                    setValue('product_image', selectedFile.name); // Cập nhật giá trị form
                                                }
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={() => avatarInputRef.current?.click()}
                                    >
                                        Tải ảnh
                                    </Button>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-4">
                                    <Label className="w-32 text-white">Tên sản phẩm</Label>
                                    <Input {...field} placeholder="Tên sản phẩm" className="w-full" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-4">
                                    <Label className="w-32 text-white">Mô tả</Label>
                                    <Input {...field} placeholder="Mô tả sản phẩm" className="w-full" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-4">
                                    <Label className="w-32 text-white">Giá</Label>
                                    <Input
                                        {...field}
                                        type="number"
                                        value={field.value ?? ''}
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value);
                                            field.onChange(isNaN(value) ? '' : value); // Kiểm tra nếu không phải số, thì gán là ''
                                        }}
                                        placeholder="Giá sản phẩm"
                                        className="w-full"
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="stock_quantity"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-4">
                                    <Label className="w-32 text-white">Tồn kho</Label>
                                    <Input
                                        {...field}
                                        type="number"
                                        value={field.value ?? ''}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            field.onChange(isNaN(value) ? '' : value); // Kiểm tra nếu không phải số, thì gán là ''
                                        }}
                                        placeholder="Số lượng"
                                        className="w-full"
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="category_id"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-4">
                                    <Label className="w-32 text-white">Danh mục</Label>
                                    <Select
                                        value={field.value || initialCategory}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-white">
                                            <SelectValue placeholder="-- Chọn danh mục --" className="text-white" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>

                        
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
