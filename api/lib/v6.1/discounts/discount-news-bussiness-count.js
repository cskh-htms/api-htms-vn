


const mysql = require('mysql');
const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');



const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const discount_fields_get = require('./discount-fields-get.js');

const discount_news_bussiness_count = async function (store_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_api.PREFIX + "discount_program_ID ) as discount_program_ID  " +
		
	discount_fields_get.from_default + 
	discount_fields_get.link_default + 
	
	" where " + 
		config_api.PREFIX + "discount_program_status_admin = 4 " +
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
							"Lỗi discount count bussiness, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/discount/discount count bussiness", 
						"message": error_send 
					}); 
					return;
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
				"Lỗi discount bussiness count, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/discount/discount count bussiness", 
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = discount_news_bussiness_count;
