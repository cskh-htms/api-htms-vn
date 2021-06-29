
/*

* 1. [insert_discount_program_details]

* 2. [get_all_discount_program_details]

* 3. [get_one_discount_program_details]

* 4. [update_discount_program_details]

* 5. [delete_discount_program_details]



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
	ojs_configs.db_prefix  + "discount_program_details_ID as discount_program_details_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_details_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_details_date_created, " +	
	
	
	
	ojs_configs.db_prefix  + "discount_program_details_discount_program_id as discount_program_details_discount_program_id, " + 
	ojs_configs.db_prefix  + "discount_program_details_store_id as discount_program_details_store_id, " + 	
	ojs_configs.db_prefix  + "discount_program_details_status as discount_program_details_status, " + 	
	
	
	ojs_configs.db_prefix  + "discount_program_details_price as discount_program_details_price, " + 
	ojs_configs.db_prefix  + "discount_program_details_date_number as discount_program_details_date_number, " + 	
	ojs_configs.db_prefix  + "discount_program_details_limit_product as discount_program_details_limit_product, " + 	

	ojs_configs.db_prefix  + "discount_program_details_qoute as discount_program_details_qoute "; 

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "discount_program_details "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "discount_program_details_store_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "discount_program  ON  " + 
	ojs_configs.db_prefix + "discount_program_details_discount_program_id  = " + 
	ojs_configs.db_prefix + "discount_program_ID " 	  
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "discount_program_details_date_created ASC ";
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_discount_program_details]
const insert_discount_program_details = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "discount_program_details  SET ?";
	var dataGo = {
			"discount_program_details_discount_program_id"		: datas.discount_program_details_discount_program_id,
			"discount_program_details_store_id"					: datas.discount_program_details_store_id,
			"discount_program_details_status"					: datas.discount_program_details_status,
			
			"discount_program_details_price"					: datas.discount_program_details_price,
			"discount_program_details_date_number"				: datas.discount_program_details_date_number,
			"discount_program_details_limit_product"			: datas.discount_program_details_limit_product,			
			
			"discount_program_details_qoute"					: mysql.escape(datas.discount_program_details_qoute).replace(/^'|'$/gi, "")	
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
		return  { "error" : "model_discount_program_details_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_discount_program_details]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_discount_program_details]
const get_all_discount_program_details = async function () {
	
	
	
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
		return  { "error" : "model_discount_program_details_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_discount_program_details]



//@
//@
//@
//@
//@
//@ * 3. [get_one_discount_program_details]
const get_one_discount_program_details = async function (discount_program_details_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "discount_program_details_ID = '" + discount_program_details_id + "' "				
	
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
		return  { "error" : "model_discount_program_details->get_one_discount_program_details->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_discount_program_details]



//@
//@
//@
//@
//@* 4. [update_discount_program_details]
const update_discount_program_details = async function (datas,discount_program_details_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "discount_program_details ";
	var field_where  = ojs_configs.db_prefix + "discount_program_details_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ discount_program_details_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->discount_program_details->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_discount_program_details]


//@
//@
//@
//@
//@* 5. [delete_discount_program_details]
const delete_discount_program_details = async function (discount_program_details_id) {

	var table_name  = ojs_configs.db_prefix + "discount_program_details ";
	var field_where  = ojs_configs.db_prefix + "discount_program_details_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ discount_program_details_id + '"';
	
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
		res.send({ "error" : "model_discount_program_details->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_discount_program_details]




//@
//@
//@
//@
//@* 6. [delete_discount_program_details]
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
		res.send({ "error" : "model_discount_program_details->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_discount_program_details->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]




//export module
module.exports = {
			search,
			insert_discount_program_details,
			get_one_discount_program_details,
			update_discount_program_details,
			delete_discount_program_details,
			get_all_discount_program_details
};

















