import { db } from "../../lib/db";

export class ProductsService {
  static async getProductById(id: string) {
    const product = await db.product.findUnique({
      where: { id },
    });
    return product;
  }

  static async getAllProducts() {
    const products = await db.product.findMany();
    return products;
  }
}
