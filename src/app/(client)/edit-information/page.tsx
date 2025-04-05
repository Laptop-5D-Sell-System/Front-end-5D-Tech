'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './EditInformation.scss';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Account {
    id: number;
    email: string;
    is_active: boolean;
    is_verified: boolean;
    role: string;
    created_at: string;
    updated_at: string | null;
}

interface User {
    id: number;
    account_id: number;
    last_name: string;
    first_name: string;
    phone_number: string | null;
    address: string | null;
    dob: string | null;
    profile_picture: string | null;
    account: Account;
}

export default function EditInformation() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<Partial<User>>({});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        let userId: number | null = null;
        try {
            const decoded = jwt.decode(token) as { nameid: number };
            userId = decoded?.nameid;
        } catch (error) {
            console.error('Error decoding token:', error);
            router.push('/login');
            return;
        }

        if (!userId) {
            console.error('User ID not found in token.');
            router.push('/login');
            return;
        }

        fetch(`https://localhost:44303/user/detail?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.httpStatus === 200) {
                    setUser(data.user);
                    setFormData(data.user);
                } else {
                    console.error('User not found.');
                    router.push('/login');
                }
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                router.push('/login');
            })
            .finally(() => setLoading(false));
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetch('https://localhost:44303/user/edit-user', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.httpStatus === 200) {
                    alert('Thông tin đã được cập nhật thành công!');
                    setUser(data.user);
                } else {
                    alert('Cập nhật thông tin thất bại.');
                }
            })
            .catch((error) => {
                console.error('Error updating user:', error);
                alert('Đã xảy ra lỗi khi cập nhật thông tin.');
            });
    };

    if (loading) {
        return (
            <div className="w-full h-[200px] flex items-center justify-center">
                <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                    <circle
                        className="pl__ring pl__ring--a"
                        cx="120"
                        cy="120"
                        r="105"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 660"
                        stroke-dashoffset="-330"
                        stroke-linecap="round"
                    ></circle>
                    <circle
                        className="pl__ring pl__ring--b"
                        cx="120"
                        cy="120"
                        r="35"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 220"
                        stroke-dashoffset="-110"
                        stroke-linecap="round"
                    ></circle>
                    <circle
                        className="pl__ring pl__ring--c"
                        cx="85"
                        cy="120"
                        r="70"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 440"
                        stroke-linecap="round"
                    ></circle>
                    <circle
                        className="pl__ring pl__ring--d"
                        cx="155"
                        cy="120"
                        r="70"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 440"
                        stroke-linecap="round"
                    ></circle>
                </svg>
            </div>
        );
    }

    if (!user) {
        return <p className="text-center text-red-500">Không tìm thấy thông tin người dùng.</p>;
    }

    return (
        <div className="pt-8 min-h-screen w-full">
            <div className="w-full">
                <Breadcrumb className='ml-[100px] mb-8'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Chỉnh sửa thông tin</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className='flex gap-8 w-full px-[100px]'>
                    <div className="w-1/3 text-center border-2 border-red-500 rounded-lg p-4 bg-white shadow-md">
                        <Avatar className='mx-auto w-[150px] h-[150px] mb-4 border border-gray-300 rounded-full'>
                            <AvatarImage src={`${formData.profile_picture}`} />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        <p className='mb-1'>{formData.first_name} {formData.last_name}</p>
                        <p>{formData.account?.email}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <p className='text-xl font-[500]'>Thông tin cá nhân</p>
                        <label htmlFor="">Họ đệm:</label>
                        <Input
                            type="text"
                            name="first_name"
                            value={formData.first_name || ''}
                            onChange={handleInputChange}
                            placeholder="Họ"
                            className='border mb-2'
                        />
                        <label htmlFor="">Tên:</label>
                        <Input
                            type="text"
                            name="last_name"
                            value={formData.last_name || ''}
                            onChange={handleInputChange}
                            placeholder="Tên"
                            className='border mb-2'
                        />
                        <label htmlFor="">Số điện thoại:</label>
                        <Input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number || ''}
                            onChange={handleInputChange}
                            placeholder="Số điện thoại"
                            className='border mb-2'
                        />
                        <label htmlFor="">Địa chỉ:</label>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleInputChange}
                            placeholder="Địa chỉ"
                            className='border mb-2'
                        />
                        <label htmlFor="">Ngày sinh:</label>
                        <Input
                            type="date"
                            name="dob"
                            value={formData.dob ? formData.dob.split('T')[0] : ''}
                            onChange={handleInputChange}
                            className='border mb-2'
                        />
                        <div className="w-full mt-8 flex gap-4 items-ceter justify-center">
                            <Button type="submit" className="flex-1 cursor-pointer hover:bg-red-500 transition-all duration-200">
                                Cập nhật
                            </Button>
                            <Link href={'/change-password'} className="flex-1 border-2 border-red-500 pt-[8px] font-[500] text-sm text-red-500 text-center rounded-lg bg-white hover:bg-red-500 hover:text-white transition-all duration-200">
                                Đổi mật khẩu
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
