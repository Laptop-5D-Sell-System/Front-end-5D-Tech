'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Mail, Lock, LogIn, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Schema validation
const RegisterBody = z.object({
    first_name: z.string().trim().min(2).max(256),
    last_name: z.string().trim().min(2).max(256),
    email: z.string().email('Email không hợp lệ'),
    password_hash: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type RegisterBodyType = z.infer<typeof RegisterBody>;

export default function SignupForm() {
    const router = useRouter();
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password_hash: '',
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        console.log('Dữ liệu gửi đi:', values);
        try {
            const response = await fetch('https://localhost:44303/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // const data = await response.json();
            toast.success('Đăng ký thành công!');
            router.push('/login');
        } catch (error) {
            console.error('Error fetching signup:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        }
    }

    return (
        <div className="mt-[160px] pt-[40px] w-[400px] mx-auto border border-gray-200 p-8 rounded-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                    <h2 className="text-center text-red-500 font-semibold text-2xl">Đăng Ký Tài Khoản</h2>

                    {/* First name Field */}
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <User size={20} className="text-gray-400 ml-2" />
                                        <Input placeholder="Nhập họ và tên đệm" type="text" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last name Field */}
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <User size={20} className="text-gray-400 ml-2" />
                                        <Input placeholder="Nhập tên của bạn" type="text" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <Mail size={20} className="text-gray-400 ml-2" />
                                        <Input placeholder="Nhập email của bạn" type="email" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password_hash"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <Lock size={20} className="text-gray-400 ml-2" />
                                        <Input
                                            placeholder="Nhập mật khẩu của bạn"
                                            type="password"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value)} // Cập nhật giá trị
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full cursor-pointer hover:bg-red-500 transition-all duration-300 mb-4"
                    >
                        Đăng Ký
                    </Button>
                    <Separator className="m-0" />
                    <p className="text-center text-gray-500 text-sm mt-4 mb-4">Đã có tài khoản?</p>
                    <Link href="/login">
                        <Button className="w-full cursor-pointer hover:bg-red-500 transition-all duration-300">
                            <LogIn /> Đăng Nhập
                        </Button>
                    </Link>
                </form>
            </Form>
        </div>
    );
}
