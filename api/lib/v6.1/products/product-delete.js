

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const fields_insert = require('./product-fields-insert.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');




const delete_product = function (product_id,res) {
	var sql_text = '';
	try{	

		let table_name  = config_api.PREFIX + "products_speciality ";
		let field_where  = config_api.PREFIX + "products_speciality_ID ";
		//create sql text
		
		sql_text =  sql_text + ' DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ product_id + '" ;';
		
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product delete, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "lib/products/product delete", 
			"message": error_send 
			}); 
			
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;
					////evn = "dev";
					
					let message_error = fields_insert.get_message_error(err);
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							message_error
						);
					return res.send({ 
						"error" : "2",
						"position" : "lib/products/product delete", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product delete, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/products/product delete", 
			"message": error_send 
		}); 
		
	}	
};	


module.exports = delete_product;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














