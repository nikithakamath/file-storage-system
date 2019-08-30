'use strict';

const express = require('express');
const router = express.Router();

router.use('/file', require('./fileController'));

module.exports = router;
