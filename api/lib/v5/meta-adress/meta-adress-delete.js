

const mysql = require('mysql');
const md5 = require('md5');

const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./meta-adress-fields-insert.js');



const function_export = async function (datas,meta_adress_id,res) {
	
	let sqlSet = "";
	

	let table_name  = config_database.PREFIX + "adress_meta ";
	let field_where  = config_database.PREFIX + "adress_meta_ID ";
	//create sql text
	let sql_text = 'DELETE from ' + table_name + ' where ' + field_where + ' = "'+ meta_adress_id + '"';
	
	//return sql_text;
	
	
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
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
						"position" : "lib->meta-adress->delete.js",
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
				"Lỗi insert data user add, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->meta-adress->delete.js",
			"message": error_send 
		}); 
		return;	
	}	
	
};	


module.exports = function_export;
















