import { request } from '@/utils/request'


export interface CreateOrder {
    totalPrice:         number
}

export const createOrder = async (data: CreateOrder) => {
    const response = await request.post('/orders', data)
    return response.data
}

export const updateOrderId = async ( orderId:  string) => {
    return request.put('/orders/checkout', orderId)
  }