


const mysql = require('mysql2');
const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');


const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');




const orders_fields_get = require('./orders-fields-get.js');

const orders_search_news_bussiness = async function (store_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_api.PREFIX + "orders_speciality_ID) as orders_speciality_ID " +
	orders_fields_get.from_default + 
	
	" LEFT JOIN " + 
		config_api.PREFIX + "stores  ON  " + 
		config_api.PREFIX + "orders_speciality_store_id  = " + 
		config_api.PREFIX + "stores_ID " +    
	
	" where " + 
		config_api.PREFIX + "orders_speciality_status_orders = 100 " +
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
							"Lỗi order count bussiness, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/orders/order count bussiness", 
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
				"Lỗi orders count bussiness, Vui lòng liên hệ admin" 
			);
		return ({ 
			"error" : "1",
			"position" : "lib/orders/order count bussiness", 
			"message": error_send 
			}); 
			
	}
	
};


module.exports = orders_search_news_bussiness;
