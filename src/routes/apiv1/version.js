import express from 'express';

import { versionController } from '../../controllers';

const router = express.Router();

router.get('/', versionController);

export default router;
