// import { Hono } from "hono";
// import { auth } from "@/middlewares/auth";
// import { CartsService } from "./carts.service";
// import { zValidator } from "@hono/zod-validator";
// // import { queryPostArgs } from "./dtos/query-post.dto";
// // import { CommentsService } from "../comments/comments.service";
// // import { createCommentDto } from "../comments/dto/add-comment.dto";
// // import { createPostDto } from "./dtos/create-post.dto";
// export const router = new Hono();

// router
//   .post("/", auth, zValidator("json", createPostDto), async (c) => {
//     const data = await c.req.json();
//     const user = c.get("user");

//     const post = await CartsService.create({
//       ...data,
//       userId: user.id,
//     });
//     return c.json({
//       data: post,
//       status: 201,
//     });
//   })