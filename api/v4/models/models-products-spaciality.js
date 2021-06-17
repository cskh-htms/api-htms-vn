/*



* 1. [insert_products]

* 2. [get_all_products]

* 3. [get_one_products]

* 4. [update_products]

* 5. [delete_products]

* 6. [search]




*/


//@
//@
//@
//connect 
const connection = require('./models-connection');
const default_field = require('../const-tables/const-tables-products-spaciality');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');


//@
//@
//@
//npm exstands
const mysql = require('mysql');




//@
//@
//function share
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_sql = require('../../../models/ojs-shares-sql');
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');




/////////////////////////////////////////////////////////////////////////////////////////////




//select default
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "products_speciality_ID as products_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "products_speciality_date_created,'%Y/%m/%d %H:%i:%s') as products_speciality_date_created, " + 
	
	ojs_configs.db_prefix  + "products_speciality_name as products_speciality_name, " + 
	ojs_configs.db_prefix  + "products_speciality_type as products_speciality_type, " + 
	ojs_configs.db_prefix  + "products_speciality_sku as products_speciality_sku, " + 
	ojs_configs.db_prefix  + "products_speciality_store_id as products_speciality_store_id, " + 

	ojs_configs.db_prefix  + "products_speciality_featured_image as products_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "products_speciality_image_slider as products_speciality_image_slider, " + 
	ojs_configs.db_prefix  + "products_speciality_contents as products_speciality_contents, " + 
	ojs_configs.db_prefix  + "products_speciality_excerpt as products_speciality_excerpt, " + 

	ojs_configs.db_prefix  + "products_speciality_price as products_speciality_price, " + 
	ojs_configs.db_prefix  + "products_speciality_sale_of_price as products_speciality_sale_of_price, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "products_speciality_date_start,'%Y/%m/%d %H:%i:%s') as products_speciality_date_start, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "products_speciality_date_end,'%Y/%m/%d %H:%i:%s') as products_speciality_date_end, " +  	

	ojs_configs.db_prefix  + "products_speciality_stock as products_speciality_stock, " + 
	ojs_configs.db_prefix  + "products_speciality_brand as products_speciality_brand, " + 
	ojs_configs.db_prefix  + "products_speciality_status_admin as products_speciality_status_admin, " + 
	ojs_configs.db_prefix  + "products_speciality_status_store as products_speciality_status_store, " + 
	ojs_configs.db_prefix  + "products_speciality_status_update as products_speciality_status_update, " + 
	
	

	ojs_configs.db_prefix  + "products_speciality_variation_option as products_speciality_variation_option, " + 
	ojs_configs.db_prefix  + "products_speciality_height as products_speciality_height, " + 
	ojs_configs.db_prefix  + "products_speciality_width as products_speciality_width, " + 
	ojs_configs.db_prefix  + "products_speciality_length as products_speciality_length, " + 

	ojs_configs.db_prefix  + "products_speciality_weight as products_speciality_weight, " + 
	ojs_configs.db_prefix  + "products_speciality_discount as products_speciality_discount, " + 
	ojs_configs.db_prefix  + "products_speciality_width as products_speciality_width, " + 
	ojs_configs.db_prefix  + "products_speciality_qoute as products_speciality_qoute, " +
	ojs_configs.db_prefix  + "products_speciality_unit_discount as products_speciality_unit_discount " 
	

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "products_speciality "
	

//link table	
var sql_link_default = 	"" 

//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "products_speciality_name " ;
	
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//from table
var  sql_link_search = 	""  + 

	" LEFT JOIN dala_options_product_speciality_link  ON  dala_products_speciality_ID = dala_options_product_speciality_link_product_id  " +   
	" LEFT JOIN dala_options_product_speciality  ON  dala_options_product_speciality_link_option_id = dala_options_product_speciality_ID  " + 
	
	" LEFT JOIN dala_category_general_speciality_link  ON  dala_products_speciality_ID = dala_category_general_speciality_link_product_id " +   
	" LEFT JOIN dala_category_general_speciality  ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID " +	
	
	" LEFT JOIN dala_products  ON  dala_products_speciality_brand  = dala_products_ID " +    
	
	" LEFT JOIN dala_stores  ON  dala_products_speciality_store_id = dala_stores_ID  " + 
	
	" LEFT JOIN dala_users   ON  dala_stores_user_id  =  dala_users_ID " 	



	
//@@
//@@
//@ *  1. [insert_products_spaciality]
const insert_products_spaciality = async function (datas,cat_string,option_string) {
	//@
	//let cat_arr = JSON.parse(cat_string);
	var cat_arr = cat_string;
	var option_arr = option_string;
	// sql product
	//
	var sql_text;
	var dataGo;
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
			"products_speciality_unit_discount" : datas.products_speciality_unit_discount,
			"products_speciality_qoute" : 	mysql.escape(datas.products_speciality_qoute).replace(/^'|'$/gi, "")		
		}

		let kes = Object.keys(dataGo);
		for(let x in kes){
			dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
		}		
		
		sql_text = "START TRANSACTION ;"
		sql_text = sql_text + "INSERT INTO " + ojs_configs.db_prefix + "products_speciality  SET ? ;";
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
				sql_option = "INSERT INTO " + ojs_configs.db_prefix + "options_product_speciality_link  ";
				sql_option = sql_option + "(" +
								ojs_configs.db_prefix + "options_product_speciality_link_product_id" + "," + 
								ojs_configs.db_prefix + "options_product_speciality_link_option_id" + 
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
		if(cat_arr.length > 0){
			let sql_cat_all = "";
			for(let i = 0; i < cat_arr.length; i ++){
				///ex
				sql_cat = "INSERT INTO " + ojs_configs.db_prefix + "category_general_speciality_link  ";
				sql_cat = sql_cat + "(" +
								ojs_configs.db_prefix + "category_general_speciality_link_product_id" + "," + 
								ojs_configs.db_prefix + "category_general_speciality_link_category_general_id" + 
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
//@
//@ * 1. [insert_products_spaciality]
	
	
	
	

//@
//@
//search
var search = async function (datas) {
	
	//@
	//@
	//@
	//@ select field
	var sql_field;
	try {
		if(datas.select_field){
			sql_field = default_field.get_select_fields(datas.select_field, sql_select_all)
		}else{
			sql_field = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "0.1.model_product_speciality->search", "message": error_send } ); 
		return;	
	}		
			
	//@
	//@
	//@
	//@ get_order_text	
	var sql_order;
	try {
		if(datas.order){
			sql_order = default_field.get_order_text(datas.order)
		}else{
			sql_order = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "0.2.model_product_speciality->search", "message": error_send } ); 
		return;	
	}		
		
		
	
	//@
	//@
	//@
	//@ get_condition	
	var sql_condition;
	try {
		if(datas.condition){
			sql_condition = default_field.get_condition(datas.condition)
		}else{
			sql_condition = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "0.3.model_product_speciality->search", "message": error_send } ); 
		return;	
	}		
		
			
		
	
	//@
	//@
	//@
	//@ get_having	
	var sql_having;
	try {
		if(datas.having){
			sql_having = default_field.get_having(datas.having)
		}else{
			sql_having = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "0.4.model_product_speciality->search", "message": error_send } ); 
		return;	
	}		
				
		
		
	
		
	//@
	//@
	//@
	//@ghep data	
	let get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
	//@
	//@
	let get_sql_search_1 = {...get_sql_search};
	Object.assign(get_sql_search_1, { 'sql_select_fields' : sql_field });
	//@
	

	
	
	//@	
	let get_sql_search_2 = {...get_sql_search_1};
		
	
	
	
	Object.assign(get_sql_search_2, { 'sql_order' : "" } );	
	//@
	
	
	
	
	
	//@	
	let get_sql_search_3 = {...get_sql_search_2};
	Object.assign(get_sql_search_3, { 'sql_conditions' : sql_condition });		
	//@
	

	
	
	
	
	//@	
	let get_sql_search_4 = {...get_sql_search_3};
	
	
	
	Object.assign(get_sql_search_4, { 'sql_having' : sql_having });		
				
		
	
		
	
	let get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search_4,sql_from_default,sql_link_search);	

	//return get_sql_search_group;


	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
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
 					ojs_configs.db_prefix + "products_speciality_ID = '" + product_id + "' " + 
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
 					ojs_configs.db_prefix + "products_speciality_store_id = '" + store_id + "' " + 
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
//
var update_products_spaciality = async function (datas,product_id,cat_string,option_string) {
	
	
	
	
	let cat_arr = cat_string;
	let option_arr = option_string;
	
	
	//return [cat_arr,option_arr];
	
	
	
	
	
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
				sqlSet = ojs_configs.db_prefix + item + '=' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
			}else{
				sqlSet = sqlSet + ',' + ojs_configs.db_prefix + item  + '=' +  mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
			}
		}else{
			if(sqlSet.length == 0){
				sqlSet = ojs_configs.db_prefix + item + '="' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") + '"';
			}else{
				sqlSet = sqlSet + ',' + ojs_configs.db_prefix + item  + '= "' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "")  + '"' ;
			}		
		}

		i = i + 1 ;
	});		


	let table_name  = ojs_configs.db_prefix + "products_speciality ";
	let field_where  = ojs_configs.db_prefix + "products_speciality_ID ";
	//create sql text
	
	sql_text =  sql_text + ' UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ product_id + '" ;';

	//
	// end of sql product update
	//


	//
	// sql options
	//
	
	let sql_option_all = "";
	let table_name_option  = ojs_configs.db_prefix + "options_product_speciality_link ";
	let field_where_option  = ojs_configs.db_prefix + "options_product_speciality_link_product_id ";
	let sql_option_delete = 'DELETE FROM ' + table_name_option + ' where ' + field_where_option + ' = "'+ product_id + '" ; ';		
		
	if(option_arr.length > 0){	
		for(let i = 0; i < option_arr.length; i ++){
			
			///ex
			sql_option = "INSERT INTO " + ojs_configs.db_prefix + "options_product_speciality_link  ";
			sql_option = sql_option + "(" +
							ojs_configs.db_prefix + "options_product_speciality_link_product_id" + "," + 
							ojs_configs.db_prefix + "options_product_speciality_link_option_id" + 
						") " + 
						"values(" + 
						product_id + ", " + 
						option_arr[i] + 
						") ; ";		
			sql_option_all	= sql_option_all + 	sql_option		
		}//end of for option_arr	
		
		
		//sql_text = sql_text + sql_option_delete + sql_option_all;
	}
	sql_text = sql_text + sql_option_delete + sql_option_all;
	//
	// end of sql options
	//-----------------------------	

	//
	// sql category
	//
	
	let sql_cat_all = "";
	let table_name_cat  = ojs_configs.db_prefix + "category_general_speciality_link ";
	let field_where_cat  = ojs_configs.db_prefix + "category_general_speciality_link_product_id ";
	let sql_cat_delete = 'DELETE FROM ' + table_name_cat + ' where ' + field_where_cat + ' = "'+ product_id + '" ; ';			
		
	if(cat_arr.length > 0){	
		for(let i = 0; i < cat_arr.length; i ++){
			///ex
			sql_cat = "INSERT INTO " + ojs_configs.db_prefix + "category_general_speciality_link  ";
			sql_cat = sql_cat + "(" +
							ojs_configs.db_prefix + "category_general_speciality_link_product_id" + "," + 
							ojs_configs.db_prefix + "category_general_speciality_link_category_general_id" + 
						") " + 
						"values(" + 
						product_id + ", " + 
						cat_arr[i] + 
						") ; ";		
			sql_cat_all	= sql_cat_all  + sql_cat		
		}//end of for option_arr	
		//sql_text = sql_text + sql_cat_delete +  sql_cat_all;
	}
	sql_text = sql_text + sql_cat_delete +  sql_cat_all;	
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
//
var delete_products_spaciality = async function (product_id) {

	let table_name  = ojs_configs.db_prefix + "products_speciality ";
	let field_where  = ojs_configs.db_prefix + "products_speciality_ID ";
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














