import { z } from "zod";

const FullNameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});


const OrderValidationSchema = z.object({
    productName: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional()
  });

export const UserValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: FullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AddressValidationSchema,
    orders: z.array(OrderValidationSchema).optional(),
});

export const UpdateUserValidationSchema = z.object({
    userId: z.number().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    fullName: FullNameValidationSchema.optional(),
    age: z.number().optional(),
    email: z.string().email().optional(),
    isActive: z.boolean().optional(),
    hobbies: z.array(z.string()).optional(),
    address: AddressValidationSchema.optional(),
    orders: z.array(OrderValidationSchema).optional(),
});

// export const UserValidations = {
//     UserValidationSchema,
//     updateUserValidationSchema
// };