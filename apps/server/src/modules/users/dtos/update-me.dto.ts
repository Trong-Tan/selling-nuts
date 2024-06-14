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
  email: z
    .string({
      required_error: "email is required",
    })
    .optional(),
  address: z
    .string({
      required_error: "address is required",
    })
    .optional(),
});
