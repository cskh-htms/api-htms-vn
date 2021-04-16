
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


//sql select default
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "comments_speciality_ID as comments_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "comments_speciality_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as comments_speciality_date_created, " + 	
	ojs_api_config.db_prefix  + "comments_speciality_user_id as comments_speciality_user_id, " + 
	ojs_api_config.db_prefix  + "comments_speciality_comment_parent_id as comments_speciality_comment_parent_id, " + 
	ojs_api_config.db_prefix  + "comments_speciality_product_id as comments_speciality_product_id, " + 
	ojs_api_config.db_prefix  + "comments_speciality_contents as comments_speciality_contents, " + 
	ojs_api_config.db_prefix  + "comments_speciality_status_store as comments_speciality_status_store, " + 
	ojs_api_config.db_prefix  + "comments_speciality_status_admin as comments_speciality_status_admin, "  + 
	

	//users
	ojs_api_config.db_prefix  + "users_first_name as users_first_name, " + 
	ojs_api_config.db_prefix  + "users_last_name as users_last_name, " + 
	ojs_api_config.db_prefix  + "users_ID as users_ID, "  + 
	

	//products
	ojs_api_config.db_prefix  + "products_speciality_name as products_speciality_name, " + 
	ojs_api_config.db_prefix  + "products_speciality_ID as products_speciality_ID "




//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "comments_speciality "  ;
	
//link table	
let sql_link_default = 	"" + 

	" INNER JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "comments_speciality_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID " +    
	
	" INNER JOIN " + 
	ojs_api_config.db_prefix + "products_speciality  ON  " + 
	ojs_api_config.db_prefix + "comments_speciality_product_id  = " + 
	ojs_api_config.db_prefix + "products_speciality_ID " 


//link table	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "comments_speciality_date_created " ;
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" INNER JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "comments_speciality_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID " +    
	
	" INNER JOIN " + 
	ojs_api_config.db_prefix + "products_speciality  ON  " + 
	ojs_api_config.db_prefix + "comments_speciality_product_id  = " + 
	ojs_api_config.db_prefix + "products_speciality_ID " 	


	
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
	
	//return [datas.datas.select_field,sql_select_all];
	//@
	try {
		var sql_field = ojs_functions_shares.get_select_field(datas.select_field, sql_select_all);
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
	
	
		
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_comments_spaciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "comments_speciality  SET ?";
	let dataGo = {
			"comments_speciality_user_id"					: datas.comments_speciality_user_id,
			"comments_speciality_comment_parent_id"			: datas.comments_speciality_comment_parent_id,		
			"comments_speciality_product_id"				: datas.comments_speciality_product_id,	
			"comments_speciality_contents"					: mysql.escape(datas.comments_speciality_contents).replace(/^'|'$/gi, ""),
			"comments_speciality_status_store"				: datas.comments_speciality_status_store,
			"comments_speciality_status_admin"				: datas.comments_speciality_status_admin		
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_functions_shares.rename_key(dataGo, kes[x], ojs_api_config.db_prefix + kes[x] );
	}
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
var get_all_comments_spaciality = async function () {
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
var get_one_comments_spaciality = async function (comment_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "comments_speciality_ID = '" + comment_id + "' " + 
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
//check san pham da co binh luan chua;
var check_comment_link = async function (product_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix +  "comments_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "comments_speciality_product_id = '" + product_id + "' " + 
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
//check user da co binh luan chua;
var check_comment_link_user = async function (user_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix +  "comments_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "comments_speciality_user_id = '" + user_id + "' " + 
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
var update_comments_spaciality = async function (datas,comment_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "comments_speciality ";
	let field_where  = ojs_api_config.db_prefix + "comments_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ comment_id + '"';
	
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
var delete_comments_spaciality = async function (comment_id) {

	let table_name  = ojs_api_config.db_prefix + "comments_speciality ";
	let field_where  = ojs_api_config.db_prefix + "comments_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ comment_id + '"';
	
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
	get_all_comments_spaciality,
	get_one_comments_spaciality,
	update_comments_spaciality,
	insert_comments_spaciality,
	delete_comments_spaciality,
	search,
	check_comment_link,
	check_comment_link_user
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














