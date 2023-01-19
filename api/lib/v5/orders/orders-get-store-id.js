

const mysql = require('mysql');

const connection = require('../connections/connections');
const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');




const get_store_id = async function (product_id,res) {


	var sql_text = 	"SELECT " +  
		config_database.PREFIX +  "products_speciality_store_id as products_speciality_store_id, " + 
		config_database.PREFIX +  "users_email as users_email, " + 
		config_database.PREFIX +  "stores_email as stores_email, " + 
		config_database.PREFIX +  "stores_phone as stores_phone, " +			
		config_database.PREFIX +  "stores_name as stores_name " + 		
		"FROM " +   config_database.PREFIX +  "products_speciality  " + 		
		" LEFT JOIN " + 
		config_database.PREFIX + "stores  ON  " + 
		config_database.PREFIX + "products_speciality_store_id  = " + 
		config_database.PREFIX + "stores_ID " +   
		
		" LEFT JOIN " + 
		config_database.PREFIX + "users  ON  " + 
		config_database.PREFIX + "stores_user_id  = " + 
		config_database.PREFIX + "users_ID " + 		
		
		" where " +  
		config_database.PREFIX + "products_speciality_ID = '" + product_id + "' ";


	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi order get store id, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/orders/order get store id", 
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
				"Lỗi order get store id, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/orders/order get store id", 
			"message": error_send 
		}); 
		return;
	}
};


module.exports = get_store_id;
