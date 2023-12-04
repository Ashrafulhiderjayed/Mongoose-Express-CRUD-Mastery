import { z } from "zod";

const FullNameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string().min(1),
});

const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string().optional(),
    country: z.string().optional(),
});


const OrderValidationSchema = z.object({
    productName: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional()
  });

const UserValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: FullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.tuple([z.string(), z.string()]),
    address: AddressValidationSchema,
    orders: z.array(OrderValidationSchema).optional(),
    idDeleted: z.boolean(),
});

export default UserValidationSchema;