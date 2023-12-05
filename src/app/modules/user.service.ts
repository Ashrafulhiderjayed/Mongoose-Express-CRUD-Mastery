import { bcrypt } from 'bcrypt';
import config from "../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

//create user
const createUserIntoDB = async (userData: TUser) => {

    const result = (await User.create(userData)).$set('password', undefined);

    return result;
}

//get all users
const getAllUsersFromDB = async () => {
    const result = await User.find().select({
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    });
    return result;
};

const getSingleUserFromDB = async (userId: number) => {
    const result = await User.findOne({ userId });
    return result;
}

//delete
const deleteUserFromDB = async (userId: string) => {
    if (!(await User.isUserExists(userId))) {
      throw new Error('User does not Exist');
    }
    const result = await User.deleteOne({ userId });
    return result;
  };

  //update single user
const updateSingleUserFromDB = async (userId: number, userData: any) => {
    if (!(await User.isUserExists(userId))) {
      throw new Error('User does not Exist');
    }
  
    //hashing password
    if(userData.password){
      userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
    }
    const result = await User.findOneAndUpdate({userId}, userData).select({_id: 0, password: 0, orders: 0 })
    return result
  };

  //put order
const putOrderIntoDB = async (userId: number, orderData: any) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User does not Exist');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true }
  );
  return result;
};

//get all order for single user
const getAllOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User does not Exist');
  }
  const result = await User.findOne({userId}).select({orders: 1, _id: 0});
  return result;
};

//calculate total price of order for single user
const calculateOrdersPriceFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User does not Exist');
  }
  const user = await User.findOne({ userId });
    if (!user) {
      return 0;
    }
    //calculate
    let totalPrice = 0;
    user.orders.forEach(order => {
      totalPrice = parseFloat((totalPrice + order.price * order.quantity).toFixed(2));
    });

    return {totalPrice};
};

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateSingleUserFromDB,
    putOrderIntoDB,
    getAllOrdersFromDB,
    calculateOrdersPriceFromDB
}