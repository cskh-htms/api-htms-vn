/*



* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

* 7. [search]

* 8. [search_customer]

* 9. [search_user]



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





///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////







//sql select default
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "orders_speciality_ID as orders_speciality_ID, " + 
	ojs_configs.db_prefix  + "orders_speciality_user_id  as orders_speciality_user_id , " +	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "orders_speciality_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_date_orders, " + 		
	ojs_configs.db_prefix  + "orders_speciality_status_orders as orders_speciality_status_orders, " + 
	ojs_configs.db_prefix  + "orders_speciality_status_payment as orders_speciality_status_payment, " + 	
	
	ojs_configs.db_prefix  + "orders_speciality_phone as orders_speciality_phone, " + 
	ojs_configs.db_prefix  + "orders_speciality_adress as orders_speciality_adress, " + 
	ojs_configs.db_prefix  + "orders_speciality_notes as orders_speciality_notes, " + 
	ojs_configs.db_prefix  + "orders_speciality_email as orders_speciality_email, " +	
	
	
	ojs_configs.db_prefix  + "orders_speciality_province as orders_speciality_province, " + 
	ojs_configs.db_prefix  + "orders_speciality_district as orders_speciality_district, " + 
	ojs_configs.db_prefix  + "orders_speciality_wards as orders_speciality_wards, " + 
	ojs_configs.db_prefix  + "orders_speciality_name as orders_speciality_name, " +		
	
	
	ojs_configs.db_prefix  + "orders_speciality_shipping_code as orders_speciality_shipping_code ";
	
	

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "orders_speciality "  ;

	
//link table	
var sql_link_default = 	""  ; 
var sql_link_search = 	""  + 

	" INNER JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "orders_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID "   



//order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "orders_speciality_date_orders DESC " ;
	

//--------------------------------
//sql search
//--------------------------------	
	
//from table
var sql_from_search_customer = 	" from " + ojs_configs.db_prefix + "view_orders_customer " ;
var sql_from_search_user = " from " + ojs_configs.db_prefix + "view_orders_users " ;

var sql_from_search_count_order_by_user = " from " + ojs_configs.db_prefix + "view_count_order_by_user" ;




var sql_link_search_view = 	" " ;	


	
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
	
	
//@
//@
//@
//@
//@
// * 1. [insert_orders_spaciality]
const insert_orders_spaciality = async function (datas,data_details) {
	
	
	//@
	//@
	//@
	//@
	var sql_text = "";
	var dataGo = {
			"orders_speciality_user_id"					: datas.orders_speciality_user_id,
			
			"orders_speciality_adress"					: mysql.escape(datas.orders_speciality_adress).replace(/^'|'$/gi, ""),		
			"orders_speciality_phone"					: mysql.escape(datas.orders_speciality_phone).replace(/^'|'$/gi, ""),	
			"orders_speciality_email"					: mysql.escape(datas.orders_speciality_email).replace(/^'|'$/gi, ""),
			"orders_speciality_notes"					: mysql.escape(datas.orders_speciality_notes).replace(/^'|'$/gi, ""),
			
			
			"orders_speciality_province"				: mysql.escape(datas.orders_speciality_province).replace(/^'|'$/gi, ""),		
			"orders_speciality_district"				: mysql.escape(datas.orders_speciality_district).replace(/^'|'$/gi, ""),	
			"orders_speciality_wards"					: mysql.escape(datas.orders_speciality_wards).replace(/^'|'$/gi, ""),
			"orders_speciality_name"					: mysql.escape(datas.orders_speciality_name).replace(/^'|'$/gi, ""),			
			
			
			"orders_speciality_status_orders"			: datas.orders_speciality_status_orders,
			"orders_speciality_status_payment"			: datas.orders_speciality_status_payment,
			"orders_speciality_shipping_code"			: mysql.escape(datas.orders_speciality_shipping_code).replace(/^'|'$/gi, "")			
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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
							ojs_configs.db_prefix + "orders_details_speciality_price "  + 	
						") " + 
						"values(" + 
						"@aa, '" + 
						data_details[i].orders_details_speciality_line_order +  "', " + 
						data_details[i].orders_details_speciality_product_id +  ", " + 
						data_details[i].orders_details_speciality_qty +  ", " + 
						data_details[i].orders_details_speciality_price + 
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
//@
//@
// * end of  1. [insert_orders_spaciality]	
	
	
	
	
//@
//@	
//@
//@
// * 2. [get_all_orders_spaciality]	
const get_all_orders_spaciality = async function () {
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
		return  { "error" : "model_orders_speciality->get_all->error : 1", "message" : error } ;
	}
};	
//@
//@
// * end 2. [get_all_orders_spaciality]		
	
	
	
	
	
//@
//@
//@
// 3. [get_owner_order]
const get_owner_order = async function (datas) {

	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "orders_speciality_ID   "  + 
					sql_from_default + 
					sql_link_search + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "orders_speciality_ID   = '" + datas.datas.order_id + "' " 
	
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
		return  { "error" : "models_orders_speciality->get_owner_order->error_number : 1", "message" : error } ;
	}
};

// 3. [get_owner_order]
	
	

//@
//@
//@
//@	
//@ 4. [update_orders_spaciality]	
const update_orders_spaciality = async function (datas,order_id) {
	
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
		return  { "error" : "model_orders_speciality>update->error : 1", "message" : error } ;
	}
};	
//@	
//@ end of 4. [update_orders_spaciality]	
	
	
	
	
//@
//@
//@	
//@	
//@ 5. [delete_orders_spaciality]
var delete_orders_spaciality = async function (order_id) {
	var sql_text_all = "";
	var table_name  = ojs_configs.db_prefix + "orders_speciality ";
	var field_where  = ojs_configs.db_prefix + "orders_speciality_ID ";
	
	
	var table_name_detail  = ojs_configs.db_prefix + "orders_details_speciality ";
	var field_where_detail  = ojs_configs.db_prefix + "orders_details_speciality_order_id ";
	
	//create sql text
	var sql_trans = "START TRANSACTION ;"
	var sql_text_detail = ' DELETE FROM ' + table_name_detail + ' where ' + field_where_detail + ' = "'+ order_id + '"; ';	
	var sql_text_order = ' DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ order_id + '"; ';
	var sql_commit = " COMMIT;"
	
	
	//@
	//@
	//@
	sql_text_all = sql_trans + sql_text_detail + sql_text_order + sql_commit;
	
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text_all, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model_orders_speciality>delete->error : 1", "message" : error } ;
	}
};
//@	
//@ 5. end of [delete_orders_spaciality]

	
	
	
	
//@	
//@	
//@	
//@	
//@	
//@ * 6. [get_one_orders_spaciality]
const get_one_orders_spaciality = async function (order_id) {
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
//@	
//@ * end of 6. [get_one_orders_spaciality]	
	
	
	
	
//@	
//@	
//@	
//@	
//@	
//@ * 7. [search]
const search = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	}
	catch(error){
		return  { "error" : "model-orders-spaciality->search->error-nymber : 1", "message" : error } ;
	}
	
	
	//@
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
		return  { "error" : "model-orders-spaciality->search->error-number : 1", "message" : error } ;
	}
};
//@	
//@ end of * 7. [search]	
	

	
//@	
//@	
//@	
//@	
//@	
//@ * 8. [search_customer]
const search_customer = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_customer,sql_link_search_view);
					
	}
	catch(error){
		return  { "error" : "model-orders-spaciality->search_customer->error-nymber : 1", "message" : error } ;
	}
	
	
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
		return  { "error" : "01.model_orders_speciality->search_customer : 2", "message" : error } ;
	}
};
//@	
//@ end of * 8. [search_customer]	


//@	
//@	
//@	
//@	
//@	
//@ * 9. [search_user]
const search_user = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_user,sql_link_search_view);
					
	}
	catch(error){
		return  { "error" : "model-orders-spaciality->search_user->error-nymber : 1", "message" : error } ;
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
		return  { "error" : "01.model_orders_speciality->search_user : 2", "message" : error } ;
	}
};
//@	
//@ end of * 9. [search_user]	



//@	
//@	
//@	
//@	
//@	
//@ * 10. [search_count_order_by_user]
const search_count_order_by_user = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_search_count_order_by_user,sql_link_search_view);
					
	}
	catch(error){
		return  { "error" : "model-orders-spaciality->search_count_order_by_user->error-nymber : 1", "message" : error } ;
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
		return  { "error" : "01.model_orders_speciality->search_count_order_by_user : 2", "message" : error } ;
	}
};
//@	
//@ end of * 10. [search_count_order_by_user]	




















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
	search_customer,
	search_user,
	get_owner_order,
	search_count_order_by_user
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














