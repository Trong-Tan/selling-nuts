import { request } from '@/utils/request'
import { ReactNode } from 'react';

export interface Product {
  [x: string]: ReactNode
  id: string
}

export const fetchAllProducts = async () => {
  const res = await request.get('/products');
    return res.data;
}

export const fetchProductById = async (id: string) => {
  const response = await request.get(`/products/${id}`)
  return response.data;
};