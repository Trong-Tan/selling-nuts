import { Hono } from "hono";
import { AdminService } from "./admin.service";
import { auth } from "@/middlewares/auth"; // Nếu bạn cần xác thực, thêm middleware

export const router = new Hono();

router.get("/user-count", async (c) => {
  const userCount = await AdminService.countUsers();
    return c.json({
      data: userCount,
      status: 200,
    });
});
