import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is not valid!' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters!' })
})

export const signUpSchema = z.object({
  firstName: z
    .string()
    .transform(value => value.trim())
    .pipe(
      z
        .string()
        .min(1, { message: 'First name is required' })
        .max(32, { message: 'First name is too long' })
        .refine(value => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), 'First name should contain only alphabets')
    ),
  lastName: z
    .string()
    .transform(value => value.trim())
    .pipe(
      z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(32, { message: 'Last name is too long' })
        .refine(value => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), 'Last name should contain only alphabets')
    ),
  email: z.string().email({ message: 'Email is not valid!' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
  gender:  z.string()
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is not valid!' })
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters!' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .transform(value => value.trim())
    .pipe(
      z
        .string()
        .min(1, { message: 'First name is required' })
        .max(32, { message: 'First name is too long' })
        .refine(value => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), 'First name should contain only alphabets')
    ),
  lastName: z
    .string()
    .transform(value => value.trim())
    .pipe(z.string().min(1, { message: 'Last name is required' })),
  dob: z.string().min(1, { message: 'Date of birth is required' })
})

export const createRoomSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.coerce.number().min(1, { message: 'Price is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  description: z.string().min(1, { message: 'Description is required' })
})
