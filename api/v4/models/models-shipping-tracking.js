
/*


* 1. [insert_store]

* 2. [get_all_shipping_tracking]

* 3. [get_one_shipping_tracking]

* 4. [update_shipping_tracking]

* 5. [delete_shipping_tracking]

* 5. [search]

* 7. [get_owner_tracking]

* 8. [get_owner_order_tracking]

* 9. [shipping_tracking_order_check]



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
	ojs_configs.db_prefix  + "shipping_tracking_ID as shipping_tracking_ID, " + 
	ojs_configs.db_prefix  + "shipping_tracking_users_id as shipping_tracking_users_id, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "shipping_tracking_date_created,'%Y/%m/%d %H:%i:%s') as shipping_tracking_date_created, " +	
	
	ojs_configs.db_prefix  + "shipping_tracking_orders_id as shipping_tracking_orders_id, " + 
	ojs_configs.db_prefix  + "shipping_tracking_infomation as shipping_tracking_infomation, " + 
	ojs_configs.db_prefix  + "shipping_tracking_orders_status as shipping_tracking_orders_status, " + 	
	
	ojs_configs.db_prefix  + "shipping_tracking_qoute as shipping_tracking_qoute ";

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "shipping_tracking "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "shipping_tracking_users_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "orders_speciality  ON  " + 
	ojs_configs.db_prefix + "shipping_tracking_orders_id = " + 
	ojs_configs.db_prefix + "orders_speciality_ID " 	  
	
	
//@
//@
//@
//@link	order_check
var sql_link_order_check = "" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "orders_speciality  ON  " + 
	ojs_configs.db_prefix + "shipping_tracking_orders_id = " + 
	ojs_configs.db_prefix + "orders_speciality_ID " 







//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "shipping_tracking_date_created ASC " ;
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_shipping_tracking]
const insert_shipping_tracking = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "shipping_tracking  SET ?";
	var dataGo = {
		
			"shipping_tracking_users_id"					: datas.shipping_tracking_users_id,
			"shipping_tracking_orders_id"					: datas.shipping_tracking_orders_id,			
			"shipping_tracking_orders_status"				: datas.shipping_tracking_orders_status,			

			"shipping_tracking_infomation"					: mysql.escape(datas.shipping_tracking_infomation).replace(/^'|'$/gi, ""),		
			"shipping_tracking_qoute"						: mysql.escape(datas.shipping_tracking_qoute).replace(/^'|'$/gi, "")	
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
		return  { "error" : "model_shipping_tracking_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_shipping_tracking]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_shipping_tracking]
const get_all_shipping_tracking = async function () {
	
	
	
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
		return  { "error" : "model_shipping_tracking_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_shipping_tracking]



//@
//@
//@
//@
//@
//@ * 3. [get_one_shipping_tracking]
const get_one_shipping_tracking = async function (shipping_tracking_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "shipping_tracking_ID = '" + shipping_tracking_id + "' "				
	
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
		return  { "error" : "model_shipping_tracking->get_one_shipping_tracking->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_shipping_tracking]



//@
//@
//@
//@
//@* 4. [update_shipping_tracking]
const update_shipping_tracking = async function (datas,shipping_tracking_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "shipping_tracking ";
	var field_where  = ojs_configs.db_prefix + "shipping_tracking_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ shipping_tracking_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->shipping_tracking->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_shipping_tracking]


//@
//@
//@
//@
//@* 5. [delete_shipping_tracking]
const delete_shipping_tracking = async function (shipping_tracking_id) {

	var table_name  = ojs_configs.db_prefix + "shipping_tracking ";
	var field_where  = ojs_configs.db_prefix + "shipping_tracking_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ shipping_tracking_id + '"';
	
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
		res.send({ "error" : "model_shipping_tracking->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_shipping_tracking]




//@
//@
//@
//@
//@* 6. [delete_shipping_tracking]
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
		res.send({ "error" : "model_shipping_tracking->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_shipping_tracking->search->error_number : 1", "message": error_send } ); 
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
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "shipping_tracking_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "shipping_tracking_users_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "shipping_tracking_ID  = '" + datas.datas.tracking_id + "' " 
	
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
		return  { "error" : "models_shipping_tracking->get_owner_product->error_number : 1", "message" : error } ;
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
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "shipping_tracking_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "shipping_tracking_users_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "shipping_tracking_orders_id  = '" + datas.datas.order_tracking_id + "' " 
	
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
		return  { "error" : "models_shipping_tracking->get_owner_order_tracking->error_number : 1", "message" : error } ;
	}
};
//@ end of
//@ 8. [get_owner_order_tracking]




//@
//@
//@
//@
//@
// 9. [shipping_tracking_order_check]
const shipping_tracking_order_check = async function (tracking_id) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "orders_speciality_status_orders as  orders_speciality_status_orders "  + 
					sql_from_default + 
					sql_link_order_check + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "shipping_tracking_ID = '" + tracking_id + "' ";
	
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
		return  { "error" : "models_shipping_tracking->get_owner_order_tracking->error_number : 1", "message" : error } ;
	}
};

// 9. [shipping_tracking_order_check]

























//export module
module.exports = {
			search,
			insert_shipping_tracking,
			get_one_shipping_tracking,
			update_shipping_tracking,
			delete_shipping_tracking,
			get_all_shipping_tracking,
			get_owner_tracking,
			get_owner_order_tracking,
			shipping_tracking_order_check
};

















