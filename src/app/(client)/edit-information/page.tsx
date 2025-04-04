'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';  // Dùng jsonwebtoken thay vì jwt-decode

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import './EditInformation.scss';
import { Separator } from '@radix-ui/react-dropdown-menu';

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

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        let userId: number | null = null;
        try {
            const decoded = jwt.decode(token) as { nameid: number }; // Giải mã token bằng jsonwebtoken
            userId = decoded?.nameid;  // Lấy id từ token nếu có
            console.log(decoded); // Kiểm tra token
            console.log(userId);
            
        } catch (error) {
            console.error('Error decoding token:', error);
            router.push('/login');
            return;
        }

        if (userId === null) {
            console.error('Không tìm thấy userId trong token.');
            router.push('/login');
            return;
        }

        // Gửi yêu cầu API để lấy thông tin người dùng
        fetch(`https://localhost:44303/user/detail?id=${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('API Response:', data); // Log the full response
                if (data.httpStatus === 200) {
                    setUser(data.user);
                } else {
                    console.error('Không tìm thấy thông tin người dùng.');
                    router.push('/login');
                }
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                router.push('/login');
            })
            .finally(() => setLoading(false)); // Set loading false khi hoàn thành
    }, [router]);

    if (loading) {
        return (
            <div className="w-full h-[200px] flex items-center justify-center">
                <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                    <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
                    <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
                </svg>
            </div>
        );
    }

    if (!user) {
        return <p className="text-red-500">Không tìm thấy thông tin người dùng.</p>;
    }

    return (
        <div className="min-h-screen px-[100px] pt-8 w-full ">
            <Breadcrumb className='mb-4'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/edit-information">Chỉnh sửa thông tin</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="w-full flex items-center justify-start gap-16 mt-8 p-6 shadow bg-white rounded border">
                <div className='border-r pr-16'>
                    <div className="text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-4">
                            {user.profile_picture ? (
                                <img src={user.profile_picture} alt="Avatar" className="w-full h-full rounded-full" />
                            ) : (
                                <div className="w-full h-full bg-gray-300 rounded-full" />
                            )}
                        </Avatar>
                        <div>
                            <div>{user.first_name} {user.last_name}</div>
                            <p className="text-sm text-gray-500">{user.account.email}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p><strong>Phone:</strong> {user.phone_number || 'Chưa cập nhật'}</p>
                    <p><strong>Address:</strong> {user.address || 'Chưa cập nhật'}</p>
                    <p><strong>DOB:</strong> {user.dob || 'Chưa cập nhật'}</p>
                    <p><strong>Active:</strong> {user.account.is_active ? 'Có' : 'Không'}</p>
                    <p><strong>Verified:</strong> {user.account.is_verified ? 'Có' : 'Không'}</p>
                </div>
            </div>
        </div>
    );
}
