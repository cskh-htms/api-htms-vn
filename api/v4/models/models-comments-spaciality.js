
/*




* 1. [insert_comments_spaciality]

* 2. [get_all_comments_spaciality]

* 3. [get_one_comments_spaciality]

* 4. [update_comments_spaciality]

* 5. [delete_comments_spaciality]

* 6. [search]



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




/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////







//sql select default
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "comments_speciality_ID as comments_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "comments_speciality_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as comments_speciality_date_created, " + 	
	ojs_configs.db_prefix  + "comments_speciality_user_id as comments_speciality_user_id, " + 
	ojs_configs.db_prefix  + "comments_speciality_comment_parent_id as comments_speciality_comment_parent_id, " + 
	ojs_configs.db_prefix  + "comments_speciality_product_id as comments_speciality_product_id, " + 
	ojs_configs.db_prefix  + "comments_speciality_contents as comments_speciality_contents, " + 
	ojs_configs.db_prefix  + "comments_speciality_images as comments_speciality_images, " + 
	ojs_configs.db_prefix  + "comments_speciality_videos as comments_speciality_videos, " + 
	ojs_configs.db_prefix  + "comments_speciality_status_admin as comments_speciality_status_admin "; 
	

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "comments_speciality "  ;
	
//link table	
var sql_link_default = 	""; 
var sql_link_search = 	"" + 

	" INNER JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "comments_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" INNER JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "comments_speciality_product_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID " 


//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "comments_speciality_date_created DESC " ;
	
	

		
	
//@
//@
//@
//@
//@
//@ 1. [insert_comments_spaciality]	
const insert_comments_spaciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "comments_speciality  SET ?";
	let dataGo = {
			"comments_speciality_user_id"					: datas.comments_speciality_user_id,
			"comments_speciality_comment_parent_id"			: datas.comments_speciality_comment_parent_id,		
			"comments_speciality_product_id"				: datas.comments_speciality_product_id,	
			"comments_speciality_contents"					: mysql.escape(datas.comments_speciality_contents).replace(/^'|'$/gi, ""),
			"comments_speciality_images"					: mysql.escape(datas.comments_speciality_images).replace(/^'|'$/gi, ""),
			"comments_speciality_videos"					: mysql.escape(datas.comments_speciality_videos).replace(/^'|'$/gi, ""),
			"comments_speciality_status_admin"				: datas.comments_speciality_status_admin		
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
		return  { "error" : "model->comments_speciality->insert->error_number : 1", "message" : error } ;
	}

};	
//@ end of
//@ 1. [insert_comments_spaciality]		
	
	
	
	


//@ 
//@ 
//@ 
//@ 
//@ 
//@ 2. [get_all_comments_spaciality]
const get_all_comments_spaciality = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "model->comments_speciality->get all->error_number : 1", "message" : error } ;
	}
};
//@ end of 
//@ 2. [get_all_comments_spaciality]






//@
//@
//@
//@
//@
//@
// 3. [get_one_comments_spaciality]
const get_one_comments_spaciality = async function (comment_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_configs.db_prefix + "comments_speciality_ID = '" + comment_id + "' " + 
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

//@ end of
// 3. [get_one_comments_spaciality]










//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 4. [update_comments_spaciality]
const update_comments_spaciality = async function (datas,comment_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "comments_speciality ";
	let field_where  = ojs_configs.db_prefix + "comments_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ comment_id + '"';
	
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
//@ end of 
//@ 4. [update_comments_spaciality]








//@
//@
//@
//@
//@
//@
// 5. [delete_comments_spaciality]
const delete_comments_spaciality = async function (comment_id) {

	let table_name  = ojs_configs.db_prefix + "comments_speciality ";
	let field_where  = ojs_configs.db_prefix + "comments_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ comment_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-comment -> delete -> error_number : 1", "message" : error } ;
	}
};
//@ end of
// 5. [delete_comments_spaciality]	








	
	
	
//@
//@
//@
//@
//@
//@
// 6. [search]
const search = async function (datas) {
	
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	}
	catch(error){
		return  { "error" : "model-comment-speciality->search->error-nymber : 3", "message" : error } ;
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
		return  { "error" : "m_13", "message" : error } ;
	}
};
//@ end of
// 6. [search]	
	
		
	







//@
//@
//@
//@
//@
//@
// 8. [get_owner_comment]
const get_owner_comment = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "comments_speciality_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "comments_speciality_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "comments_speciality_product_id  = '" + datas.datas.comment_id + "' " 
	
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
		return  { "error" : "models_comment->get_owner_comment->error_number : 1", "message" : error } ;
	}
};

// 8. [get_owner_review]
















/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_comments_spaciality,
	get_one_comments_spaciality,
	update_comments_spaciality,
	insert_comments_spaciality,
	delete_comments_spaciality,
	search,
	get_owner_comment
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














