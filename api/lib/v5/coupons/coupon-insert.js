

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
const fields_insert = require('./coupon-fields-insert.js');




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
			
		var sql_text = "INSERT INTO " + config_database.PREFIX + "coupon_speciality  SET ?";
		var dataGo = {
			"coupon_speciality_code"						: mysql.escape(datas.coupon_speciality_code).replace(/^'|'$/gi, ""),		
			"coupon_speciality_stores_id_created"			: datas.coupon_speciality_stores_id_created,
			"coupon_speciality_info"						: mysql.escape(datas.coupon_speciality_info).replace(/^'|'$/gi, ""),
			"coupon_speciality_type"						: datas.coupon_speciality_type,	
			"coupon_speciality_intro"						: datas.coupon_speciality_intro,	
			"coupon_speciality_intro_price"					: datas.coupon_speciality_intro_price,		
			"coupon_speciality_intro_price_limit"			: datas.coupon_speciality_intro_price_limit,			
			
			"coupon_speciality_formula_price"				: datas.coupon_speciality_formula_price,
			"coupon_speciality_formula_price_value"			: datas.coupon_speciality_formula_price_value,
			"coupon_speciality_condition"					: datas.coupon_speciality_condition,

			"coupon_speciality_condition_value"				: datas.coupon_speciality_condition_value,
			
			"coupon_speciality_featured_image"				: mysql.escape(datas.coupon_speciality_featured_image).replace(/^'|'$/gi, ""),
			
			
			"coupon_speciality_price_max"					: datas.coupon_speciality_price_max,

			"coupon_speciality_date_star"					: datas.coupon_speciality_date_star,	
			"coupon_speciality_date_end"					: datas.coupon_speciality_date_end,

			"coupon_speciality_multiple"					: datas.coupon_speciality_multiple,
			"coupon_speciality_show_hide"					: datas.coupon_speciality_show_hide,
			"coupon_speciality_status_admin"				: datas.coupon_speciality_status_admin,
			"coupon_speciality_status_update"				: datas.coupon_speciality_status_update,
			"coupon_speciality_limit_user"					: datas.coupon_speciality_limit_user,
			"coupon_speciality_time_type"					: datas.coupon_speciality_time_type,
			"coupon_speciality_marketing_return"			: datas.coupon_speciality_marketing_return,			
			"coupon_speciality_limit_number"				: datas.coupon_speciality_limit_number,

			"coupon_speciality_qoute"						: mysql.escape(datas.coupon_speciality_qoute).replace(/^'|'$/gi, "")
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->coupon->inser.js",
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
					
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->coupon->inser.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi insert data coupon add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->coupon->inser.js",
			"message": error_send 
		}); 
			
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













