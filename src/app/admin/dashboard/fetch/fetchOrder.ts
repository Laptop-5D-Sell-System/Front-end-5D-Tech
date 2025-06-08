import envConfig from '../../../../../config';

// --- BƯỚC 1: ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU ---

// Kiểu cho mỗi item trong mảng mà hàm này sẽ trả về
export interface UserCountItem {
  userId: number;
  count: number;
}

// Kiểu cho mỗi đối tượng order nhận từ API
interface Order {
  user_id: number;
  // Thêm các thuộc tính khác của order nếu có, ví dụ:
  // id: string;
  // total: number;
}

// Kiểu cho toàn bộ response từ API /order/orders
interface OrdersApiResponse {
  orders: Order[];
}


// --- BƯỚC 2: THÊM KIỂU VÀO HÀM `fetchOrder` ---

const fetchOrder = async (): Promise<UserCountItem[]> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order data');
    }

    const data: OrdersApiResponse = await response.json();

    const userOrderCounts: Record<string, number> = {};

    data.orders.forEach(order => {
        const userId = order.user_id;
        if (!userOrderCounts[userId]) {
            userOrderCounts[userId] = 0;
        }
        userOrderCounts[userId]++;
    });

    const sortedUsers = Object.entries(userOrderCounts)
        .map(([userId, count]) => ({ userId: parseInt(userId, 10), count }))
        .sort((a, b) => b.count - a.count);

    const top5Customers = sortedUsers.slice(0, 5);

    console.log("Top 5 khách hàng có nhiều đơn hàng nhất:", top5Customers);
    
    return top5Customers;

  } catch (err) {
    console.error('Error fetching order data:', err);
    return [];
  }
};

export default fetchOrder;