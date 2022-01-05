


//connect 
const connection = require('./models-connection');
const ojs_api_config = require('../api-configs/api-config');
const md5 = require('md5');
var mysql = require('mysql');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');



//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_api_config.db_prefix + "token_ID as token_ID, " + 
	ojs_api_config.db_prefix + "token_date_created as token_date_created, " + 
	ojs_api_config.db_prefix + "token_key as token_key, " + 
	ojs_api_config.db_prefix + "token_value as token_value " 
//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "token " 
	


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
		return  { "error" : "m_10_token", "message" : error } ;
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
					sql_conditions 
					
					
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
		return  { "error" : "m_13_token search", "message" : error } ;
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
var insert_token = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "token  SET ?";
	let dataGo = {
			"token_key"						: mysql.escape(datas.token_key).replace(/^'|'$/gi, ""),	
			"token_value"					: mysql.escape(datas.token_value).replace(/^'|'$/gi, "")
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
		return  { "error" : "m_13_token", "message" : error } ;
	}

};


//export module
module.exports = { 
				search,
				insert_token,
};




