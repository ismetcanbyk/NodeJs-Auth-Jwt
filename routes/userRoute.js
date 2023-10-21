import express from 'express';
import * as authGuard from '../middlewares/authGuard.js';
import * as userController from '../controllers/userController.js';


const router = express.Router();


router.route('/welcome').get(authGuard.authGuard);

router.route('/update').post(userController.updateUser);

router.route('/delete').post(userController.deleteUser);

router.route('/find').get(userController.findUser);



export default router;