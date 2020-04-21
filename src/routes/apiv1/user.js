import express from 'express';
import {userController} from '../../controllers';
const router = express.Router();

router.get('/:id', userController.findUser);

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/:id/urls', userController.addUrl);

export default router;