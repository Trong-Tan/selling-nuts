import { z } from "zod";

export const createCategoryDto = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  parentCategoryId: z.string().optional(),
  icon: z.string().optional(),
});
