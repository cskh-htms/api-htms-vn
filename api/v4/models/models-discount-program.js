
/*

* 1. [insert_discount_program]

* 2. [get_all_discount_program]

* 2.3 [get_product_sale_by_prodduct]

* 2.3 [get_product_sale]

* 2.4 [get_all_discount_program_by_position]

* 3. [get_one_discount_program]

* 4. [update_discount_program]

* 5. [delete_discount_program]

* 6. [search]

* 7. [search_discount_program_sale]



*/


//@
//@
//@
//connect 
const connection = require('./models-connection');



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


//@
//@
//@
//@
//@
//@
//@ fields select
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "discount_program_ID as discount_program_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_date_created, " + 	
	ojs_configs.db_prefix  + "discount_program_featured_image as discount_program_featured_image, " +	
	ojs_configs.db_prefix  + "discount_program_name as discount_program_name, " +	
	ojs_configs.db_prefix  + "discount_program_position as discount_program_position, " +		
	
	ojs_configs.db_prefix  + "discount_program_store_id_created as discount_program_store_id_created, " +
	ojs_configs.db_prefix  + "discount_program_status_admin as discount_program_status_admin, " +
	ojs_configs.db_prefix  + "discount_program_status_update as discount_program_status_update, " +	
	ojs_configs.db_prefix  + "discount_program_qoute as discount_program_qoute, " +	
	
	
	ojs_configs.db_prefix  + "discount_program_price_created as discount_program_price_created, " + 	
	ojs_configs.db_prefix  + "discount_program_price_sale as discount_program_price_sale, " + 
	ojs_configs.db_prefix  + "discount_program_type as discount_program_type, " + 
	ojs_configs.db_prefix  + "discount_program_time_type as discount_program_time_type, " + 
	ojs_configs.db_prefix  + "discount_program_gift_type as discount_program_gift_type, " + 

	
	ojs_configs.db_prefix  + "discount_program_price_one_day as discount_program_price_one_day, " + 	
	ojs_configs.db_prefix  + "discount_program_price_one_product as discount_program_price_one_product, " + 	
	
	ojs_configs.db_prefix  + "discount_program_limit_day as discount_program_limit_day, " + 	
	ojs_configs.db_prefix  + "discount_program_limit_product as discount_program_limit_product, " + 	
	
	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_star,'%Y/%m/%d %H:%i:%s') as discount_program_date_star, " +		
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_end,'%Y/%m/%d %H:%i:%s') as discount_program_date_end, " +		
	
	ojs_configs.db_prefix  + "discount_program_information as discount_program_information " ;



//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "discount_program ";  
	
	
var sql_from_search = 	" from " + 
	ojs_configs.db_prefix + "view_discount_program ";  	
	
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"";
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "discount_program_date_created ASC "; 
	
	
	
	
	
	
//from table
var sql_from_search_discount_program_sale = 	" from " + 
	ojs_configs.db_prefix + "view_discount_program_sale "  ;		
	


var sql_link_search_discount_program_sale = "";
	
			
	
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_discount_program]
var insert_discount_program = async function (datas) {
	//@
	//@
	//@	
	var discount_program_date_star;
	var discount_program_date_end;
	
	if(datas.discount_program_date_star == ''){
		discount_program_date_star = null;
	}else{
		discount_program_date_star = mysql.escape(datas.discount_program_date_star).replace(/^'|'$/gi, "");
	}
	
	//@
	//@
	//@
	if(datas.discount_program_date_end == ''){
		discount_program_date_end = null;
	}else{
		discount_program_date_end = mysql.escape(datas.discount_program_date_end).replace(/^'|'$/gi, "");
	}		
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "discount_program  SET ?";
	var dataGo = {
			"discount_program_name"					: mysql.escape(datas.discount_program_name).replace(/^'|'$/gi, ""),	
			"discount_program_position"				: datas.discount_program_position,
			
			"discount_program_featured_image"		: mysql.escape(datas.discount_program_featured_image).replace(/^'|'$/gi, ""),
			
			"discount_program_price_created"		: datas.discount_program_price_created,
			"discount_program_price_sale"			: datas.discount_program_price_sale,
			"discount_program_type"					: datas.discount_program_type,
			"discount_program_time_type"			: datas.discount_program_time_type,
			"discount_program_gift_type"			: datas.discount_program_gift_type,
			
			"discount_program_store_id_created": datas.discount_program_store_id_created,
			"discount_program_qoute"				: mysql.escape(datas.discount_program_qoute).replace(/^'|'$/gi, ""),			
			"discount_program_status_admin"			: datas.discount_program_status_admin,		
			"discount_program_status_update"		: datas.discount_program_status_update,

			"discount_program_price_one_day"		: datas.discount_program_price_one_day,
			"discount_program_price_one_product"	: datas.discount_program_price_one_product,

			"discount_program_limit_product"		: datas.discount_program_limit_product,
			"discount_program_limit_day"			: datas.discount_program_limit_day,

			"discount_program_date_star"			: discount_program_date_star,
			"discount_program_date_end"				: discount_program_date_end,			
			
			"discount_program_information"			: mysql.escape(datas.discount_program_information).replace(/^'|'$/gi, "")			
	}
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
	}


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
		return  { "error" : "1", "position":"md-discount_program->indert", "message" : error } ;
	}

};

//@ end of * 1. [insert_discount_program]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_discount_program]
var get_all_discount_program = async function () {
	
	
	
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
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
		return  { "error" : "1", "position":"md-discount_program->get all", "message" : error } ;
	}
};






//@@
//@@
//@@
//@@
//@ * 2.2 [get_all_discount_program_by_product]
var get_all_discount_program_by_product = async function (datas) {
	//return datas;	
	//create sql text
	var sql_text = 	"SELECT " + 
					ojs_configs.db_prefix + "products_speciality_ID as products_speciality_ID," + 
					ojs_configs.db_prefix + "products_speciality_name as products_speciality_name, " +
					ojs_configs.db_prefix + "stores_name as stores_name, " +					
					ojs_configs.db_prefix + "products_speciality_featured_image as products_speciality_featured_image ," + 
					ojs_configs.db_prefix + "products_speciality_price as products_speciality_price," + 
					ojs_configs.db_prefix + "products_speciality_sale_of_price as products_speciality_sale_of_price," + 
					
					"(CASE " + 
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_sale_of_price IS NULL " + 
						"THEN " + 
							ojs_configs.db_prefix  + "products_speciality_price " + 
							
							
						// date_star = null 	
						// date_end = null 
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NULL " + 
						"THEN " + 
							ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 			
							
							
						// date_star = yes 	
						// date_end = null 
						// date_now - date_star > 0 (da toi han khuyen mai)
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0 " + 
						"THEN " + 
							ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 		

							
						// date_star = null 	
						// date_end = yes 
						// date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) < 0 " + 
						"THEN " + 
							ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 																	
							
							
						// date_star = yes 	
						// date_end = yes 
						// date_now - date_star > 0 (da toi han khuyen mai)
						// date_now - date_star > 0 (da toi han khuyen mai)
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0  and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) < 0  " + 								
						"THEN " + 
							ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 			

						"ELSE " +  
							ojs_configs.db_prefix  + "products_speciality_price " + 
					"END )  as products_speciality_price_caution, "  + 					
					
					
					
					"(CASE " + 
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_sale_of_price IS NULL " + 
						"THEN " + 
							" '0' " + 
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NULL " + 
						"THEN " + 
							" '1' " +  			
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0 " + 
						"THEN " + 
							" '1' " +  		
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) < 0 " + 
						"THEN " + 
							" '2' " +  
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) > 0 " + 
						"THEN " + 
							" '3' " + 																	
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0  and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) > 0  " + 								
						"THEN " + 
							" '3' " + 		
						"WHEN " +  
							ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
							ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
							"UNIX_TIMESTAMP(NOW()) - " + 
							"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) < 0  " + 								
						"THEN " + 
							" '2' " + 	
						"ELSE " +  
							" '4' " + 
					"END ) as products_speciality_sale_of_price_time_check " + 						
					
					
					"FROM " +
					ojs_configs.db_prefix + "discount_program_product_link " + 
					
					"LEFT JOIN " + 
						ojs_configs.db_prefix + "products_speciality ON " + 
						ojs_configs.db_prefix + "discount_program_product_link_product_speciality_id = " + 
						ojs_configs.db_prefix + "products_speciality_ID " + 
						
					"LEFT JOIN " + 
						ojs_configs.db_prefix + "stores ON " + 
						ojs_configs.db_prefix + "products_speciality_store_id = " + 
						ojs_configs.db_prefix + "stores_ID " + 						
						
					"LEFT JOIN " + 
						ojs_configs.db_prefix + "discount_program_details ON " + 
						ojs_configs.db_prefix + "discount_program_product_link_discount_program_details_id = " + 
						ojs_configs.db_prefix + "discount_program_details_ID " + 						
						
					"LEFT JOIN " + 
						ojs_configs.db_prefix + "discount_program ON " + 
						ojs_configs.db_prefix + "discount_program_details_discount_program_id = " + 
						ojs_configs.db_prefix + "discount_program_ID " + 							
							
					"WHERE " +
					ojs_configs.db_prefix + "discount_program_ID = " + datas.c1 + " " + 
					"AND " + ojs_configs.db_prefix + "stores_status_stores = 1 " + 
					"AND " + ojs_configs.db_prefix + "discount_program_product_link_status = 1 " + 
					"AND " + ojs_configs.db_prefix + "products_speciality_status_admin = 1 " + 
					
					"AND (" + 
						ojs_configs.db_prefix + "discount_program_time_type  = 0 " + 
						"OR " + 
						" UNIX_TIMESTAMP(" + ojs_configs.db_prefix + "discount_program_date_end) < UNIX_TIMESTAMP(NOW()) ) " + 

					"AND (" + 
						ojs_configs.db_prefix + "discount_program_details_limit_day = 0 " + 
						"OR " + 
						"UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(" + 
						ojs_configs.db_prefix + "discount_program_details_date_created) + (" + 
						ojs_configs.db_prefix + "discount_program_details_limit_day * 24 * 60 * 60) ) < 0)"

					
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
		return  { "error" : "1", "position":"md-discount_program->get_all_discount_program_by_product", "message" : error } ;
	}	
	
};



//@
//@
//@
//@
//@
//@ * 2.3 [get_product_sale]
const get_product_sale = async function (datas) {
	
	var data_id = "";
	data_id = data_id + "(";
	for(x in datas){
		if(x == 0){
			data_id = data_id + datas[x]
		}else{
			data_id = data_id + "," + datas[x]
		}
	}
	data_id = data_id + ")";
	//return data_id;
	
	//@
	//@
	var sql_text = 	"SELECT " + 
					ojs_configs.db_prefix + "orders_details_speciality_product_id as f1_product_id, " + 
					ojs_configs.db_prefix + "orders_details_speciality_qty as f2_so_luong_ban " + 
					
					"FROM " +
					ojs_configs.db_prefix + "view_count_product_sale " + 

					"WHERE " +
					ojs_configs.db_prefix + "orders_details_speciality_product_id IN " +  data_id ;

					
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
		return  { "error" : "1", "position":"md-discount_program->get_product_sale", "message" : error } ;
	}	
	
};



//@
//@
//@
//@
//@
//@ * 2.4 [get_all_discount_program_by_position]
const get_all_discount_program_by_position = async function (datas) {
	
	//@
	//@
	var sql_text = 	"SELECT " + 
					ojs_configs.db_prefix + "discount_program_ID as discount_program_ID, " + 
					ojs_configs.db_prefix + "discount_program_featured_image as discount_program_featured_image, " + 
					ojs_configs.db_prefix + "discount_program_name as discount_program_name " + 
					
					"FROM " +
					ojs_configs.db_prefix + "discount_program " + 

					"WHERE " +
					ojs_configs.db_prefix + "discount_program_position = " +  datas.c1 ;

					
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
		return  { "error" : "1", "position":"md-discount_program->get_all_discount_program_by_position", "message" : error } ;
	}		
};








//@
//@
//@
//@
//@
//@ * 3. [get_one_discount_program]
const get_one_discount_program = async function (discount_program_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "discount_program_ID = '" + discount_program_id + "' "				
	
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
		return  { "error" : "1", "position":"md-discount_program->get one", "message" : error } ;
	}
};

//@ * end of  3. [get_one_discount_program]



//@
//@
//@
//@
//@* 4. [update_discount_program]
const update_discount_program = async function (datas,discount_program_id) {
	
	
	
	if(datas.discount_program_date_star == ''){
		datas.discount_program_date_star = null
	}
	
	if(datas.discount_program_date_end == ''){
		datas.discount_program_date_end = null
	}	
	
	
	
	
	
	
	var sqlSet = "";
	
	//tao arr key
	var arrDatas = Object.keys(datas);
	
	//tao arr value 
	var arrValueDatas = [];
	var x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	
	//return  arrValueDatas;
	
	//tao sqlset 
	var i = 0;
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


	var table_name  = ojs_configs.db_prefix + "discount_program ";
	var field_where  = ojs_configs.db_prefix + "discount_program_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ discount_program_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position":"md-discount_program->update", "message" : error } ;
	}
};



//@* end of 4. [update_discount_program]


//@
//@
//@
//@
//@* 5. [delete_discount_program]
const delete_discount_program = async function (discount_program_id) {

	var table_name  = ojs_configs.db_prefix + "discount_program ";
	var field_where  = ojs_configs.db_prefix + "discount_program_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ discount_program_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete cử hàng, liên hệ admin" );
		return  { "error" : "1", "position":"md-discount_program->delete", "message" : error } ;
		return;	
	}
};


//@* end of 5. [delete_discount_program]




//@
//@
//@
//@
//@* 6. [delete_discount_program]
const search = async function (datas) {
	
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search,sql_link_search);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return  { "error" : "1", "position":"md-discount_program->search", "message" : error } ;
		return;	
	}	
	
	
	//return get_sql_search_group;
	
	
	//@
	//@
	//@
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
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return  { "error" : "2", "position":"md-discount_program->search", "message" : error } ;
		return;	
	}
};







//@
//@
//@
// 7. [get_owner_discount_program]
const get_owner_discount_program = async function (datas) {
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "discount_program_ID"  + 
					" FROM " + ojs_configs.db_prefix + "discount_program  " + 
							
					" LEFT JOIN " + 
					ojs_configs.db_prefix + "stores  ON  " + 
					ojs_configs.db_prefix + "discount_program_store_id_created  = " + 
					ojs_configs.db_prefix + "stores_ID " +    	

					" LEFT JOIN " + 
					ojs_configs.db_prefix + "users  ON  " + 
					ojs_configs.db_prefix + "stores_user_id  = " + 
					ojs_configs.db_prefix + "users_ID "   + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "discount_program_ID = '" + datas.datas.discount_program_id + "' " 
	
	//return sql_text;
	//@
	//@
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
		return  { "error" : "1", "position":"md-discount_program->get owner", "message" : error } ;
	}
};


//@
//@
//@
//@
//@* 7. [search_discount_program_sale]
const search_discount_program_sale = async function (datas) {
	
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_discount_program_sale,sql_link_search_discount_program_sale);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return  { "error" : "1", "position":"md-discount_program->search_discount_program_sale", "message" : error } ;
		return;	
	}	
	
	
	//return get_sql_search_group;
	
	
	//@
	//@
	//@
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
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return  { "error" : "2", "position":"md-discount_program->search_discount_program_sale", "message" : error } ;
		return;	
	}
};


//export module
module.exports = {
			search,
			insert_discount_program,
			get_one_discount_program,
			update_discount_program,
			delete_discount_program,
			get_all_discount_program,
			get_owner_discount_program,
			search_discount_program_sale,
			get_all_discount_program_by_product,
			get_product_sale,
			get_all_discount_program_by_position
};

















