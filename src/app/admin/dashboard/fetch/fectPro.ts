import envConfig from '../../../../../config';

const fetchPro = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/all-products?sortOrder=null`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await response.json();
    console.log("total", data)

    return data.products.length;
  } catch (err) {
    console.error('Error fetching product data:', err);
    throw err;
  }
};

export default fetchPro;
