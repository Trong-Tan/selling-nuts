import { db } from "@/lib/db";
import { Cart, pendingOrder } from "@prisma/client";

export class CartsService {
  static async create(data: Cart) {
      return await db.cart.create({
        data: data,
      });
  }

  static async getAllCartsbyUserId(userId: string) {
    return await db.cart.findMany({
      where: {
        userId,
      }
    });
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

  static async checkOut(data: pendingOrder) {
    return await db.pendingOrder.create({
      data: data,
    });
  }
}