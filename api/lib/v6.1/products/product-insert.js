
const mysql = require('mysql2');


const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


const fields_insert = require('./product-fields-insert.js');


const function_export = function (data,res) {
	
	var datao = data.datas;
	var cat_string = JSON.parse(data.cat_string);
	
	//return res.send([cat_string]);
	
	
	var datas = Object.assign(fields_insert.default_fields, datao);
	
	
	
	
	
	var sql_text = "";
	var dataGo = {
		"products_speciality_name" 	: mysql.escape(datas.products_speciality_name).replace(/^'|'$/gi, ""),
		"products_speciality_type" 	:  datas.products_speciality_type,
		"products_speciality_start_buy" 	:  datas.products_speciality_start_buy,
		"products_speciality_sku" 	: mysql.escape(datas.products_speciality_sku).replace(/^'|'$/gi, ""),
		"products_speciality_store_id" : datas.products_speciality_store_id,
		"products_speciality_parent_id" : datas.products_speciality_parent_id,
		
		
		"products_speciality_featured_image" : mysql.escape(datas.products_speciality_featured_image).replace(/^'|'$/gi, ""),
		"products_speciality_image_slider" : mysql.escape(datas.products_speciality_image_slider).replace(/^'|'$/gi, ""),
		"products_speciality_contents" : mysql.escape(datas.products_speciality_contents).replace(/^'|'$/gi, ""),
		"products_speciality_origin" : mysql.escape(datas.products_speciality_origin).replace(/^'|'$/gi, ""),

		"products_speciality_price" : datas.products_speciality_price,
		"products_speciality_sale_of_price" : datas.products_speciality_sale_of_price,
		"products_speciality_date_start" : datas.products_speciality_date_start,
		"products_speciality_date_end" : datas.products_speciality_date_end,
		"products_speciality_stock" : datas.products_speciality_stock,
		"products_speciality_stock_status" : datas.products_speciality_stock_status,			
		
		"products_speciality_brand" : datas.products_speciality_brand,
		"products_speciality_status_admin" : datas.products_speciality_status_admin,
		"products_speciality_status_store" : datas.products_speciality_status_store,
		"products_speciality_show_hide" : datas.products_speciality_show_hide,
		"products_speciality_status_update" : datas.products_speciality_status_update,
		"products_speciality_variation_option" : mysql.escape(datas.products_speciality_variation_option).replace(/^'|'$/gi, ""),
		
		
		"products_speciality_excerpt" : mysql.escape(datas.products_speciality_excerpt).replace(/^'|'$/gi, ""),	
		"products_speciality_qoute" : 	mysql.escape(datas.products_speciality_qoute).replace(/^'|'$/gi, ""),
		
		"products_speciality_height" : datas.products_speciality_height,
		"products_speciality_width" : datas.products_speciality_width,
		"products_speciality_length" : datas.products_speciality_length,
		"products_speciality_weight" : datas.products_speciality_weight			
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_api.PREFIX + kes[x] );
	}
	
	
	sql_text = "START TRANSACTION ; "
	sql_text = "INSERT INTO " + config_api.PREFIX + "products_speciality  SET ? ; ";

	sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";		
	
	sql_text = sql_text + "INSERT INTO " + config_api.PREFIX + "category_general_speciality_link  " + 
	"SET " + 
		config_api.PREFIX + "category_general_speciality_link_product_id = @aa , " + 
		config_api.PREFIX + "category_general_speciality_link_category_general_id = " + cat_string + " ;  "
	
	
	
	
	
	//@
	//@
	//@
	//@
	//update sku
	/*
	var ram = Math.random().toString(36).substring(11).toUpperCase();
	var sql_sku = 	" " + 
					" UPDATE " +  
					config_api.PREFIX + "products_speciality SET " + 
					config_api.PREFIX + "products_speciality_sku = CONCAT('" + 
					mysql.escape(datas.products_speciality_sku).replace(/^'|'$/gi, "") + "',@aa,'" + ram + "')  " + 
					"WHERE " + 
					config_api.PREFIX + "products_speciality_ID = @aa; ";


	sql_text = sql_text + sql_sku ;	
	*/
	
	sql_text = sql_text + " COMMIT;"		
	//return res.send([sql_text]);
	//
	


	


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
						"position" : "lib->product->insert.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data user add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->product->insert.js",
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














