import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserModel } from "./user.interface";
import config from "../config";
import bcrypt from "bcrypt";


const fullNameSchema = new Schema<TFullName>({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'],
    },
    lastName: { 
        type: String, 
        required: [true, 'First name is required'],
        trim: true,
    }
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

//pre save middleware
userSchema.pre('save', async function (next) {
    const user = this; 

    //hashing password and save into DB
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
    next();
})

//post save middleware/ hook
userSchema.post('save', function(doc, next){
    // doc.password = '' //don't need this. doc=full document
    console.log('post hook: we saved our data');
    next();
  })
  

//creating custom staic method
userSchema.statics.isUserExists = async function(id: number){
    const existingUser = await User.findOne({id});
    return existingUser;
}

//model created
export const User = model<TUser, UserModel>('User', userSchema)