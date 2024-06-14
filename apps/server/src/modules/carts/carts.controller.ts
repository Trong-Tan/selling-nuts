import { Hono } from "hono"
import { CartsService } from "./carts.service"
import { auth } from "@/middlewares/auth"

export const router = new Hono()

router
.post("/", auth, async (c) => {
  try {
    const data = await c.req.json();
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized", statusCode: 401 }, 401);
    }

    const existingCartItem = await CartsService.getCartItemByUserIdAndProductId(user.id, data.productId);

    let cart;
    if (existingCartItem) {
      cart = await CartsService.updateCartItemQuantity(existingCartItem.id, existingCartItem.quantity + data.quantity);
    } else {
      cart = await CartsService.create({
        ...data,
        userId: user.id,
      });
    }

    return c.json({
      data: cart,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    return c.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      500
    );
  }
})

.get("/",auth, async (c) => {
  const user = c.get("user")
  const userId = user.id
  const carts = await CartsService.getAllCartsbyUserId(userId)
  
  return c.json({
    data: carts,
    status: 200,
  })
})
