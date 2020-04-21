const express = require('express');

import versionRouter from './version';
import userRouter from './user';
import redirectRouter from'./redirect'
let router = express.Router();

router.use('/version', versionRouter);
router.use('/users', userRouter);


// router.use('/myUrlService.com/r', redirectRouter);
//TODO: Write a middleware for using req.url before any routing to split the url and decide to redirect or not

export default router;