import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { updatePostDto } from "./dtos/update-post.dto";
import { PostsService } from "./posts.service";
export const router = new Hono();

router
  .post("/", async (c) => {
    const data = await c.req.json();
    const post = await PostsService.create(data);
    return c.json({
      data: post,
      status: 201,
    });
  })

  .get("/", auth, async (c) => { 
    const posts = await PostsService.getAllPosts();
    return c.json({
      data: posts,
      status: 200,
    });
  });