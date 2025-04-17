import { useState, useEffect } from 'react';
import envConfig from '../../../../config';

export const useUserById = (userId: number | null) => {
  const [user, setUser] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/get-usets`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();
          const foundUser = data.users.find((u: any) => u.id === userId);
          setUser(foundUser);
        } catch (error) {
          setError('Không thể lấy thông tin người dùng');
          console.error('Lỗi khi fetch user:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [userId]);
  console.log('user', user);
  return { user, loading, error };
};
