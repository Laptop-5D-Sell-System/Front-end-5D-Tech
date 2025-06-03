import envConfig from '../../../../../config';


const fetchUser = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/detail?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await response.json();

    console.log('Fetched user data:', data);

    return data?.user;
  } catch (err) {
    console.error('Error fetching product data:', err);
    throw err;
  }
};

export default fetchUser;
