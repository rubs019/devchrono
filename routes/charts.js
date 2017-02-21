'use strict';
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const mysql	=	require('mysql');
var moment = require('moment');


/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "DevChrono - Charts";
  res.render('charts/index', { title : title});
});

module.exports = router;
