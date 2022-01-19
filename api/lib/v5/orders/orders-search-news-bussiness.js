


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');




const orders_fields_get = require('./orders-fields-get.js');

const orders_search_news_bussiness = async function (user_id) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "orders_speciality_ID) as orders_speciality_ID " +
	orders_fields_get.from_default + 
	
	" LEFT JOIN " + 
		config_database.PREFIX + "stores  ON  " + 
		config_database.PREFIX + "orders_speciality_store_id  = " + 
		config_database.PREFIX + "stores_ID " +    
	
	" where " + 
		config_database.PREFIX + "orders_speciality_status_orders <> 100 " +
		" and " + 
		config_database.PREFIX + "stores_user_id = " + user_id + " " ; 		

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
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
				"Lỗi orders search news bussiness, Vui lòng liên hệ admin" 
			);
		return ({ 
			"error" : "1",
			"position" : "orders search news bussiness", 
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = orders_search_news_bussiness;
