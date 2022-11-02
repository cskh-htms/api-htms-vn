
/*

//'user strict';

var mysql = require('mysql');
//require model conConfig
const ojs_models_config = require('./models-config');


//
//
//local mysql db connection
const connection = mysql.createConnection(ojs_models_config.connection_data);
//
//
// connect to database
connection.connect(function(err, results, fields) {
    if (err) throw err;
	console.log("connection v4 ok");
});
//
//exprort concection
module.exports = connection;


*/

const mysql2 = require('mysql2');
const ojs_models_config = require('./models-config');


const connection2 = mysql2.createPool(ojs_models_config.connection_data);


//
//exprort concection
module.exports = connection2;






