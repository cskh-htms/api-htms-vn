
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
var mysql = require('mysql');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');

//from table
let sql_select_all = 	"" + 	

	
	ojs_configs.db_prefix  + "category_news_ID as category_news_ID, " + 	
	ojs_configs.db_prefix  + "category_news_name as category_news_name, " + 	
	ojs_configs.db_prefix  + "category_news_parent_id as category_news_parent_id, " + 	
	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "category_news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as category_news_date_created, " + 
	ojs_configs.db_prefix  + "category_news_featured_image as category_news_featured_image, " + 
	ojs_configs.db_prefix  + "category_news_infomation as category_news_infomation, " + 
	ojs_configs.db_prefix  + "category_news_sort_order as category_news_sort_order, " + 
	ojs_configs.db_prefix  + "category_news_show as category_news_show "

//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_news "  ;
//link table	
let sql_link_default = 	"" ;
//link table	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "category_news_sort_order" ;
	
//link table	
let sql_link_search = 	"" ;

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_category_news_general = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "category_news  SET ?";
	let dataGo = {
			"category_news_name"						: mysql.escape(datas.category_news_name).replace(/^'|'$/gi, ""),
			"category_news_parent_id"					: datas.category_news_parent_id,	
			"category_news_featured_image"				: mysql.escape(datas.category_news_featured_image).replace(/^'|'$/gi, ""),		
			"category_news_sort_order"					: datas.category_news_sort_order,
			"category_news_infomation"					: mysql.escape(datas.category_news_infomation).replace(/^'|'$/gi, ""),	
			"category_news_show"						: datas.category_news_show,
			"category_news_stores_id"					: datas.category_news_stores_id
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
var get_all_category_news_general = async function () {
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
var get_one_category_news_general = async function (category_news_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "category_news_ID = '" + category_news_id + "' " + 
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
var update_category_news_general = async function (datas,category_news_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "category_news ";
	let field_where  = ojs_configs.db_prefix + "category_news_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ category_news_id + '"';
	
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
var delete_category_news_general = async function (category_news_id) {

	let table_name  = ojs_configs.db_prefix + "category_news ";
	let field_where  = ojs_configs.db_prefix + "category_news_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ category_news_id + '"';
	
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
		var sql_field = ojs_shares.get_select_field(datas.select_field,sql_select_all);
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



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_category_news_general,
	get_one_category_news_general,
	update_category_news_general,
	insert_category_news_general,
	delete_category_news_general,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














