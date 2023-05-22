

const mysql = require('mysql');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./meta-adress-fields-insert.js');


const meta_adress_insert = function (data,res) {
	
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
		var sql_text = "INSERT INTO " + config_api.PREFIX + "adress_meta  SET ?";
		var dataGo = {
				"adress_meta_user_id"					: datas.adress_meta_user_id,	
				"adress_meta_name"						: mysql.escape(datas.adress_meta_name).replace(/^'|'$/gi, ""),
				"adress_meta_phone"						: mysql.escape(datas.adress_meta_phone).replace(/^'|'$/gi, ""),
				"adress_meta_province"					: mysql.escape(datas.adress_meta_province).replace(/^'|'$/gi, ""),
				"adress_meta_district"					: mysql.escape(datas.adress_meta_district).replace(/^'|'$/gi, ""),
				"adress_meta_wards"						: mysql.escape(datas.adress_meta_wards).replace(/^'|'$/gi, ""),
				"adress_meta_street" 					: mysql.escape(datas.adress_meta_street).replace(/^'|'$/gi, ""),			
				"adress_meta_full_adress" 				: mysql.escape(datas.adress_meta_full_adress).replace(/^'|'$/gi, ""),
				"adress_meta_status" 					: mysql.escape(datas.adress_meta_status).replace(/^'|'$/gi, "")
		}
	}
	catch(error){
		return ({ 
			"error" : "1",
			"position" : "lib/meta-adress/insert", 
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
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->meta-adress->inser.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		return ({ 
			"error" : "2",
			"position" : "lib/meta-adress/insert", 
			"message": "Lỗi sử lý data, liên hệ admin DALA(lỗi này có thể bỏ qua)" 
		}); 
	}
};	


module.exports = meta_adress_insert;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














