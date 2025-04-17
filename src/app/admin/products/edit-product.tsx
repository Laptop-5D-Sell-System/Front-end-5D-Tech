import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { updateProductBody, UpdateProductBodyType } from '@/schemaValidations/product.schema';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

export default function EditProduct({
    id,
    setId,
    onSubmitSuccess,
}: {
    id?: string | undefined;
    setId: (value: string) => void;
    onSubmitSuccess?: () => void;
}) {
    const [file, setFile] = useState<File | undefined>();
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<UpdateProductBodyType>({
        resolver: zodResolver(updateProductBody),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: 0,
            changePrice: false,
        },
    });

    const productImage = form.watch('image');
    const name = form.watch('name');
    const changePrice = form.watch('changePrice');

    const previewImageFromFile = useMemo(() => {
        return file ? URL.createObjectURL(file) : productImage;
    }, [file, productImage]);

    const handleSubmit = (data: UpdateProductBodyType) => {
        console.log(data);
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    return (
        <Dialog
            open={Boolean(id)}
            onOpenChange={(value) => {
                if (!value) {
                    setId('');
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline">Cập nhật Sản phẩm</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật sản phẩm</DialogTitle>
                    <DialogDescription>Các trường tên, mô tả, giá là bắt buộc</DialogDescription>
                </DialogHeader>

                <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
                    <form noValidate className="space-y-6" id="edit-product-form">
                        <div className="space-y-6">
                            
                            {/* Avatar Section (Image Product) */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-start space-x-4">
                                        <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                                            <Avatar className='w-32 h-32'>
                                                <AvatarImage src={previewImageFromFile} />
                                                <AvatarFallback className="bg-gray-300 text-gray-600 flex items-center justify-center w-full h-full">
                                                    {name || 'Product Image'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={avatarInputRef}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setFile(file);
                                                        field.onChange(file.name);
                                                    }
                                                }}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                                            onClick={() => avatarInputRef.current?.click()}
                                        >
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 16l4-4m0 0l4 4m-4-4v12" />
                                            </svg>
                                            Tải lên
                                        </button>
                                    </FormItem>
                                )}
                            />

                            {/* Tên Sản phẩm */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-4">
                                        <Label htmlFor="name" className="text-lg font-semibold text-white w-24">Tên sản phẩm</Label>
                                        <Input
                                            id="name"
                                            placeholder="Nhập tên sản phẩm"
                                            {...field}
                                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            required
                                        />
                                    </FormItem>
                                )}
                            />

                            {/* Mô tả */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-4">
                                        <Label htmlFor="description" className="text-lg font-semibold text-white w-24">Mô tả</Label>
                                        <Input
                                            id="description"
                                            placeholder="Nhập mô tả sản phẩm"
                                            {...field}
                                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            required
                                        />
                                    </FormItem>
                                )}
                            />

                            {/* Giá */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-4">
                                        <Label htmlFor="price" className="text-lg font-semibold text-white w-24">Giá</Label>
                                        <Input
                                            id="price"
                                            placeholder="Nhập giá sản phẩm"
                                            {...field}
                                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            required
                                        />
                                    </FormItem>
                                )}
                            />

                            {/* Tùy chọn đổi giá */}
                            <FormField
                                control={form.control}
                                name="changePrice"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-4 mt-4">
                                        <Label htmlFor="changePrice" className="text-lg font-semibold text-white">Đổi giá</Label>
                                        <Switch 
                                            id="changePrice"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        >
                                            <span
                                                className={`w-6 h-6 bg-white rounded-full absolute transition-transform duration-300 ${
                                                    field.value ? 'translate-x-6' : ''
                                                }`}
                                            ></span>
                                        </Switch>
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Nút Cập nhật */}
                        <div className="flex justify-end mt-6">
                            <Button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Cập nhật</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
