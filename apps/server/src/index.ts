import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as authRouter } from "./modules/auth/auth.controller";
import { router as usersRouter } from "./modules/users/users.controller";
import { router as productsRouter } from "./modules/products/products.controller";
import { auth } from "./middlewares/auth";
import { errorFilter } from "./lib/error-filter";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.route("/", authRouter);
app.route("/products", productsRouter);
app.route("/users", usersRouter);
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
