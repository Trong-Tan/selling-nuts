import { db } from "@/lib/db";
import { string } from "zod";

export class AdminService {
  static async countUsers() {
    const userCount = await db.user.count();
    return userCount;
  }

  static async countOrder() {
    const orderCount = await db.pendingOrder.count();
    return orderCount;
  }

  static async deleteItemById(id: string) {
    const deletedItem = await db.product.delete({
      where: { id },
    });
    return deletedItem;
  }
}