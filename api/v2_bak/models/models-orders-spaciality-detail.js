
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
var mysql = require('mysql');
const default_field = require('../const-tables/const-tables-orders-spaciality-detail');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');


//sql select default
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "orders_details_speciality_ID as orders_details_speciality_ID, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_order_id as orders_details_speciality_order_id, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_line_order as orders_details_speciality_line_order, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_product_id as orders_details_speciality_product_id, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_qty as orders_details_speciality_qty, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_price as orders_details_speciality_price, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_discount as orders_details_speciality_discount, " + 	
	ojs_configs.db_prefix  + "orders_details_speciality_unit_discount as orders_details_speciality_unit_discount, "  + 
	ojs_configs.db_prefix  + "orders_details_medium_text as orders_details_medium_text "   






//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "orders_details_speciality "  ;
	
//link table	
let sql_link_default = 	"" ;


//order	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "orders_details_speciality_ID " ;
	
	
	
//group by 	
let sql_group_by = "";
	
		
//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "orders_speciality  ON  " + 
	ojs_configs.db_prefix + "orders_details_speciality_order_id  = " + 
	ojs_configs.db_prefix + "orders_speciality_ID "   + 
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "orders_details_speciality_product_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID "    + 
		
		
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "products_speciality_store_id  = " + 
	ojs_configs.db_prefix + "stores_ID "    + 
			
		
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "orders_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID "   
		

	
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
	
		
	//@
	//@
	//@
	//@ select field
	var sql_field;
	try {
		if(datas.select_field){
			sql_field = default_field.get_select_fields(datas.select_field, sql_select_all)
			//Object.assign(ojs_assign, { 'sql_select_fields' : sql_field });
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "0.1.model_orders->search", "message": error_send } ); 
		return;	
	}		
			
		
	let get_sql_search  = ojs_shares.get_sql_search(datas,sql_select_all);
	Object.assign(get_sql_search, { 'sql_select_fields' : sql_field });
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);		
		
	//return get_sql_search_group;
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		res.send({ "error" : "1.model_ordres_speciality->search", "message": error_send } ); 
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
var insert_orders_spaciality_detail = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "orders_details_speciality  SET ?";
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
 					ojs_configs.db_prefix + "orders_details_speciality_ID = '" + detail_id + "' " + 
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
	let sql_text = 	"SELECT " +  ojs_configs.db_prefix +  "orders_details_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_configs.db_prefix + "orders_details_speciality_product_id = '" + product_id + "' " + 
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


	let table_name  = ojs_configs.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_details_speciality_ID ";
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

	let table_name  = ojs_configs.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_details_speciality_ID ";
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














