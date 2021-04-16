


//connect 
const connection = require('./models-connection');
var mysql = require('mysql');
//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');

//select default
let sql_select_all = 	"" + 	
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
	ojs_configs.db_prefix  + "stores_upload_limit_month as stores_upload_limit_month "  
	

//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "stores "  
	
	
	
	
	
	
//link table	
let sql_link_default = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "service_type  ON  " + 
	ojs_configs.db_prefix + "stores_service_type_id  = " + 
	ojs_configs.db_prefix + "service_type_ID " 	  
	
	

//order	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "stores_name ASC "
	
	
	
	
//link search	
let sql_link_search =  "" +


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
let sql_from_default_payment = 	" from " + 
	ojs_configs.db_prefix + "stores "  
	
	
	
let sql_link_search_payment = 	"" + 
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "view_payment_period  ON  " + 
	ojs_configs.db_prefix + "stores_ID  = " + 
	ojs_configs.db_prefix + "payment_period_ID "  
	







//search
var search_payment = async function (datas) {
	
	//return [datas.select_field];
	
	//@ select type
	try {
		var sql_select_type = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_type');

		if(ojs_check != undefined){
			var sql_select_type = ojs_shares.get_select_type(datas.select_type);
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
			var sql_field = ojs_shares.get_select_field(datas.select_field, sql_select_all);
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
			var sql_conditions = ojs_shares.get_condition(datas.condition);
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
			var sql_order = ojs_shares.get_order_text(datas.order);
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
			var sql_group_by = ojs_shares.get_group_by(datas.group_by);
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
			var sql_limit = ojs_shares.get_limit(datas.limit);
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
	
	
	let get_sql_search  = ojs_shares.get_sql_search(datas,sql_select_all);
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
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
//insert
var insert_stores = async function (datas) {
	//return datas;
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "stores  SET ?";
	let dataGo = {
			"stores_user_id"					: datas.stores_users_id,
			"stores_name"						: mysql.escape(datas.stores_name).replace(/^'|'$/gi, ""),		
			"stores_service_type_id"			: datas.stores_service_type_id,	
			"stores_payment_limit"				: datas.stores_payment_limit,				
			"stores_status"						: datas.stores_status,	
			"stores_status_stores"				: datas.stores_status_stores,	
			"stores_status_update"				: datas.stores_status_update,			
			"stores_province"					: mysql.escape(datas.stores_province).replace(/^'|'$/gi, ""),
			"stores_district"					: mysql.escape(datas.stores_district).replace(/^'|'$/gi, ""),
			"stores_wards"						: mysql.escape(datas.stores_wards).replace(/^'|'$/gi, ""),
			"stores_adress"						: mysql.escape(datas.stores_adress).replace(/^'|'$/gi, ""),
			"stores_local_x"					: mysql.escape(datas.stores_local_x).replace(/^'|'$/gi, ""),
			"stores_local_y"					: mysql.escape(datas.stores_local_y).replace(/^'|'$/gi, ""),
			"stores_local_adress"				: mysql.escape(datas.stores_local_adress).replace(/^'|'$/gi, ""),
			"stores_phone"						: mysql.escape(datas.stores_phone).replace(/^'|'$/gi, ""),
			"stores_info_banking" 				: mysql.escape(datas.stores_info_banking).replace(/^'|'$/gi, ""),
			"stores_qoute" 						: mysql.escape(datas.stores_qoute).replace(/^'|'$/gi, ""),
			"stores_upload_limit_day"			: datas.stores_upload_limit_day,
			"stores_upload_limit_month"			: datas.stores_upload_limit_month
			
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
		return  { "error" : "3.1->model_users", "message" : error } ;
	}

};




//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get one;
var get_one_stores = async function (stores_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "1.1 model_stores->get_one_stores", "message" : error } ;
	}
};






//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//kiểm tra user da co cua hang hay chua
//@ de check xoa user
//@ neu user co cua hang thi ko cho xoa 
var check_users_link = async function (user_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_configs.db_prefix +  "stores_ID " + 
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


	let table_name  = ojs_configs.db_prefix + "stores ";
	let field_where  = ojs_configs.db_prefix + "stores_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ stores_id + '"';
	
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
//delete
var delete_stores = async function (stores_id) {

	let table_name  = ojs_configs.db_prefix + "stores ";
	let field_where  = ojs_configs.db_prefix + "stores_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ stores_id + '"';
	
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi delete cử hàng, liên hệ admin" );
		res.send({ "error" : "5.1.model_storesdelete ", "message": error_send } ); 
		return;	
	}
};








//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_stores = async function () {
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





//export module
module.exports = {
			search,
			search_payment,
			insert_stores,
			get_one_stores,
			update_stores,
			delete_stores,
			get_all_stores,
			check_users_link
};

















