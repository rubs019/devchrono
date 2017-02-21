/**
 * Created by rubz on 2/21/17.
 */
'use strict'
const mysql	=	require('mysql');
const model = require('../model/timer');

class Category {
    constructor(){
        const dbParam = {
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'devchrono2'
        };
        this.connection = mysql.createConnection(dbParam);
        this.connection.connect(function(err) {
            if (err) {
                console.log('Error connecting : ' + err.stack);
                return false;
            } else {
                console.log('Connection SUCCESS');
            }
        });
    }

    select_all_category(callback){
        const query = 'SELECT * FROM data_categorize';
        this.connection.query(query, function(error, results, fields){
            if(error){callback(false)}
            callback(results);
        });
    }
}

module.exports = Category;