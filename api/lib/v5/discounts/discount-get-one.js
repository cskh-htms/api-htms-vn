


//@
//@
//@
//@ file start





//@
//@
//@
//@ config
const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');




//@
//@
//@
//@ model
const connection = require('../connections/connections-reader');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./discount-fields-get.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');





//@
//@
//@
//@ function
const function_export = function (id,res) {

	try{	
		var get_sql_search_group = "SELECT " + 
			fields_get.fields_get + 
			fields_get.from_default + 
			fields_get.link_default + 
			"where " + config_database.PREFIX + "discount_program_ID =" + id;  
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi lib->discount_program->get one, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "lib->discount_program->get one", 
			"message": error_send 
			}); 
		return;	
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi lib->discount_program->get one, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/discount_program/store-get-one", 
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
				"Lỗi get one, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/discount_program/store-get-one", 
			"message": error_send 
		}); 
		return;
	}	
};	








//@
//@
//@
//@ export
module.exports = function_export;












//@
//@
//@
//@ file end















