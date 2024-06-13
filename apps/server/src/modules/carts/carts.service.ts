import { db } from "@/lib/db";
import { Cart } from "@prisma/client";

export class CartsService {
  static async create(data: Cart) {
    try {
      const cart = await db.cart.create({
        data: data,
      });
      return cart;
    } catch (error) {
      console.error("Error creating cart in database:", error);
      throw new Error("Error creating cart");
    }
  }
  static async getAllCarts() {
    const carts = await db.product.findMany();
    return carts;
  }
}
