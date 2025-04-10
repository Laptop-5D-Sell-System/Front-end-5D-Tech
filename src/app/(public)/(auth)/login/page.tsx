'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import envConfig from '../../../../../config';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/lib/utils';

// Schema validation
const LoginBody = z.object({
  email: z.string().email('Email không hợp lệ'),
  password_hash: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginBodyType = z.infer<typeof LoginBody>;

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password_hash: '',
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const response = await fetch(`https://oms-5d-tech.azurewebsites.net/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mess || 'Đăng nhập thất bại');
      }
      const data = await response.json();
      const token = data.data.token
      const refreshToken = data.data.refreshToken
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const decodedToken = decodeToken(token);
      const role = decodedToken?.role;

      if (role === 'admin') {
        router.push('/admin/dashboard');
      }
      else{
        router.push('/');
      }
    } catch (error:any) {
      console.error('Error logging in:', error);
      alert(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
    }
  }

  return (
    <div className="mt-[160px] pt-[40px] w-[400px] mx-auto border border-gray-200 p-8 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <h2 className="text-center text-red-500 font-semibold text-2xl">Đăng Nhập</h2>

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
                    <Input placeholder="Nhập mật khẩu của bạn" type="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer hover:bg-red-500 transition-all duration-300 mb-4">
            Đăng Nhập
          </Button>
          <Separator className="m-0" />
          <p className="text-center text-gray-500 text-sm mt-4 mb-4">Chưa có tài khoản?</p>
          <Link href="/signup">
            <Button className="w-full cursor-pointer hover:bg-red-500 transition-all duration-300">
              <LogIn /> Đăng Ký
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
