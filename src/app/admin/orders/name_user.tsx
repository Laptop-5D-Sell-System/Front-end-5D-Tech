import { useState, useEffect } from 'react';
import envConfig from '../../../../config';

interface UserResponse {
  id: number;
  last_name: string;
  first_name: string;
}

interface ApiResponse {
  user: UserResponse;
}

export const useUserById = (userId: number) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/detail?id=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const data: ApiResponse = await response.json();
        setUser(data.user); 
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Không thể tải thông tin khách hàng');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fullName = user ? `${user.last_name} ${user.first_name}`.trim() : '';

  return { 
    user, 
    loading, 
    error,
    fullName
  };
};