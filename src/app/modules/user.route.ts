import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//will call controller function
router.get('/', UserControllers.getAllUsers)

router.get('/:userId', UserControllers.getSingleUser)

router.delete('/:userId', UserControllers.deleteSingleUser)

router.post('/', UserControllers.createUser);

export const UserRoutes = router;