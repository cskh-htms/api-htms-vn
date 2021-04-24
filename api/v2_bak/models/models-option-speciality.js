
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
	ojs_configs.db_prefix  + "options_product_speciality_ID as options_product_speciality_ID, " + 
	ojs_configs.db_prefix  + "options_product_speciality_name as options_product_speciality_name, " + 
	ojs_configs.db_prefix  + "options_product_speciality_featured_image as options_product_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "options_product_speciality_parent_id as options_product_speciality_parent_id, " + 
	ojs_configs.db_prefix  + "options_product_speciality_information as options_product_speciality_information, " + 
	ojs_configs.db_prefix  + "options_product_speciality_status_stores as options_product_speciality_status_stores, " +
	ojs_configs.db_prefix  + "options_product_speciality_status_admin as options_product_speciality_status_admin, " +
	ojs_configs.db_prefix  + "options_product_speciality_status_update as options_product_speciality_status_update, " +	
	ojs_configs.db_prefix  + "options_product_speciality_qoute as options_product_speciality_qoute, " +	
	ojs_configs.db_prefix  + "options_product_speciality_stores_id as options_product_speciality_stores_id, " +			
	ojs_configs.db_prefix  + "options_product_speciality_date_created as options_product_speciality_date_created "




//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "options_product_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//link table	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "options_product_speciality_name" ;
	
	
	
	
//link table	
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "options_product_speciality_stores_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " 
	
		
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_option_speciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "options_product_speciality  SET ?";
	let dataGo = {
			"options_product_speciality_name"						: mysql.escape(datas.options_product_speciality_name).replace(/^'|'$/gi, ""),
			"options_product_speciality_parent_id"					: datas.options_product_speciality_parent_id,	
			"options_product_speciality_information"				: mysql.escape(datas.options_product_speciality_information).replace(/^'|'$/gi, ""),	
			"options_product_speciality_featured_image"				: mysql.escape(datas.options_product_speciality_featured_image).replace(/^'|'$/gi, ""),
			"options_product_speciality_status_stores"				: datas.options_product_speciality_status_stores,
			"options_product_speciality_status_admin"				: datas.options_product_speciality_status_admin,
			"options_product_speciality_stores_id"					: datas.options_product_speciality_stores_id,
			"options_product_speciality_qoute"						: mysql.escape(datas.options_product_speciality_qoute).replace(/^'|'$/gi, "")
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
var get_all_option_speciality = async function () {
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
var get_one_option_speciality = async function (option_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "options_product_speciality_ID = '" + option_id + "' " + 
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
var update_option_speciality = async function (datas,option_id) {
	
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
				sqlSet = ojs_configs.db_prefix + item + '=' + arrValueDatas[i] ;
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


	let table_name  = ojs_configs.db_prefix + "options_product_speciality ";
	let field_where  = ojs_configs.db_prefix + "options_product_speciality_ID ";
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
var delete_option_speciality = async function (option_id) {

	let table_name  = ojs_configs.db_prefix + "options_product_speciality ";
	let field_where  = ojs_configs.db_prefix + "options_product_speciality_ID ";
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



//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
var search = async function (datas) {
	//@
	//@
	//@
	let get_sql_search  = ojs_shares.get_sql_search(datas,sql_select_all);
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	//@
	//return sql_text;
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return { "error" : "1.model_option_speciality->search", "message": error_send } ; 
	}

};



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_option_speciality,
	get_one_option_speciality,
	update_option_speciality,
	insert_option_speciality,
	delete_option_speciality,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














