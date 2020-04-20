const express = require('express');

import versionRouter from './version';
import userRouter from './user';

let router = express.Router();

router.use('/version', versionRouter);
router.use('/users', userRouter);

export default router;