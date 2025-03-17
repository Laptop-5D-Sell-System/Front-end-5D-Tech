import { Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import SlidebarAdmin from '@/components/SlidebarAdmin';
import HeaderAdmin from '@/components/HeaderAdmin';

export default function Dashboard() {
    return (
        <div className='flex'>
            <SlidebarAdmin />

            <div className="ml-[300px]">
                <HeaderAdmin />
                <h1>Trang Admin</h1>
            </div>
        </div>
    );
}
