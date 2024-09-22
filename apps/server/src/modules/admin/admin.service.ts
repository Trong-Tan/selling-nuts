import { db } from "@/lib/db";

export class AdminService {
  static async countUsers() {
    const userCount = await db.user.count();
    return userCount;
  }
}