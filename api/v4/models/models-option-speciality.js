
/*



* 1. [insert_option_speciality]

* 2. [get_all_option_speciality]

* 3. [get_owner_option]

* 4. [get_one_option]

* 5. [update_option_speciality]

* 6. [delete_option_speciality]

* 7. [search]






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
//@ fields select
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "options_product_speciality_ID as options_product_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "options_product_speciality_date_created,'%Y/%m/%d %H:%i:%s') as options_product_speciality_date_created, " + 	
	ojs_configs.db_prefix  + "options_product_speciality_name as options_product_speciality_name, " + 
	
	ojs_configs.db_prefix  + "options_product_speciality_featured_image as options_product_speciality_featured_image, " + 
	ojs_configs.db_prefix  + "options_product_speciality_parent_id as options_product_speciality_parent_id, " + 
	ojs_configs.db_prefix  + "options_product_speciality_stores_id as options_product_speciality_stores_id, " +		
	
	ojs_configs.db_prefix  + "options_product_speciality_status_stores as options_product_speciality_status_stores, " +
	ojs_configs.db_prefix  + "options_product_speciality_status_admin as options_product_speciality_status_admin, " +
	ojs_configs.db_prefix  + "options_product_speciality_status_update as options_product_speciality_status_update, " +		
	
	
	ojs_configs.db_prefix  + "options_product_speciality_information as options_product_speciality_information, " + 
	ojs_configs.db_prefix  + "options_product_speciality_qoute as options_product_speciality_qoute, " +	
		
	//stores
	ojs_configs.db_prefix  + "stores_ID as stores_ID, " + 
	ojs_configs.db_prefix  + "stores_name as stores_name, " + 

	//service type
	ojs_configs.db_prefix  + "service_type_ID as service_type_ID, " + 
	ojs_configs.db_prefix  + "service_type_name as service_type_name " 


//@
//@
//@
//@
//@from	
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "options_product_speciality "  ;
	
//@
//@
//@
//@
//@link	
var sql_link_default = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "options_product_speciality_stores_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "service_type  ON  " + 
	ojs_configs.db_prefix + "stores_service_type_id  = " + 
	ojs_configs.db_prefix + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " 
	

//@
//@
//@
//@
//@order	
var sql_order_default = " order by " + 

	ojs_configs.db_prefix + "options_product_speciality_date_created DESC, " + 
	ojs_configs.db_prefix + "options_product_speciality_name" ;
	
	
	
	

		
	

//@
//@
//@
//@
//@
//@ * 1. [insert_option_speciality]
const insert_option_speciality = async function (datas) {
	//@
	var  sql_text = "INSERT INTO " + ojs_configs.db_prefix + "options_product_speciality  SET ?";
	
	//return sql_text;
	
	let dataGo = {
	
			"options_product_speciality_name"						: mysql.escape(datas.options_product_speciality_name).replace(/^'|'$/gi, ""),
			"options_product_speciality_featured_image"				: mysql.escape(datas.options_product_speciality_featured_image).replace(/^'|'$/gi, ""),			
			"options_product_speciality_parent_id"					: datas.options_product_speciality_parent_id,	
			"options_product_speciality_stores_id"					: datas.options_product_speciality_stores_id,			
			
			"options_product_speciality_status_stores"				: datas.options_product_speciality_status_stores,
			"options_product_speciality_status_update"				: datas.options_product_speciality_status_update,			
			"options_product_speciality_status_admin"				: datas.options_product_speciality_status_admin,
			
			"options_product_speciality_information"				: mysql.escape(datas.options_product_speciality_information).replace(/^'|'$/gi, ""),
			"options_product_speciality_qoute"						: mysql.escape(datas.options_product_speciality_qoute).replace(/^'|'$/gi, "")

	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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
		return  { "error" : "model->option-speciality->insert->error-number : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_option_speciality]



//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_option_speciality]
const get_all_option_speciality = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "model->option-speciality-get all: error_number : 1", "message" : error } ;
	}
};
//@* end of 2. [get_all_option_speciality]






//@
//@
//@
// 3. [get_owner_option]
const get_owner_option = async function (datas) {
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "options_product_speciality_ID "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "options_product_speciality_ID = '" + datas.datas.option_id + "' " 
	
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
		return  { "error" : "models_option_speciality->get_owner_option->error_number : 1", "message" : error } ;
	}
};

// 3. [get_owner_option]



//@
//@
//@
//@ 4. [get_one_option]
const get_one_option_speciality = async function (option_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "options_product_speciality_ID = '" + option_id + "' " + 
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
		return  { "error" : "model->options_product_speciality->get-one->error_number : 1", "message" : error } ;
	}
};

//@ end of  4. [get_one_option]







//@
//@
//@
//@ 5. [update_option_speciality]
const update_option_speciality = async function (datas,option_id) {
	
	let sqlSet = "";
	
	//tao arr key
	let arrDatas = Object.keys(datas);
	
	//tao arr value 
	let arrValueDatas = [];
	let x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	//tao sqlset 
	let i = 0;
	arrDatas.forEach(function(item) {
		//
		if(arrValueDatas[i]== null){
			if(sqlSet.length == 0){
				sqlSet = ojs_configs.db_prefix + item + '=' + arrValueDatas[i] ;
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


	let table_name  = ojs_configs.db_prefix + "options_product_speciality ";
	let field_where  = ojs_configs.db_prefix + "options_product_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ option_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->options->update->error_number: 1 ", "message" : error } ;
	}
};
//@ end of 5. [update_option_speciality]






//@
//@
//@
//@
//@ 6. [delete_option_speciality]
const delete_option_speciality = async function (option_id) {

	let table_name  = ojs_configs.db_prefix + "options_product_speciality ";
	let field_where  = ojs_configs.db_prefix + "options_product_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ option_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->option-speciality -> error_number : 1", "message" : error } ;
	}
};

//@ end of 6. [delete_option_speciality]






//@
//@
//@
//@
//@
//@
//@ 7. [search]
const search = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_default);
		//return get_sql_search_group;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấu dữ liệu store search" );
		return { "error" : "model_option_speciality->search->error_number : 1", "message": error_send } ; 
	}					
	//@
	//return sql_text;
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
		return { "error" : "model_option_speciality->search->error_number : 2", "message": error_send } ; 
	}

};

//@
//@end of  7. [search]


/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_option_speciality,
	get_one_option_speciality,
	update_option_speciality,
	insert_option_speciality,
	delete_option_speciality,
	search,
	get_owner_option
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














