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

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateSingleUserFromDB
}