import { db } from "@/lib/db";
import { CreateProductDto } from "./dto/create-products.dto";

export class ProductsService {
  static async getAllBy({ categoryId }: { categoryId?: string }) {
    const products = await db.product.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return products;
  }
  static async getAll() {
    const product = await db.product.findMany();
    return product;
  }

  static async addProduct(categoryId: string, data: CreateProductDto) {
    const product = await db.product.create({
      data: {
        ...data,
        categoryId: categoryId,
        images: data.images,
      },
    });
    return product;
  }
}
