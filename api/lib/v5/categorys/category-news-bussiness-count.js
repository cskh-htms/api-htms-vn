


const mysql = require('mysql2');
const connection = require('../connections/connections-reader');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');


const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const category_fields_get = require('./category-fields-get.js');

const category_news_bussiness_count = async function (store_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "category_general_speciality_ID ) as category_general_speciality_ID  " +
		
	category_fields_get.from_default + 
	category_fields_get.link_default + 
	
	" where " + 
		config_database.PREFIX + "category_general_speciality_admin_status = 1 " +
		" and " + 
		config_database.PREFIX + "stores_ID = " + store_id + " " ; 		

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
							"Lỗi category count bussiness, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "1",
						"position" : "lib/categorys/category  count bussiness", 
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
				"Lỗi category search news bussiness count, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "2",
			"position" : "lib/categorys/category  count bussiness", 
			"message": error_send 
			}); 
			return;
	}
	
};


module.exports = category_news_bussiness_count;
