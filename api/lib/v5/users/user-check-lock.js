

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');


const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./user-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const get_select_type = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-type');
const get_select_fields = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields');
const get_conditions = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-conditions');
const get_limit = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-limit.js');
const get_order = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-order.js');
const get_group_by = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-group-by.js');
const get_having = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-having.js');


const user_search = function (datas,res) {
	
	
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	if (regex.test(name_check)) {
		//@
		//if data type là email
		var sql_text = 	"SELECT " + fields_get.fields_search +
			fields_get.from_default + 
			fields_get.link_default +
			"where " + config_database.PREFIX + "users_email = '" + name_check + "' " ;


	} else {
		//@
		//if data type là phone
		var sql_text = 	"SELECT " + fields_get.fields_search +
			fields_get.from_default + 
			fields_get.link_default +
			"where " + config_database.PREFIX + "users_phone = '" + name_check + "' " ;
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
							"Lỗi user check-log, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/users/user check-log", 
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
				"Lỗi user check lock, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/users/user check log", 
			"message": error_send 
		}); 
		return;
	}	
};	


module.exports = user_search;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














