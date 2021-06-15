
/*

* 1. [insert_store]

* 2. [get_all_stores]

* 3. [get_one_stores]



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


//@
//@
//@
//@
//@
//@
//select default
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "stores_ID as stores_ID, " + 
	ojs_configs.db_prefix  + "stores_user_id as stores_user_id, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "stores_date_created,'%Y/%m/%d %H:%i:%s') as stores_date_created, " +	
	ojs_configs.db_prefix  + "stores_name as stores_name, " + 
	
	ojs_configs.db_prefix  + "stores_payment_limit as stores_payment_limit, " + 
	ojs_configs.db_prefix  + "stores_service_type_id as stores_service_type_id, " + 
	ojs_configs.db_prefix  + "stores_adress as stores_adress, " + 	
	
	ojs_configs.db_prefix  + "stores_province as stores_province, " + 
	ojs_configs.db_prefix  + "stores_district as stores_district, " + 
	ojs_configs.db_prefix  + "stores_wards as stores_wards, " + 
	
	ojs_configs.db_prefix  + "stores_status_admin as stores_status_admin, " + 	
	ojs_configs.db_prefix  + "stores_status_stores as stores_status_stores, " + 
	ojs_configs.db_prefix  + "stores_info_banking as stores_info_banking, " + 



	ojs_configs.db_prefix  + "stores_local_x as stores_local_x, " + 
	ojs_configs.db_prefix  + "stores_local_y as stores_local_y, " + 
	ojs_configs.db_prefix  + "stores_local_adress as stores_local_adress, " + 
	
	ojs_configs.db_prefix  + "stores_qoute as stores_qoute, "  + 
	ojs_configs.db_prefix  + "stores_status_update as stores_status_update, " + 
	ojs_configs.db_prefix  + "stores_payment_methods as stores_payment_methods, "  + 
	ojs_configs.db_prefix  + "stores_payment_time as stores_payment_time, " + 	
	
	

	ojs_configs.db_prefix  + "stores_upload_limit_day as stores_upload_limit_day, "  + 
	ojs_configs.db_prefix  + "stores_upload_limit_month as stores_upload_limit_month, "  + 
	


	ojs_configs.db_prefix  + "users_ID as users_ID, "  + 
	ojs_configs.db_prefix  + "users_full_name as users_full_name, "  + 


	ojs_configs.db_prefix  + "service_type_ID  as service_type_ID , "  + 
	ojs_configs.db_prefix  + "service_type_name as service_type_name "   



//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "stores "  
	
	
	
	
	
	
//link table	
var sql_link_default = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "service_type  ON  " + 
	ojs_configs.db_prefix + "stores_service_type_id  = " + 
	ojs_configs.db_prefix + "service_type_ID " 	  
	
	

//order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "stores_name ASC "
	
	
	
	
//link search	
var sql_link_search =  "" +


	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users_type  ON  " + 
	ojs_configs.db_prefix + "users_users_type_id  = " + 
	ojs_configs.db_prefix + "users_type_ID " +  	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "service_type  ON  " + 
	ojs_configs.db_prefix + "stores_service_type_id  = " + 
	ojs_configs.db_prefix + "service_type_ID " 	




//view search


//from table
var sql_from_default_payment = 	" from " + 
	ojs_configs.db_prefix + "stores "  
	
	
	
var sql_link_search_payment = 	"" + 
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "view_payment_period  ON  " + 
	ojs_configs.db_prefix + "stores_ID  = " + 
	ojs_configs.db_prefix + "payment_period_ID "  
	


//@
//@
//@
//@
//@ * 1. [insert_stores]
var insert_stores = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "stores  SET ?";
	var dataGo = {
			"stores_user_id"					: datas.stores_user_id,
			"stores_name"						: mysql.escape(datas.stores_name).replace(/^'|'$/gi, ""),		
			"stores_payment_limit"				: datas.stores_payment_limit,
			"stores_service_type_id"			: datas.stores_service_type_id,	

			"stores_adress"						: mysql.escape(datas.stores_adress).replace(/^'|'$/gi, ""),
			"stores_province"					: mysql.escape(datas.stores_province).replace(/^'|'$/gi, ""),
			"stores_district"					: mysql.escape(datas.stores_district).replace(/^'|'$/gi, ""),
			"stores_wards"						: mysql.escape(datas.stores_wards).replace(/^'|'$/gi, ""),

			"stores_status_admin"				: datas.stores_status_admin,	
			"stores_status_stores"				: datas.stores_status_stores,	
			"stores_info_banking" 				: mysql.escape(datas.stores_info_banking).replace(/^'|'$/gi, ""),			
			
			"stores_local_x"					: mysql.escape(datas.stores_local_x).replace(/^'|'$/gi, ""),
			"stores_local_y"					: mysql.escape(datas.stores_local_y).replace(/^'|'$/gi, ""),
			"stores_local_adress"				: mysql.escape(datas.stores_local_adress).replace(/^'|'$/gi, ""),			
			
			"stores_qoute" 						: mysql.escape(datas.stores_qoute).replace(/^'|'$/gi, ""),			
			"stores_status_update"				: datas.stores_status_update,			
			"stores_payment_methods"			: datas.stores_payment_methods,	
			"stores_payment_time"				: datas.stores_payment_time,				

			"stores_upload_limit_day"			: datas.stores_upload_limit_day,
			"stores_upload_limit_month"			: datas.stores_upload_limit_month
	}
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
	}


	//@
	//@
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
		return  { "error" : "model_stores_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_stores]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_stores]
var get_all_stores = async function () {
	
	
	
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
		return  { "error" : "model_stores_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_stores]



//@
//@
//@
//@
//@
//@ * 3. [get_one_stores]
const get_one_stores = async function (stores_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "stores_ID = '" + stores_id + "' "				
	
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
		return  { "error" : "model_stores->get_one_stores->error-number : 1", "message" : error } ;
	}
};





//@ * end of  3. [get_one_stores]











//search
var search_payment = async function (datas) {
	
	//return [datas.select_field];
	
	//@ select type
	try {
		var sql_select_type = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_type');

		if(ojs_check != undefined){
			var sql_select_type = ojs_shares_sql.get_select_type(datas.select_type);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_select_type", "message" : error } ;
	}	
	//@select field
	try {
		var sql_select_all = "";
		var sql_field = sql_select_all;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');
		
		//return [datas.select_field];

		if(ojs_check != undefined){
			var sql_field = ojs_shares_sql.get_select_field(datas.select_field, sql_select_all);
		}		
	}
	catch(error){
		return  { "error" : "m_10_sql_field_search_payment", "message" : error } ;
	}
	
	//return sql_field;
		

	//@ condition
	try {
		
		var sql_conditions = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'condition');

		if(ojs_check != undefined){
			var sql_conditions = ojs_shares_sql.get_condition(datas.condition);
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
			var sql_order = ojs_shares_sql.get_order_text(datas.order);
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
			var sql_group_by = ojs_shares_sql.get_group_by(datas.group_by);
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
			var sql_limit = ojs_shares_sql.get_limit(datas.limit);
		}		
	}
	catch(error){
		return  { "error" : "m_09_sql_limit", "message" : error } ;
	}


	var sql_text = 	"SELECT  " + 
					sql_select_type + 
					sql_field +
					sql_from_default_payment + 
					sql_link_search_payment + 
					sql_conditions + 
					sql_group_by + 
					sql_order + 
					sql_limit
					
	//return sql_text	;	
		
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
		return  { "error" : "m_13_search_payment", "message" : error } ;
	}
};









//search
var search = async function (datas) {
	
	
	var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
	var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	
	//return get_sql_search;
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
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "1.model_stores->search", "message": error_send } ); 
		return;	
	}
};

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@







//@@
//@@
//kiểm tra user da co cua hang hay chua
//@ de check xoa user
//@ neu user co cua hang thi ko cho xoa 
var check_users_link = async function (user_id) {
	//create sql text
	var sql_text = 	"SELECT " + ojs_configs.db_prefix +  "stores_ID " + 
					sql_from_default + 
					sql_link_default  + 
					" where " +  
					ojs_configs.db_prefix + "stores_user_id = '" + user_id + "' " 
					
	
	//return {"error" : "dasd" , "message":sql_text};
	
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
		return  { "error" : "1_model_check_users_link", "message" : error } ;
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
var update_stores = async function (datas,stores_id) {
	
	var sqlSet = "";
	
	//tao arr key
	var arrDatas = Object.keys(datas);
	
	//tao arr value 
	var arrValueDatas = [];
	var x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	
	//return  arrValueDatas;
	
	//tao sqlset 
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


	var table_name  = ojs_configs.db_prefix + "stores ";
	var field_where  = ojs_configs.db_prefix + "stores_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ stores_id + '"';
	
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
//devare
var devare_stores = async function (stores_id) {

	var table_name  = ojs_configs.db_prefix + "stores ";
	var field_where  = ojs_configs.db_prefix + "stores_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ stores_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi devare cử hàng, liên hệ admin" );
		res.send({ "error" : "5.1.model_storesdevare ", "message": error_send } ); 
		return;	
	}
};













//export module
module.exports = {
			search,
			search_payment,
			insert_stores,
			get_one_stores,
			update_stores,
			devare_stores,
			get_all_stores,
			check_users_link
};

















