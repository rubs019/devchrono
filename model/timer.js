/**
 * Created by rubz on 2/20/17.
 */
'use strict';
const mysql	=	require('mysql');
const moment = require('moment');

class Timer {

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
    mysqlTimestamp(){
        /* Retourne le timestamp actuel
        * Utiliser pour sauvegarder la data d'insertion */
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    };
    insert_timer(data){
        const timeStamp = this.mysqlTimestamp();
        this.connection.query('INSERT INTO data ' +
            '(data_id, datastamp, data_title, data_content, data_cat_id, data_min, data_sec)' +
            'VALUES (NULL, ?, ?, ?, ?, ?, ?)',
            [timeStamp, data.title, data.content, data.categorize , data.minute, data.second], function(error, results, fields) {
                if (error) {
                    return false
                }
                return true
            });
    }
}

module.exports = Timer;