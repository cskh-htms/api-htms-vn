
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');

var mysql = require('mysql');



//sql select default
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "session_speciality_name as session_speciality_name, " + 
	ojs_configs.db_prefix  + "session_speciality_line_order as session_speciality_line_order, " + 
	ojs_configs.db_prefix  + "session_speciality_product_id as session_speciality_product_id, " + 
	ojs_configs.db_prefix  + "session_speciality_qty as session_speciality_qty, " + 
	ojs_configs.db_prefix  + "session_speciality_price as session_speciality_price, " + 
	ojs_configs.db_prefix  + "session_speciality_discount as session_speciality_discount, " + 	
	ojs_configs.db_prefix  + "session_speciality_unit_discount as session_speciality_unit_discount " 



//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "session_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//link table	
let sql_order_default = "";
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "session_speciality_product_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID "   
		
	
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
		var sql_field = ojs_shares.get_select_field(datas.select_field, sql_select_all);
	}
	catch(error){
		return  { "error" : "m_10", "message" : error } ;
	}

	//@
	try {
		var sql_conditions = ojs_shares.get_condition(datas.condition);
	}
	catch(error){
		return  { "error" : "m_11", "message" : error } ;
	}
	//@
	try {
		var sql_order = ojs_shares.get_order_text(datas.order);
	}
	catch(error){
		return  { "error" : "m_12", "message" : error } ;
	}


	var sql_text = 	"SELECT  " + sql_field +
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
var insert_session_speciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "session_speciality  SET ?";
	let dataGo = {
			"session_speciality_name"				: datas.session_speciality_name,
			"session_speciality_line_order"			: datas.session_speciality_line_order,
			"session_speciality_product_id"			: datas.session_speciality_product_id,		
			"session_speciality_qty"				: datas.session_speciality_qty,
			"session_speciality_price"				: datas.session_speciality_price,
			"session_speciality_discount"			: datas.session_speciality_discount,
			"session_speciality_unit_discount"		: datas.session_speciality_unit_discount		
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
var get_all_session_speciality = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  
					sql_select_all + 
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





//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var update_session_speciality = async function (datas,where) {
	
	let sqlSet = "";
	let sqlWhere = "";
	
	//tao arr key
	let arrDatas = Object.keys(datas);
	let arrWhere = Object.keys(where);
	
	//tao arr value datas
	let arrValueDatas = [];
	let x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	//tao arr value where
	let arrValueWhere = [];
	var i;
	for (i in where){
		arrValueWhere.push(where[i]);
	}		
	
	//return  arrValueDatas;
	
	//tao sqlset field update
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



	//tao sqlset field update
	var i = 0;
	arrWhere.forEach(function(item) {
		//
		if(sqlWhere.length == 0){
			sqlWhere = ojs_configs.db_prefix + item + '="' + mysql.escape(arrValueWhere[i]).replace(/^'|'$/gi, "") + '"';
		}else{
			sqlWhere = sqlWhere + ' and ' + ojs_configs.db_prefix + item  + '= "' + mysql.escape(arrValueWhere[i]).replace(/^'|'$/gi, "")  + '"' ;
		}		
		i = i + 1 ;
	});	





	let table_name  = ojs_configs.db_prefix + "session_speciality ";
	
	
	
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + sqlWhere;
	
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
var delete_session_speciality = async function (where) {
	let sqlWhere = "";
	
	//tao arr key
	let arrWhere = Object.keys(where);
	
	//tao arr value datas
	
	//tao arr value where
	let arrValueWhere = [];
	var i;
	for (i in where){
		arrValueWhere.push(where[i]);
	}		
	
	//return  arrValueDatas;
	
	//tao sqlset field update
	var i = 0;
	arrWhere.forEach(function(item) {
		//
		if(sqlWhere.length == 0){
			sqlWhere = ojs_configs.db_prefix + item + '="' + mysql.escape(arrValueWhere[i]).replace(/^'|'$/gi, "") + '"';
		}else{
			sqlWhere = sqlWhere + ' and ' + ojs_configs.db_prefix + item  + '= "' + mysql.escape(arrValueWhere[i]).replace(/^'|'$/gi, "")  + '"' ;
		}		
		i = i + 1 ;
	});	
	
	

	let table_name  = ojs_configs.db_prefix + "session_speciality ";
	

	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + sqlWhere ;
	
	//return  sql_text;
	
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
	get_all_session_speciality,
	update_session_speciality,
	insert_session_speciality,
	delete_session_speciality,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














