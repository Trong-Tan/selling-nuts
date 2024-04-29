import { ObjectId } from "mongodb";

export type ProductContract = {
    name: string, 
    price: number, 
    discountPrice?: number, 
    popularItem: boolean,
    rating: number,
    numRatings: number,
    imageUrl: string,
    _id: typeof ObjectId
}

export type UserContract = {
    email: string,
    cart: ProductContract[]
}
