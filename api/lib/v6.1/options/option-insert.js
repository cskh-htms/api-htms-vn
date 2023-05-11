

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./option-fields-insert.js');


const function_export = function (data,res) {
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);			
		var sql_text = "INSERT INTO " + config_api.PREFIX + "options_product_speciality  SET ?";
		var dataGo = {
			"options_product_speciality_name"						: mysql.escape(datas.options_product_speciality_name).replace(/^'|'$/gi, ""),
			"options_product_speciality_featured_image"				: mysql.escape(datas.options_product_speciality_featured_image).replace(/^'|'$/gi, ""),			
			"options_product_speciality_parent_id"					: datas.options_product_speciality_parent_id,	
			"options_product_speciality_stores_id"					: datas.options_product_speciality_stores_id,			
			
			"options_product_speciality_status_stores"				: datas.options_product_speciality_status_stores,
			"options_product_speciality_status_update"				: datas.options_product_speciality_status_update,			
			"options_product_speciality_status_admin"				: datas.options_product_speciality_status_admin,
			
			"options_product_speciality_information"				: mysql.escape(datas.options_product_speciality_information).replace(/^'|'$/gi, ""),
			"options_product_speciality_qoute"						: mysql.escape(datas.options_product_speciality_qoute).replace(/^'|'$/gi, "")
		}
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->options->inser",
			"message": error_send 
		}); 
		
	}	
	
	//return dataGo;
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_api.PREFIX + kes[x] );
	}

	//return dataGo;
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->options->inser",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi insert, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->options->inser",
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














