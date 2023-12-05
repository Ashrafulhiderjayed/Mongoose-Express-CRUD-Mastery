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

  //update single user
const updateSingleUser = async(req: Request, res: Response) =>{
    try {
        const id = req.body;

        //zod validation
        const zodParseData = UserValidationSchema.parse(userData)

        const userId = zodParseData.userId

        const result = await UserServices.deleteUserFromDB(userId, zodParseData);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
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


  // put/create order 
const putOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const userId = req.params.userId
  
      const result = await UserServices.putOrderIntoDB(userId, orderData);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
        error: {
          code: 404,
          description: error.message || 'Order not found!',
        },
      });
    }
  };

//get all orders for single user
const getAllOrders = async(req : Request, res : Response) =>{
    try{
        const id = req.params.userId
        const result = await UserServices.getAllOrdersFromDB(id)
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result
        })
    }catch (error) {
        res.status(500).json({
          success: false,
          message: 'Orders not found',
          error: {
            code: 404,
            description: error.message || 'User not found!',
          },
        });
      }
  }
  
  //get all orders and calculated total price
  const calculateAllOrdersPrice = async(req : Request, res : Response) =>{
    try{
      const id = req.params.userId
        const result = await UserServices.calculateOrdersPriceFromDB(id)
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result
        })
    }catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Orders not found',
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
    deleteSingleUser,
    putOrder,
    getAllOrders,
    calculateAllOrdersPrice
};
