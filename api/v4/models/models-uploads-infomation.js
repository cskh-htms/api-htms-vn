
/*

* 1. [insert_uploads_infomation]

* 2. [get_all_uploads_infomation]

* 3. [get_one_uploads_infomation]

* 4. [update_uploads_infomation]

* 5. [delete_uploads_infomation]

* 5.1 [delete_image]

* 6. [search]

* 7. [get_owner_uploads_infomation]

* 8. [get_owner_image]

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
	ojs_configs.db_prefix  + "uploads_infomation_ID as uploads_infomation_ID, " + 

	"DATE_FORMAT(" + ojs_configs.db_prefix  + "uploads_infomation_created,'%Y/%m/%d %H:%i:%s') as uploads_infomation_created, " +	
	
	ojs_configs.db_prefix  + "uploads_infomation_user_id as uploads_infomation_user_id, " + 
	ojs_configs.db_prefix  + "uploads_infomation_url as uploads_infomation_url, " + 	
	ojs_configs.db_prefix  + "uploads_infomation_image_id as uploads_infomation_image_id " ;




//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "uploads_infomation "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "uploads_infomation_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users_type  ON  " + 
	ojs_configs.db_prefix + "users_users_type_id  = " + 
	ojs_configs.db_prefix + "users_ID " ;
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "uploads_infomation_created ASC ";
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_uploads_infomation]
var insert_uploads_infomation = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "uploads_infomation  SET ?";
	var dataGo = {
		
		"uploads_infomation_user_id"					: datas.uploads_infomation_user_id,
		"uploads_infomation_url"						: mysql.escape(datas.uploads_infomation_url).replace(/^'|'$/gi, ""),		
		"uploads_infomation_image_id"					: datas.uploads_infomation_image_id
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
		return  { "error" : "model_uploads_infomation_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_uploads_infomation]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_uploads_infomation]
var get_all_uploads_infomation = async function () {
	
	
	
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
		return  { "error" : "model_uploads_infomation_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_uploads_infomation]



//@
//@
//@
//@
//@
//@ * 3. [get_one_uploads_infomation]
const get_one_uploads_infomation = async function (uploads_infomation_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "uploads_infomation_ID = '" + uploads_infomation_id + "' "				
	
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
		return  { "error" : "model_uploads_infomation->get_one_uploads_infomation->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_uploads_infomation]



//@
//@
//@
//@
//@* 4. [update_uploads_infomation]
const update_uploads_infomation = async function (datas,uploads_infomation_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "uploads_infomation ";
	var field_where  = ojs_configs.db_prefix + "uploads_infomation_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ uploads_infomation_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->uploads_infomation->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_uploads_infomation]


//@
//@
//@
//@
//@* 5. [delete_uploads_infomation]
const delete_uploads_infomation = async function (uploads_infomation_id) {

	var table_name  = ojs_configs.db_prefix + "uploads_infomation ";
	var field_where  = ojs_configs.db_prefix + "uploads_infomation_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ uploads_infomation_id + '"';
	
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
		res.send({ "error" : "model_uploads_infomation->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_uploads_infomation]



//@
//@
//@
//@
//@* 5.1 [delete_image]
const delete_image = async function (image_id) {

	var table_name  = ojs_configs.db_prefix + "uploads_infomation ";
	var field_where  = ojs_configs.db_prefix + "uploads_infomation_image_id ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ image_id + '"';
	
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
		res.send({ "error" : "model_uploads_infomation->delete-image->error_number : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5.1 [delete_uploads_infomation]






//@
//@
//@
//@
//@* 6. [delete_uploads_infomation]
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
		res.send({ "error" : "model_uploads_infomation->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_uploads_infomation->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]







//@
//@
//@
// 7. [get_owner_uploads_infomation]
const get_owner_uploads_infomation = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "uploads_infomation_ID  "  + 
					sql_from_default + 
					sql_link_search + 
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "uploads_infomation_ID = '" + datas.datas.uploads_infomation_id + "' " 
	
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
		return  { "error" : "models_products->get_owner_uploads_infomation->error_number : 1", "message" : error } ;
	}
};

// 7. [get_owner_uploads_infomation]




//@
//@
//@
// 8. [get_owner_image]
const get_owner_image = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "uploads_infomation_ID  "  + 
					sql_from_default + 
					sql_link_search + 
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "uploads_infomation_image_id = '" + datas.datas.image_id + "' " 
	
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
		return  { "error" : "models_products->get_owner_image->error_number : 1", "message" : error } ;
	}
};

// 8. [get_owner_image]






//export module
module.exports = {
			search,
			insert_uploads_infomation,
			get_one_uploads_infomation,
			update_uploads_infomation,
			delete_uploads_infomation,
			get_all_uploads_infomation,
			get_owner_uploads_infomation,
			get_owner_image,
			delete_image
};

















