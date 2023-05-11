

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./user-tracking-fields-get.js');
const fields_insert = require('./user-tracking-fields-insert.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


const order_insert = function (user_id,res) {
	
	var sql_text = "";
	
	sql_text = "START TRANSACTION ; "
	sql_text = 	sql_text   + "DELETE FROM  " + 
				config_api.PREFIX + "users_tracking " + 
				"where " + config_api.PREFIX + "users_tracking_user_id = " + user_id + "; ";

	sql_text = 	sql_text   + "UPDATE  " + 
				config_api.PREFIX + "users " + 
				"set " + config_api.PREFIX + "users_status = 0 " + 
				"where " + config_api.PREFIX + "users_ID = " + user_id + "; ";
	
	//commit
	sql_text = sql_text + " COMMIT;"	
	

	//@
	//@
	//@
	//@ run
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } ,  ( err , results , fields ) => {
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
						"position" : "lib->user-tracking->unlock",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			});
		} );		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->user-tracking->unlock",
			"message": error_send 
		}); 
			
	}
};	


module.exports = order_insert;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














