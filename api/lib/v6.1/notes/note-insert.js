

const mysql = require('mysql2');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./note-fields-get.js');
const fields_insert = require('./note-fields-insert.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');


const order_insert = function (datas,res) {
	
	const user_arr = datas.notes_user_id;
	
	
	//@
	//@
	//@ xoa cac user trung nhau
	function unique(arr) {
		return Array.from(new Set(arr)) 
	}	
	const user_arr_result = unique(datas.notes_user_id);
	//return res.send(user_arr_result);		
	//
	
	
	
	let sql_text = "START TRANSACTION ; "
	
	//@
	//@
	//@ sql text
	if(user_arr_result.length > 0){
		let sql_loop_all = "";
		for(let i = 0; i < user_arr_result.length; i ++){
			let sql_loop  = "";
			sql_loop = "INSERT INTO " + config_database.PREFIX + "notes  ";
			sql_loop = sql_loop + "(" +
							config_database.PREFIX + "notes_title" + "," + 
							config_database.PREFIX + "notes_contents" + "," + 
							config_database.PREFIX + "notes_user_id " + 
						") " + 
						"values('" + 
						datas.notes_title +  "', '" + 
						datas.notes_contents +  "', " + 
						user_arr_result[i]  + 
						") ; ";		
			sql_loop_all = sql_loop_all + sql_loop;			
		}//end of for option_arr	
		sql_text = sql_text + sql_loop_all;
	}	
	
	sql_text = sql_text +  "COMMIT ; "	
	
	//return res.send(sql_text);		
	//	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@return sql_text;	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->notes->insert",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			});
		} );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->notes->insert",
			"message": error_send 
		}); 
			
	}
};	


module.exports = order_insert;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














