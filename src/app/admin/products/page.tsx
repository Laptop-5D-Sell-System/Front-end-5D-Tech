import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



import { Products_table } from './product-table';

export default function Products() {
    return (
        <div className="flex sm:mx-34 flex-col  bg-gray-900 rounded-lg pb-4">
            <Card className="bg-gray-900 border-0 pb-0">
                <CardHeader>
                    <CardTitle>Quản Lý Kho Hàng</CardTitle>
                    <CardDescription>Quản Lý Sản Phẩm Có Sẵn</CardDescription>
                </CardHeader>
            </Card>
            <div className="flex justify-between items-center p-4">
                
                
            </div>

            <Products_table />
            
        </div>
    );
}
