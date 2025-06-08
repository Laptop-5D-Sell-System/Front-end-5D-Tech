import Image from 'next/image';
import './About.scss';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, Award, Headphones } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { Card, CardContent } from '@/components/ui/card';

const values = [
    {
        icon: <Truck className="w-8 h-8 text-yellow-500" strokeWidth={1} />, // Icon giao hàng
        title: 'Nhiệm vụ',
        description:
            'Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng.',
    },
    {
        icon: <Award className="w-8 h-8 text-yellow-500" strokeWidth={1} />, // Icon chất lượng
        title: 'Tầm nhìn',
        description:
            'Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng.',
    },
    {
        icon: <Headphones className="w-8 h-8 text-yellow-500" strokeWidth={1} />, // Icon hỗ trợ
        title: 'Hỗ trợ',
        description:
            'Cung cấp những sản phẩm điện tử chất lượng cao và dịch vụ mua sắm tốt nhất để mang đến sự hài lòng và tiện ích cho khách hàng.',
    },
];

const faqs = [
    {
        question: 'Cửa Hàng Của Chúng Tôi Bán Những Sản Phẩm Điện Tử Nào?',
        answer: 'Chúng tôi cung cấp một loạt các sản phẩm điện tử đa dạng, bao gồm điện thoại thông minh, máy tính bảng, laptop, TV, máy ảnh, loa và nhiều sản phẩm công nghệ khác. Bạn có thể tìm thấy những thiết bị hàng đầu từ các thương hiệu uy tín trên toàn thế giới.',
    },
    {
        question: 'Làm Thế Nào Để Tìm Kiếm Sản Phẩm Phù Hợp Với Nhu Cầu?',
        answer: 'Bạn có thể sử dụng bộ lọc tìm kiếm trên trang web của chúng tôi để chọn sản phẩm theo danh mục, giá cả, thương hiệu, và nhiều yếu tố khác.',
    },
    {
        question: 'Chính Sách Bảo Hành Và Đổi Trả Của Chúng Tôi Như Thế Nào?',
        answer: 'Chúng tôi cam kết bảo hành chính hãng và hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.',
    },
];

const reviews = [
    {
        name: 'Trần Văn Anh',
        location: 'Hồ Chí Minh',
        review: 'Dịch vụ khách hàng cũng rất tuyệt vời, nhân viên nhiệt tình và chuyên nghiệp. Tôi chắc chắn sẽ quay lại cửa hàng này cho các nhu cầu điện tử của tôi.',
        avatar: '/images/el-user4.png',
    },
    {
        name: 'Nguyễn Thị Hương',
        location: 'Hà Nội',
        review: 'Dịch vụ khách hàng cũng rất tuyệt vời, nhân viên nhiệt tình và chuyên nghiệp. Tôi chắc chắn sẽ quay lại cửa hàng này cho các nhu cầu điện tử của tôi.',
        avatar: '/images/el-user4.png',
    },
    {
        name: 'Phạm Minh Đức',
        location: 'Hải Phòng',
        review: 'Dịch vụ khách hàng cũng rất tuyệt vời, nhân viên nhiệt tình và chuyên nghiệp. Tôi chắc chắn sẽ quay lại cửa hàng này cho các nhu cầu điện tử của tôi.',
        avatar: '/images/el-user4.png',
    },
    {
        name: 'Hoàng Văn Lâm',
        location: 'Đà Lạt',
        review: 'Dịch vụ khách hàng cũng rất tuyệt vời, nhân viên nhiệt tình và chuyên nghiệp. Tôi chắc chắn sẽ quay lại cửa hàng này cho các nhu cầu điện tử của tôi.',
        avatar: '/images/el-user4.png',
    },
];

export default function About() {
    return (
        <div className="bg-white-800 text-black">
            <div className="bg-gray-100 py-16 flex items-center justify-center w-full">
                <div className="max-w-6xl flex flex-col md:flex-row items-center gap-8">
                    {/* Phần giới thiệu */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-red-500 font-[500] uppercase">Giới thiệu</h3>
                        <h1 className="text-4xl font-[500] mt-2 leading-tight">Những thiết bị công nghệ hàng đầu</h1>
                        <p className="text-gray-600 mt-4">
                            Chúng tôi tự hào giới thiệu đến bạn một trang web bán hàng trực tuyến chuyên về các sản phẩm
                            điện tử, nơi bạn có thể tìm thấy những thiết bị công nghệ hàng đầu và đáng tin cậy. Với sứ
                            mệnh mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời và sự hài lòng tuyệt đối,
                            chúng tôi đã xây dựng một nền tảng mua sắm đáng tin cậy và tiện lợi.
                        </p>
                        <Link href="/product-list">
                            <Button className="mt-6 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-300 transition">
                                Xem Sản Phẩm &rarr;
                            </Button>
                        </Link>
                    </div>

                    {/* Phần hình ảnh */}
                    <div className="md:w-1/2 relative">
                        <Image
                            src="/images/about1.png"
                            width={500}
                            height={300}
                            alt="Công nghệ hàng đầu"
                            className="shadow-lg"
                        />
                    </div>
                </div>
            </div>
            <section className="p-16 bg-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {values.map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {value.icon}
                            <h3 className="mt-4 text-xl">{value.title}</h3>
                            <p className="text-[14px] mt-2 text-gray-600 max-w-xs">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-red-500 text-[14px]">CÁC CÂU HỎI VÀ TRẢ LỜI</p>
                    <h2 className="text-3xl font-[500]">Câu Hỏi Thường Gặp</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-16 mt-16 mx-16">
                    <div className="md:w-1/3">
                        <Accordion type="single" collapsible w-full>
                            {faqs.map((faq, name) => (
                                <AccordionItem key={name} value={faq.question}>
                                    <AccordionTrigger className="cursor-pointer">{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="md:w-1/3 flex gap-4 h-full">
                        <Image src="/images/faq1.png" alt="Camera" width={300} height={200} />
                        <Image src="/images/faq2.png" alt="Phone" width={300} height={200} />
                    </div>
                </div>
            </section>
            <div className="container mx-auto py-10 px-6 mt-16">
                <h2 className="text-3xl font-[500] flex items-center justify-between mb-6">
                    Đánh Giá Từ Khách Hàng
                    <Link href="/product-list">
                        <Button className="bg-yellow-300 text-black font-semibold px-6 h-[50px] rounded-lg flex items-center gap-2 hover:bg-black hover:text-white cursor-pointer transition-all duration-300 transition">
                            Xem Sản Phẩm &rarr;
                        </Button>
                    </Link>
                </h2>
                <div className="flex items-center justify-between gap-8">
                    <Image
                        src="/images/lg-testi1.png"
                        width={500}
                        height={500}
                        alt="Khách hàng"
                        className="w-[400px]"
                    />
                    <div className="grid md:grid-cols-2 gap-6 w-[1190px]">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-6 rounded shadow-lg border">
                                <p className="text-gray-700 italic">“{review.review}”</p>
                                <div className="flex items-center mt-4">
                                    <Image
                                        src={review.avatar}
                                        width={50}
                                        height={50}
                                        alt={review.name}
                                        className="rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold">{review.name}</h4>
                                        <p className="text-gray-500 text-sm">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
