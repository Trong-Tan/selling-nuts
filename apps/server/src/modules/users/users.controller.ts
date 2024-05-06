import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { updateMeDto } from "./dtos/update-me.dto";
import { UsersService } from "./users.services";
import { PostsService } from "../posts/posts.service";

export const router = new Hono();

router
  .get("/", auth, async (c) => {
    const q = c.req.query("q");
    const users = await UsersService.getAll(q);
    return c.json({
      data: users,
      status: 200,
    });
  })
  .get("/me", auth, async (c) => {
    const user = c.get("user");
    delete user.password;
    return c.json({
      data: user,
      status: 200,
    });
  })
  .put("/me", auth, zValidator("json", updateMeDto), async (c) => {
    const data = await c.req.json();
    const user = c.get("user");
    const updatedMe = await UsersService.updateBy(user.id, data);

    return c.json({
      data: updatedMe,
      status: 200,
    });
  })
  .get("/:userId", async (c) => {
    const userId = c.req.param("userId");
    const user = await UsersService.getBy(userId);
    return c.json({
      data: user,
      status: 200,
    });
  })
  .get("/:userId/posts", auth, async (c) => {
    const userId = c.req.param("userId");
    const posts = await PostsService.getByUserId(userId);

    return c.json({
      data: posts,
      status: 200,
    });
  });
