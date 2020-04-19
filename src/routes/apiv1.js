const express = require('express');

import {getVersion} from '../controllers/root'


let router = express.Router();

router.get('/version', getVersion);



export default router;