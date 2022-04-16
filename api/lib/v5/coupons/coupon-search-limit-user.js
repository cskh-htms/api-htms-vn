

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');
const fields_insert = require('./coupon-fields-insert.js');

const function_export = function (coupon_id,user_id,res) {
	
	//return [coupon_id,user_id];
	var sql_text = 'SELECT COUNT(' + 
	config_database.PREFIX + 'orders_details_speciality_ID' + ') AS user_sum ' + 
	'FROM ' + 
		config_database.PREFIX + 'orders_details_speciality ' + 
		
	" LEFT JOIN " + 
		config_database.PREFIX + "orders_speciality  ON  " + 
		config_database.PREFIX + "orders_details_speciality_order_id  = " + 
		config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
		config_database.PREFIX + "users  ON  " + 
		config_database.PREFIX + "orders_speciality_user_id  = " + 
		config_database.PREFIX + "users_ID " + 	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "coupon_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_product_id  = " + 
	config_database.PREFIX + "coupon_speciality_ID " + 
	
	" WHERE " + 
		config_database.PREFIX + "coupon_speciality_ID = " + coupon_id + 
	" AND " + 
		config_database.PREFIX + "orders_speciality_status_orders <> -1" + 
	" AND " + 
		config_database.PREFIX + "orders_speciality_user_id = " + user_id + 	
	" AND " + 
		config_database.PREFIX + "orders_details_speciality_line_order = 'coupon'";
	

	//return sql_text;
	
	
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }  , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					res.send({ 
						"error" : "10", 
						"position" : "lib->coupon->limit-user",
						"message": error_send 
					}); 
					return;					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi insert data coupon delete, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->coupon->limit-user",
			"message": error_send 
		}); 
		return;	
	}
};	


module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/













