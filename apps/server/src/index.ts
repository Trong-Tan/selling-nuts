import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as authRouter } from "./modules/auth/auth.controller";
import { router as usersRouter } from "./modules/users/users.controller";
import { router as cartsRouter } from "./modules/carts/carts.controller";
import { router as productsRouter } from "./modules/products/products.controller";
import { router as ordersRouter } from "./modules/orders/orders.controller";
import { router as adminRouter } from "./modules/admin/admin.controller";
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
app.route("/carts", cartsRouter);
app.route("/orders", ordersRouter);
app.route("/admin", adminRouter);
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
