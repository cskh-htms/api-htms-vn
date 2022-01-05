


//connect 
const connection = require('./models-connection');
const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');
var mysql = require('mysql');


//select default
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "stores_ID as stores_ID, " + 
	ojs_api_config.db_prefix  + "stores_user_id as stores_user_id, " + 
	ojs_api_config.db_prefix  + "stores_date_created as stores_date_created, " +  
	ojs_api_config.db_prefix  + "stores_name as stores_name, " + 
	ojs_api_config.db_prefix  + "stores_service_type_id as stores_service_type_id, " + 
	ojs_api_config.db_prefix  + "stores_province as stores_province, " + 
	ojs_api_config.db_prefix  + "stores_district as stores_district, " + 
	ojs_api_config.db_prefix  + "stores_wards as stores_wards, " + 
	ojs_api_config.db_prefix  + "stores_adress as stores_adress, " + 
	ojs_api_config.db_prefix  + "stores_local_x as stores_local_x, " + 
	ojs_api_config.db_prefix  + "stores_local_y as stores_local_y, " + 
	ojs_api_config.db_prefix  + "stores_local_adress as stores_local_adress, " + 
	ojs_api_config.db_prefix  + "stores_payment_limit as stores_payment_limit, " + 
	ojs_api_config.db_prefix  + "stores_status as stores_status, " + 	
	ojs_api_config.db_prefix  + "stores_phone as stores_phone, " + 
	ojs_api_config.db_prefix  + "stores_info_banking as stores_info_banking " 


//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "stores "  
	
	
	
	
	
	
//link table	
let sql_link_default = 	"" + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "stores_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "service_type  ON  " + 
	ojs_api_config.db_prefix + "stores_service_type_id  = " + 
	ojs_api_config.db_prefix + "service_type_ID " 	  
	
	

//order	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "stores_name ASC "
	
	
	
	
//link search	
let sql_link_search =  "" +


	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "stores_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "service_type  ON  " + 
	ojs_api_config.db_prefix + "stores_service_type_id  = " + 
	ojs_api_config.db_prefix + "service_type_ID " 	




//view search


//from table
let sql_from_default_payment = 	" from " + 
	ojs_api_config.db_prefix + "stores "  
	
	
	
let sql_link_search_payment = 	"" + 
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "view_payment_period  ON  " + 
	ojs_api_config.db_prefix + "stores_ID  = " + 
	ojs_api_config.db_prefix + "payment_period_ID "  
	







//search
var search_payment = async function (datas) {
	
	//return [datas.select_field];
	
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
		var sql_select_all = "";
		var sql_field = sql_select_all;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');
		
		//return [datas.select_field];

		if(ojs_check != undefined){
			var sql_field = ojs_functions_shares.get_select_field(datas.select_field, sql_select_all);
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
	
	//return [datas.select_field];
	//@
	try {
		var sql_field = ojs_functions_shares.get_select_field(datas.select_field, sql_select_all);
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
		
		
	//return 	sql_text;
		
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
var insert_stores = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "stores  SET ?";
	let dataGo = {
			"stores_user_id"					: datas.stores_user_id,
			"stores_name"						: mysql.escape(datas.stores_name).replace(/^'|'$/gi, ""),		
			"stores_service_type_id"			: datas.stores_service_type_id,	
			"stores_payment_limit"				: datas.stores_payment_limit,				
			"stores_status"						: datas.stores_status,				
			"stores_province"					: mysql.escape(datas.stores_province).replace(/^'|'$/gi, ""),
			"stores_district"					: mysql.escape(datas.stores_district).replace(/^'|'$/gi, ""),
			"stores_wards"						: mysql.escape(datas.stores_wards).replace(/^'|'$/gi, ""),
			"stores_adress"						: mysql.escape(datas.stores_adress).replace(/^'|'$/gi, ""),
			"stores_local_x"					: mysql.escape(datas.stores_local_x).replace(/^'|'$/gi, ""),
			"stores_local_y"					: mysql.escape(datas.stores_local_y).replace(/^'|'$/gi, ""),
			"stores_local_adress"				: mysql.escape(datas.stores_local_adress).replace(/^'|'$/gi, ""),
			"stores_phone"						: mysql.escape(datas.stores_phone).replace(/^'|'$/gi, ""),
			"stores_info_banking" 				: mysql.escape(datas.stores_info_banking).replace(/^'|'$/gi, "")
			
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
//get one;
var get_one_stores = async function (stores_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_api_config.db_prefix + "stores_ID = '" + stores_id + "' "				
	
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
	let sql_text = 	"SELECT " + ojs_api_config.db_prefix +  "stores_ID " + 
					sql_from_default + 
					sql_link_default  + 
					" where " +  
					ojs_api_config.db_prefix + "stores_user_id = '" + user_id + "' " 
					
	
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
				sqlSet = ojs_api_config.db_prefix + item + '=' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
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


	let table_name  = ojs_api_config.db_prefix + "stores ";
	let field_where  = ojs_api_config.db_prefix + "stores_ID ";
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

	let table_name  = ojs_api_config.db_prefix + "stores ";
	let field_where  = ojs_api_config.db_prefix + "stores_ID ";
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

















