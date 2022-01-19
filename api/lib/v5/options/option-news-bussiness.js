


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const option_fields_get = require('./option-fields-get.js');

const option_news_bussiness = async function (user_id) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "options_product_speciality_ID ) as options_product_speciality_ID  " +
		
	option_fields_get.from_default + 
	option_fields_get.link_default + 
	
	" where " + 
		config_database.PREFIX + "options_product_speciality_status_admin in (3) " +
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
				"Lỗi option search news bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "option news bussiness", 
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = option_news_bussiness;
