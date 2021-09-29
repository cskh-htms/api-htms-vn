
/*

* 1. [insert_discount_program_product_link]

* 2. [get_all_discount_program_product_link]

* 3. [get_one_discount_program_product_link]

* 4. [update_discount_program_product_link]

* 5. [delete_discount_program_product_link]

* 6. [search]

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
const default_field = require('../const-tables/const-tables-discount-program-product-link');

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
var sql_select_all_view = 	"" ;
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "discount_program_product_link_ID as discount_program_product_link_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_product_link_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_product_link_date_created, " +	
	ojs_configs.db_prefix  + "discount_program_product_link_discount_program_details_id as discount_program_product_link_discount_program_details_id, " + 
	
	ojs_configs.db_prefix  + "discount_program_product_link_product_speciality_id as discount_program_product_link_product_speciality_id, " + 
	ojs_configs.db_prefix  + "discount_program_product_link_status as discount_program_product_link_status, " + 	
	
	
	ojs_configs.db_prefix  + "discount_program_product_link_qoute as discount_program_product_link_qoute ";

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "discount_program_product_link ";  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = "" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "discount_program_details  ON  " + 
	ojs_configs.db_prefix + "discount_program_product_link_discount_program_details_id  = " + 
	ojs_configs.db_prefix + "discount_program_details_ID " +    
	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "discount_program  ON  " + 
	ojs_configs.db_prefix + "discount_program_details_discount_program_id  = " + 
	ojs_configs.db_prefix + "discount_program_ID " +  	
	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "discount_program_details_store_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +  	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +  		
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "discount_program_product_link_product_speciality_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID " ;	  
	
	


var sql_link_view = "" ;
var sql_from_view = " from " + 
	ojs_configs.db_prefix + "view_discount_program_product ";


//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "discount_program_product_link_date_created ASC ";
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_discount_program_product_link]
var insert_discount_program_product_link = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "discount_program_product_link  SET ?";
	var dataGo = {
			"discount_program_product_link_discount_program_details_id"	: datas.discount_program_product_link_discount_program_details_id,
			"discount_program_product_link_product_speciality_id"	: datas.discount_program_product_link_product_speciality_id,			
			"discount_program_product_link_status"	: datas.discount_program_product_link_status,			
			"discount_program_product_link_qoute"	: mysql.escape(datas.discount_program_product_link_qoute).replace(/^'|'$/gi, "")


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
		return  { "error" : "1", "position":"md-discount-program-product-link->insert", "message" : error } ;
	}

};

//@ end of * 1. [insert_discount_program_product_link]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_discount_program_product_link]
var get_all_discount_program_product_link = async function () {
	
	
	
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
		return  { "error" : "1", "position":"md-discount-program-product-link->get all", "message" : error } ;
	}
};



//@ end of * 2. [get_all_discount_program_product_link]



//@
//@
//@
//@
//@
//@ * 3. [get_one_discount_program_product_link]
const get_one_discount_program_product_link = async function (discount_program_product_link_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "discount_program_product_link_ID = '" + discount_program_product_link_id + "' "				
	
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
		return  { "error" : "1", "position":"md-discount-program-product-link->get one", "message" : error } ;
	}
};

//@ * end of  3. [get_one_discount_program_product_link]



//@
//@
//@
//@
//@* 4. [update_discount_program_product_link]
const update_discount_program_product_link = async function (datas,discount_program_product_link_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "discount_program_product_link ";
	var field_where  = ojs_configs.db_prefix + "discount_program_product_link_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ discount_program_product_link_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position":"md-discount-program-product-link->update", "message" : error } ;
	}
};



//@* end of 4. [update_discount_program_product_link]


//@
//@
//@
//@
//@* 5. [delete_discount_program_product_link]
const delete_discount_program_product_link = async function (discount_program_product_link_id) {

	var table_name  = ojs_configs.db_prefix + "discount_program_product_link ";
	var field_where  = ojs_configs.db_prefix + "discount_program_product_link_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ discount_program_product_link_id + '"';
	
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
		return  { "error" : "1", "position":"md-discount-program-product-link->delete", "message" : error } ;
		return;	
	}
};


//@* end of 5. [delete_discount_program_product_link]




//@
//@
//@
//@
//@* 6. [delete_discount_program_product_link]
const search = async function (datas) {
	
	//return 	datas;
	//@
	//@
	//@
	//@ select field
	var sql_field;
	try {
		if(datas.select_field){
			sql_field = default_field.get_select_fields(datas.select_field, sql_select_all)
			//return 	sql_field;
		}else{
			sql_field = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		return  { "error" : "1", "position":"md-discount-program-product-link->search", "message" : error } ;
		return;	
	}		
			
			
	//return 	sql_field;	
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all_view);
		
		//return get_sql_search;
		//@
		//@
		//@	
		//@
		let get_sql_search_1 = {...get_sql_search};
		Object.assign(get_sql_search_1, { 'sql_select_fields' : sql_field });

		
		
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search_1,sql_from_view,sql_link_view);
		
		//return get_sql_search_group;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return  { "error" : "2", "position":"md-discount-program-product-link->search", "message" : error } ;
		return;	
	}	
	//return get_sql_search;
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
		return  { "error" : "3", "position":"md-discount-program-product-link->search", "message" : error } ;
		return;	
	}
};

//@* end of 6. [search]



//@
//@
//@
// 7. [get_owner_discount_program_product_link]
const get_owner_discount_program_product_link = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "discount_program_product_link_ID  "  + 
					sql_from_default + 
					sql_link_search + 
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "discount_program_product_link_ID  = '" + datas.datas.discount_program_product_link_id + "' " 
	
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
		return  { "error" : "1", "position":"md-discount-program-product-link->get owner", "message" : error } ;
	}
};

// 7. [get_owner_discount_program_product_link]



//export module
module.exports = {
			search,
			insert_discount_program_product_link,
			get_one_discount_program_product_link,
			update_discount_program_product_link,
			delete_discount_program_product_link,
			get_all_discount_program_product_link,
			get_owner_discount_program_product_link
};

















