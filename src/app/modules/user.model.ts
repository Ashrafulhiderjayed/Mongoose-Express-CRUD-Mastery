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
        required: [true, 'lastName name is required'],
        trim: true,
    }
})

const addressSchema = new Schema<TAddress>({
    street: {type: String, required: [true, 'street is required']},
    city: {type: String, required: [true, 'city is required']},
    country: {type: String, required: [true, 'country is required']}
})

const ordersSchema = new Schema<TOrders>({
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

const userSchema = new Schema<TUser, UserModel>({
    userId: { type: Number, required: [true, 'userId is required'] },
    username: { type: String, required: [true, 'password is required'] },
    password: { type: String, required: [true, 'password is required'] },
    fullName: {
        type: fullNameSchema,
        required: [true, 'FullName is required']
    },
    age: { type: Number, required: [true, 'age is required']},
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    isActive: { type: Boolean },
    hobbies: { type: [String], required: [true, 'hobbies required'] },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: { type: [ordersSchema] },
    // isDeleted:{ type: Boolean, default: false },
})

// //pre save middleware
// userSchema.pre('save', async function (next) {
//     const user = this; 

//     //hashing password and save into DB
//     user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
//     next();
// })

// //post save middleware/ hook
// userSchema.post('save', function(doc, next){
//     doc.password = '';
//     console.log('post hook: we saved our data');
//     next();
// })

//Query middleware
// userSchema.pre('find', function(next){
//     this.find({isDeleted: {$ne: true}})
//     next();
//   })
  
//   userSchema.pre('findOne', function(next){
//     this.find({isDeleted: {$ne: true}})
//     next();
//   })

//creating custom staic method
userSchema.statics.isUserExists = async function(userId: number){
    const existingUser = await User.findOne({userId});
    return existingUser;
}

//pre save middleware/ hook: will work on create(), save()
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; 

    //hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    //remove orders
    user.$set('orders', undefined);
    next();
  });

  //post save middleware/ hook
// userSchema.post('save', function(doc, next){
//     doc.password = '';
//     console.log('post hook: we saved our data');
//     next();
// })

//model created
export const User = model<TUser, UserModel>('User', userSchema)