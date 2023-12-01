import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";


const fullNameSchema = new Schema<TFullName>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
})

const addressSchema = new Schema<TAddress>({
    street: {type: String, required: true},
    city: {type: String},
    country: {type: String},
})

const userSchema = new Schema<TUser>({
    userId: {type: Number, required: true, trim: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {
        type: fullNameSchema,
        required: [true, 'FullName is required'],
        trim: true
    },
    age: {type: Number},
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    isActive: {type: Boolean},
    hobbies: [{ type: String }, { type: String }],
    address: {
        type: addressSchema,
        required: true,
    },
})

//model create
export const User = model<TUser>('User', userSchema)