
/*


* 1. [insert_shipping_spaciality]

* 2. [get_all_shipping_spaciality]

* 3. [get_one_shipping_spaciality]

* 4. [update_shipping_spaciality]

* 5. [delete_shipping_spaciality]

* 6. [search]

* 7. [get_owner_tracking]



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
	ojs_configs.db_prefix  + "shipping_speciality_ID as shipping_speciality_ID, " + 
	ojs_configs.db_prefix  + "shipping_speciality_name as shipping_speciality_name, " + 
	
	ojs_configs.db_prefix  + "shipping_speciality_code as shipping_speciality_code, " + 
	ojs_configs.db_prefix  + "shipping_speciality_parent_id as shipping_speciality_parent_id, " + 
	ojs_configs.db_prefix  + "shipping_speciality_information as shipping_speciality_information, " + 	
	ojs_configs.db_prefix  + "shipping_speciality_show as shipping_speciality_show, " + 	
	ojs_configs.db_prefix  + "shipping_speciality_price as shipping_speciality_price ";

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "shipping_speciality "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" ;
	
//@
//@


//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "shipping_speciality_name ASC " ;
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_shipping_spaciality]
const insert_shipping_spaciality = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "shipping_speciality  SET ?";
	var dataGo = {
		
			"shipping_speciality_name"					: mysql.escape(datas.shipping_speciality_name).replace(/^'|'$/gi, ""),
			"shipping_speciality_information"			: mysql.escape(datas.shipping_speciality_information).replace(/^'|'$/gi, ""),
			"shipping_speciality_code"					: datas.shipping_speciality_code,			
			"shipping_speciality_parent_id"				: datas.shipping_speciality_parent_id,			
			"shipping_speciality_price"					: datas.shipping_speciality_price,			
			"shipping_speciality_show"					: datas.shipping_speciality_show
	}
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(var x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
	}


	//return  { "error" : "s", "position" : "md-shipping_spaciality->insert", "message" : dataGo } ;

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
		return  { "error" : "1", "position" : "md-shipping_spaciality->insert", "message" : error } ;
	}

};

//@ end of * 1. [insert_shipping_spaciality]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_shipping_spaciality]
const get_all_shipping_spaciality = async function () {
	
	
	
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
		return  { "error" : "1", "position" : "md-shipping_spaciality->get_all", "message" : error } ;
	}
};



//@ end of * 2. [get_all_shipping_spaciality]



//@
//@
//@
//@
//@
//@ * 3. [get_one_shipping_spaciality]
const get_one_shipping_spaciality = async function (shipping_speciality_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "shipping_speciality_ID = '" + shipping_speciality_id + "' "				
	
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
		return  { "error" : "1", "position" : "md-shipping_spaciality->get_one", "message" : error } ;
	}
};

//@ * end of  3. [get_one_shipping_spaciality]



//@
//@
//@
//@
//@* 4. [update_shipping_spaciality]
const update_shipping_spaciality = async function (datas,shipping_speciality_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "shipping_spaciality ";
	var field_where  = ojs_configs.db_prefix + "shipping_speciality_id ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ shipping_speciality_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position" : "md-shipping_spaciality->update", "message" : error } ;
	}
};



//@* end of 4. [update_shipping_spaciality]


//@
//@
//@
//@
//@* 5. [delete_shipping_spaciality]
const delete_shipping_spaciality = async function (shipping_speciality_id) {

	var table_name  = ojs_configs.db_prefix + "shipping_spaciality ";
	var field_where  = ojs_configs.db_prefix + "shipping_speciality_id ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ shipping_speciality_id + '"';
	
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
		return  { "error" : "1", "position" : "md-shipping_spaciality->delete", "message" : error_send } ; 
	}
};


//@* end of 5. [delete_shipping_spaciality]




//@
//@
//@
//@
//@* 6. [delete_shipping_spaciality]
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
		return  { "error" : "1", "position" : "md-shipping_spaciality->search", "message" : error_send } ; 
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
		return  { "error" : "2", "position" : "md-shipping_spaciality->search", "message" : error_send } ;  
	}
};

//@* end of 6. [search]












//export module
module.exports = {
			search,
			insert_shipping_spaciality,
			get_one_shipping_spaciality,
			update_shipping_spaciality,
			delete_shipping_spaciality,
			get_all_shipping_spaciality
};

















