

const mysql = require('mysql2');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');

const fields_insert = require('./discount-fields-insert.js');


const function_export = function (data,res) {
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);

		//return res.send(datas);
		//


		
		var sql_text = "INSERT INTO " + config_database.PREFIX + "discount_program  SET ?";
		
		
		//return res.send([sql_text]);
		//
		
		
		
		
		
		var dataGo = {
			"discount_program_name"					: mysql.escape(datas.discount_program_name).replace(/^'|'$/gi, ""),	
			"discount_program_position"				: datas.discount_program_position,			
			"discount_program_featured_image"		: mysql.escape(datas.discount_program_featured_image).replace(/^'|'$/gi, ""),
			
			"discount_program_price_created"		: datas.discount_program_price_created,
			"discount_program_price_sale"			: datas.discount_program_price_sale,
			"discount_program_type"					: datas.discount_program_type,
			"discount_program_time_type"			: datas.discount_program_time_type,
			"discount_program_gift_type"			: datas.discount_program_gift_type,
			
			"discount_program_store_id_created": datas.discount_program_store_id_created,
			"discount_program_qoute"				: mysql.escape(datas.discount_program_qoute).replace(/^'|'$/gi, ""),			
			"discount_program_status_admin"			: datas.discount_program_status_admin,		
			"discount_program_status_update"		: datas.discount_program_status_update,			
			
			
			"discount_program_price_one_day"		: datas.discount_program_price_one_day,
			"discount_program_price_one_product"	: datas.discount_program_price_one_product,

			"discount_program_limit_product"		: datas.discount_program_limit_product,
			"discount_program_limit_day"			: datas.discount_program_limit_day,			
			
			"discount_program_date_star"			: datas.discount_program_date_star,
			"discount_program_date_end"				: datas.discount_program_date_end,			
			
			"discount_program_information"			: mysql.escape(datas.discount_program_information).replace(/^'|'$/gi, "")			
		}
		
		
		//return res.send([dataGo]);
		//

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->discounts->inser",
			"message": error_send 
		}); 
		
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
					return res.send({ 
						"error" : "10", 
						"position" : "lib->discounts->inser",
						"message": error_send 
					}); 
										
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
		return res.send({ 
			"error" : "100", 
			"position" : "lib->discounts->inser",
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














