import Image from 'next/image';
import './Contact.scss';
import { Button } from '@/components/ui/button';
import { Mail, Map, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-white-800 text-black grid items-center justify-center">
            <div className="container mx-auto py-10 px-6 grid md:grid-cols-2 gap-10">
                {/* Form Liên Hệ */}
                <div>
                    <h2 className="text-2xl font-[500] mb-6">Liên Hệ</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Họ Tên*" className="border p-3 rounded w-full" required />
                        <input type="email" placeholder="Email*" className="border p-3 rounded w-full" required />
                        <input
                            type="text"
                            placeholder="Số Điện Thoại*"
                            className="border p-3 rounded w-full"
                            required
                        />
                        <input type="text" placeholder="Chủ Đề" className="border p-3 rounded w-full" />
                        <textarea
                            placeholder="Nội Dung"
                            className="border p-3 rounded w-full col-span-2"
                        ></textarea>
                        <Button className="cursor-pointer bg-red-500 text-white px-6 py-3 rounded w-fit">Gửi →</Button>
                    </form>
                </div>

                {/* Thông Tin Liên Hệ */}
                <div className="">
                    <h2 className="text-2xl font-[500] mb-4">Thông Tin Liên Hệ</h2>
                    <div className="space-y-6 bg-red-500 text-white p-6 text-[14px]">
                        <div className="flex items-center">
                            <div className="bg-yellow-400 p-3 mr-4"><Phone /></div>
                            <div>
                                <p className="text-xl mb-4">Liên hệ</p>
                                <p>(+84) 0313728397</p>
                                <p>(+84) 0313728397</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-yellow-400 p-3 mr-4"><Mail /></div>
                            <div>
                                <p className="text-xl mb-4">Email</p>
                                <p>info@themona.global</p>
                                <p>info@themona.global</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-yellow-400 p-3 mr-4"><Map /></div>
                            <div>
                                <p className="text-xl mb-4">Địa chỉ</p>
                                <p>1073/23 Cách Mạng Tháng 8, P.7, Q.Tân Bình, TP.HCM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Start brands */}
            <div className="brand_list mx-16 mb-16 grid grid-cols-5 grid-rows-2 gap-6 mt-[100px]">
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-1.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-2.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-3-1-1.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-4.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-5.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-6.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-7.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-8.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-9.svg" alt="brand" width={150} height={80}></Image>
                </div>
                <div className="brand_item border border-red-500 h-[100px] p-4 flex justify-center items-center cursor-pointer group transition-all duration-300 relative hover:bg-white">
                    <div className="absolute inset-0 rounded blur-3xl opacity-0 group-hover:opacity-100 group-hover:bg-red-500/40 transition-all duration-300 -z-10"></div>
                    <Image src="/images/brand-10.svg" alt="brand" width={150} height={80}></Image>
                </div>
            </div>
            <div className="w-full h-[200px] mt-5 relative overflow-hidden">
                <Image src="/images/fake1.png" alt="" fill className="absolute " quality={100}></Image>
            </div>
            {/* End brands */}
        </div>
    );
}
