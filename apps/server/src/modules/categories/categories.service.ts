import { db } from "@/lib/db";
import { type Category } from "@prisma/client";

export class CategoriesService {
  static async getAll() {
    const data = await db.category.findMany({});
    return data;
  }

  static async getRootCategories() {
    const categories = await db.category.findMany({
      where: { parentCategoryId: null },
    });
    return categories;
  }

  static async create(data: Category) {
    const category = await db.category.create({ data });
    return category;
  }

  static async getBy(categoryId: string) {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });
    return category;
  }

  static async getSubCategories(categoryId: string) {
    const subCategories = await db.category.findMany({
      where: { parentCategoryId: categoryId },
    });
    return subCategories;
  }

  static async delete(categoryId: string) {
    const category = await db.category.delete({
      where: { id: categoryId },
    });
    return category;
  }
  static async updateBy(categoryId: string, data: Category) {
    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });
    return category;
  }
}
