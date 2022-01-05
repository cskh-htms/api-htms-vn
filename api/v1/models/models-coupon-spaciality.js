
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
	ojs_api_config.db_prefix  + "coupon_speciality_ID as coupon_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "coupon_speciality_date_star," + "'%Y/%m/%d %H:%i:%s'"  + ") as coupon_speciality_date_star, " + 	
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "coupon_speciality_date_end," + "'%Y/%m/%d %H:%i:%s'"  + ") as coupon_speciality_date_end, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_code as coupon_speciality_code, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_info as coupon_speciality_info, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_type as coupon_speciality_type, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_formula as coupon_speciality_formula, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_condition as coupon_speciality_condition, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_condition_value as coupon_speciality_condition_value, " + 
	ojs_api_config.db_prefix  + "coupon_speciality_price as coupon_speciality_price, "  + 
	ojs_api_config.db_prefix  + "coupon_speciality_price_max as coupon_speciality_price_max, "  + 
	ojs_api_config.db_prefix  + "coupon_speciality_qty as coupon_speciality_qty, "  + 
	ojs_api_config.db_prefix  + "coupon_speciality_multi as coupon_speciality_multi "  



//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "coupon_speciality " ;
	
//link table	
let sql_link_default = 	"" ;



//link table	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "coupon_speciality_code " ;
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  ;


	
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
var insert_coupon_spaciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "coupon_speciality  SET ?";
	let dataGo = {
			"coupon_speciality_code"				: datas.coupon_speciality_code,
			"coupon_speciality_type"				: datas.coupon_speciality_type,		
			"coupon_speciality_formula"				: datas.coupon_speciality_formula,	
			"coupon_speciality_condition"			: datas.coupon_speciality_condition,
			"coupon_speciality_condition_value"		: datas.coupon_speciality_condition_value,
			"coupon_speciality_price"				: datas.coupon_speciality_price,		
			"coupon_speciality_price_max"			: datas.coupon_speciality_price_max,
			"coupon_speciality_date_star"			: datas.coupon_speciality_date_star,
			"coupon_speciality_date_end"			: datas.coupon_speciality_date_end,	
			"coupon_speciality_qty"					: datas.coupon_speciality_qty,
			"coupon_speciality_multi"				: datas.coupon_speciality_multi,
			"coupon_speciality_info"				: datas.coupon_speciality_info
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
var get_all_coupon_spaciality = async function () {
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
var get_one_coupon_spaciality = async function (coupon_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "coupon_speciality_ID = '" + coupon_id + "' " + 
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
var check_comment_link = async function (coupon_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix +  "coupon_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "coupon_speciality_coupon_id = '" + coupon_id + "' " + 
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
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix +  "coupon_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "coupon_speciality_user_id = '" + user_id + "' " + 
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
var update_coupon_spaciality = async function (datas,coupon_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "coupon_speciality ";
	let field_where  = ojs_api_config.db_prefix + "coupon_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ coupon_id + '"';
	
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
var delete_coupon_spaciality = async function (coupon_id) {

	let table_name  = ojs_api_config.db_prefix + "coupon_speciality ";
	let field_where  = ojs_api_config.db_prefix + "coupon_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ coupon_id + '"';
	
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
	get_all_coupon_spaciality,
	get_one_coupon_spaciality,
	update_coupon_spaciality,
	insert_coupon_spaciality,
	delete_coupon_spaciality,
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














