
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




//from table
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "options_product_speciality_link_ID as options_product_speciality_link_ID, " + 
	ojs_api_config.db_prefix  + "options_product_speciality_link_product_id as options_product_speciality_link_product_id, " + 
	ojs_api_config.db_prefix  + "options_product_speciality_link_option_id as options_product_speciality_link_option_id " 




//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "options_product_speciality_link "  ;
	
//link table	
let sql_link_default = 	"" ;


//link table	
let sql_order_default = "";
	
	
	
	
//link table	
let sql_link_search = 	""  + 
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "options_product_speciality  ON  " + 
	ojs_api_config.db_prefix + "options_product_speciality_link_option_id  = " + 
	ojs_api_config.db_prefix + "options_product_speciality_ID " +    
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "products_speciality  ON  " + 
	ojs_api_config.db_prefix + "options_product_speciality_link_product_id  = " + 
	ojs_api_config.db_prefix + "products_speciality_ID " 	


	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_option_speciality_link = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "options_product_speciality_link  SET ?";
	let dataGo = {
			"options_product_speciality_link_product_id"			: datas.options_product_speciality_link_product_id,	
			"options_product_speciality_link_option_id"				: datas.options_product_speciality_link_option_id
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
var get_all_option_speciality_link = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
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
var get_one_option_speciality_link = async function (option_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "options_product_speciality_link_ID = '" + option_id + "' " + 
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
var update_option_speciality_link = async function (datas,option_id) {
	
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
				sqlSet = ojs_api_config.db_prefix + item + '=' + arrValueDatas[i] ;
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


	let table_name  = ojs_api_config.db_prefix + "options_product_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "options_product_speciality_link_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ option_id + '"';
	
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
var delete_option_speciality_link = async function (option_id) {

	let table_name  = ojs_api_config.db_prefix + "options_product_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "options_product_speciality_link_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ option_id + '"';
	
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
var delete_option_speciality_link_product = async function (profuct_id) {

	let table_name  = ojs_api_config.db_prefix + "options_product_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "options_product_speciality_link_product_id ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ profuct_id + '"';
	
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
					sql_link_search + 
					sql_conditions + 
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
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var check_option_link = async function ( product_id ) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix + "options_product_speciality_link_ID " + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "options_product_speciality_link_product_id = '" + product_id + "' " 
	//@
	//return ({"error" : "a" , "datas": sql_text })
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
	get_all_option_speciality_link,
	get_one_option_speciality_link,
	update_option_speciality_link,
	insert_option_speciality_link,
	delete_option_speciality_link,
	search,
	check_option_link,
	delete_option_speciality_link_product
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














