'use strict';
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const model = require('../model/timer');
const mysql	=	require('mysql');
var moment = require('moment');


/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "DevChrono";

  res.render('index', { title : title});
});

router.post('/tasks/save', function(req, res, next){
	let data = req.body;
	console.log(data);

    let db = new model();
    if(db.insert_timer(data)){
        res.json('true')
    } else {
        res.json('false')
    }
    });

module.exports = router;
