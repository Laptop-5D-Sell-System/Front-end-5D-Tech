import '../styles/Footer.scss';
import Link from "next/link";
// import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <div className="footer h-16 bg-white-800 text-black">
            <div className="flex gap-2 p-[100px]">
                <ul className="flex-2">
                    <li className='text-2xl font-bold text-red-500 mb-8' style={{fontFamily: 'Montserrat'}}>
                        <span className="bg-red-500 text-white p-2 rounded-md">5D</span> - Tech
                    </li>
                    <li className='mb-4 text-gray-500 text-sm font-light'>
                        Với chất lượng hàng đầu, chúng tôi <br />
                        cam kết mang đến cho khách hàng <br />
                        những trải nghiệm tuyệt vời và <br /> 
                        sự hài lòng tuyệt đối.
                    </li>
                    <li className='font-[500] text-lg mb-4'>Theo dõi</li>
                    <li className='flex gap-3'>
                        <div className="w-[40px] h-[40px] bg-red-500 flex items-center justify-center border border-red-500 rounded text-black cursor-pointer"><Facebook strokeWidth={1} stroke="white" /></div>
                        <div className="w-[40px] h-[40px] bg-red-500 flex items-center justify-center border border-red-500 rounded text-black cursor-pointer"><Twitter strokeWidth={1} stroke="white" /></div>
                        <div className="w-[40px] h-[40px] bg-red-500 flex items-center justify-center border border-red-500 rounded text-black cursor-pointer"><Instagram strokeWidth={1} stroke="white" /></div>
                        <div className="w-[40px] h-[40px] bg-red-500 flex items-center justify-center border border-red-500 rounded text-black cursor-pointer"><Youtube strokeWidth={1} stroke="white" /></div>
                    </li> 
                </ul>
                <ul className="flex-1">
                    <li className="font-semibold text-lg mb-4">Thông tin</li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Xu hướng</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Bán chạy</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Giảm giá</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Sản phẩm mới</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Còn hàng</Link></li>
                </ul>
                <ul className="flex-1">
                    <li className="font-semibold text-lg mb-4">Danh mục</li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Trang chủ</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Giới thiệu</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Sản phẩm</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Liên hệ</Link></li>
                </ul>
                <ul className="flex-1">
                    <li className="font-semibold text-lg mb-4">Liên kết</li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Tài khoản</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Đơn hàng</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Mục yêu thích</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Hoàn trả</Link></li>
                    <li className='mb-4 text-gray-500 text-md'><Link href="/" className='hover:text-red-500'>Chính sách</Link></li>
                </ul>
                <ul className="flex-2">
                    <li className="font-semibold text-lg mb-4">Thông tin cửa hàng</li>
                    <li className='text-gray-500 font-light mb-4 text-sm'>Địa chỉ: Trường Đại Học Công Nghiệp Hà Nội</li>
                    <li className='text-gray-500 font-light mb-4 text-sm flex gap-2 items-center'><Mail stroke="gray" strokeWidth={1}/>Email: duongvq392@gmail.com</li>
                    <li className='text-gray-500 font-light mb-4 text-sm flex gap-2 items-center'><Phone stroke="gray" strokeWidth={1}/>Contact: 0967083126</li>
                </ul>
            </div>
        </div>
    );
}
