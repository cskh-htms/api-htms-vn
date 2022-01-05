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
	console.log("connection v0 ok");
});
//
//exprort concection
module.exports = connection;