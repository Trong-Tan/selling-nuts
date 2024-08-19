import { Hono } from "hono";
import { OrdersService } from "./orders.service";
import { auth } from "@/middlewares/auth";

export const router = new Hono();
router
  .post("/", auth, async (c) => {
    const data = await c.req.json();
      const user = c.get("user");

      if (!user) {
        return c.json({ message: "Unauthorized", statusCode: 401 }, 401);
      }
   
      const cart = await OrdersService.create({
        ...data,
        userId: user.id,
      });
      
      return c.json({
        data: cart,
        status: 201,
      });
  })

  .put("/checkout", auth, async (c) => {
    const data = await c.req.json();
    const user = c.get("user");
    try {
      let orderId = await OrdersService.updateBy(user.id, data);
      return c.json({
        data: orderId,
        status: 200,
      });
    } catch (e) {
      console.log(e);
    }
  })

