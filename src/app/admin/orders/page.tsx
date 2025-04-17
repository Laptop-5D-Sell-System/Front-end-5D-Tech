import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orders_table } from './order-table';




export default function Orders() {
    return (
        <div className="flex sm:mx-34 flex-col  bg-[#000816] rounded-lg pb-4">
            <Card className="bg-[#000816] border-0 pb-0">
                <CardHeader >
                    <CardTitle>Đơn hàng</CardTitle>
                    <CardDescription>Quản Lý Đơn Hàng</CardDescription>
                </CardHeader>
            </Card>
            <Orders_table />
            
        </div>
    );
}
