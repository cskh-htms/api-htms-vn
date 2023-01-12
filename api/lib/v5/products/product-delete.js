

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const fields_insert = require('./product-fields-insert.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');




const delete_product = function (product_id,res) {
	var sql_text = '';
	try{	

		let table_name  = config_database.PREFIX + "products_speciality ";
		let field_where  = config_database.PREFIX + "products_speciality_ID ";
		//create sql text
		
		sql_text =  sql_text + ' DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ product_id + '" ;';
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product delete, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "lib/products/product delete", 
			"message": error_send 
			}); 
		return;	
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					
					let message_error = fields_insert.get_message_error(err);
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							message_error
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/products/product delete", 
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
				"Lỗi product delete, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/products/product delete", 
			"message": error_send 
		}); 
		return;
	}	
};	


module.exports = delete_product;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














