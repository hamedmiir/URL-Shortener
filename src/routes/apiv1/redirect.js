import express from 'express';
import {redirectController} from '../../controllers';
const router = express.Router();

router.get('/:ShortUrl', redirectController.redirect);

export default router;