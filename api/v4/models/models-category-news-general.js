
/*

/*

* -1. [insert_category_news_general] 

* 2. [get_all__category_news_general]

* 3. [get_one__category_news_general]

* 4. [update__category_news_general]

* 5. [delete__category_news_general]

* 6. [search]

*/

//@
//@
//@
//connect 
const connection = require('./models-connection');



//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');


//@
//@
//@
//npm exstands
const mysql = require('mysql');




//@
//@
//function share
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_sql = require('../../../models/ojs-shares-sql');
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////




//from table
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "category_news_ID as category_news_ID, " + 	
	ojs_configs.db_prefix  + "category_news_name as category_news_name, " + 	
	ojs_configs.db_prefix  + "category_news_parent_id as category_news_parent_id, " + 	
	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "category_news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as category_news_date_created, " + 
	ojs_configs.db_prefix  + "category_news_featured_image as category_news_featured_image, " + 
	ojs_configs.db_prefix  + "category_news_infomation as category_news_infomation, " + 
	ojs_configs.db_prefix  + "category_news_sort_order as category_news_sort_order, " + 
	ojs_configs.db_prefix  + "category_news_show as category_news_show, " + 
	ojs_configs.db_prefix  + "category_news_status_admin as category_news_status_admin ";

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_news "  ;
//link table	
var sql_link_default = 	"" ;
//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "category_news_date_created DESC " ;
	
//link table	
var sql_link_search = 	"" ;




//@
//@
//@
//@
//@
//@ * 1. [insert_category_news_general] 
const insert_category_news_general = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "category_news  SET ?";
	let dataGo = {
			"category_news_name"						: mysql.escape(datas.category_news_name).replace(/^'|'$/gi, ""),
			"category_news_parent_id"					: datas.category_news_parent_id,	
			"category_news_featured_image"				: mysql.escape(datas.category_news_featured_image).replace(/^'|'$/gi, ""),		
			"category_news_sort_order"					: datas.category_news_sort_order,
			"category_news_infomation"					: mysql.escape(datas.category_news_infomation).replace(/^'|'$/gi, ""),	
			"category_news_show"						: datas.category_news_show,
			"category_news_status_admin"				: datas.category_news_status_admin
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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
		return  { "error" : "1", "position":"md-category_news->insert", "message" : error } ;
	}

};
//@
//@ * end of 1. [insert_category_news_general] 





//@
//@
//@
//@
//@
//@ * 2 [get_all_category_news_general] 
const get_all_category_news_general = async function () {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "1", "position":"md-category_news->get all", "message" : error } ;
	}
};
//@
//@ * 2 [get_all_category_news_general] 





//@
//@
//@
//@
//@
//@ * 3 [get_one_category_news_general] 
var get_one_category_news_general = async function (category_news_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "1", "position":"md-category_news->get one", "message" : error } ;
	}
};
//@
//@ end of  * 3 [get_one_category_news_general] 






//@
//@
//@
//@
//@
//@ * 4 [update_category_news_general] 
const update_category_news_general = async function (datas,category_news_id) {
	
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
		return  { "error" : "1", "position":"md-category_news->update", "message" : error } ;
	}
};
//@
//@ * end of 4 [update_category_news_general] 









//@
//@
//@
//@
//@
//@ * 5 [delete_category_news_general] 
const delete_category_news_general = async function (category_news_id) {

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
		return  { "error" : "1", "position":"md-category_news->delete", "message" : error } ;
	}
};
//@
//@ end of * 5 [delete_category_news_general] 










//@
//@
//@
//@
//@
//@
//@ * 6 [search] 

const search = async function (datas) {
	//@
	//@
	//@	
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	}
	catch(error){
		return  { "error" : "1", "position":"md-category_news->search", "message" : error } ;
	}	
	
	
	
	//@
	//@
	//@
	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "2", "position":"md-category_news->search", "message" : error } ;
	}

};





//@
//@
//@
//@
//@
//@ * 6 [search] 








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














