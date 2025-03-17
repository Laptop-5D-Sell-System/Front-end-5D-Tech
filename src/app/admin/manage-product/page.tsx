import Link from "next/link";

export default function ManageProduct () {
    return (
        <div className="">
            <h1>Trang quản lý sản phẩm</h1>
            <Link href="/admin">
                Về Trang admin
            </Link>
        </div>
    )
}