import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { ProductsService } from "./products.services";

export const router = new Hono();

router.get("/", auth, async (c) => {
  const products = await ProductsService.getAll();
  return c.json({
    data: products,
    status: 200,
  });
});
