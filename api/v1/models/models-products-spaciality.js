
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
const default_field = require('../const-tables/const-tables-products-spaciality');




//select default
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "products_speciality_ID as products_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "products_speciality_date_created,'%Y/%m/%d %H:%i:%s') as products_speciality_date_created, " + 
	
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
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "products_speciality_date_start,'%Y/%m/%d %H:%i:%s') as products_speciality_date_start, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "products_speciality_date_end,'%Y/%m/%d %H:%i:%s') as products_speciality_date_end, " +  	

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
	
	//return [datas.condition];
	
	//@
	//@ select type
	try {
		var sql_select_type = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_type');

		if(ojs_check != undefined){
			var sql_select_type = ojs_functions_shares.get_select_type(datas.select_type);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_select_type", "message" : error } ;
	}	
	//@select field
	try {
		var sql_field = sql_select_all;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');

		if(ojs_check != undefined){
			var sql_field = default_field.get_select_fields(datas.select_field, sql_select_all);
		}		
	}
	catch(error){
		return  { "error" : "m_10_sql_field_product_speciality", "message" : error } ;
	}





	//@ condition
	
	//return [datas.condition];
	try {
		
		var sql_conditions = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'condition');

		if(ojs_check != undefined){
			//return [datas.condition];
			sql_conditions = default_field.get_condition(datas.condition);
			//return ["asdasd",sql_conditions];
		}			
	}
	catch(error){
		return  { "error" : "m_11_sql_conditions_product_speciality_in", "message" : error } ;
	}
	

	





	//@group by
	try {
		var sql_group_by = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'group_by');

		if(ojs_check != undefined){
			var sql_group_by = ojs_functions_shares.get_group_by(datas.group_by);
		}
		
	}
	catch(error){
		return  { "error" : "m_13_sql_group_by_product_speciality", "message" : error } ;
	}

	//@having
	try {
		var sql_having = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'having');

		if(ojs_check != undefined){
			var sql_having = default_field.get_having(datas.having);
		}
		
	}
	catch(error){
		return  { "error" : "m_13_sql_sql_having_product_speciality", "message" : error } ;
	}

	
	//@order
	try {
		var sql_order = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'order');

		if(ojs_check != undefined){
			var sql_order = default_field.get_order_text(datas.order);
		}			
	}
	catch(error){
		return  { "error" : "m_12_sql_order_product_speciality ", "message" : error } ;
	}


	//@limit
	try {
		var sql_limit = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'limit');

		if(ojs_check != undefined){
			var sql_limit = ojs_functions_shares.get_limit(datas.limit);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_limit_product_speciality", "message" : error } ;
	}


	var sql_text = 	"SELECT  " + 
					sql_select_type + 
					sql_field +
					sql_from_default + 
					sql_link_search + 
					sql_conditions + 
					sql_group_by + 
					sql_having + 
					sql_order + 
					sql_limit
	
	
	//return sql_text;	




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
	
	
		
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_products_spaciality2 = async function (datas,cat_string,option_string) {
	//@
	let cat_arr = JSON.parse(cat_string);
	let option_arr = JSON.parse(option_string);
	//let cat_arr = [1,2,3,"a","b"];
	//@
	let sql_text;
	let dataGo;
	try {
		sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "products_speciality  SET ?";
		
		dataGo = {
			"products_speciality_name" : mysql.escape(datas.products_speciality_name).replace(/^'|'$/gi, ""),
			"products_speciality_type" :  datas.products_speciality_type,
			"products_speciality_sku" : mysql.escape(datas.products_speciality_sku).replace(/^'|'$/gi, ""),
			"products_speciality_store_id" : datas.products_speciality_store_id,
			"products_speciality_featured_image" : mysql.escape(datas.products_speciality_featured_image).replace(/^'|'$/gi, ""),
			"products_speciality_image_slider" : mysql.escape(datas.products_speciality_image_slider).replace(/^'|'$/gi, ""),
			"products_speciality_contents" : mysql.escape(datas.products_speciality_contents).replace(/^'|'$/gi, ""),
			"products_speciality_excerpt" : mysql.escape(datas.products_speciality_excerpt).replace(/^'|'$/gi, ""),
			"products_speciality_price" : datas.products_speciality_price,
			"products_speciality_sale_of_price" : datas.products_speciality_sale_of_price,
			"products_speciality_date_start" : datas.products_speciality_date_start,
			"products_speciality_date_end" : datas.products_speciality_date_end,
			"products_speciality_stock" : datas.products_speciality_stock,
			"products_speciality_brand" : datas.products_speciality_brand,
			"products_speciality_status_admin" : datas.products_speciality_status_admin,
			"products_speciality_status_store" : datas.products_speciality_status_store,
			"products_speciality_variation_option" : mysql.escape(datas.products_speciality_variation_option).replace(/^'|'$/gi, ""),
			"products_speciality_height" : datas.products_speciality_height,
			"products_speciality_width" : datas.products_speciality_width,
			"products_speciality_length" : datas.products_speciality_length,
			"products_speciality_weight" : datas.products_speciality_weight,
			"products_speciality_discount" : datas.products_speciality_discount,	
			"products_speciality_unit_discount" : datas.products_speciality_unit_discount		
		}

		let kes = Object.keys(dataGo);
		for(let x in kes){
			dataGo = ojs_functions_shares.rename_key(dataGo, kes[x], ojs_api_config.db_prefix + kes[x] );
		}

	}
	catch(error){
		return  { "error" : "m_api_12", "message" : error } ;
	}	
	
	try {
		return new Promise( (resolve,reject) => {
			// Begin transaction 
			connection.beginTransaction( function(err) {
				if( err ) reject(err);
				connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
					if (err) { 
						connection.rollback(function() {
							reject(err);
						});
					}
					
					//insert cart
					let product_id = results.insertId;
					let insert_check = 0;
					for(let i = 0; i < cat_arr.length; i ++){
						let sql_cat = "INSERT INTO " + ojs_api_config.db_prefix + "category_general_speciality_link  SET ?";
						cat_data = {
							"category_general_speciality_link_product_id" : product_id,
							"category_general_speciality_link_category_general_id" :  cat_arr[i]	
						}
						let arr = Object.keys(cat_data);
						for(let x in arr){
							cat_data = ojs_functions_shares.rename_key(cat_data, arr[x], ojs_api_config.db_prefix + arr[x] );
						}						
						connection.query( { sql: sql_cat, timeout: 20000 } , cat_data , ( err , results , fields ) => {
							if (err) { 
								 connection.rollback(function() {
									reject("chưa lưu thuộc tính");
								});
								 
							}	
						});
						
					}//end of for cat_arr
					//@
					//@
					//@
					//insert option
					let insert_check_option = 0;
					for(let i = 0; i < option_arr.length; i ++){
						let sql_option = "INSERT INTO " + ojs_api_config.db_prefix + "options_product_speciality_link  SET ?";
						option_data = {
							"options_product_speciality_link_product_id" : product_id,
							"options_product_speciality_link_option_id" :  option_arr[i]	
						}
						let arr = Object.keys(option_data);
						for(let x in arr){
							option_data = ojs_functions_shares.rename_key(option_data, arr[x], ojs_api_config.db_prefix + arr[x] );
						}						
						connection.query( { sql: sql_option, timeout: 20000 } , option_data , ( err , results , fields ) => {
							if (err) { 
								 connection.rollback(function() {
									reject("chưa lưu thuộc tính");
								});
								 
							}	
						});
						
					}//end of for option_arr	
			 
					connection.commit(function(err) {
						if (err) { 
							connection.rollback(function() {
								reject(err);
							});
						}
						resolve(product_id);
					});
				});//connect
			});//End transaction 
		});//promise
	}
	catch(error){
		return  { "error" : "m_13", "message" : error } ;
	}	
};







//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_products_spaciality = async function (datas,cat_string,option_string) {
	//@
	let cat_arr = JSON.parse(cat_string);
	let option_arr = JSON.parse(option_string);
	
	//return  { "error" : "1", "message" : [cat_arr,option_arr,datas] } ;
	//
	// sql product
	//
	let sql_text;
	let dataGo;
	try {
		
		dataGo = {
			"products_speciality_name" : mysql.escape(datas.products_speciality_name).replace(/^'|'$/gi, ""),
			"products_speciality_type" :  datas.products_speciality_type,
			"products_speciality_sku" : mysql.escape(datas.products_speciality_sku).replace(/^'|'$/gi, ""),
			"products_speciality_store_id" : datas.products_speciality_store_id,
			"products_speciality_featured_image" : mysql.escape(datas.products_speciality_featured_image).replace(/^'|'$/gi, ""),
			"products_speciality_image_slider" : mysql.escape(datas.products_speciality_image_slider).replace(/^'|'$/gi, ""),
			"products_speciality_contents" : mysql.escape(datas.products_speciality_contents).replace(/^'|'$/gi, ""),
			"products_speciality_excerpt" : mysql.escape(datas.products_speciality_excerpt).replace(/^'|'$/gi, ""),
			"products_speciality_price" : datas.products_speciality_price,
			"products_speciality_sale_of_price" : datas.products_speciality_sale_of_price,
			"products_speciality_date_start" : datas.products_speciality_date_start,
			"products_speciality_date_end" : datas.products_speciality_date_end,
			"products_speciality_stock" : datas.products_speciality_stock,
			"products_speciality_brand" : datas.products_speciality_brand,
			"products_speciality_status_admin" : datas.products_speciality_status_admin,
			"products_speciality_status_store" : datas.products_speciality_status_store,
			"products_speciality_variation_option" : mysql.escape(datas.products_speciality_variation_option).replace(/^'|'$/gi, ""),
			"products_speciality_height" : datas.products_speciality_height,
			"products_speciality_width" : datas.products_speciality_width,
			"products_speciality_length" : datas.products_speciality_length,
			"products_speciality_weight" : datas.products_speciality_weight,
			"products_speciality_discount" : datas.products_speciality_discount,	
			"products_speciality_unit_discount" : datas.products_speciality_unit_discount		
		}

		let kes = Object.keys(dataGo);
		for(let x in kes){
			dataGo = ojs_functions_shares.rename_key(dataGo, kes[x], ojs_api_config.db_prefix + kes[x] );
		}		
		
		sql_text = "START TRANSACTION ;"
		sql_text = sql_text + "INSERT INTO " + ojs_api_config.db_prefix + "products_speciality  SET ? ;";
		sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";

		//
		// end of sql product
		//	------------------------------
		
		
		
		//
		// sql options
		//
		if(option_arr.length > 0){
			let sql_option_all = "";
			for(let i = 0; i < option_arr.length; i ++){
				
				///ex
				sql_option = "INSERT INTO " + ojs_api_config.db_prefix + "options_product_speciality_link  ";
				sql_option = sql_option + "(" +
								ojs_api_config.db_prefix + "options_product_speciality_link_product_id" + "," + 
								ojs_api_config.db_prefix + "options_product_speciality_link_option_id" + 
							") " + 
							"values(" + 
							"@aa, " + 
							option_arr[i] + 
							") ; ";		
				sql_option_all	= sql_option_all + 	sql_option		
			}//end of for option_arr	
			
			
			sql_text = sql_text + sql_option_all;
		}
		//
		// end of sql options
		//-----------------------------	

		//
		// sql category
		//
		if(cat_arr.length > 0){
			let sql_cat_all = "";
			for(let i = 0; i < option_arr.length; i ++){
				///ex
				sql_cat = "INSERT INTO " + ojs_api_config.db_prefix + "category_general_speciality_link  ";
				sql_cat = sql_cat + "(" +
								ojs_api_config.db_prefix + "category_general_speciality_link_product_id" + "," + 
								ojs_api_config.db_prefix + "category_general_speciality_link_category_general_id" + 
							") " + 
							"values(" + 
							"@aa, " + 
							cat_arr[i] + 
							") ; ";		
				sql_cat_all	= sql_cat_all  + sql_cat		
			}//end of for option_arr	
			sql_text = sql_text + sql_cat_all;
		}
		//
		// end of sql category
		//-----------------------------	
		

		
		//commit
		sql_text = sql_text + " COMMIT;"
		
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo,  ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
		
		
	}
	catch(error){
		return  { "error" : "m_api_12", "message" : error } ;
	}	
	
};
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@





//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_products_spaciality = async function () {
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


//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_one_products_spaciality = async function (product_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "products_speciality_ID = '" + product_id + "' " + 
					sql_order_default
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





//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var check_store_link = async function (store_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "products_speciality_store_id = '" + store_id + "' " + 
					sql_order_default
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





//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var update_products_spaciality = async function (datas,product_id,cat_string,option_string) {
	let cat_arr = JSON.parse(cat_string);
	let option_arr = JSON.parse(option_string);
	let sqlSet = "";
	
	//tao arr key
	let arrDatas = Object.keys(datas);
	
	//tao arr value 
	let arrValueDatas = [];
	let x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	let sql_text = "START TRANSACTION ; "
	
	//
	// sql product update
	//
	let i = 0;
	arrDatas.forEach(function(item) {
		//
		if(arrValueDatas[i]== null){
			if(sqlSet.length == 0){
				sqlSet = ojs_api_config.db_prefix + item + '=' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
			}else{
				sqlSet = sqlSet + ',' + ojs_api_config.db_prefix + item  + '=' +  mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
			}
		}else{
			if(sqlSet.length == 0){
				sqlSet = ojs_api_config.db_prefix + item + '="' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") + '"';
			}else{
				sqlSet = sqlSet + ',' + ojs_api_config.db_prefix + item  + '= "' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "")  + '"' ;
			}		
		}

		i = i + 1 ;
	});		


	let table_name  = ojs_api_config.db_prefix + "products_speciality ";
	let field_where  = ojs_api_config.db_prefix + "products_speciality_ID ";
	//create sql text
	
	sql_text =  sql_text + ' UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ product_id + '" ;';

	//
	// end of sql product update
	//


	//
	// sql options
	//
	if(option_arr.length > 0){
		let sql_option_all = "";
		let table_name_option  = ojs_api_config.db_prefix + "options_product_speciality_link ";
		let field_where_option  = ojs_api_config.db_prefix + "options_product_speciality_link_product_id ";
		let sql_option_delete = 'DELETE FROM ' + table_name_option + ' where ' + field_where_option + ' = "'+ product_id + '" ; ';		
		
		for(let i = 0; i < option_arr.length; i ++){
			
			///ex
			sql_option = "INSERT INTO " + ojs_api_config.db_prefix + "options_product_speciality_link  ";
			sql_option = sql_option + "(" +
							ojs_api_config.db_prefix + "options_product_speciality_link_product_id" + "," + 
							ojs_api_config.db_prefix + "options_product_speciality_link_option_id" + 
						") " + 
						"values(" + 
						product_id + ", " + 
						option_arr[i] + 
						") ; ";		
			sql_option_all	= sql_option_all + 	sql_option		
		}//end of for option_arr	
		
		
		sql_text = sql_text + sql_option_delete + sql_option_all;
	}
	//
	// end of sql options
	//-----------------------------	

	//
	// sql category
	//
	if(cat_arr.length > 0){
		let sql_cat_all = "";
		let table_name_cat  = ojs_api_config.db_prefix + "category_general_speciality_link ";
		let field_where_cat  = ojs_api_config.db_prefix + "category_general_speciality_link_product_id ";
		let sql_cat_delete = 'DELETE FROM ' + table_name_cat + ' where ' + field_where_cat + ' = "'+ product_id + '" ; ';			
		
		
		for(let i = 0; i < option_arr.length; i ++){
			///ex
			sql_cat = "INSERT INTO " + ojs_api_config.db_prefix + "category_general_speciality_link  ";
			sql_cat = sql_cat + "(" +
							ojs_api_config.db_prefix + "category_general_speciality_link_product_id" + "," + 
							ojs_api_config.db_prefix + "category_general_speciality_link_category_general_id" + 
						") " + 
						"values(" + 
						product_id + ", " + 
						cat_arr[i] + 
						") ; ";		
			sql_cat_all	= sql_cat_all  + sql_cat		
		}//end of for option_arr	
		sql_text = sql_text + sql_cat_delete +  sql_cat_all;
	}
	//
	// end of sql category
	//-----------------------------	
		
	//commit
	sql_text = sql_text + " COMMIT;"
	//return  { "error" : "1", "message" :sql_text } ;

	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );		
	}
	catch(error){
		return  { "error" : "modem product speciality, -> update products speciality", "message" : error } ;
	}
	
};



//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var delete_products_spaciality = async function (product_id) {

	let table_name  = ojs_api_config.db_prefix + "products_speciality ";
	let field_where  = ojs_api_config.db_prefix + "products_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ product_id + '"';
	
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
	get_all_products_spaciality,
	get_one_products_spaciality,
	update_products_spaciality,
	insert_products_spaciality,
	delete_products_spaciality,
	search,
	check_store_link
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














