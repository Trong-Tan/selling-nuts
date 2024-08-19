import { db } from "@/lib/db";
import {  Order, Prisma } from "@prisma/client";

export class OrdersService {
  static async create(data: Order) {
      const order = await db.order.create({
        data: data,
      });
      return order;
  }
  static async updateBy(userId: string, data: Prisma.CartUpdateInput) {
    const existingCart = await db.cart.findMany({
      where: {
        id: userId,
      },
    });

    if (!existingCart) {
      throw new Error(`Cart with id ${userId} not found`);
    }

    const cart = await db.cart.updateMany({
      where: {
        id: userId,
      },
      data,
    });
    return cart;
  }
}
