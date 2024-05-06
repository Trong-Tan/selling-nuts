import { request } from '@/utils/request'

export interface Products {
  id: string
  categoryId: string
  name: string
  price: number
  description: string
  img: string
  location: string
}

export const fetchProducts = async (): Promise<Products[]> => {
  const res = await request.get(`/products`)
  return res.data.data
}
export const fetchProductsByCategoryId = async (categoryId: string) => {
  const res = await request.get(`/categories/${categoryId}/products`)
  return res.data.data
}

export const fetchProductById = async (productId: string) => {
  const res = await request.get(`/products/${productId}`)
  return res.data.data
}

