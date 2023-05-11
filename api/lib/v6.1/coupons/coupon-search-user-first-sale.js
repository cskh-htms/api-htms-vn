

const mysql = require('mysql2');

const config_api = require('../configs/config');


const connection = require('../connections/connections-reader');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./coupon-fields-insert.js');

const function_export = function (user_id,res) {
	
	//return [user_id];
	var sql_text = 'SELECT ' + 
	config_api.PREFIX + 'orders_speciality_ID ' + 
	'FROM ' + 
		config_api.PREFIX + 'orders_speciality ' + 
	" WHERE " + 
		config_api.PREFIX + "orders_speciality_user_id = " + user_id;
	

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
						"position" : "lib->coupon->user-first sale",
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
				//evn, 
				error, 
				"Lỗi get first sale, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->coupon->user-first sale",
			"message": error_send 
		}); 
			
	}
};	


module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














