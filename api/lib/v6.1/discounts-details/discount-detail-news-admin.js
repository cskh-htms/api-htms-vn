


const mysql = require('mysql');
const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');



const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const discount_detail_fields_get = require('./discount-detail-fields-get.js');

const discount_detail_news_admin = async function (res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_api.PREFIX + "discount_program_details_ID ) as discount_program_details_ID  " +
		
	discount_detail_fields_get.from_default + 
	discount_detail_fields_get.link_default + 
	
	" where " + 
		config_api.PREFIX + "discount_program_details_status_admin not in  (4,3) ";

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
							"Lỗi discount details news admin, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/discount details/discount details news admin", 
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
				"Lỗi discount detail news admin, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/discount details/discount details news admin",
			"message": error_send 
			}); 
			
	}
	
};


module.exports = discount_detail_news_admin;
