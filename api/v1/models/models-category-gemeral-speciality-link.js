
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
	ojs_api_config.db_prefix  + "category_general_speciality_link_ID as category_general_speciality_link_ID, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_link_product_id as category_general_speciality_link_product_id, " + 
	ojs_api_config.db_prefix  + "category_general_speciality_link_category_general_id as category_general_speciality_link_category_general_id " 


//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "category_general_speciality_link " 
	
//link table	
let sql_link_default = 	" " ;


let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "category_general_speciality_link_product_id ASC, " +  
	ojs_api_config.db_prefix + "category_general_speciality_link_category_general_id ASC " 
	
	
//link search
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "category_general_speciality  ON  " + 
	ojs_api_config.db_prefix + "category_general_speciality_link_category_general_id  = " + 
	ojs_api_config.db_prefix + "category_general_speciality_ID " +    
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "products_speciality  ON  " + 
	ojs_api_config.db_prefix + "category_general_speciality_link_product_id  = " + 
	ojs_api_config.db_prefix + "products_speciality_ID " 	





//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_category_general_speciality_link = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "category_general_speciality_link  SET ?";
	let dataGo = {
			"category_general_speciality_link_product_id"				: datas.category_general_speciality_link_product_id,
			"category_general_speciality_link_category_general_id"		: datas.category_general_speciality_link_category_general_id
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
//update
var update_category_general_speciality_link = async function (datas,link_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "category_general_speciality_link_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ link_id + '"';
	
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
var delete_category_general_speciality_link = async function (link_id) {

	let table_name  = ojs_api_config.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "category_general_speciality_link_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ link_id + '"';
	
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
//delete theo product
var delete_category_general_speciality_link_product = async function (product_id) {

	let table_name  = ojs_api_config.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_api_config.db_prefix + "category_general_speciality_link_product_id ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ product_id + '"';
	
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
var get_all_category_general_speciality_link = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
	//@
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

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_one_category_general_speciality_link = async function (link_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "category_general_speciality_link_ID = '" + link_id + "' " + 
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
var check_category_link = async function ( product_id ) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix + "category_general_speciality_link_ID " + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "category_general_speciality_link_product_id = '" + product_id + "' " 
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




//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
var search = async function (datas) {
	//@
	//@ select type
	try {
		var sql_select_type = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_type');

		if(ojs_check != undefined){
			var sql_select_type = ojs_functions_shares.get_select_type(datas.select_type);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_select_type", "message" : error } ;
	}	
	//@select field
	try {
		var sql_field = sql_select_all;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');

		if(ojs_check != undefined){
			var sql_field = ojs_functions_shares.get_select_field(datas.select_field, sql_select_all);
		}		
	}
	catch(error){
		return  { "error" : "m_10_sql_field", "message" : error } ;
	}

	//@ condition
	try {
		
		var sql_conditions = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'condition');

		if(ojs_check != undefined){
			var sql_conditions = ojs_functions_shares.get_condition(datas.condition);
		}			
	}
	catch(error){
		return  { "error" : "m_11_sql_conditions", "message" : error } ;
	}
	//@
	try {
		
		
		var sql_order = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'order');

		if(ojs_check != undefined){
			var sql_order = ojs_functions_shares.get_order_text(datas.order);
		}			
		
	}
	catch(error){
		return  { "error" : "m_12_sql_order ", "message" : error } ;
	}
	//@group by
	try {
		var sql_group_by = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'group_by');

		if(ojs_check != undefined){
			var sql_group_by = ojs_functions_shares.get_group_by(datas.group_by);
		}
		
	}
	catch(error){
		return  { "error" : "m_13_sql_group_by", "message" : error } ;
	}

	//@limit
	try {
		var sql_limit = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'limit');

		if(ojs_check != undefined){
			var sql_limit = ojs_functions_shares.get_limit(datas.limit);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_limit", "message" : error } ;
	}


	var sql_text = 	"SELECT  " + 
					sql_select_type + 
					sql_field +
					sql_from_default + 
					sql_link_search + 
					sql_conditions + 
					sql_group_by + 
					sql_order + 
					sql_limit
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




/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_category_general_speciality_link,
	insert_category_general_speciality_link,
	update_category_general_speciality_link,
	delete_category_general_speciality_link,
	get_one_category_general_speciality_link,
	search,
	check_category_link,
	delete_category_general_speciality_link_product
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/













