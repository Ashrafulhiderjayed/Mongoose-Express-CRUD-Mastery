import { Request, Response } from "express";
import { UserServices } from "./user.service";
import UserValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        //Data validation using zod
        const zodParseData = UserValidationSchema.parse(user)

        // will call service function to send this data
        const result = await UserServices.createUserIntoDB(zodParseData);

        // send response 
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) =>{
    try{
        const result = await UserServices.getAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: "Users retrive successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || "Something went wrong",
          error: err,
        });
      }
}

//get single user
const getSingleUser = async (req: Request, res: Response) =>{
    try{
        const id = req.params.userId
        const result = await UserServices.getSingleUserFromDB(id)

        res.status(200).json({
            success: true,
            message: "User is retrive successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || "Something went wrong",
          error: err,
        });
      }
}

// update single user 
const updateSingleUser = async (req: Request, res: Response) =>{
    try{
        const id = req.body;

        //Data validation using zod
        const zodParseData = UserValidationSchema.parse(id);

        const userId = zodParseData.userId

        const result = await UserServices.updateSingleUserFromDB(userId)

        res.status(200).json({
            success: true,
            message: "User is retrive successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || "Something went wrong",
          error: err,
        });
      }
}

//delete single user
const deleteSingleUser = async(req: Request, res: Response) =>{
    try {
        const id = req.params.userId
        const result = await UserServices.deleteUserFromDB(id)
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        })
    } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: error.message || 'User not found!',
          },
        });
      }
  }

export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
};
