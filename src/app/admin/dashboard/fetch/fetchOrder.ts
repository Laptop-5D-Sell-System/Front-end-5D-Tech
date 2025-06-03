import envConfig from '../../../../../config';

const fetchOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await response.json();

    
    const userOrderCounts = {};


    data.orders.forEach(order => {
        const userId = order.user_id;
        if (!userOrderCounts[userId]) {
            userOrderCounts[userId] = 0;
        }
        userOrderCounts[userId]++;
    });

    const sortedUsers = Object.entries(userOrderCounts)
        .map(([userId, count]) => ({ userId: parseInt(userId), count }))
        .sort((a, b) => b.count - a.count);

    const top5Customers = sortedUsers.slice(0, 5);

    console.log("Top 5 khách hàng có nhiều đơn hàng nhất:");
    console.log(top5Customers);

    

    return top5Customers;
  } catch (err) {
    console.error('Error fetching product data:', err);
    throw err;
  }
};

export default fetchOrder;
