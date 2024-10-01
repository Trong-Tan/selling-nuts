import { Hono } from "hono";
import { OrdersService } from "./orders.service";
import { auth } from "@/middlewares/auth";

export const router = new Hono();
router

.get("/", async (c) => {
  const products = await OrdersService.getAllOrder();
  return c.json({
    data: products,
    status: 200,
  });
});

