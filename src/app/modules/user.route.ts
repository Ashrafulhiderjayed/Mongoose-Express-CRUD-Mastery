import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//will call controller function
router.get('/', UserControllers.getAllUsers)

router.get('/:userId', UserControllers.getSingleUser)

router.delete('/:userId', UserControllers.deleteSingleUser)

router.post('/', UserControllers.createUser);

router.put('/:userId', UserControllers.updateSingleUser)

//Order Management:
router.put('/:userId/orders', UserControllers.putOrder)

router.get('/:userId/orders', UserControllers.getAllOrders)

router.get('/:userId/orders/total-price', UserControllers.calculateAllOrdersPrice)

export const UserRoutes = router;