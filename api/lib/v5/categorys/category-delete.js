

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
const fields_insert = require('./category-fields-insert.js');




//@
//@
//@
//@ function export
const function_export = function (id,res) {
	
	//return id;
	
	var table_name  = config_database.PREFIX + "category_general_speciality ";
	var field_where  = config_database.PREFIX + "category_general_speciality_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ id + '"';
	
	
	//return sql_text;
	
	
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }  , ( err , results , fields ) => {
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
						"position" : "lib->category->delete",
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
				"Lỗi  delete, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->category->delete",
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











