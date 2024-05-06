import { Hono } from "hono";
import { CategoriesService } from "./categories.service";
import { auth } from "@/middlewares/auth";
import { ProductsService } from "../products/products.services";
import { zValidator } from "@hono/zod-validator";
import { createCategoryDto } from "./dtos/create-category.dto";
import { createProductDto } from "../products/dto/create-products.dto";

export const router = new Hono();

router
  .get("/", async (c) => {
    const categories = await CategoriesService.getAll();
    return c.json({
      data: categories,
      status: 200,
    });
  })
  .get("/root", async (c) => {
    const categories = await CategoriesService.getRootCategories();
    return c.json({
      data: categories,
      status: 200,
    });
  })
  .post("/", auth, zValidator("json", createCategoryDto), async (c) => {
    const data = await c.req.json();
    const category = await CategoriesService.create(data);
    return c.json({
      data: category,
      status: 200,
    });
  })
  .get("/:categoryId", async (c) => {
    const categoryId = c.req.param("categoryId");
    const category = await CategoriesService.getBy(categoryId);
    return c.json({
      data: category,
      status: 200,
    });
  })
  .delete("/:categoryId", auth, async (c) => {
    const categoryId = c.req.param("categoryId");
    const category = await CategoriesService.delete(categoryId);
    return c.json({
      data: category,
      status: 200,
    });
  })
  .get("/:categoryId/products", async (c) => {
    const categoryId = c.req.param("categoryId");
    const rooms = await ProductsService.getAllBy({ categoryId });
    return c.json({
      data: rooms,
      status: 200,
    });
  })
  .post(
    "/:categoryId/products",
    auth,
    zValidator("json", createProductDto),
    async (c) => {
      const input = await c.req.json();
      const categoryId = c.req.param("categoryId");
      const rooms = await ProductsService.addProduct(categoryId, input);
      return c.json({
        data: rooms,
        status: 200,
      });
    },
  )
  .get("/:categoryId/sub-categories", async (c) => {
    const categoryId = c.req.param("categoryId");
    const subCategories = await CategoriesService.getSubCategories(categoryId);
    return c.json({
      data: subCategories,
      status: 200,
    });
  })
  .put("/", auth, async (c) => {
    const data = await c.req.json();
    const user = c.get("user");
    const updatedCategories = await CategoriesService.updateBy(user.id, data);
    return c.json({
      data: updatedCategories,
      status: 200,
    });
  });
