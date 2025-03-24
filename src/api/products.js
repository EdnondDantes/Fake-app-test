import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

const handleError = (error, defaultMessage) => {
  console.error('API Error:', error);
  throw new Error(error.response?.data?.message || defaultMessage || 'Request failed');
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    if (response.status !== 200) throw new Error('Invalid response status');
    return response.data.map(product => ({
      ...product,
      price: Number(product.price) || 0,
      category: product.category || 'uncategorized'
    }));
  } catch (error) {
    return handleError(error, 'Не удалось загрузить товары');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    if (response.status !== 200) throw new Error('Invalid response status');
    return response.data.map(category => category || 'uncategorized');
  } catch (error) {
    return handleError(error, 'Не удалось загрузить категории');
  }
};