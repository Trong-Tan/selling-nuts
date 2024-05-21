import { Hono } from "hono";
import { ProductsService } from "./products.service";

export const router = new Hono();

router
.get("/:id", async (c) => { 
  const productId = c.req.param("id");
  const product = await ProductsService.getProductById(productId);
  return c.json({
    data: product,
    status: 200,
  })
})

.get("/", async (c) => {
    const products = await ProductsService.getAllProducts();
    return c.json({
      data: products,
      status: 200,
    });
  });
