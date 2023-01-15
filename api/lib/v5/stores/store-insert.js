

const mysql = require('mysql2');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');

const fields_insert = require('./store-fields-insert.js');


const function_export = function (data,res) {
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);			
		var sql_text = "INSERT INTO " + config_database.PREFIX + "stores  SET ?";
		var dataGo = {
			"stores_user_id"					: datas.stores_user_id,
			"stores_name"						: mysql.escape(datas.stores_name).replace(/^'|'$/gi, ""),		
			"stores_payment_limit"				: datas.stores_payment_limit,
			"stores_service_type_id"			: datas.stores_service_type_id,	

			"stores_adress"						: mysql.escape(datas.stores_adress).replace(/^'|'$/gi, ""),
			"stores_province"					: mysql.escape(datas.stores_province).replace(/^'|'$/gi, ""),
			"stores_district"					: mysql.escape(datas.stores_district).replace(/^'|'$/gi, ""),
			"stores_wards"						: mysql.escape(datas.stores_wards).replace(/^'|'$/gi, ""),
			
			
			"stores_phone"						: mysql.escape(datas.stores_phone).replace(/^'|'$/gi, ""),
			"stores_email"						: mysql.escape(datas.stores_email).replace(/^'|'$/gi, ""),
			"stores_logo_image"					: mysql.escape(datas.stores_logo_image).replace(/^'|'$/gi, ""),
			"stores_banner_image"				: mysql.escape(datas.stores_banner_image).replace(/^'|'$/gi, ""),
			"stores_information"				: mysql.escape(datas.stores_information).replace(/^'|'$/gi, ""),			
			

			"stores_sort_order"					: datas.stores_sort_order,
			"stores_status_admin"				: datas.stores_status_admin,				
			"stores_status_stores"				: datas.stores_status_stores,	
			"stores_discount_price"				: datas.stores_discount_price,
			"stores_info_banking" 				: mysql.escape(datas.stores_info_banking).replace(/^'|'$/gi, ""),			
			
			"stores_local_x"					: mysql.escape(datas.stores_local_x).replace(/^'|'$/gi, ""),
			"stores_local_y"					: mysql.escape(datas.stores_local_y).replace(/^'|'$/gi, ""),
			"stores_local_adress"				: mysql.escape(datas.stores_local_adress).replace(/^'|'$/gi, ""),			
			
			"stores_qoute" 						: mysql.escape(datas.stores_qoute).replace(/^'|'$/gi, ""),			
			"stores_status_update"				: datas.stores_status_update,			
			"stores_payment_methods"			: datas.stores_payment_methods,	
			"stores_payment_time"				: datas.stores_payment_time,				

			"stores_upload_limit_day"			: datas.stores_upload_limit_day,
			"stores_upload_limit_month"			: datas.stores_upload_limit_month
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "lib->stores->inser",
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

	//return dataGo;
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
						"position" : "lib->stores->inser",
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
				"Lỗi insert, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->stores->inser",
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














