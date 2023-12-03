import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (userData: TUser) => {

    const result = (await User.create(userData)).$set('password', undefined);

    return result;
}

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
}

const getSingleUserFromDB = async (id: number) => {
    const result = await User.findOne({ id });
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
}