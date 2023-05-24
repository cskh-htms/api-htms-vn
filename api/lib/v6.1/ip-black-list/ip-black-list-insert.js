

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./ip-black-list-fields-insert.js');


const function_export = function (data,res) {
	
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
		var sql_text = "INSERT INTO " + config_api.PREFIX + "ip_black_list  SET ?";
		var dataGo = {
			"ip_black_list_ip"				: mysql.escape(datas.ip_black_list_ip).replace(/^'|'$/gi, ""),
			"ip_black_list_user_id"			: datas.ip_black_list_user_id)		
		}
	}
	catch(error){
		return ({ 
			"error" : "1",
			"position" : "lib/ip-black-list/insert", 
			"message": "Lỗi sử lý data, liên hệ admin DALA(lỗi này có thể bỏ qua)" 
		}); 
	}	
	
	//return dataGo;
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_api.PREFIX + kes[x] );
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
			"position" : "lib/ip-black-list/insert", 
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














