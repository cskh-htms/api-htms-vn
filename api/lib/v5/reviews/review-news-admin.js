


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const review_fields_get = require('./reviews-fields-get.js');

const review_news_admin = async function (res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "reviews_speciality_ID ) as reviews_speciality_ID  " +
		
	review_fields_get.from_default + 
	review_fields_get.link_default_store + 
	
	" where " + 
		config_database.PREFIX + "reviews_speciality_status_admin not in (1) ";

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi review news admin, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "1",
						"position" : "lib/reviews/review news admin", 
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
				"Lỗi review  news admin, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "2",
			"position" : "lib/reviews/review news admin",
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = review_news_admin;
