


const mysql = require('mysql2');
const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');



const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const brand_fields_get = require('./brand-fields-get.js');

const brand_news_admin = async function (res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_api.PREFIX + "brands_ID ) as brands_ID  " +
		
	brand_fields_get.from_default + 
	brand_fields_get.link_default + 
	
	" where " + 
		config_api.PREFIX + "brands_status_admin in (0,2) " +
		" and " + 
		config_api.PREFIX + "brands_status_stores = 1 " ; 		

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
							"Lỗi brand news admin, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/brands/brand news admin", 
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
				"Lỗi brand news admin, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/brands/brand news admin", 
			"message": error_send 
		}); 
	}
	
};


module.exports = brand_news_admin;
