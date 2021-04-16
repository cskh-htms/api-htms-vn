
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

	
	ojs_api_config.db_prefix  + "news_ID as news_ID, " + 	
	ojs_api_config.db_prefix  + "news_title as news_title, " + 	
	ojs_api_config.db_prefix  + "news_user_id as news_user_id, " + 	
	"DATE_FORMAT(" + ojs_api_config.db_prefix  + "news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as news_date_created, " + 	
	ojs_api_config.db_prefix  + "news_category_id as news_category_id, " + 
	ojs_api_config.db_prefix  + "news_featured_image as news_featured_image, " + 
	ojs_api_config.db_prefix  + "news_excerpt as news_excerpt, " + 
	ojs_api_config.db_prefix  + "news_contents as news_contents, " + 
	ojs_api_config.db_prefix  + "news_status as news_status, " + 
	
	
	//category
	ojs_api_config.db_prefix  + "category_news_name as category_news_name , " + 	
	ojs_api_config.db_prefix  + "category_news_ID as category_news_ID , " + 	
	
	//users
	ojs_api_config.db_prefix  + "users_first_name as  users_first_name, " + 	
	ojs_api_config.db_prefix  + "users_last_name as users_last_name , " + 	
	ojs_api_config.db_prefix  + "users_ID as users_ID " 

	

//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "news "  ;
	
	
//link table	
let sql_link_default = 	""  + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "news_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID "   + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "category_news  ON  " + 
	ojs_api_config.db_prefix + "news_category_id  = " + 
	ojs_api_config.db_prefix + "category_news_ID " 



//link table	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "news_date_created" ;
	
//link table	
let sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "news_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID "   + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "category_news  ON  " + 
	ojs_api_config.db_prefix + "news_category_id  = " + 
	ojs_api_config.db_prefix + "category_news_ID " 




//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_news_general = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "news  SET ?";
	let dataGo = {
			"news_title"						: mysql.escape(datas.news_title).replace(/^'|'$/gi, ""),
			"news_user_id"						: datas.news_user_id,	
			"news_category_id"					: datas.news_category_id,	
			"news_featured_image"				: mysql.escape(datas.news_featured_image).replace(/^'|'$/gi, ""),		
			"news_excerpt"						: mysql.escape(datas.news_excerpt).replace(/^'|'$/gi, ""),
			"news_contents"						: mysql.escape(datas.news_contents).replace(/^'|'$/gi, ""),	
			"news_status"						: datas.news_status
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
var get_all_news_general = async function () {
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
var get_one_news_general = async function (news_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "news_ID = '" + news_id + "' " + 
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
//kiem tra danh muc da co bai dang chua
var check_news_link = async function (category_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix + "news_ID " + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_api_config.db_prefix + "news_category_id = '" + category_id + "' " + 
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
var update_news_general = async function (datas,news_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "news ";
	let field_where  = ojs_api_config.db_prefix + "news_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ news_id + '"';
	
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
var delete_news_general = async function (news_id) {

	let table_name  = ojs_api_config.db_prefix + "news ";
	let field_where  = ojs_api_config.db_prefix + "news_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ news_id + '"';
	
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



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_news_general,
	get_one_news_general,
	update_news_general,
	insert_news_general,
	delete_news_general,
	search,
	check_news_link
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














