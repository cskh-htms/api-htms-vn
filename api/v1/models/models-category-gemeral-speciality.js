
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
	ojs_api_config.db_prefix  + "category_general_speciality_ID as category_general_speciality_ID, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_date_created as category_general_speciality_date_created, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_name as category_general_speciality_name, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_category_parent_id as category_general_speciality_category_parent_id, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_infomation as category_general_speciality_infomation, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_featured_image as category_general_speciality_featured_image, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_sort_order as category_general_speciality_sort_order, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_show as category_general_speciality_show "




//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "category_general_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//link table	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "category_general_speciality_name" ;
	
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//
let sql_link_search = 	""  ;
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_category_general_speciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "category_general_speciality  SET ?";
	let dataGo = {
			"category_general_speciality_name"						: mysql.escape(datas.category_general_speciality_name).replace(/^'|'$/gi, ""),
			"category_general_speciality_category_parent_id"		: datas.category_general_speciality_category_parent_id,	
			"category_general_speciality_infomation"				: mysql.escape(datas.category_general_speciality_infomation).replace(/^'|'$/gi, ""),	
			"category_general_speciality_featured_image"			: mysql.escape(datas.category_general_speciality_featured_image).replace(/^'|'$/gi, ""),	
			"category_general_speciality_sort_order"				: datas.category_general_speciality_sort_order,	
			"category_general_speciality_show"						: datas.category_general_speciality_show	
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
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var update_category_general_speciality = async function (datas,cat_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "category_general_speciality ";
	let field_where  = ojs_api_config.db_prefix + "category_general_speciality_ID ";
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
var delete_category_general_speciality = async function (cat_id) {

	let table_name  = ojs_api_config.db_prefix + "category_general_speciality ";
	let field_where  = ojs_api_config.db_prefix + "category_general_speciality_ID ";
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
var get_all_category_general_speciality = async function () {
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
var get_one_category_general_speciality = async function (cat_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "category_general_speciality_ID = '" + cat_id + "' " + 
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
//search
var search = async function (datas) {
	
	//return [datas.datas.select_field,sql_select_all];
	//@
	try {
		var sql_field = ojs_functions_shares.get_select_field(datas.datas.select_field, sql_select_all);
	}
	catch(error){
		return  { "error" : "m_10", "message" : error } ;
	}

	//@
	try {
		var sql_conditions = ojs_functions_shares.get_condition(datas.datas.condition);
	}
	catch(error){
		return  { "error" : "m_11", "message" : error } ;
	}
	//@
	try {
		var sql_order = ojs_functions_shares.get_order_text(datas.datas.order);
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
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














