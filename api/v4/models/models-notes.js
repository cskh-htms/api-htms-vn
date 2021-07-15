
/*

* 1. [insert_notes]

* 2. [get_all_notes]

* 3. [get_one_notes]

* 4. [update_notes]

* 5. [delete_notes]

* 6. [search]

7. [save_all]


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
	ojs_configs.db_prefix  + "notes_ID as notes_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "notes_date_created,'%Y/%m/%d %H:%i:%s') as notes_date_created, " +	
	ojs_configs.db_prefix  + "notes_user_id as notes_user_id, " + 
	ojs_configs.db_prefix  + "notes_status as notes_status, " + 
	ojs_configs.db_prefix  + "notes_title as notes_title, " + 
	ojs_configs.db_prefix  + "notes_contents as notes_contents ";


//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "notes "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "notes_user_id  = " + 
	ojs_configs.db_prefix + "users_ID "  
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "notes_date_created DESC ";
	
	
	
	
	
	
	
//@
//@
//@
//@
//@ * 7. [save_all]
var save_all = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "notes  SET ?";
	var dataGo = {
			"notes_user_id"				: datas.notes_user_id,
			"notes_title"				: datas.notes_title,
			"notes_contents"			: datas.notes_contents,
			"notes_status"				: datas.notes_status
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
		return  { "error" : "model_notes_insert-> error_nymber : 1", "message" : error } ;
	}

};	
	
	
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_notes]
var insert_notes = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "notes  SET ?";
	var dataGo = {
			"notes_user_id"				: datas.notes_user_id,
			"notes_title"				: datas.notes_title,
			"notes_contents"			: datas.notes_contents,
			"notes_status"				: datas.notes_status
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
		return  { "error" : "model_notes_insert-> error_nymber : 1", "message" : error } ;
	}

};

//@ end of * 1. [insert_notes]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_notes]
var get_all_notes = async function () {
	
	
	
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
		return  { "error" : "model_notes_insert->get_all-> error_nymber : 1", "message" : error } ;
	}
};



//@ end of * 2. [get_all_notes]



//@
//@
//@
//@
//@
//@ * 3. [get_one_notes]
const get_one_notes = async function (note_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "notes_ID = '" + note_id + "' "				
	
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
		return  { "error" : "model_notes->get_one_notes->error-number : 1", "message" : error } ;
	}
};

//@ * end of  3. [get_one_notes]



//@
//@
//@
//@
//@* 4. [update_notes]
const update_notes = async function (datas,note_id) {
	
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


	var table_name  = ojs_configs.db_prefix + "notes ";
	var field_where  = ojs_configs.db_prefix + "notes_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ note_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->notes->update->error_number : 1", "message" : error } ;
	}
};



//@* end of 4. [update_notes]


//@
//@
//@
//@
//@* 5. [delete_notes]
const delete_notes = async function (note_id) {

	var table_name  = ojs_configs.db_prefix + "notes ";
	var field_where  = ojs_configs.db_prefix + "notes_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ note_id + '"';
	
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
		res.send({ "error" : "model_notes->delete->error_numbaer : 1 ", "message": error_send } ); 
		return;	
	}
};


//@* end of 5. [delete_notes]




//@
//@
//@
//@
//@* 6. [delete_notes]
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
		res.send({ "error" : "model_notes->search->error_number : 2", "message": error_send } ); 
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
		res.send({ "error" : "model_notes->search->error_number : 1", "message": error_send } ); 
		return;	
	}
};

//@* end of 6. [search]






//@
//@
//@
// 7. [get_owner_notes]
const get_owner_notes = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "notes_ID  "  + 
					sql_from_default + 
					sql_link_default + 
					" WHERE " +  
							ojs_configs.db_prefix + "notes_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "notes_ID  = '" + datas.datas.note_id + "' " 
	
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
		return  { "error" : "models_notes->get_owner_notest->error_number : 1", "message" : error } ;
	}
};

// 7. [get_owner_notes]






//export module
module.exports = {
			search,
			insert_notes,
			get_one_notes,
			update_notes,
			delete_notes,
			get_all_notes,
			get_owner_notes,
			save_all
};

















