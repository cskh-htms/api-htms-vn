

const md5 = require('md5');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');


const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./user-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');



const function_export = function (datas,res) {	
	
	//@
	//@
	// check data user login type
	//@
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	if (regex.test(name_check)) {
		//@
		//if data type là email
		var sql_text = 	"UPDATE " + 
			config_database.PREFIX + "users set " + 
			config_database.PREFIX + "users_password_lost = '', " + 
			config_database.PREFIX + "users_password = '" + 
			md5(datas.users_password.toString()) + "' " + 
			
			"where " + config_database.PREFIX + "users_email = '" + datas.users_login_name + "' " ;


	} else {
		//@
		//if data type là phone
		var sql_text = 	"UPDATE " + 
			config_database.PREFIX + "users set " + 
			config_database.PREFIX + "users_password_lost = '', " + 
			config_database.PREFIX + "users_password = '" + 
			md5(datas.users_password.toString()) + "' " + 
			
			
			"where " + config_database.PREFIX + "users_phone = '" + datas.users_login_name + "' " ;
	}	
	
	//return sql_text;
		
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
							"Lỗi update lost password, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/users/update lost password", 
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
				"Lỗi update lost password, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/users/update lost password", 
			"message": error_send 
		}); 
		return;
	}	
};	


module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














