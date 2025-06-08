import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useUserById } from './name_user';
import envConfig from '../../../../config';
import { toast } from 'sonner';

interface OrderDetailProps {
  id: string | undefined;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}

interface OrderDetailData {
  user_id: number;
  order_date: string;
  status: string;
  address: string;
  products: {
    ProductName: string;
    Quantity: number;
    Image: string;
    Price: number;
  }[];
  total_quantity: number;
  total: number;
}

const statusOptions = [
  { value: 'Processing', label: 'Chờ xử lý' },
  { value: 'Done', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã hủy' },
];

export default function EditOrder({ id, setId, onSubmitSuccess }: OrderDetailProps) {
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const { user: customer, loading: loadingCustomer } = useUserById(order?.user_id || 0);

  const fetchOrderDetail = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/detail?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setOrder(data.order);
      setSelectedStatus(data.order.status);
      return data.order;
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Không thể tải thông tin đơn hàng');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchOrderDetail();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!order || !id || selectedStatus === order.status) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/update?id=${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        throw new Error('Cập nhật trạng thái thất bại');
      }

      setOrder(prev => prev ? { ...prev, status: selectedStatus } : null);
      
      toast.success(`Thành công! Trạng thái đã được cập nhật thành ${statusOptions.find(s => s.value === selectedStatus)?.label}`);
      
      if (onSubmitSuccess && typeof onSubmitSuccess === 'function') {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Cập nhật trạng thái thất bại');
    } finally {
      setUpdating(false);
    }
  };
  

  const statusColorMap: Record<string, string> = {
  Processing: 'bg-yellow-500',
  Done: 'bg-green-500',
  cancelled: 'bg-red-500',
};

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          setId(undefined);
        }
      }}
    >
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{id}</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về đơn hàng
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : order ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Thông tin khách hàng</h3>
                {loadingCustomer ? (
                  <Skeleton className="h-4 w-3/4 mt-2" />
                ) : (
                  <p className="text-sm">
                    {customer?.last_name} {customer?.first_name}
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-medium">Ngày đặt hàng</h3>
                <p className="text-sm">
                  {format(new Date(order.order_date), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Trạng thái</h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${statusColorMap[order.status] || 'bg-gray-500'} text-white`}>
                    {statusOptions.find(s => s.value === order.status)?.label || order.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Địa chỉ giao hàng</h3>
                <p className="text-sm">{order.address}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Cập nhật trạng thái</h3>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Sản phẩm</h3>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={product.Image}
                        alt={product.ProductName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{product.ProductName}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {product.Quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {(product.Price * product.Quantity).toLocaleString()}đ
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.Price.toLocaleString()}đ x {product.Quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng số lượng:</span>
                <span className="font-medium">{order.total_quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng tiền:</span>
                <span className="font-medium text-lg">
                  {order.total.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p>Không tìm thấy thông tin đơn hàng</p>
        )}

        <DialogFooter className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setId(undefined)} 
          >
            Đóng
          </Button>
          {order && selectedStatus !== order.status && (
            <Button 
              onClick={handleStatusUpdate}
              disabled={updating}
            >
              {updating ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}