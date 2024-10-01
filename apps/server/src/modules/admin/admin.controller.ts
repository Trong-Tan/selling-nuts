import { Hono } from "hono";
import { AdminService } from "./admin.service";
import { auth } from "@/middlewares/auth"; // Nếu bạn cần xác thực, thêm middleware

export const router = new Hono();

router
.get("/user-count", async (c) => {
  const userCount = await AdminService.countUsers();
    return c.json({
      data: userCount,
      status: 200,
    });
})

.get("/order-count", async (c) => {
  const orderCount = await AdminService.countOrder();
    return c.json({
      data: orderCount,
      status: 200,
    });
})

.delete("/deleteItem/:id", auth, async (c) => {
  const id = c.req.param('id');
  const deletedItem = await AdminService.deleteItemById(id);
  return c.json({
    data: deletedItem,
    status: 200,
  });
});
