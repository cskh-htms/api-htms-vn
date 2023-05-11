


const mysql = require('mysql2');
const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');



const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const product_fields_get = require('./product-fields-get.js');

const product_news_bussiness = async function (store_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_api.PREFIX + "products_speciality_ID ) as products_speciality_ID  " +
		
	product_fields_get.from_default + 
	product_fields_get.link_default + 
	
	" where " + 
		config_api.PREFIX + "products_speciality_status_admin in (3) " +
		" and " + 
		config_api.PREFIX + "stores_ID = " + store_id + " " ; 		

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi product news bussiness, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/products/product news bussiness", 
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
				"Lỗi product news bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/products/product news bussiness",  
			"message": error_send 
			}); 
			
	}
	
};


module.exports = product_news_bussiness;
