
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
const fields_insert = require('./traffic-fields-insert.js');







//@
//@
//@
//@ function export
const function_export = async function (res) {
	
	let sqlSet = "set @n = (select " + 
	config_database.PREFIX + "traffic_web " + 
	" from " + config_database.PREFIX + "traffic); ";
	
	
	let table_name  = config_database.PREFIX + "traffic ";
	let sql_text = 'UPDATE ' + table_name + ' SET ' + 
	config_database.PREFIX + "traffic_web = @n + 1 ;";
	
	
	sqlSet = sqlSet + sql_text;
	
	//return(sql_text);
	
	
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sqlSet, timeout: 20000 } , ( err , results , fields ) => {
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
						"position" : "lib/traffic/update",
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
				"Lỗi update, Vui lòng liên hệ admin DALA " 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/traffic/update",
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









