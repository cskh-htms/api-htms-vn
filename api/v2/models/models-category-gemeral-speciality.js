
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
	ojs_configs.db_prefix  + "category_general_speciality_ID as category_general_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "category_general_speciality_date_created,'%Y/%m/%d %H:%i:%s') as category_general_speciality_date_created, " + 
	ojs_configs.db_prefix  + "category_general_speciality_name as category_general_speciality_name, " + 
	ojs_configs.db_prefix  + "category_general_speciality_category_parent_id as category_general_speciality_category_parent_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_infomation as category_general_speciality_infomation, " + 
	ojs_configs.db_prefix  + "category_general_speciality_featured_image as category_general_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "category_general_speciality_sort_order as category_general_speciality_sort_order, " + 
	ojs_configs.db_prefix  + "category_general_speciality_show as category_general_speciality_show, " + 
	ojs_configs.db_prefix  + "category_general_speciality_stores_status as category_general_speciality_stores_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_stores_id as category_general_speciality_stores_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_update_status as category_general_speciality_update_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_admin_status as category_general_speciality_admin_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_qoute as category_general_speciality_qoute " 



//from table
let sql_search = 	"" + 	
	ojs_configs.db_prefix  + "category_general_speciality_ID as category_general_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "category_general_speciality_date_created,'%Y/%m/%d %H:%i:%s') as category_general_speciality_date_created, " + 
	ojs_configs.db_prefix  + "category_general_speciality_name as category_general_speciality_name, " + 
	ojs_configs.db_prefix  + "category_general_speciality_category_parent_id as category_general_speciality_category_parent_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_infomation as category_general_speciality_infomation, " + 
	ojs_configs.db_prefix  + "category_general_speciality_featured_image as category_general_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "category_general_speciality_sort_order as category_general_speciality_sort_order, " + 
	ojs_configs.db_prefix  + "category_general_speciality_show as category_general_speciality_show, " + 
	ojs_configs.db_prefix  + "category_general_speciality_stores_status as category_general_speciality_stores_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_stores_id as category_general_speciality_stores_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_update_status as category_general_speciality_update_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_admin_status as category_general_speciality_admin_status, " + 
	ojs_configs.db_prefix  + "category_general_speciality_qoute as category_general_speciality_qoute, " +  

	//stores
	ojs_configs.db_prefix  + "stores_ID as stores_ID, " + 
	ojs_configs.db_prefix  + "stores_user_id as stores_user_id, " + 
	ojs_configs.db_prefix  + "stores_date_created as stores_date_created, " +  
	ojs_configs.db_prefix  + "stores_name as stores_name, " + 
	ojs_configs.db_prefix  + "stores_service_type_id as stores_service_type_id, " + 
	ojs_configs.db_prefix  + "stores_province as stores_province, " + 
	ojs_configs.db_prefix  + "stores_district as stores_district, " + 
	ojs_configs.db_prefix  + "stores_wards as stores_wards, " + 
	ojs_configs.db_prefix  + "stores_adress as stores_adress, " + 
	ojs_configs.db_prefix  + "stores_local_x as stores_local_x, " + 
	ojs_configs.db_prefix  + "stores_local_y as stores_local_y, " + 
	ojs_configs.db_prefix  + "stores_local_adress as stores_local_adress, " + 
	ojs_configs.db_prefix  + "stores_payment_limit as stores_payment_limit, " + 
	ojs_configs.db_prefix  + "stores_status as stores_status, " + 	
	ojs_configs.db_prefix  + "stores_status_stores as stores_status_stores, " + 
	ojs_configs.db_prefix  + "stores_phone as stores_phone, " + 
	ojs_configs.db_prefix  + "stores_info_banking as stores_info_banking, " + 
	ojs_configs.db_prefix  + "stores_status_update as stores_status_update, " + 
	ojs_configs.db_prefix  + "stores_qoute as stores_qoute, "  + 
	ojs_configs.db_prefix  + "stores_upload_limit_day as stores_upload_limit_day, "  + 
	ojs_configs.db_prefix  + "stores_upload_limit_month as stores_upload_limit_month, "  + 

	//users
	ojs_configs.db_prefix + "users_ID as users_ID, " + 
	ojs_configs.db_prefix + "users_date_created as users_date_created, " + 
	ojs_configs.db_prefix + "users_name as users_name, " + 
	ojs_configs.db_prefix + "users_password as users_password, " + 
	ojs_configs.db_prefix + "users_first_name as users_first_name, " + 
	ojs_configs.db_prefix + "users_last_name as users_last_name, " + 
	ojs_configs.db_prefix + "users_adress as users_adress, " + 
	ojs_configs.db_prefix + "users_phone as users_phone, " + 
	ojs_configs.db_prefix + "users_email as users_email, " + 
	ojs_configs.db_prefix + "users_users_type_id as users_users_type_id, " + 	
	ojs_configs.db_prefix + "users_router_version as users_router_version, " + 
	ojs_configs.db_prefix + "users_view_version as users_view_version, " + 
	ojs_configs.db_prefix + "users_js_css_version as users_js_css_version, " + 
	ojs_configs.db_prefix + "users_api_version as users_api_version " 	

//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_general_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//link table	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "category_general_speciality_name" ;
	
	
	
//--------------------------------
//sql search
//--------------------------------	
	
//link search	
let sql_link_search =  "" +

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "category_general_speciality_stores_id  = " + 
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
var insert_category_general_speciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "category_general_speciality  SET ?";
	let dataGo = {
			"category_general_speciality_name"						: mysql.escape(datas.category_general_speciality_name).replace(/^'|'$/gi, ""),
			"category_general_speciality_category_parent_id"		: datas.category_general_speciality_category_parent_id,	
			"category_general_speciality_infomation"				: mysql.escape(datas.category_general_speciality_infomation).replace(/^'|'$/gi, ""),	
			"category_general_speciality_featured_image"			: mysql.escape(datas.category_general_speciality_featured_image).replace(/^'|'$/gi, ""),	
			"category_general_speciality_sort_order"				: datas.category_general_speciality_sort_order,	
			"category_general_speciality_show"						: datas.category_general_speciality_show,	
			"category_general_speciality_stores_id"					: datas.category_general_speciality_stores_id,
			"category_general_speciality_qoute"						: mysql.escape(datas.category_general_speciality_qoute).replace(/^'|'$/gi, ""),
			"category_general_speciality_stores_status"				: datas.category_general_speciality_stores_status
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


	let table_name  = ojs_configs.db_prefix + "category_general_speciality ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_ID ";
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

	let table_name  = ojs_configs.db_prefix + "category_general_speciality ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_ID ";
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
		return  { "error" : "1.1->model-category-specialyti->get all", "message" : error } ;
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
					ojs_configs.db_prefix + "category_general_speciality_ID = '" + cat_id + "' " + 
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
	
	
	let get_sql_search  = ojs_shares.get_sql_search(datas.datas,sql_select_all);
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	
	//return get_sql_search_group;
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
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return { "error" : "1.model_category_general_speciality->search", "message": error_send } ; 
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














