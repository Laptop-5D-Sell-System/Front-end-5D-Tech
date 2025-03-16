import '../styles/Footer.scss';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <div className="footer h-16 bg-white-800 text-black">
            <Separator />
            <div className="grid grid-cols-5 gap-2 p-2 pt-4">
                <ul className="">
                    <li className='text-2xl font-bold text-red-500 mb-4'>
                        <span className="bg-red-500 text-white p-2 rounded-md">5D</span> - Tech
                    </li>
                    <li className='mb-4 text-gray-500 text-lg'>
                        Với chất lượng hàng đầu, chúng tôi cam kết mang đến cho khách hàng 
                        những trải nghiệm tuyệt vời và sự hài lòng tuyệt đối.
                    </li>

                </ul>
                <ul className="">
                    <li className="font-semibold text-2xl mb-4">Thông tin</li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Xu hướng</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Bán chạy</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Giảm giá</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Sản phẩm mới</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Còn hàng</a></li>
                </ul>
                <ul className="">
                    <li className="font-semibold text-2xl mb-4">Danh mục</li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Trang chủ</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Giới thiệu</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Sản phẩm</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Liên hệ</a></li>
                </ul>
                <ul className="">
                    <li className="font-semibold text-2xl mb-4">Liên kết</li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Tài khoản</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Đơn hàng</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Mục yêu thích</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Hoàn trả</a></li>
                    <li className='mb-4 text-gray-500 text-lg'><a href="/" className='hover:text-red-500'>Chính sách</a></li>
                </ul>
                <ul className="">
                    <li className="font-semibold text-2xl mb-4">Thông tin cửa hàng</li>
                </ul>
            </div>
        </div>
    );
}
