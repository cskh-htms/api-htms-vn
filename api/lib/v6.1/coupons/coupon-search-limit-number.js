

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections-reader');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./coupon-fields-insert.js');

const function_export = function (coupon_id,res) {
	

	var sql_text = 'SELECT ' + 
	config_api.PREFIX + 'orders_speciality_master_ID, ' + 
	config_api.PREFIX + 'coupon_speciality_ID ' + 

	'FROM ' + 
		config_api.PREFIX + 'orders_details_speciality ' + 
		
	" LEFT JOIN " + 
		config_api.PREFIX + "orders_speciality  ON  " + 
		config_api.PREFIX + "orders_details_speciality_order_id  = " + 
		config_api.PREFIX + "orders_speciality_ID " + 
		
	" LEFT JOIN " + 
		config_api.PREFIX + "orders_speciality_master  ON  " + 
		config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
		config_api.PREFIX + "orders_speciality_master_ID " + 		
	
	" LEFT JOIN " + 
	config_api.PREFIX + "coupon_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "coupon_speciality_ID " + 
	
	" WHERE " + 
		config_api.PREFIX + "coupon_speciality_ID = " + coupon_id + 
	" AND " + 
		config_api.PREFIX + "orders_speciality_status_orders <> -1" + 
	" AND " + 
		config_api.PREFIX + "orders_details_speciality_line_order = 'coupon' " + 
	" GROUP BY " + 	
	config_api.PREFIX + 'orders_speciality_master_ID, ' + 
	config_api.PREFIX + 'coupon_speciality_ID ' ;
	//return sql_text;
	
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }  , ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->coupon->limit-number",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data coupon delete, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->coupon->limit-number",
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














