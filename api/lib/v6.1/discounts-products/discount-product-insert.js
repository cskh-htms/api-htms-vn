

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


const fields_insert = require('./discount-product-fields-insert.js');


const function_export = function (data,res) {
	//return data;
	
	
	var sql_text = "";
	sql_text = sql_text + "INSERT INTO " + config_api.PREFIX + "discount_program_product_link  SET ? ; ";	
	
	
	//return sql_text;
	
	//@
	//@
	//@
	try {
		var datas = Object.assign(fields_insert.default_fields, data);
			
			
		var dataGo = {
				"discount_program_product_link_discount_program_details_id"	: datas.discount_program_product_link_discount_program_details_id,
				"discount_program_product_link_discount_program_id"	: datas.discount_program_product_link_discount_program_id,
				"discount_program_product_link_product_speciality_id"	: datas.discount_program_product_link_product_speciality_id,			
				"discount_program_product_link_status"	: datas.discount_program_product_link_status,	
				"discount_program_product_link_sale_of_price"	: datas.discount_program_product_link_sale_of_price,
				"discount_program_product_link_date_star"	: datas.discount_program_product_link_date_star,
				"discount_program_product_link_date_end"	: datas.discount_program_product_link_date_end,
				
				"discount_program_product_link_qoute"	: mysql.escape(datas.discount_program_product_link_qoute).replace(/^'|'$/gi, "")
		}	
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get assign data , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "lib->discount-product-insert.js",
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
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->discount-product-insert.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->discount-product-insert.js",
			"message": error_send 
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














