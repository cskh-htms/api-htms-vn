

const md5 = require('md5');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');


const connection = require('../connections/connections-reader');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./user-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');



const user_search = function (users_login_name,res) {	
	
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = users_login_name;

	if (regex.test(name_check)) {
		var sql_text = 	"SELECT " + fields_get.fields_search +
			fields_get.from_default + 
			fields_get.link_default +
			"where " + config_database.PREFIX + "users_email = '" + name_check + "' ";


	} else {
		var sql_text = 	"SELECT " + fields_get.fields_search +
			fields_get.from_default + 
			fields_get.link_default +
			"where " + config_database.PREFIX + "users_phone = '" + name_check + "' ";
	}	
	
	//return sql_text;
		
	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi users_search-by-email-or-phone, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "2",
						"position" : "lib/users/users_search-by-email-or-phone", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi users_search-by-email-or-phone, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/users/users_search-by-email-or-phone", 
			"message": error_send 
		}); 
		
	}	
};	


module.exports = user_search;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














