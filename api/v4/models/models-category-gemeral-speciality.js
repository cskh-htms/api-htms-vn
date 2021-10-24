
/*

model-category

* -1. [insert_category_general_speciality] ( tạo category)

* -2. [get_owner_store] ( check chủ sở hữu store)

* 3. [get_all_category_general_speciality]

* 4. [get_owner_cat] ( check chủ sở hữu category)

* 5. [get_one_category_general_speciality]

* 6. [update_category_general_speciality]

* 7. [delete_category_general_speciality]

* 8. [search]

* 9. [search_count_product_by_category]
* 10. [search_count_product_sale_by_category]




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



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@fileds select
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "category_general_speciality_ID as category_general_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "category_general_speciality_date_created,'%Y/%m/%d %H:%i:%s') as category_general_speciality_date_created, " + 
	ojs_configs.db_prefix  + "category_general_speciality_name as category_general_speciality_name, " + 
	ojs_configs.db_prefix  + "category_general_speciality_category_parent_id as category_general_speciality_category_parent_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_infomation as category_general_speciality_infomation, " + 
	ojs_configs.db_prefix  + "category_general_speciality_featured_image as category_general_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "category_general_speciality_sort_order as category_general_speciality_sort_order, " + 
	ojs_configs.db_prefix  + "category_general_speciality_show as category_general_speciality_show, " + 
	
	
	ojs_configs.db_prefix  + "category_general_speciality_stores_status as category_general_speciality_stores_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_stores_id as category_general_speciality_stores_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_update_status as category_general_speciality_update_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_admin_status as category_general_speciality_admin_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_qoute as category_general_speciality_qoute " ;
	




//@
//@
//@
//@from	
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_general_speciality " ;
//@from	
var sql_from_view = 	" from " + 
	ojs_configs.db_prefix + "view_categorys " ;	
	
//@
//@
//@
//@link	
var sql_link_default = 	" ";
var sql_link_view = 	" ";

//@
//@
//@
//@order
var sql_order_default = " order by " + 
	
	ojs_configs.db_prefix + "category_general_speciality_date_created DESC, " + 
	ojs_configs.db_prefix + "category_general_speciality_name " ;
	
	





//from table
var sql_from_search_count_product_by_category = 	" from " + 
	ojs_configs.db_prefix + "view_count_product_by_category "  ;		

var sql_from_search_count_product_sale_by_category = 	" from " + 
	ojs_configs.db_prefix + "view_count_product_sale_by_category "  ;	


var sql_link_search_count_product_by_category = "";
var sql_link_search_count_product_sale_by_category = 	"";








// search ========================================================
//@
//@
//@
//@from	

//@
//@
//@
//@link	
var sql_link_search = 	""  + 

	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "stores  ON  " + 
		ojs_configs.db_prefix +  "category_general_speciality_stores_id = " + 
		ojs_configs.db_prefix +  "stores_ID  " + 
		
	
	" LEFT JOIN " + 
		ojs_configs.db_prefix + "service_type  ON  " + 
		ojs_configs.db_prefix + "stores_service_type_id  = " + 
		ojs_configs.db_prefix + "service_type_ID  " +    			
		
	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "users  ON  " + 
		ojs_configs.db_prefix +  "stores_user_id = " + 
		ojs_configs.db_prefix +  "users_ID  " ; 	


	
	
//
//@@
//@@
//@@
//@@
//@@
// @ * -1. [insert_category_general_speciality] 
const insert_category_general_speciality = async function (datas) {
	
	//@
	//@
	//@
	try {
		var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "category_general_speciality  SET ?";
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
		return  { "error" : "1", "position":"md-category_general_speciality->insert", "message" : error } ;
	}
	
	//@
	//@
	//@
	try {
		var kes = Object.keys(dataGo);
		for(let x in kes){
			dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
		}	
	}
	catch(error){
		return  { "error" : "2", "position":"md-category_general_speciality->insert", "message" : error } ;
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
		return  { "error" : "3", "position":"md-category_general_speciality->insert", "message" : error } ;
	}

};
//* end of -1. [insert_category_general_speciality] 


//@
//@
//@
// 2. [get_owner_store]
const get_owner_store = async function (datas) {
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "users_ID"  + 
					" FROM " + ojs_configs.db_prefix + "stores  " + 
							
					" LEFT JOIN " + 
					ojs_configs.db_prefix + "users  ON  " + 
					ojs_configs.db_prefix + "stores_user_id  = " + 
					ojs_configs.db_prefix + "users_ID " +    	

					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "stores_ID = '" + datas.datas.store_id + "' " 
	
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
		return  { "error" : "1", "position":"md-category_general_speciality->get owner store", "message" : error } ;
	}
};

//2. end of  2. [get_owner_store]





//@
//@
//@
// @ * 3. [get_all_category_general_speciality]
const get_all_category_general_speciality = async function () {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
	//@
	
	//return sql_text;
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
		return  { "error" : "1", "position":"md-category_general_speciality->get all", "message" : error } ;
	}
};

// @ end of * 3. [get_all_category_general_speciality]







//@
//@
//@
// 4. [get_owner_cat]
const get_owner_cat = async function (datas) {
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "users_ID"  + 
					" FROM " + ojs_configs.db_prefix + "category_general_speciality  " + 
							
					" LEFT JOIN " + 
					ojs_configs.db_prefix + "stores  ON  " + 
					ojs_configs.db_prefix + "category_general_speciality_stores_id  = " + 
					ojs_configs.db_prefix + "stores_ID " +    	

					" LEFT JOIN " + 
					ojs_configs.db_prefix + "users  ON  " + 
					ojs_configs.db_prefix + "stores_user_id  = " + 
					ojs_configs.db_prefix + "users_ID "   + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "category_general_speciality_ID = '" + datas.datas.cat_id + "' " 
	
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
		return  { "error" : "1", "position":"md-category_general_speciality->get owner cat", "message" : error } ;
	}
};

//4. end of [get_owner_cat]




//@@
//@@
//@@
//@@
//@* 5. [get_one_category_general_speciality]
const get_one_category_general_speciality = async function (cat_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "category_general_speciality_ID = '" + cat_id + "' " + 
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
		return  { "error" : "1", "position":"md-category_general_speciality->get one", "message" : error } ;
	}
};


//@* end of 5. [get_one_category_general_speciality]




//@@
//@@
//@@
//@@
//@ * 6. [update_category_general_speciality]
const  update_category_general_speciality = async function (datas,cat_id) {
	
	let sqlSet = "";
	
	//tao arr key
	let arrDatas = Object.keys(datas);
	
	//tao arr value 
	let arrValueDatas = [];
	let x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	//return  arrValueDatas;
	
	//tao sqlset 
	let i = 0;
	arrDatas.forEach(function(item) {
		//
		if(arrValueDatas[i]== null){
			if(sqlSet.length == 0){
				sqlSet = ojs_configs.db_prefix + item + '=' + arrValueDatas[i] ;
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


	let table_name  = ojs_configs.db_prefix + "category_general_speciality ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ cat_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_general_speciality->update", "message" : error } ;
	}
};

//@ * end of  6. [update_category_general_speciality]






//@@
//@@
//@@
//@@
//@ * 7. [delete_category_general_speciality]
const delete_category_general_speciality = async function (cat_id) {

	let table_name  = ojs_configs.db_prefix + "category_general_speciality ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ cat_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_general_speciality->delete", "message" : error } ;
	}
};

//@ end of  * 7. [delete_category_general_speciality]














//@@
//@@	
//@ 8. [search]
var search = async function (datas) {
	
	
	//@
	//@
	//@	
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_view,sql_link_view);
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_general_speciality->search", "message" : error } ;
	}	

	//return get_sql_search_group;


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
		return  { "error" : "2", "position":"md-category_general_speciality->search", "message" : error } ;
	}
};
	
	
	
//@@
//@@	
//@ 9. [search_count_product_by_category]
var search_count_product_by_category = async function (datas) {
	
	
	//@
	//@
	//@	
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_count_product_by_category,sql_link_search_count_product_by_category);
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_general_speciality->search_count_product_by_category", "message" : error } ;
	}	

	//return get_sql_search_group;


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
		return  { "error" : "2", "position":"md-category_general_speciality->search_count_product_by_category", "message" : error } ;
	}
};




//@@
//@@	
//@ 10. [search_count_product_sale_by_category]
var search_count_product_sale_by_category = async function (datas) {
	
	
	//@
	//@
	//@	
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_count_product_sale_by_category,sql_link_search_count_product_sale_by_category);
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_general_speciality->search_count_product_sale_by_category", "message" : error } ;
	}	

	//return get_sql_search_group;


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
		return  { "error" : "2", "position":"md-category_general_speciality->search_count_product_sale_by_category", "message" : error } ;
	}
};	
	
	



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_category_general_speciality,
	insert_category_general_speciality,
	update_category_general_speciality,
	delete_category_general_speciality,
	get_one_category_general_speciality,
	search,
	get_owner_store,
	get_owner_cat,
	search_count_product_by_category,
	search_count_product_sale_by_category
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














