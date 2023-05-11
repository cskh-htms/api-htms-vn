

//@
//@
//@
//@ file start







//@
//@
//@
//@ require
const mysql = require('mysql2');





const config_api = require('../configs/config');



//@
//@
//@
//@ share
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


//@
//@
//@
//@ model
const connection = require('../connections/connections');
const fields_insert = require('./category-fields-insert.js');




//@
//@
//@
//@ function export
const function_export = function (data,res) {
	//return res.send(data);
	//
	
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
		
		var sql_text = "INSERT INTO " + config_api.PREFIX + "category_general_speciality  SET ?";
		var dataGo = {
				"category_general_speciality_name"						: mysql.escape(datas.category_general_speciality_name).replace(/^'|'$/gi, ""),
				"category_general_speciality_category_parent_id"		: datas.category_general_speciality_category_parent_id,	
				"category_general_speciality_infomation"				: mysql.escape(datas.category_general_speciality_infomation).replace(/^'|'$/gi, ""),	
				"category_general_speciality_featured_image"			: mysql.escape(datas.category_general_speciality_featured_image).replace(/^'|'$/gi, ""),	
				"category_general_speciality_sort_order"				: datas.category_general_speciality_sort_order,	
				"category_general_speciality_show"						: datas.category_general_speciality_show,	
				
				"category_general_speciality_stores_status"				: datas.category_general_speciality_stores_status,			
				"category_general_speciality_stores_id"					: datas.category_general_speciality_stores_id,
				"category_general_speciality_update_status"				: datas.category_general_speciality_update_status,			
				"category_general_speciality_admin_status"				: datas.category_general_speciality_admin_status,			
				"category_general_speciality_qoute"						: mysql.escape(datas.category_general_speciality_qoute).replace(/^'|'$/gi, "")
		}
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->categorys->inser",
			"message": error_send 
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
					////evn = "dev";;
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->categorys->inser",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data coupon add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->categorys->inser",
			"message": error_send 
		}); 			
	}
};	






//@
//@
//@
//@ function export
module.exports = function_export;






//@
//@
//@
//@ file end













