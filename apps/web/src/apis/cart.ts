import { request } from '@/utils/request'

export interface CreateCart {
    productId:          string             
    productName:        string             
    orderId:            string           
    price:              number
    discountPrice:      number         
    numRatings:         number
    imageUrl:           string
    quantity:           number
}

export const createCart = async (data: CreateCart) => {
    await request.post('/carts', data)
}

export const fetchProductByUserId = async (data: string) => {
    const response = await request.get(`/carts`); 
    return response.data; 
}
