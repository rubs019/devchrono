'use strict';
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const mysql	=	require('mysql');
const moment = require('moment');
const model = require('../model/category');


/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "DevChrono - Charts";
  let db = new model();
  db.select_all_category(function(result){
      res.render('charts/index', { title : title, category: result});
  });
});

module.exports = router;
