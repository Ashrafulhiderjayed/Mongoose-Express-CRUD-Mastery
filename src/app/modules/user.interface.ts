import { Model } from "mongoose";

export type TFullName = {
    firstName: string;
    lastName: string;
}

export type TAddress = {
    street: string;
    city: string;
    country: string;
}

export type TOrders = {
    productName: string,
    price: number,
    quantity: number
}

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: [string, string];
    address: TAddress;
    orders: TOrders[];
    // isDeleted: boolean;
}

//Static method
export interface UserModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}