

var mysql = require('mysql');
const ojs_models_config = require('./connections-datas');


const connection = mysql.createConnection(ojs_models_config.connection_data);
//
//
// connect to database
connection.connect(function(err, results, fields) {
    if (err) throw err;
	console.log("connection v5 lib ok");
});
//
//exprort concection
module.exports = connection;