import { db } from "@/lib/db";
import {  Order, Prisma } from "@prisma/client";

export class OrdersService {
  static async getAllOrder() {
    const order = await db.pendingOrder.findMany();
    return order;
  }

  
}
