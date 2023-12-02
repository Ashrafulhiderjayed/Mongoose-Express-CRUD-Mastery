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

const getAllUsersFromDB = async (req: Request, res: Response) =>{
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

const getSingleUserFromDB = async (req: Request, res: Response) =>{
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

export const UserControllers = {
    createUser,
    getAllUsersFromDB,
    getSingleUserFromDB,
};
