import { db } from "@/lib/db";
import { Cart } from "@prisma/client";

export class CartsService {
  static async create(data: Cart) {
    const cart = await db.cart.create({
      data: data,
    });
    return cart;
  }
}
