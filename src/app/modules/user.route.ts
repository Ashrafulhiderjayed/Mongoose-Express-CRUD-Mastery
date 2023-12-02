import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//will call controller function
router.get('/', UserControllers.getAllUsersFromDB)

router.get('/:userId', UserControllers.getSingleUserFromDB)

router.post('/', UserControllers.createUser);

export const UserRoutes = router;