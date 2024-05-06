import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as authRouter } from "./modules/auth/auth.controller";
import { router as categoriesRouter } from "./modules/categories/categories.controller";
import { router as usersRouter } from "./modules/users/users.controller";
import { router as uploadRouter } from "./modules/upload/upload.controller";
import { router as postsRouter } from "./modules/posts/posts.controller";
import { router as productsRouter } from "./modules/products/products.controller";
import { router as groupsRouter } from "./modules/groups/groups.controller";
import { errorFilter } from "./lib/error-filter";
import { auth } from "./middlewares/auth";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://airbnb-clone-nu-rouge.vercel.app",
    ],
    credentials: true,
  }),
);

app.route("/", authRouter);
app.route("/categories", categoriesRouter);
app.route("/users", usersRouter);
app.route("/posts", postsRouter);
app.route("/products", productsRouter);
app.route("/groups", groupsRouter);
app.all("*", auth).route("/upload", uploadRouter);

app.notFound((c) => {
  return c.json(
    {
      message: "Not found",
      statusCode: 404,
    },
    404,
  );
});

app.onError(errorFilter);

serve(app, () => {
  console.log("Server is running on http://localhost:3000");
});
