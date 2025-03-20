import { Laptop, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="pt-5 px-[100px]">
            {/* Start Banner */}
            <div className="grid grid-cols-2 gap-5 overflow-hidden">
                <div className="relative h-[400px] overflow-hidden rounded-sm group">
                    {/* Nội dung trên ảnh */}
                    <div className="about_menu_secondary absolute top-8 left-4 z-1">
                        <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                        <h2 className="font-bold text-2xl mb-4">Dell XPS 13 9340</h2>
                        <Button>Mua Ngay</Button>
                    </div>

                    {/* Ảnh với hiệu ứng zoom */}
                    <Image
                        src="/images/laptop.jpeg"
                        alt="Banner"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-sm group">
                    {/* Nội dung trên ảnh */}
                    <div className="about_menu_secondary absolute top-8 left-4 z-1">
                        <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                        <h2 className="font-bold text-2xl mb-4">Dell XPS 13 9340</h2>
                        <Button>Mua Ngay</Button>
                    </div>

                    {/* Ảnh với hiệu ứng zoom */}
                    <Image
                        src="/images/laptop.jpeg"
                        alt="Banner"
                        fill
                        className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 overflow-hidden mt-5">
                <div className="relative h-[250px] overflow-hidden rounded-sm group">
                    {/* Nội dung trên ảnh */}
                    <div className="about_menu_secondary absolute top-8 left-4 z-1">
                        <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                        <h2 className="font-bold text-2xl mb-4 bg-red-500 text-white">Dell XPS 13 9340</h2>
                        <Button>Mua Ngay</Button>
                    </div>

                    {/* Ảnh với hiệu ứng zoom */}
                    <Image
                        src="/images/laptop2.jpg"
                        alt="Banner"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </div>
                <div className="relative h-[250px] overflow-hidden rounded-sm group">
                    {/* Nội dung trên ảnh */}
                    <div className="about_menu_secondary absolute top-8 left-4 z-1">
                        <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                        <h2 className="font-bold text-2xl mb-4 bg-red-500 text-white">Dell XPS 13 9340</h2>
                        <Button>Mua Ngay</Button>
                    </div>

                    {/* Ảnh với hiệu ứng zoom */}
                    <Image
                        src="/images/laptop2.jpg"
                        alt="Banner"
                        fill
                        className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </div>
                <div className="relative h-[250px] overflow-hidden rounded-sm group">
                    {/* Nội dung trên ảnh */}
                    <div className="about_menu_secondary absolute top-8 left-4 z-1">
                        <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                        <h2 className="font-bold text-2xl mb-4 bg-red-500 text-white">Dell XPS 13 9340</h2>
                        <Button>Mua Ngay</Button>
                    </div>

                    {/* Ảnh với hiệu ứng zoom */}
                    <Image
                        src="/images/laptop2.jpg"
                        alt="Banner"
                        fill
                        className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </div>
            </div>
            {/* End Banner */}

            {/* Start menu category */}
            <div className="w-full mt-[100px] flex">
                <div className="w-4/10">
                    <p>DANH MỤC HÀNG ĐẦU</p>
                    <h2>Danh Mục Phổ Biến</h2>
                    <p>Electronics stores are renowned for being the first to showcase new gadgets and devices.</p>
                    <Button>Khám Phá Ngay</Button>
                </div>
                <div className="w-6/10">
                    <div className="menu_category_list grid grid-cols-4 grid-rows-2 gap-4">
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className="menu_category_item border border-red-500 rounded p-4 text-center">
                            <div className="icon border border-red-500 w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                                <Laptop color="red" strokeWidth={1} />
                            </div>
                            <p className="">Máy Tính</p>
                            <p>8 sản phẩm</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* End menu category */}

            {/* Start banner two */}
            <div className="grid grid-cols-10 gap-5 mt-[100px]">
                <div className="col-span-6 rounded overflow-hidden">
                    <div className="relative h-[350px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute top-8 left-4 z-1">
                            <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                            <h2 className="font-bold text-2xl mb-4 bg-red-500 text-white">Dell XPS 13 9340</h2>
                            <Button>Mua Ngay</Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/laptop2.jpg"
                            alt="Banner"
                            fill
                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>

                <div className="col-span-4 rounded overflow-hidden">
                    <div className="relative h-[350px] overflow-hidden rounded-sm group">
                        {/* Nội dung trên ảnh */}
                        <div className="about_menu_secondary absolute top-8 left-4 z-1">
                            <p className="text-red-500 text-sm mb-4">Mua ngay với 29.000.000 ₫</p>
                            <h2 className="font-bold text-2xl mb-4 bg-red-500 text-white">Dell XPS 13 9340</h2>
                            <Button>Mua Ngay</Button>
                        </div>

                        {/* Ảnh với hiệu ứng zoom */}
                        <Image
                            src="/images/laptop2.jpg"
                            alt="Banner"
                            fill
                            className="object-cover overflow-hidden transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>
            </div>
            {/* End banner two */}

            {/* Start featured products */}
            <div className="featured_products mt-[100px]">
                <div className="header_featured_products">
                    <div className="">
                        <p>KHUYẾN MÃI LỚN</p>
                        <h2>Sản Phẩm Nổi Bật</h2>
                    </div>
                    <div className="featured_products_list grid grid-cols-4 gap-5">
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                        <div className="featured_products_item">
                            <div className="featured_products_img">
                                <div className="featured_products_sale">-40%</div>
                                <Image src="/images/laptop.jpeg" alt="laptop" width={200} height={100} />
                            </div>
                            <div className="featured_products_category">Máy tính</div>
                            <div className="featured_products_name">Dell XPS 13 9340</div>
                            <div className="featured_products_rate">x x x x x</div>
                            <div className="featured_products_quantity">Có sẵn: 8/40</div>
                            <div className="featured_products_price">
                                <div className="old_price">31.000.000 đ</div>
                                <div className="new_price">29.000.000 đ</div>
                            </div>
                        </div>
                    </div>
                    <div className="btn w-full text-center mt-5">
                        <Button>Xem Thêm</Button>
                    </div>
                </div>
            </div>
            {/* End featured products */}

            {/* Start banner three */}
            <div className="banner_three group mt-[100px] h-[200px] relative overflow-hidden rounded bg-yellow-300 text-white flex items-center justify-center">
                <Image
                    src="/images/earphone-2-1-1.png"
                    alt="tai nghe"
                    width={300}
                    height={100}
                    className="absolute bottom-0 left-[100px] transition-transform duration-500 group-hover:scale-110"
                ></Image>
                <p className="font-semibold text-3xl mx-[100px]">
                    Super Friendly <br /> Electronics Store
                </p>
                <Button>Mua Ngay</Button>
                <Image
                    src="/images/watch-1.png"
                    alt="dong ho"
                    width={150}
                    height={150}
                    className="absolute top-3 right-[100px] transition-transform duration-500 group-hover:scale-110"
                ></Image>
            </div>
            {/* End banner three */}

            {/* Start brands */}
            <div className="brand_list grid grid-cols-4 gap-5 mt-[100px]">
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
                <div className="brand_item border">
                    <Image src="/images/brand-3-1-1.svg" alt="nhãn hàng" width={150} height={100}></Image>
                </div>
            </div>
            <div className="w-full h-[200px] mt-5 relative overflow-hidden">
                <Image src="/images/fake1.png" alt="" fill className="absolute " quality={100}></Image>
            </div>
            {/* End brands */}

            {/* Start contact */}
            <div className="contact mt-[100px]">
                <div className="contact_info grid grid-cols-3 gap-5">
                    <div className="contact_info_item">
                        <div className="icon w-[50px] h-[50px] mx-auto mb-2 rounded-full flex items-center justify-center">
                            <Mail color="red" strokeWidth={1} />
                        </div>
                        <p className="text-center">Email</p>
                        <p className="text-center">
                            <a href="mailto:" className="text-red-500"></a>
                        </p>
                    </div>
                </div>
            </div>
            {/* End contact */}
        </div>
    );
}
