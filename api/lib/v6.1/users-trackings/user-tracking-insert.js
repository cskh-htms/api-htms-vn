

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');

const fields_insert = require('./user-tracking-fields-insert.js');


const function_export = function (data,res) {
	
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
		var sql_text = "INSERT INTO " + config_database.PREFIX + "users_tracking  SET ?";
		var dataGo = {
			"users_tracking_user_id"			: datas.users_tracking_user_id,
			"users_tracking_action"				: datas.users_tracking_action,			
			"users_tracking_status"				: datas.users_tracking_status,
			"users_tracking_info"				: mysql.escape(datas.users_tracking_info).replace(/^'|'$/gi, "")	
		}
	}
	catch(error){
		return ({ 
			"error" : "1",
			"position" : "lib/user-tracking/insert", 
			"message": "Lỗi sử lý data, liên hệ admin DALA(lỗi này có thể bỏ qua)" 
		}); 
	}	
	
	//return dataGo;
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}

	//return dataGo;
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return ({ 
			"error" : "2",
			"position" : "lib/user-tracking/insert", 
			"message": "Lỗi sử lý data, liên hệ admin DALA(lỗi này có thể bỏ qua)" 
		}); 
	}
};	


module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














