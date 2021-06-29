
/*

* 1. [insert_discount_program]

* 2. [get_all_discount_program]

* 3. [get_one_discount_program]

* 4. [update_discount_program]

* 5. [delete_discount_program]



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
	ojs_configs.db_prefix  + "discount_program_ID as discount_program_ID, " + 
	ojs_configs.db_prefix  + "discount_program_price_created as discount_program_price_created, " + 
	ojs_configs.db_prefix  + "discount_program_price_sale as discount_program_price_sale, " + 	
	ojs_configs.db_prefix  + "discount_program_name as discount_program_name, " +
	ojs_configs.db_prefix  + "discount_program_featured_image as discount_program_featured_image, " +	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_date_created, " +	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_star,'%Y/%m/%d %H:%i:%s') as discount_program_date_star, " +		
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "discount_program_date_end,'%Y/%m/%d %H:%i:%s') as discount_program_date_end, " +		
	
	
	ojs_configs.db_prefix  + "discount_program_limit_store as discount_program_limit_store, " + 
	
	ojs_configs.db_prefix  + "discount_program_information as discount_program_information " ;



//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "discount_program "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" ; 
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "discount_program_date_created ASC "; 
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_discount_program]
var insert_discount_program = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "discount_program  SET ?";
	var dataGo = {
			"discount_program_price_created"				: datas.discount_program_price_created,
			"discount_program_price_sale"				: datas.discount_program_price_sale,
			"discount_program_name"					: mysql.escape(datas.discount_program_name).replace(/^'|'$/gi, ""),
			"discount_program_date_star"			: mysql.escape(datas.discount_program_date_star).replace(/^'|'$/gi, ""),
			"discount_program_date_end"				: mysql.escape(datas.discount_program_date_end).replace(/^'|'$/gi, ""),
			"discount_program_limit_store"			: datas.discount_program_limit_store,
			"discount_program_information"			: mysql.escape(datas.discount_program_information).replace(/^'|'$/gi, ""),
			"discount_program_featured_image"			: mysql.escape(datas.discount_program_featured_image).replace(/^'|'$/gi, "")
			
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
		return  { "error" : "model_discount_program_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_discount_program]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_discount_program]
var get_all_discount_program = async function () {
	
	
	
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
		return  { "error" : "model_discount_program_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_discount_program]



//@
//@
//@
//@
//@
//@ * 3. [get_one_discount_program]
const get_one_discount_program = async function (discount_program_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "discount_program_ID = '" + discount_program_id + "' "				
	
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
		return  { "error" : "model_discount_program->get_one_discount_program->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_discount_program]



//@
//@
//@
//@
//@* 4. [update_discount_program]
const update_discount_program = async function (datas,discount_program_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "discount_program ";
	var field_where  = ojs_configs.db_prefix + "discount_program_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ discount_program_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->discount_program->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_discount_program]


//@
//@
//@
//@
//@* 5. [delete_discount_program]
const delete_discount_program = async function (discount_program_id) {

	var table_name  = ojs_configs.db_prefix + "discount_program ";
	var field_where  = ojs_configs.db_prefix + "discount_program_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ discount_program_id + '"';
	
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
		res.send({ "error" : "model_discount_program->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_discount_program]




//@
//@
//@
//@
//@* 6. [delete_discount_program]
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
		res.send({ "error" : "model_discount_program->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_discount_program->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]




//export module
module.exports = {
			search,
			insert_discount_program,
			get_one_discount_program,
			update_discount_program,
			delete_discount_program,
			get_all_discount_program
};

















