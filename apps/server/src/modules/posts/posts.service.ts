import { db } from "@/lib/db";

export class PostsService {
  static async create(data: any) {
    const post = await db.post.create({
      data: data,
    });
    return post;
  }
  static async getByUserId(userId: string) {
    const posts = await db.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }
  static async getAllPosts() {
    const posts = await db.post.findMany({});
    return posts;
  }
}
