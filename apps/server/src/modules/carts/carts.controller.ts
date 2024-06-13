import { Hono } from "hono"
import { CartsService } from "./carts.service"
import { auth } from "@/middlewares/auth"

export const router = new Hono()

router
.post("/", auth, async (c) => {
  try {
    const data = await c.req.json()
    const user = c.get("user")

    if (!user) {
      return c.json({ message: "Unauthorized", statusCode: 401 }, 401)
    }

    const cart = await CartsService.create({
      ...data,
      userId: user.id,
    })
    return c.json({
      data: cart,
      status: 201,
    })
  } catch (error) {
    console.error("Error creating cart:", error)
    return c.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      500
    )
  }
})

.get("/", async (c) => {
  const products = await CartsService.getAllCarts()
  return c.json({
    data: products,
    status: 200,
  })
})
