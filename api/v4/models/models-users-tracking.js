
/*


* 1. [insert_store]

* 2. [get_all_users_tracking]

* 3. [get_one_users_tracking]

* 4. [update_users_tracking]

* 5. [delete_users_tracking]

* 5. [search]

* 7. [get_owner_tracking]

* 8. [get_owner_order_tracking]

* 9. [users_tracking_order_check]

10. [unlock_users_tracking]

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
//@ fields select
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "users_tracking_ID as users_tracking_ID, " + 
	ojs_configs.db_prefix  + "users_tracking_user_id as users_tracking_user_id, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "users_tracking_created,'%Y/%m/%d %H:%i:%s') as users_tracking_created, " +	
	
	ojs_configs.db_prefix  + "users_tracking_info as users_tracking_info, " + 
	ojs_configs.db_prefix  + "users_tracking_status as users_tracking_status ";

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "users_tracking "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "users_tracking_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " ;   





//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "users_tracking_created DESC " ;
	
	
	
///////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////
	
	
//@
//@
//@
//@
//@* 10. [unlock_users_tracking]
const unlock_users_tracking = async function (user_tracking_id) {
	
	sql_text = "START TRANSACTION ; "
	
	
	var sqlSet = ojs_configs.db_prefix + "users_tracking_status = 0 ";
	var table_name  = ojs_configs.db_prefix + "users_tracking ";
	var field_where  = ojs_configs.db_prefix + "users_tracking_user_id ";
	//create sql text
	var sql_text1 = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_tracking_id + '";';
	
	
	
	var sqlSet2 = ojs_configs.db_prefix + "users_status = 0 ";
	var table_name2  = ojs_configs.db_prefix + "users ";
	var field_where2  = ojs_configs.db_prefix + "users_ID ";
	//create sql text
	var sql_text2 = 'UPDATE ' + table_name2 + ' SET ' + sqlSet2 + ' where ' + field_where2 + ' = "'+ user_tracking_id + '";';	
	
	//@
	//@
	//@
	//@
	sql_text = sql_text + sql_text1 + sql_text2 + " COMMIT;"
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
		return  { "error" : "model->users_tracking->unlock->error_number : 1", "message" : error } ;
	}
};



//@* end of 10. [unlock_users_tracking]	
	
	
	
	
	
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_users_tracking]
const insert_users_tracking = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "users_tracking  SET ?";
	var dataGo = {
		
			"users_tracking_user_id"					: datas.users_tracking_user_id,
			"users_tracking_action"					: datas.users_tracking_action,			
			"users_tracking_status"				: datas.users_tracking_status,			

			"users_tracking_info"					: mysql.escape(datas.users_tracking_info).replace(/^'|'$/gi, "")	
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
		return  { "error" : "model_users_tracking_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_users_tracking]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_users_tracking]
const get_all_users_tracking = async function () {
	
	
	
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
		return  { "error" : "model_users_tracking_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_users_tracking]



//@
//@
//@
//@
//@
//@ * 3. [get_one_users_tracking]
const get_one_users_tracking = async function (user_tracking_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "users_tracking_ID = '" + user_tracking_id + "' "				
	
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
		return  { "error" : "model_users_tracking->get_one_users_tracking->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_users_tracking]



//@
//@
//@
//@
//@* 4. [update_users_tracking]
const update_users_tracking = async function (datas,user_tracking_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "users_tracking ";
	var field_where  = ojs_configs.db_prefix + "users_tracking_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_tracking_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->users_tracking->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_users_tracking]


//@
//@
//@
//@
//@* 5. [delete_users_tracking]
const delete_users_tracking = async function (user_tracking_id) {

	var table_name  = ojs_configs.db_prefix + "users_tracking ";
	var field_where  = ojs_configs.db_prefix + "users_tracking_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ user_tracking_id + '"';
	
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete cử hàng, liên hệ admin" );
		res.send({ "error" : "model_users_tracking->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_users_tracking]




//@
//@
//@
//@
//@* 6. [delete_users_tracking]
const search = async function (datas) {
	
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "model_users_tracking->search->error_number : 2", "message": error_send } ); 
		return;	
	}	
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "model_users_tracking->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]







//@
//@
//@
//@
//@
// 7. [get_owner_tracking]
const get_owner_tracking = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "users_tracking_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_tracking_users_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "users_tracking_ID  = '" + datas.datas.user_tracking_id + "' " 
	
	//return sql_text;
	//@
	//@
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
		return  { "error" : "models_users_tracking->get_owner_product->error_number : 1", "message" : error } ;
	}
};

// 7. [get_owner_tracking]




//@
//@
//@
//@
//@
// 8. [get_owner_order_tracking]
const get_owner_order_tracking = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "users_tracking_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_tracking_users_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "users_tracking_orders_id  = '" + datas.datas.order_user_tracking_id + "' " 
	
	//return sql_text;
	//@
	//@
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
		return  { "error" : "models_users_tracking->get_owner_order_tracking->error_number : 1", "message" : error } ;
	}
};
//@ end of
//@ 8. [get_owner_order_tracking]




//@
//@
//@
//@
//@
// 9. [users_tracking_order_check]
const users_tracking_order_check = async function (user_tracking_id) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "orders_speciality_status_orders as  orders_speciality_status_orders "  + 
					sql_from_default + 
					sql_link_order_check + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_tracking_ID = '" + user_tracking_id + "' ";
	
	//return sql_text;
	//@
	//@
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
		return  { "error" : "models_users_tracking->get_owner_order_tracking->error_number : 1", "message" : error } ;
	}
};

// 9. [users_tracking_order_check]

























//export module
module.exports = {
			search,
			insert_users_tracking,
			get_one_users_tracking,
			update_users_tracking,
			delete_users_tracking,
			get_all_users_tracking,
			get_owner_tracking,
			get_owner_order_tracking,
			users_tracking_order_check,
			unlock_users_tracking
};

















