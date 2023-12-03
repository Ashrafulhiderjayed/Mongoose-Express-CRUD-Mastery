import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserModel } from "./user.interface";


const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String },
    country: { type: String },
})

const ordersSchema = new Schema<TOrders>({
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

const userSchema = new Schema<TUser, UserModel>({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        type: fullNameSchema,
        required: [true, 'FullName is required'],
        trim: true
    },
    age: { type: Number },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    isActive: { type: Boolean },
    hobbies: [{ type: String }, { type: String }],
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: { type: [ordersSchema] },
})

//creating custom staic method
userSchema.statics.isUserExists = async function(id: number){
    const existingUser = await User.findOne({id});
    return existingUser;
}

//model created
export const User = model<TUser, UserModel>('User', userSchema)