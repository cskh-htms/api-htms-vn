
//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const mysql = require('mysql2');



const config_api = require('../configs/config');


//@
//@
//@ share
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


//@
//@
//@
//@ model
const connection = require('../connections/connections');
const fields_insert = require('./user-fields-insert.js');





//@
//@
//@
//@ function export
const function_export = function (id,res) {
	
	//return id;
	
	var table_name  = config_api.PREFIX + "users ";
	var field_where  = config_api.PREFIX + "users_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ id + '"';
	
	
	//return sql_text;
	
	
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }  , ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->users->delete",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data coupon delete, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->users->delete",
			"message": error_send 
		}); 
			
	}
};	




//@
//@
//@
//@ export
module.exports = function_export;








//@
//@
//@
//@ model














