
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');
var mysql = require('mysql');
var transaction = require('node-mysql-transaction');






//select default
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "products_speciality_ID as products_speciality_ID, " + 
	ojs_api_config.db_prefix  + "products_speciality_name as products_speciality_name, " + 
	ojs_api_config.db_prefix  + "products_speciality_type as products_speciality_type, " + 
	ojs_api_config.db_prefix  + "products_speciality_sku as products_speciality_sku, " + 
	ojs_api_config.db_prefix  + "products_speciality_store_id as products_speciality_store_id, " + 

	ojs_api_config.db_prefix  + "products_speciality_featured_image as products_speciality_featured_image, " + 
	ojs_api_config.db_prefix  + "products_speciality_image_slider as products_speciality_image_slider, " + 
	ojs_api_config.db_prefix  + "products_speciality_contents as products_speciality_contents, " + 
	ojs_api_config.db_prefix  + "products_speciality_excerpt as products_speciality_excerpt, " + 

	ojs_api_config.db_prefix  + "products_speciality_price as products_speciality_price, " + 
	ojs_api_config.db_prefix  + "products_speciality_sale_of_price as products_speciality_sale_of_price, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "products_speciality_date_start," + "'%Y/%m/%d %H:%i:%s'"  + ") as products_speciality_date_start, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "products_speciality_date_end," + "'%Y/%m/%d %H:%i:%s'"  + ") as products_speciality_date_end, " + 	

	ojs_api_config.db_prefix  + "products_speciality_stock as products_speciality_stock, " + 
	ojs_api_config.db_prefix  + "products_speciality_brand as products_speciality_brand, " + 
	ojs_api_config.db_prefix  + "products_speciality_status_admin as products_speciality_status_admin, " + 
	ojs_api_config.db_prefix  + "products_speciality_status_store as products_speciality_status_store, " + 

	ojs_api_config.db_prefix  + "products_speciality_variation_option as products_speciality_variation_option, " + 
	ojs_api_config.db_prefix  + "products_speciality_height as products_speciality_height, " + 
	ojs_api_config.db_prefix  + "products_speciality_width as products_speciality_width, " + 
	ojs_api_config.db_prefix  + "products_speciality_length as products_speciality_length, " + 

	ojs_api_config.db_prefix  + "products_speciality_weight as products_speciality_weight, " + 
	ojs_api_config.db_prefix  + "products_speciality_discount as products_speciality_discount, " + 
	ojs_api_config.db_prefix  + "products_speciality_width as products_speciality_width, " + 
	ojs_api_config.db_prefix  + "products_speciality_unit_discount as products_speciality_unit_discount " 
	

//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "products_speciality "
	

//link table	
let sql_link_default = 	"" 

//link table	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "products_speciality_name " ;
	
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" LEFT JOIN dala_options_product_speciality_link  ON  dala_products_speciality_ID = dala_options_product_speciality_link_product_id  " +   
	" LEFT JOIN dala_options_product_speciality  ON  dala_options_product_speciality_link_option_id = dala_options_product_speciality_ID  " + 
	
	" LEFT JOIN dala_category_general_speciality_link  ON  dala_products_speciality_ID = dala_category_general_speciality_link_product_id " +   
	" LEFT JOIN dala_category_general_speciality  ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID " +	
	
	" LEFT JOIN dala_brands  ON  dala_products_speciality_brand  = dala_brands_ID " +    
	
	" LEFT JOIN dala_stores  ON  dala_products_speciality_store_id = dala_stores_ID  " + 
	
	" LEFT JOIN dala_users   ON  dala_stores_user_id  =  dala_users_ID " 	


	
//--------------------------------
//sql search
//--------------------------------	
	
		
	
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@	
//search
var search = async function (datas) {
	
	//return [datas.select_field];
	//@
	try {
		var sql_field = ojs_functions_shares.get_select_field_demo(datas.select_field, sql_select_all);
	}
	catch(error){
		return  { "error" : "m_10", "message" : error } ;
	}

	//@
	try {
		var sql_conditions = ojs_functions_shares.get_condition(datas.condition);
	}
	catch(error){
		return  { "error" : "m_11", "message" : error } ;
	}
	//@
	try {
		var sql_order = ojs_functions_shares.get_order_text(datas.order);
	}
	catch(error){
		return  { "error" : "m_12", "message" : error } ;
	}


	var sql_text = 	"SELECT DISTINCT " + sql_field +
					sql_from_default + 
					sql_link_search + 
					sql_conditions + 
					sql_order 
	//return sql_text		;		

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "m_13", "message" : error } ;
	}
};
	
	

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_demo = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
					
	//return sql_text;
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "m_13", "message" : error } ;
	}
};





/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_demo,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














