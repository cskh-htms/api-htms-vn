

//@
//@
//@
//@ file start







//@
//@
//@
//@ require
const mysql = require('mysql2');









//@
//@
//@
//@ config
const ojs_configs = require('../../../../configs/config');
const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');





//@
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
const fields_insert = require('../shipping-tracking/shipping-tracking-fields-insert.js');




//@
//@
//@
//@ function export
const function_export = function (data,tracking,res) {
	//return data;
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
		var dataGo = {
			"shipping_tracking_users_id"					: datas.shipping_tracking_users_id,
			"shipping_tracking_orders_id"					: datas.shipping_tracking_orders_id,			
			"shipping_tracking_orders_status"				: datas.shipping_tracking_orders_status,			

			"shipping_tracking_infomation"					: mysql.escape(datas.shipping_tracking_infomation).replace(/^'|'$/gi, ""),		
			"shipping_tracking_qoute"						: mysql.escape(datas.shipping_tracking_qoute).replace(/^'|'$/gi, "")	
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data coupon, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "lib->orders->push-ghtk",
			"message": error_send 
		}); 
		return;
	}	
	
	//return dataGo;
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}
	//res.send([data]);
	//return;
	
	
	

	//@
	//@
	//@ sql
	sql_text = "START TRANSACTION ; "
	sql_text = sql_text + "INSERT INTO " + config_database.PREFIX + "shipping_tracking  SET ? ; ";
	sql_text = sql_text + "UPDATE " + config_database.PREFIX + "orders_speciality  SET  " + 
				config_database.PREFIX + "orders_speciality_status_orders = " + data.shipping_tracking_orders_status + ", " + 
				config_database.PREFIX + "orders_speciality_shipper_id = " + data.shipping_tracking_users_id + ", " + 
				config_database.PREFIX + "orders_speciality_shipping_code = '" + tracking +  "'" + 
				
				" WHERE " + config_database.PREFIX + "orders_speciality_ID = " + datas.shipping_tracking_orders_id  + " ;" ;
	
	
	sql_text = sql_text + " COMMIT;"





	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
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
						"position" : "lib->orders->push-ghtk",
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
				evn, 
				error, 
				"Lỗi insert data coupon add, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->orders->push-ghtk",
			"message": error_send 
		}); 
		return;	
	}
};	






//@
//@
//@
//@ function export
module.exports = function_export;






//@
//@
//@
//@ file end













