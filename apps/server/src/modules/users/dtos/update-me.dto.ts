import { z } from "zod";

export const updateMeDto = z.object({
  firstName: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  lastName: z.string({
    required_error: "Name is required",
  }).optional(),
  age: z
    .number({
      required_error: "Age is required",
    })
    .optional(),
  avatar: z
    .string({
      required_error: "Avatar is required",
    })
    .optional(),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .optional(),
});
