

const mysql = require('mysql2');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');

const fields_insert = require('./brand-fields-insert.js');


const function_export = function (data,res) {
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);			
		var sql_text = "INSERT INTO " + config_database.PREFIX + "brands  SET ?";
		var dataGo = {
			"brands_name"						    : mysql.escape(datas.brands_name).replace(/^'|'$/gi, ""),
			"brands_featured_image"					: mysql.escape(datas.brands_featured_image).replace(/^'|'$/gi, ""),

			"brands_information"					: mysql.escape(datas.brands_information).replace(/^'|'$/gi, ""),			
			"brands_excerpt"						: mysql.escape(datas.brands_excerpt).replace(/^'|'$/gi, ""),		
	
			"brands_status_stores"					: datas.brands_status_stores,
			"brands_status_admin"					: datas.brands_status_admin,
			"brands_status_update"					: datas.brands_status_update,
			
			"brands_stores_id"						: datas.brands_stores_id,
			"brands_qoute"							: mysql.escape(datas.brands_qoute).replace(/^'|'$/gi, "")
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
		return res.send({ 
			"error" : "1", 
			"position" : "lib->brand->inser.js",
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
						"position" : "lib->brand->inser.js",
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
				//evn, 
				error, 
				"Lỗi insert data coupon add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->brand->inser.js",
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














