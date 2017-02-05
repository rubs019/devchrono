'use strict';
let express = require('express');
let router = express.Router();
let ejs = require('ejs');
let model = require('../model/db_con');
let mysql	=	require('mysql');
let moment = require('moment');


/* GET home page. */
router.get('/', (req, res, next) => {
  let title = "DevChrono";
  res.render('index', { title : title});
});

router.post('/tasks/save', function(req, res, next){
    const dbParam = {
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'devchrono'
    };
	let data = req.body;
    let connection = mysql.createConnection(dbParam);
    connection.connect(function(err){
        let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        if(err) {
            console.log('Error connecting : ' + err.stack);
            return false;
        }
        console.log('Connecting to Database : SUCCESS !');
        connection.query('INSERT INTO data ' +
			'(data_id, datastamp, data_title, data_content, data_min, data_sec)' +
			'VALUES (NULL, ?, ?, ?, ?, ?)',
			[mysqlTimestamp, data.title, data.content, data.minute, data.second], function(error, results, fields){
                console.log(results);
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }
                res.json('true');
            });
    });
});

module.exports = router;
