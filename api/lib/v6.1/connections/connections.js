
const mysql2 = require('mysql2');
//const mysql = require('mysql');
const ojs_models_config = require('./connections-datas');




//console.log(ojs_models_config.connection_data);

//const connection = mysql.createConnection(ojs_models_config.connection_data);
const connection2 = mysql2.createPool(ojs_models_config.connection_data);



//@
//@
//@ connect to database
//connection.connect(function(err, results, fields) {
    //if (err) throw err;
	//console.log("connection v5 lib ok");
//});






//
//exprort concection
module.exports = connection2;







