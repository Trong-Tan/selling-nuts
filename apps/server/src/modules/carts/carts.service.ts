import { db } from "@/lib/db";
import { Cart } from "@prisma/client";

export class CartsService {
  static async create(data: Cart) {
      const cart = await db.cart.create({
        data: data,
      });
      return cart;
  }
  static async getAllCartsbyUserId(userId: string) {
    const carts = await db.cart.findMany({
      where: {
        userId,
      }
    })
    return carts
  }

  static async getCartItemByUserIdAndProductId(userId: string, productId: string) {
    return await db.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });
  }

  static async updateCartItemQuantity(cartId: string, newQuantity: number) {
    return await db.cart.update({
      where: {
        id: cartId,
      },
      data: {
        quantity: newQuantity,
      },
    });
  }
}
