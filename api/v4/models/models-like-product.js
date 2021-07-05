
/*

* 1. [insert_like_product]

* 2. [get_all_like_product]

* 3. [get_one_like_product]

* 4. [update_like_product]

* 5. [delete_like_product]

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
	ojs_configs.db_prefix  + "like_product_ID as like_product_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "like_product_date_created,'%Y/%m/%d %H:%i:%s') as like_product_date_created, " +	
	ojs_configs.db_prefix  + "like_product_user_id as like_product_user_id, " + 
	ojs_configs.db_prefix  + "like_product_status as like_product_status, " + 	
	ojs_configs.db_prefix  + "like_product_product_id as like_product_product_id " ;


//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "like_product "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "like_product_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "like_product_product_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID " 	  
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "like_product_date_created ASC ";
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_like_product]
var insert_like_product = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "like_product  SET ?";
	var dataGo = {
			"like_product_user_id"					: datas.like_product_user_id,
			"like_product_product_id"				: datas.like_product_product_id,
			"like_product_status"					: datas.like_product_status
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
		return  { "error" : "model_like_product_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_like_product]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_like_product]
var get_all_like_product = async function () {
	
	
	
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
		return  { "error" : "model_like_product_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_like_product]



//@
//@
//@
//@
//@
//@ * 3. [get_one_like_product]
const get_one_like_product = async function (like_product_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "like_product_ID = '" + like_product_id + "' "				
	
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
		return  { "error" : "model_like_product->get_one_like_product->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_like_product]



//@
//@
//@
//@
//@* 4. [update_like_product]
const update_like_product = async function (datas,like_product_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "like_product ";
	var field_where  = ojs_configs.db_prefix + "like_product_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ like_product_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->like_product->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_like_product]


//@
//@
//@
//@
//@* 5. [delete_like_product]
const delete_like_product = async function (like_product_id) {

	var table_name  = ojs_configs.db_prefix + "like_product ";
	var field_where  = ojs_configs.db_prefix + "like_product_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ like_product_id + '"';
	
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
		res.send({ "error" : "model_like_product->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_like_product]




//@
//@
//@
//@
//@* 6. [delete_like_product]
const search = async function (datas) {
	
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "model_like_product->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_like_product->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]






//@
//@
//@
// 7. [get_owner_like_product]
const get_owner_like_product = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "like_product_ID  "  + 
					sql_from_default + 
					sql_link_search + 
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "like_product_ID  = '" + datas.datas.like_product_id + "' " 
	
	return sql_text;
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
		return  { "error" : "models_products->get_owner_like_productt->error_number : 1", "message" : error } ;
	}
};

// 7. [get_owner_like_product]






//export module
module.exports = {
			search,
			insert_like_product,
			get_one_like_product,
			update_like_product,
			delete_like_product,
			get_all_like_product,
			get_owner_like_product
};

















