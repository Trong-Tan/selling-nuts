import { request } from '@/utils/request'

interface CreateCart {
    productId:          string             
    productName:        string             
    price:              number
    discountPrice:      number         
    numRatings:         number
    imageUrl:           string
    quantity:           number
}

export const createCart = async (data: CreateCart) => {
    await request.post('/carts', data)
}
