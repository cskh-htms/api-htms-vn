


//connect 
const connection = require('./models-connection');
const ojs_api_config = require('../api-configs/api-config');
const md5 = require('md5');
var mysql = require('mysql');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');



//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_api_config.db_prefix + "users_ID as users_ID, " + 
	ojs_api_config.db_prefix + "users_date_created as users_date_created, " + 
	ojs_api_config.db_prefix + "users_name as users_name, " + 
	ojs_api_config.db_prefix + "users_password as users_password, " + 
	ojs_api_config.db_prefix + "users_first_name as users_first_name, " + 
	ojs_api_config.db_prefix + "users_last_name as users_last_name, " + 
	ojs_api_config.db_prefix + "users_adress as users_adress, " + 
	ojs_api_config.db_prefix + "users_phone as users_phone, " + 
	ojs_api_config.db_prefix + "users_email as users_email, " + 
	ojs_api_config.db_prefix + "users_users_type_id as users_users_type_id, " + 	
	ojs_api_config.db_prefix + "users_router_version as users_router_version, " + 
	ojs_api_config.db_prefix + "users_view_version as users_view_version, " + 
	ojs_api_config.db_prefix + "users_js_css_version as users_js_css_version, " + 
	ojs_api_config.db_prefix + "users_api_version as users_api_version, " + 	

	ojs_api_config.db_prefix + "users_type_ID as users_type_ID, " + 
	ojs_api_config.db_prefix + "users_type_name as users_type_name, " +
	ojs_api_config.db_prefix + "users_type_infomation as users_type_infomation " 

//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "users, " + 
	ojs_api_config.db_prefix + "users_type " 
	
//link table	
let sql_link_default = 	"" + 
	ojs_api_config.db_prefix + "users." + ojs_api_config.db_prefix + "users_users_type_id = " + 
	ojs_api_config.db_prefix + "users_type." + ojs_api_config.db_prefix + "users_type_ID " 
	
	
	
//login
var login = async function (datas) {

	//create sql text
	let sql_text = 	"SELECT " + sql_select_all +
					sql_from_default + 
					"where " + 
					sql_link_default +
					"and " + ojs_api_config.db_prefix + "users_name = '" + datas.users_name + "' " + 
					"and " + ojs_api_config.db_prefix + "users_password = '" + md5(datas.users_password) + "'";
	
	//run sql
	return new Promise( (resolve,reject) => {
		connection.query( { sql:sql_text, timeout: 20000 } , ( err , results , fields ) => {
			if( err ) reject(err);
			resolve(results);
		} );
	} );

};//end of function login

//login
var login_default = async function (datas) {

	//create sql text
	let sql_text = 	"SELECT " + sql_select_all +
					sql_from_default + 
					"where " + 
					sql_link_default +
					"and " + ojs_api_config.db_prefix + "users_name = '" + datas.users_name + "' " + 
					"and " + ojs_api_config.db_prefix + "users_password = '" + md5(datas.users_password) + "'";
	
	//run sql
	return new Promise( (resolve,reject) => {
		connection.query( { sql:sql_text, timeout: 20000 } , ( err , results , fields ) => {
			if( err ) reject(err);
			resolve(results);
		} );
	} );

};//end of function login






//update users
var check_token = async function (datas) {
	
	//create sql text
	let sqlText = 	"SELECT * from " +
					ojs_api_config.db_prefix + "users "  + 
					"where " + 
					ojs_api_config.db_prefix + "users_name = '"  +  datas.users_name + "' ";
					"and " + ojs_api_config.db_prefix + "users_passwordsss = '" + md5(datas.users_password) + "'";
	//run sql
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sqlText, timeout: 15000 } , ( err , results , fields ) => {
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
//search
var search = async function (datas) {
	//@
	try {
		var sql_field = ojs_functions_shares.get_select_field(datas.select_field,sql_select_all);
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


	var sql_text = 	"SELECT " + sql_field +
					sql_from_default + 
					sql_conditions + 
					" and " +
					sql_link_default + 
					sql_order 
					
					
	//@
	//return sql_text;
	
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
var insert_users = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "users  SET ?";
	let dataGo = {
			"users_name"						: mysql.escape(datas.users_name).replace(/^'|'$/gi, ""),
			"users_password"					: md5(datas.users_password),	
			"users_first_name"					: mysql.escape(datas.users_first_name).replace(/^'|'$/gi, ""),	
			"users_last_name"					: mysql.escape(datas.users_last_name).replace(/^'|'$/gi, ""),
			"users_adress"						: mysql.escape(datas.users_adress).replace(/^'|'$/gi, ""),
			"users_phone"						: mysql.escape(datas.users_phone).replace(/^'|'$/gi, ""),	
			"users_email"						: mysql.escape(datas.users_email).replace(/^'|'$/gi, ""),
			"users_users_type_id"				: datas.users_users_type_id,
			"users_router_version"				: mysql.escape(datas.users_router_version).replace(/^'|'$/gi, ""),			
			"users_view_version"				: mysql.escape(datas.users_view_version).replace(/^'|'$/gi, ""),
			"users_js_css_version"				: mysql.escape(datas.users_js_css_version).replace(/^'|'$/gi, ""),			
			"users_api_version"					: mysql.escape(datas.users_api_version).replace(/^'|'$/gi, "")
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
var get_all_users = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all +
					sql_from_default  + 
					" where " + 
					sql_link_default 
					
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
var get_one_users = async function (user_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					" where " +  
					sql_link_default + 
					" and " + 
					ojs_api_config.db_prefix + "users_ID = '" + user_id + "' " 
	
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




//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var update_users = async function (datas,user_id) {
	
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
		
		//thay md5 cho passs
		if(item == "users_password"){
			arrValueDatas[i] = md5(arrValueDatas[i]);
		}
		
		
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


	let table_name  = ojs_api_config.db_prefix + "users ";
	let field_where  = ojs_api_config.db_prefix + "users_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_id + '"';
	
	
	//return sql_text;
	
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
var delete_users = async function (user_id) {

	let table_name  = ojs_api_config.db_prefix + "users ";
	let field_where  = ojs_api_config.db_prefix + "users_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ user_id + '"';
	
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
//@@
//@@
//check username exits
var check_trung_user_name = async function ( user_name ) {
	
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					" where " +  
					sql_link_default + 
					" and " + 
					ojs_api_config.db_prefix + "users_name= '" + user_name + "' " 
					
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
//@@
//@@
//check username exits
var check_trung_email = async function ( email ) {
	
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					" where " +  
					sql_link_default + 
					" and " + 
					ojs_api_config.db_prefix + "users_email= '" + email + "' " 
					
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
		return  { "error" : "m_14", "message" : error } ;
	}

};


//@@
//@@
//@@
//@@
//check username exits
var check_trung_phone = async function ( phone ) {
	
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					" where " +  
					sql_link_default + 
					" and " + 
					ojs_api_config.db_prefix + "users_phone= '" + phone + "' " 
					
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
		return  { "error" : "m_15", "message" : error } ;
	}

};





//export module
module.exports = { 
				login ,
				login_default,
				search,
				check_token,
				get_all_users,
				get_one_users,
				update_users,
				insert_users,
				delete_users,
				check_trung_user_name,
				check_trung_email,
				check_trung_phone
};




