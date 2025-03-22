'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import './Signup.scss';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Eye, Lock, LogIn, Mail } from 'lucide-react';

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
    // 1. Define your form.
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: FormValues) {
        console.log(values);
    }
    return (
        <div className="mt-[160px] pt-[40px] w-[400px] mx-auto border border-gray-200 p-8 rounded-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h2 className='text-center text-red-500 font-semibold text-2xl'>Đăng Ký Tài Khoản</h2>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <Mail size={20} className='text-gray-400 ml-2' />
                                        <Input placeholder="Nhập email của bạn" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <Lock size={20} className='text-gray-400 ml-2' />
                                        <Input placeholder="Nhập mật khẩu của bạn" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center border border-gray-200 p-1">
                                        <Eye size={20} className='text-gray-400 ml-2' />
                                        <Input placeholder="Nhập lại mật khẩu" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full cursor-pointer hover:bg-red-500 transition-all duration-300 mb-4'>Đăng Ký</Button>
                    <Separator className='m-0' />
                    <p className='text-center text-gray-500 text-sm mt-4 mb-4'>Đã có tài khoản?</p>
                    <Link href="/login">
                        <Button className='w-full cursor-pointer hover:bg-red-500 transition-all duration-300'><LogIn /> Đăng Nhập</Button>
                    </Link>
                </form>
            </Form>
        </div>
    );
}
