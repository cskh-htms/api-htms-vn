


//connect 
const connection = require('./models-connection');
const md5 = require('md5');
var mysql = require('mysql');


const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');








//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_configs.db_prefix + "token_ID as token_ID, " + 
	ojs_configs.db_prefix + "token_date_created as token_date_created, " + 
	ojs_configs.db_prefix + "token_type as token_type, " +
	ojs_configs.db_prefix + "token_key as token_key, " + 
	ojs_configs.db_prefix + "token_value as token_value " 
//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "token " 
	


//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
var search = async function (token) {


	var sql_text = 	"SELECT " + sql_select_all +
					sql_from_default + 
					" where " + 
					ojs_configs.db_prefix + "token_key = '" + token + "' ";
							
					
					
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
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "token  SET ?";
	let dataGo = {
			"token_key"						: datas.datas.token_key,
			"token_type"					: datas.datas.token_type,	
			"token_value"					: datas.datas.token_value
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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




