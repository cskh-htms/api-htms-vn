


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const coupon_fields_get = require('./coupon-fields-get.js');

const coupon_news_bussiness_count = async function (user_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "coupon_speciality_ID ) as coupon_speciality_ID  " +
		
	coupon_fields_get.from_default + 
	coupon_fields_get.link_default + 
	
	" where " + 
		config_database.PREFIX + "coupon_speciality_status_admin = 4 " +
		" and " + 
		config_database.PREFIX + "stores_user_id = " + user_id + " " ; 		

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
							"Lỗi coupon count bussiness, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "1",
						"position" : "lib/coupons/coupon count bussiness", 
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
				"Lỗi coupon search news bussiness count, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "2",
			"position" : "lib/coupons/coupon count bussiness", 
			"message": error_send 
			}); 
		return;	
	}
	
};


module.exports = coupon_news_bussiness_count;
