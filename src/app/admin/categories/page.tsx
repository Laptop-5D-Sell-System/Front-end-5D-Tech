import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Categories_table } from './category-table';




export default function Categories() {
    return (
        <div className="flex sm:mx-34 flex-col  bg-gray-900 rounded-lg pb-4">
            <Card className="bg-gray-900 border-0 pb-0">
                <CardHeader>
                    <CardTitle>Tài Khoản</CardTitle>
                    <CardDescription>Quản Lý Tài Khoản Người Dùng</CardDescription>
                </CardHeader>
            </Card>
            <div className="flex justify-between items-center p-4">
                
                
            </div>

            <Categories_table />
            
        </div>
    );
}
