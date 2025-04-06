import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { updateAccountBody, UpdateAccountBodyType } from '@/schemaValidations/account.schema';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

export default function EditAccount({
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

    const form = useForm<UpdateAccountBodyType>({
        resolver: zodResolver(updateAccountBody),
        defaultValues: {
            email: '',
            name: '',
            avatar: '',
            password_hash: '',
            confirmPassword: '',
            changePassword: false,
        },
    });

    const avatar = form.watch('avatar');
    const name = form.watch('name');
    const changePassword = form.watch('changePassword');

    const previewAvatarFromFile = useMemo(() => {
        return file ? URL.createObjectURL(file) : avatar;
    }, [file, avatar]);

    const handleSubmit = (data: UpdateAccountBodyType) => {
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
                <Button variant="outline">Tạo Tài Khoản</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật tài khoản</DialogTitle>
                    <DialogDescription>Các trường tên, email, mật khẩu là bắt buộc</DialogDescription>
                </DialogHeader>

                <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
    <form noValidate className="space-y-6" id="edit-employee-form">
        <div className="space-y-6">
            
            {/* Avatar Section */}
            <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-start space-x-4">
                        <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                            <Avatar className='w-32 h-32'>
                                <AvatarImage src={previewAvatarFromFile} />
                                <AvatarFallback className="bg-gray-300 text-gray-600 flex items-center justify-center w-full h-full">
                                    {name || 'Avatar'}
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
                            Tải lên
                        </button>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="flex items-center space-x-4">
                        <Label htmlFor="name" className="text-lg font-semibold text-white w-24">Tên</Label>
                        <Input
                            id="name"
                            placeholder="Nhập tên"
                            {...field}
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            required
                        />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="flex items-center space-x-4">
                        <Label htmlFor="email" className="text-lg font-semibold text-white w-24">Email</Label>
                        <Input
                            id="email"
                            placeholder="Nhập email"
                            {...field}
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            required
                        />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="changePassword"
                render={({ field }) => (
                    <FormItem className="flex items-center gap-4 mt-4">
                        <Label htmlFor="changePassword" className="text-lg font-semibold text-white">Đổi mật khẩu</Label>
                        <Switch 
                            id="changePassword"
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

            {changePassword && (
                <>
                    <FormField
                        control={form.control}
                        name="password_hash"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-4">
                                <Label htmlFor="password" className="text-lg font-semibold text-white w-24">Mật khẩu</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    {...field}
                                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    required
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-4">
                                <Label htmlFor="confirmPassword" className="text-lg font-semibold text-white w-24">Xác nhận mật khẩu</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    {...field}
                                    className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    required
                                />
                            </FormItem>
                        )}
                    />
                </>
            )}
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
