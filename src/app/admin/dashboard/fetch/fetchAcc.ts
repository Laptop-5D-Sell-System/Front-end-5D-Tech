import envConfig from '../../../../../config';

const fetchAcc = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/get-accounts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await response.json();
    console.log("total", data)

    return data.accounts.length;
  } catch (err) {
    console.error('Error fetching product data:', err);
    throw err;
  }
};

export default fetchAcc;
