
/*

* 1. [insert_coupon_speciality]

* 2. [get_all_coupon_speciality]

* 3. [get_one_coupon_speciality]

* 4. [update_coupon_speciality]

* 5. [delete_coupon_speciality]

* 6. [search]

* 7. [get_owner_coupon_speciality]

*/


//@
//@
//@
//connect 
const connection = require('./models-connection');

const default_field = require('../const-tables/const-tables-coupon-speciality');

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
	ojs_configs.db_prefix  + "coupon_speciality_ID as coupon_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "coupon_speciality_date_created,'%Y/%m/%d %H:%i:%s') as coupon_speciality_date_created, " +
	ojs_configs.db_prefix  + "coupon_speciality_code as coupon_speciality_code, " + 
	ojs_configs.db_prefix  + "coupon_speciality_stores_id_created as coupon_speciality_stores_id_created, " + 
	ojs_configs.db_prefix  + "coupon_speciality_info as coupon_speciality_info, " + 
	
	ojs_configs.db_prefix  + "coupon_speciality_type as coupon_speciality_type, " + 
	ojs_configs.db_prefix  + "coupon_speciality_formula_price as coupon_speciality_formula_price, " + 
	ojs_configs.db_prefix  + "coupon_speciality_formula_price_value as coupon_speciality_formula_price_value, " + 	
	
	ojs_configs.db_prefix  + "coupon_speciality_condition as coupon_speciality_condition, " + 
	ojs_configs.db_prefix  + "coupon_speciality_condition_value as coupon_speciality_condition_value, " + 
	ojs_configs.db_prefix  + "coupon_speciality_price_max as coupon_speciality_price_max, " + 
	
	ojs_configs.db_prefix  + "coupon_speciality_date_star as coupon_speciality_date_star, " + 	
	ojs_configs.db_prefix  + "coupon_speciality_date_end as coupon_speciality_date_end, " + 
	ojs_configs.db_prefix  + "coupon_speciality_multiple as coupon_speciality_multiple, " + 

	ojs_configs.db_prefix  + "coupon_speciality_status_admin as coupon_speciality_status_admin, " + 
	ojs_configs.db_prefix  + "coupon_speciality_status_update as coupon_speciality_status_update, " + 
	ojs_configs.db_prefix  + "coupon_speciality_limit_user as coupon_speciality_limit_user, " + 
	
	
	ojs_configs.db_prefix  + "coupon_speciality_qoute as coupon_speciality_qoute "  ;



//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "coupon_speciality "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "coupon_speciality_stores_id_created  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " 	  
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "coupon_speciality_date_created ASC ";
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_coupon_speciality]
var insert_coupon_speciality = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "coupon_speciality  SET ?";
	var dataGo = {
			"coupon_speciality_code"						: mysql.escape(datas.coupon_speciality_code).replace(/^'|'$/gi, ""),		
			"coupon_speciality_stores_id_created"			: datas.coupon_speciality_stores_id_created,
			"coupon_speciality_info"						: mysql.escape(datas.coupon_speciality_info).replace(/^'|'$/gi, ""),
			"coupon_speciality_type"						: datas.coupon_speciality_type,				
			
			"coupon_speciality_formula_price"				: datas.coupon_speciality_formula_price,
			"coupon_speciality_formula_price_value"			: datas.coupon_speciality_formula_price_value,
			"coupon_speciality_condition"					: datas.coupon_speciality_condition,

			"coupon_speciality_condition_value"				: datas.coupon_speciality_condition_value,
			"coupon_speciality_price_max"					: datas.coupon_speciality_price_max,

			"coupon_speciality_date_star"					: mysql.escape(datas.coupon_speciality_date_star).replace(/^'|'$/gi, ""),	
			"coupon_speciality_date_end"					: mysql.escape(datas.coupon_speciality_date_end).replace(/^'|'$/gi, ""),

			"coupon_speciality_multiple"					: datas.coupon_speciality_multiple,
			"coupon_speciality_status_admin"				: datas.coupon_speciality_status_admin,
			"coupon_speciality_status_update"				: datas.coupon_speciality_status_update,
			"coupon_speciality_limit_user"					: datas.coupon_speciality_limit_user,

			"coupon_speciality_qoute"						: mysql.escape(datas.coupon_speciality_qoute).replace(/^'|'$/gi, "")

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
		return  { "error" : "model_coupon_speciality_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_coupon_speciality]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_coupon_speciality]
var get_all_coupon_speciality = async function () {
	
	
	
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
		return  { "error" : "model_coupon_speciality_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_coupon_speciality]



//@
//@
//@
//@
//@
//@ * 3. [get_one_coupon_speciality]
const get_one_coupon_speciality = async function (coupon_speciality_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "coupon_speciality_ID = '" + coupon_speciality_id + "' "				
	
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
		return  { "error" : "model_coupon_speciality->get_one_coupon_speciality->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_coupon_speciality]



//@
//@
//@
//@
//@* 4. [update_coupon_speciality]
const update_coupon_speciality = async function (datas,coupon_speciality_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "coupon_speciality ";
	var field_where  = ojs_configs.db_prefix + "coupon_speciality_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ coupon_speciality_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->coupon_speciality->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_coupon_speciality]


//@
//@
//@
//@
//@* 5. [delete_coupon_speciality]
const delete_coupon_speciality = async function (coupon_speciality_id) {

	var table_name  = ojs_configs.db_prefix + "coupon_speciality ";
	var field_where  = ojs_configs.db_prefix + "coupon_speciality_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ coupon_speciality_id + '"';
	
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
		res.send({ "error" : "model_coupon_speciality->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_coupon_speciality]




//@
//@
//@
//@
//@* 6. [delete_coupon_speciality]
const search = async function (datas) {
	//return datas;
	//@
	//@
	//@
	//@ select field
	var sql_field;
	try {
		if(datas.select_field){
			sql_field = default_field.get_select_fields(datas.select_field, sql_select_all);
			//return [sql_field];
		}else{
			sql_field = "";
		}		

		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get fields" );
		res.send({ "error" : "models_coupon_speciality, -> search -> products speciality->error : 1", "message": error_send } ); 
		return;	
	}	


	//@
	//@
	//@
	//@ get_having	
	var sql_having;
	try {
		if(datas.having){
			sql_having = default_field.get_having(datas.having)
		}else{
			sql_having = "";
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get having " );
		res.send({ "error" : "model coupon speciality, -> search -> products speciality->error : 2", "message": error_send } ); 
		return;	
	}		
		

	
	
	//return sql_field;
	//@
	//@
	//@
	// sql 
	try {
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		
		//@
		//@
		//@	
		//@
		var get_sql_search_1 = {...get_sql_search};
		Object.assign(get_sql_search_1, { 'sql_select_fields' : sql_field });		
		
		//@
		//@
		//@	
		//@
		let get_sql_search_2 = {...get_sql_search_1};
		Object.assign(get_sql_search_2, { 'sql_having' : sql_having });		
				
				
		
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search_2,sql_from_default,sql_link_search);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "model_coupon_speciality->search->error_number : 2", "message": error_send } ); 
		return;	
	}	
	//return get_sql_search_group;
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
		res.send({ "error" : "model_coupon_speciality->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]





//@
//@
//@
// 7. [get_owner_coupon_speciality]
const get_owner_coupon_speciality = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "coupon_speciality_ID  "  + 
					sql_from_default + 
					sql_link_search + 
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "coupon_speciality_ID  = '" + datas.datas.coupon_speciality_id + "' " 
	
	return sql_text;
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
		return  { "error" : "models_coupon_speciality->get_owner_product->error_number : 1", "message" : error } ;
	}
};

// 7. [get_owner_product]













//export module
module.exports = {
			search,
			insert_coupon_speciality,
			get_one_coupon_speciality,
			update_coupon_speciality,
			delete_coupon_speciality,
			get_all_coupon_speciality,
			get_owner_coupon_speciality
};
















