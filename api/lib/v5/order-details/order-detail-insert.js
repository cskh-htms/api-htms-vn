

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
const fields_insert = require('./order-detail-fields-insert.js');




//@
//@
//@
//@ function export
const function_export = function (data,res) {
	//return data;
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
		var sql_text = "INSERT INTO " + config_database.PREFIX + "orders_details_speciality  SET ?";
		var dataGo = {
			"orders_details_speciality_order_id"					: datas.orders_details_speciality_order_id,	
			"orders_details_speciality_line_order"					: datas.orders_details_speciality_line_order,	
			"orders_details_speciality_product_id"					: datas.orders_details_speciality_product_id,
			"orders_details_speciality_price"						: datas.orders_details_speciality_price,			
			"orders_details_speciality_qty"							: datas.orders_details_speciality_qty,	
			"orders_details_medium_text"						: mysql.escape(datas.orders_details_medium_text).replace(/^'|'$/gi, "")
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
			"position" : "lib->order-detail->insert",
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
						"position" : "lib->order-detail->insert",
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
				"Lỗi insert data coupon add, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->order-detail->insert",
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













