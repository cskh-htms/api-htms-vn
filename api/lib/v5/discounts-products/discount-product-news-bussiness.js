


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const discount_product_fields_get = require('./discount-product-fields-get.js');

const discount_product_news_bussiness = async function (user_id) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "discount_program_product_link_ID ) as discount_program_product_link_ID  " +
		
	discount_product_fields_get.from_default + 
	discount_product_fields_get.link_default + 
	
	" where " + 
		config_database.PREFIX + "discount_program_product_link_status in (3) " +
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
				"Lỗi discount dproduct search news bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "discount product news bussiness", 
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = discount_product_news_bussiness;
