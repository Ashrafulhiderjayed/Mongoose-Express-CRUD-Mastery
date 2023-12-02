import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB = async (userData: TUser) =>{
   
    const result = await UserModel.create(userData);

    return result;
}

const getAllUsersFromDB = async () =>{
    const result = await UserModel.find();
    return result;
}

const getSingleUserFromDB = async (id: number) =>{
    const result = await UserModel.findOne({id});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
}