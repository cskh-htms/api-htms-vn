


//connect 
const connection = require('./models-connection');
const md5 = require('md5');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');


//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_configs.db_prefix + "users_type_ID as users_type_ID, " + 
	ojs_configs.db_prefix + "users_type_name as users_type_name, " + 
	ojs_configs.db_prefix + "users_type_infomation as users_type_infomation " 
//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "users_type " 
	
//link table	
let sql_link_default = 	"" 
	

//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_users_type = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "users_type  SET ?";
	let dataGo = {
			"users_type_name"						: mysql.escape(datas.users_type_name).replace(/^'|'$/gi, ""),	
			"ousers_type_infomation"				: mysql.escape(datas.users_type_infomation).replace(/^'|'$/gi, "")
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_functions_shares.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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
var get_all_users_type = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all +
					sql_from_default  + 
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
var get_one_users_type = async function (users_type_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" and " + 
					ojs_configs.db_prefix + "users_type_ID = '" + users_type_id + "' " + 
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
var update_users_type = async function (datas,users_type_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "users_type ";
	let field_where  = ojs_configs.db_prefix + "users_type_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ users_type_id + '"';
	
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
var delete_users_type = async function (users_type_id) {

	let table_name  = ojs_configs.db_prefix + "users_type ";
	let field_where  = ojs_configs.db_prefix + "users_type_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ users_type_id + '"';
	
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




//export module
module.exports = { 
				get_all_users_type,
				get_one_users_type,
				update_users_type,
				insert_users_type,
				delete_users_type
};




