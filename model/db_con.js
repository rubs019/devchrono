/**
 * Created by rubz_johnson on 04/01/17.
 */
'use strict';
let mysql	=	require('mysql');

const dbParam = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'devchrono'
};

module.exports = {
    connexion : function(callback) {
       let connection = mysql.createConnection(dbParam);
        connection.connect(function(err){
        	if(err) {
                console.log('Error connecting : ' + err.stack);
                return false;
            }
            console.log('Connecting to Database : SUCCESS !');
            return true;
		});
    }
};
