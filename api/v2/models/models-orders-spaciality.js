
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


const default_field = require('../const-tables/const-tables-orders-spaciality');
const default_field2 = require('../const-tables/const-tables-orders-spaciality-detail');

//sql select default
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "orders_speciality_ID as orders_speciality_ID, " + 
	ojs_configs.db_prefix  + "users_first_name as users_first_name, " + 
	ojs_configs.db_prefix  + "users_last_name as users_last_name, " + 
	ojs_configs.db_prefix  + "orders_speciality_phone as orders_speciality_phone, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "orders_speciality_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_date_orders, " + 	
	ojs_configs.db_prefix  + "orders_speciality_user_id as orders_speciality_user_id, " + 
	ojs_configs.db_prefix  + "orders_speciality_status_orders as orders_speciality_status_orders, " + 
	ojs_configs.db_prefix  + "orders_speciality_status_payment as orders_speciality_status_payment, " + 
	ojs_configs.db_prefix  + "orders_speciality_adress as orders_speciality_adress, " + 
	ojs_configs.db_prefix  + "orders_speciality_notes as orders_speciality_notes, " + 
	ojs_configs.db_prefix  + "orders_speciality_email as orders_speciality_email " 



//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "orders_speciality "  ;

	
//link table	
let sql_link_default = 	""  + 

	" INNER JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "orders_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID "   



//order	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "orders_speciality_date_orders " ;
	

//--------------------------------
//sql search
//--------------------------------	
	
//from table
let sql_link_search = 	""  + 

	" INNER JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "orders_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID "   
	


	
//--------------------------------
//end of sql search
//--------------------------------	
	
		
	
	
//sql select default view
let sql_select_all_view = 	"" + 	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "orders_speciality_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_date_orders, " + 
	ojs_configs.db_prefix  + "orders_speciality_ID as orders_speciality_ID, " + 
	ojs_configs.db_prefix  + "stores_name as stores_name, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_line_order as orders_details_speciality_line_order, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_price_caution as orders_details_speciality_price_caution, " + 
	ojs_configs.db_prefix  + "orders_details_speciality_discount_caution as orders_details_speciality_discount_caution " 

	
//order	
let sql_order_default_view = "" ;
	
	
//@@
//@@
//@@
//@@	
//link search view
let sql_link_search_view = 	""  ;	


//from view	
let sql_from_default_view = 	" from " + 
	ojs_configs.db_prefix + "view_order_report "  ;	



//--------------------------------
//end of view view
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
	//@
	try {
		var sql_field = ojs_shares.get_select_field(datas.select_field, sql_select_all);
	}
	catch(error){
		return  { "error" : "m_10", "message" : error } ;
	}

	//@
	try {
		var sql_conditions = ojs_shares.get_condition(datas.condition);
	}
	catch(error){
		return  { "error" : "m_11", "message" : error } ;
	}
	//@
	try {
		var sql_order = ojs_shares.get_order_text(datas.order);
	}
	catch(error){
		return  { "error" : "m_12", "message" : error } ;
	}


	var sql_text = 	"SELECT " + sql_field +
					sql_from_default + 
					sql_link_search + 
					sql_conditions + 
					sql_order 
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
//search
var search_view = async function (datas) {
	
	//return  { "error" : "111", "message" : datas } ;
	
	
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
	
	//return  { "error" : "111", "message" : datas.select_field } ;
	
	try {
		var sql_field = sql_select_all_view;
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'select_field');
		
		//return  { "error" : "111", "message" : sql_field };
		
		if(ojs_check != undefined){
			var sql_field = default_field.get_select_fields_view(datas.select_field, sql_select_all_view);
		}		
	}
	catch(error){
		return  { "error" : "m_10_sql_field_e", "message" : error } ;
	}

	//return  { "error" : "111", "message" : sql_field };


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
	
	//@having
	try {
		var sql_having = "";
		const ojs_check = Object.getOwnPropertyDescriptor(datas, 'having');

		if(ojs_check != undefined){
			var sql_having = ojs_shares.get_having(datas.having);
		}
		
	}
	catch(error){
		return  { "error" : "m_13_sql_sql_having_product_speciality", "message" : error } ;
	}
	
	//@orders
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
					sql_from_default_view + 
					sql_link_search_view + 
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
var insert_orders_spaciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "orders_speciality  SET ?";
	let dataGo = {
			"orders_speciality_user_id"					: datas.orders_speciality_user_id,
			"orders_speciality_adress"					: mysql.escape(datas.orders_speciality_adress).replace(/^'|'$/gi, ""),		
			"orders_speciality_phone"					: mysql.escape(datas.orders_speciality_phone).replace(/^'|'$/gi, ""),	
			"orders_speciality_email"					: mysql.escape(datas.orders_speciality_email).replace(/^'|'$/gi, ""),
			"orders_speciality_notes"					: mysql.escape(datas.orders_speciality_notes).replace(/^'|'$/gi, ""),
			"orders_speciality_status_orders"			: datas.orders_speciality_status_orders,
			"orders_speciality_status_payment"			: datas.orders_speciality_status_payment		
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
var get_all_orders_spaciality = async function () {
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
var get_one_orders_spaciality = async function (order_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_configs.db_prefix + "orders_speciality_ID = '" + order_id + "' " + 
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
var check_order_link_user = async function (user_id) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_configs.db_prefix + "orders_speciality_ID " + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_configs.db_prefix + "orders_speciality_user_id = '" + user_id + "' " + 
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
var update_orders_spaciality = async function (datas,order_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "orders_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ order_id + '"';
	
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
var delete_orders_spaciality = async function (order_id) {

	let table_name  = ojs_configs.db_prefix + "orders_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_speciality_ID ";
	
	
	let table_name_detail  = ojs_configs.db_prefix + "orders_details_speciality ";
	let field_where_detail  = ojs_configs.db_prefix + "orders_details_speciality_order_id ";
	
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ order_id + '"';
	let sql_text_detail = 'DELETE FROM ' + table_name_detail + ' where ' + field_where_detail + ' = "'+ order_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				
				connection.query( { sql: sql_text_detail, timeout: 20000 } , ( err , results , fields ) => {
					if( err ) reject(err);
				})
				
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
//insert app
var insert_orders_spaciality_app = async function (datas,data_details) {
	
	let sql_text = "";
	let dataGo = {
			"orders_speciality_user_id"					: datas.orders_speciality_user_id,
			"orders_speciality_adress"					: mysql.escape(datas.orders_speciality_adress).replace(/^'|'$/gi, ""),		
			"orders_speciality_phone"					: mysql.escape(datas.orders_speciality_phone).replace(/^'|'$/gi, ""),	
			"orders_speciality_email"					: mysql.escape(datas.orders_speciality_email).replace(/^'|'$/gi, ""),
			"orders_speciality_notes"					: mysql.escape(datas.orders_speciality_notes).replace(/^'|'$/gi, ""),
			"orders_speciality_status_orders"			: datas.orders_speciality_status_orders,
			"orders_speciality_status_payment"			: datas.orders_speciality_status_payment		
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
	}
	
	
	sql_text = "START TRANSACTION ; "
	sql_text = "INSERT INTO " + ojs_configs.db_prefix + "orders_speciality  SET ? ; ";

	sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";	
	
	//
	// sql details
	//

	if(data_details.length > 0){
		let sql_details_all = "";
		for(let i = 0; i < data_details.length; i ++){
			///ex
			sql_details = "INSERT INTO " + ojs_configs.db_prefix + "orders_details_speciality  ";
			sql_details = sql_details + "(" +
							ojs_configs.db_prefix + "orders_details_speciality_order_id" + "," + 
							ojs_configs.db_prefix + "orders_details_speciality_line_order" + "," + 
							ojs_configs.db_prefix + "orders_details_speciality_product_id " + "," + 
							ojs_configs.db_prefix + "orders_details_speciality_qty " + "," + 
							ojs_configs.db_prefix + "orders_details_speciality_price " + "," + 							
							ojs_configs.db_prefix + "orders_details_speciality_discount " + "," + 
							ojs_configs.db_prefix + "orders_details_speciality_unit_discount " + 
						") " + 
						"values(" + 
						"@aa, '" + 
						data_details[i].orders_details_speciality_line_order +  "', " + 
						data_details[i].orders_details_speciality_product_id +  ", " + 
						data_details[i].orders_details_speciality_qty +  ", " + 
						data_details[i].orders_details_speciality_price +  ", " + 
						data_details[i].orders_details_speciality_discount +  ", " + 
						data_details[i].orders_details_speciality_unit_discount  +
						") ; ";		
			sql_details_all	= sql_details_all  + sql_details		
		}//end of for option_arr	
		sql_text = sql_text + sql_details_all;
	}
	//
	// end of sql details
	//-----------------------------	
	

	
	//commit
	sql_text = sql_text + " COMMIT;"	
	
	
	//return sql_text;
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo,  ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );		
	}
	catch(error){
		return  { "error" : "modem orders speciality, -> insert order  speciality", "message" : error } ;
	}

};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_orders_spaciality,
	get_one_orders_spaciality,
	update_orders_spaciality,
	insert_orders_spaciality,
	delete_orders_spaciality,
	search,
	search_view,
	check_order_link_user,
	insert_orders_spaciality_app
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














