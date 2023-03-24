
const md5 = require('md5');
const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');

const fields_insert = require('./user-fields-insert.js');


const function_export = function (data,res) {
	//return data;
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
		
		var sql_text = "INSERT INTO " + config_database.PREFIX + "users  SET ?";
			var dataGo = {
			"users_full_name"					: mysql.escape(datas.users_full_name).replace(/^'|'$/gi, ""),
			"users_password"					: md5(datas.users_password.toString()),	
			"users_password_lost"				: md5(datas.users_password_lost.toString()),	
			"users_first_name"					: mysql.escape(datas.users_first_name).replace(/^'|'$/gi, ""),	
			"users_last_name"					: mysql.escape(datas.users_last_name).replace(/^'|'$/gi, ""),
			"users_adress"						: mysql.escape(datas.users_adress).replace(/^'|'$/gi, ""),
			"users_phone"						: mysql.escape(datas.users_phone).replace(/^'|'$/gi, ""),	
			"users_email"						: mysql.escape(datas.users_email).replace(/^'|'$/gi, ""),
			"users_users_type_id"				: datas.users_users_type_id,
			
			"users_router_version"				: mysql.escape(datas.users_router_version).replace(/^'|'$/gi, ""),			
			"users_view_version"				: mysql.escape(datas.users_view_version).replace(/^'|'$/gi, ""),
			"users_js_css_version"				: mysql.escape(datas.users_js_css_version).replace(/^'|'$/gi, ""),			
			"users_api_version"					: mysql.escape(datas.users_api_version).replace(/^'|'$/gi, ""),
			
			"users_shipping_status"				: mysql.escape(datas.users_shipping_status).replace(/^'|'$/gi, ""),	
			"users_status"						: mysql.escape(datas.users_status).replace(/^'|'$/gi, ""),	
			"users_service"						: datas.users_service,		
			"users_verification_status"			: mysql.escape(datas.users_verification_status).replace(/^'|'$/gi, ""),
			"users_verification_code"			: mysql.escape(datas.users_verification_code).replace(/^'|'$/gi, "")
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->user->web->inser.js",
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
						"position" : "lib->user->inser.js",
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
				evn, 
				error, 
				"Lỗi insert data user add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->web->inser.js",
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














