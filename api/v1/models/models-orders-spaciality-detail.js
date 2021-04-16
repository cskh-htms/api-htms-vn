
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
var transaction = require('node-mysql-transaction');

const default_field = require('../const-tables/const-tables-orders-spaciality-detail');


//sql select default
let sql_select_all = 	"" + 	
	ojs_api_config.db_prefix  + "orders_details_speciality_ID as orders_details_speciality_ID, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_order_id as orders_details_speciality_order_id, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_line_order as orders_details_speciality_line_order, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_product_id as orders_details_speciality_product_id, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_qty as orders_details_speciality_qty, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_price as orders_details_speciality_price, " + 
	ojs_api_config.db_prefix  + "orders_details_speciality_discount as orders_details_speciality_discount, " + 	
	ojs_api_config.db_prefix  + "orders_details_speciality_unit_discount as orders_details_speciality_unit_discount, "  + 
	ojs_api_config.db_prefix  + "orders_details_medium_text as orders_details_medium_text "   





//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "orders_details_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//order	
let sql_order_default = " order by " + 
	ojs_api_config.db_prefix + "orders_details_speciality_ID " ;
	
	
	
//group by 	
let sql_group_by = "";
	
		
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "orders_speciality  ON  " + 
	ojs_api_config.db_prefix + "orders_details_speciality_order_id  = " + 
	ojs_api_config.db_prefix + "orders_speciality_ID "   + 
	
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "products_speciality  ON  " + 
	ojs_api_config.db_prefix + "orders_details_speciality_product_id  = " + 
	ojs_api_config.db_prefix + "products_speciality_ID "    + 
		
		
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "stores  ON  " + 
	ojs_api_config.db_prefix + "products_speciality_store_id  = " + 
	ojs_api_config.db_prefix + "stores_ID "    + 
			
		
	" LEFT JOIN " + 
	ojs_api_config.db_prefix + "users  ON  " + 
	ojs_api_config.db_prefix + "orders_speciality_user_id  = " + 
	ojs_api_config.db_prefix + "users_ID "   
		

	
//--------------------------------
//sql search
//--------------------------------	
	
		
	
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@	
//search
var search = async function (datas) {
	
	//return [datas.datas.select_field,sql_select_all];
	
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
		var sql_field = sql_select_all;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');

		if(ojs_check != undefined){
			var sql_field = default_field.get_select_fields(datas.select_field, sql_select_all);
		}		
	}
	catch(error){
		return  { "error" : "m_10_sql_field", "message" : error } ;
	}

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
	//@
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
	//@having
	try {
		var sql_having = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'having');

		if(ojs_check != undefined){
			var sql_having = ojs_functions_shares.get_having(datas.having);
		}
		
	}
	catch(error){
		return  { "error" : "m_13_sql_sql_having_product_speciality", "message" : error } ;
	}
	//@
	//@order
	//@
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
	//@
	//@
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
					sql_from_default + 
					sql_link_search + 
					sql_conditions + 
					sql_group_by + 
					sql_having + 
					sql_order + 
					sql_limit
	//return sql_text		;		

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
var insert_orders_spaciality_detail = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_api_config.db_prefix + "orders_details_speciality  SET ?";
	let dataGo = {
			"orders_details_speciality_order_id"			: datas.orders_details_speciality_order_id,
			"orders_details_speciality_line_order"			: datas.orders_details_speciality_line_order,		
			"orders_details_speciality_product_id"			: datas.orders_details_speciality_product_id,	
			"orders_details_speciality_qty"					: datas.orders_details_speciality_qty,
			"orders_details_speciality_price"				: datas.orders_details_speciality_price,
			"orders_details_speciality_discount"			: datas.orders_details_speciality_discount,
			"orders_details_speciality_unit_discount"		: datas.orders_details_speciality_unit_discount,
			"orders_details_medium_text"					: datas.orders_details_medium_text
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
var get_all_orders_spaciality_detail = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  
					sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
					
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
//get ALL category chung;
var get_one_orders_spaciality_detail = async function (detail_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "orders_details_speciality_ID = '" + detail_id + "' " + 
					sql_order_default
					
	//return 	sql_text ;	
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
//check san phẩm đã có order chưa
var check_order_link = async function (product_id) {
	//create sql text
	let sql_text = 	"SELECT " +  ojs_api_config.db_prefix +  "orders_details_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_api_config.db_prefix + "orders_details_speciality_product_id = '" + product_id + "' " + 
					sql_order_default
					
	//return 	sql_text ;	
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
var update_orders_spaciality_detail = async function (datas,detail_id) {
	
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


	let table_name  = ojs_api_config.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_api_config.db_prefix + "orders_details_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ detail_id + '"';
	
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
var delete_orders_spaciality_detail = async function (detail_id) {

	let table_name  = ojs_api_config.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_api_config.db_prefix + "orders_details_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ detail_id + '"';
	
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




/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_orders_spaciality_detail,
	get_one_orders_spaciality_detail,
	update_orders_spaciality_detail,
	insert_orders_spaciality_detail,
	delete_orders_spaciality_detail,
	search,
	check_order_link
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














