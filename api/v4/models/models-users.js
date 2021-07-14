

/*


1. [insert_users]

2.  [login]

2.1  [login_lost]

3.  [get_all_users]

4.  [get_one_user]

5.  [update_users]

5.1  [update_lost_password]

6.  [search_email]

7.  [users_update_email]

8.  [search]

8.1. [search_bussiness]


9.  [get_role]

10.  [delete_users]


*/

//connect 
const connection = require('./models-connection');



//@
//@
//@
//npm exstands
const md5 = require('md5');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');



//@
//@
//function share
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_sql = require('../../../models/ojs-shares-sql');
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');




//@
//@
//@
//@fields select
var  sql_select_all = 	"" + 
	ojs_configs.db_prefix + "users_ID as users_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "users_date_created,'%Y/%m/%d %H:%i:%s') as users_date_created, " + 	
	
	ojs_configs.db_prefix + "users_full_name as users_full_name, " + 
	ojs_configs.db_prefix + "users_password as users_password, " + 
	ojs_configs.db_prefix + "users_password_lost as users_password_lost, " + 
	ojs_configs.db_prefix + "users_first_name as users_first_name, " + 
	ojs_configs.db_prefix + "users_last_name as users_last_name, " + 
	ojs_configs.db_prefix + "users_adress as users_adress, " + 
	ojs_configs.db_prefix + "users_phone as users_phone, " + 
	ojs_configs.db_prefix + "users_email as users_email, " + 
	ojs_configs.db_prefix + "users_users_type_id as users_users_type_id, " + 	
	ojs_configs.db_prefix + "users_router_version as users_router_version, " + 
	ojs_configs.db_prefix + "users_view_version as users_view_version, " + 
	ojs_configs.db_prefix + "users_js_css_version as users_js_css_version, " + 
	ojs_configs.db_prefix + "users_api_version as users_api_version, " + 	


	ojs_configs.db_prefix + "users_shipping_status as users_shipping_status, " + 
	ojs_configs.db_prefix + "users_verification_status as users_verification_status, " + 
	ojs_configs.db_prefix + "users_verification_code as users_verification_code, " + 
	ojs_configs.db_prefix + "users_verification_time as users_verification_time, " +

	ojs_configs.db_prefix + "users_type_ID as users_type_ID, " + 
	ojs_configs.db_prefix + "users_type_name as users_type_name, " + 
	ojs_configs.db_prefix + "users_type_infomation as users_type_infomation ";



	

	

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "users " ;
	
	
	
	
//@
//@
//@
//@link	
var sql_link_default = 	" " +
	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "users_type  ON  " + 
		ojs_configs.db_prefix +  "users_users_type_id = " + 
		ojs_configs.db_prefix +  "users_type_ID  " ;		
		
		
//@
//@
//@
//@order
var sql_order_default = " order by " + 
	
	ojs_configs.db_prefix + "users_date_created DESC " ;
	
	


//@
//@
//@
//@link	 search
var sql_link_search = 	" " + 

	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "users_type  ON  " + 
		ojs_configs.db_prefix +  "users_users_type_id = " + 
		ojs_configs.db_prefix +  "users_type_ID  " ;


var sql_link_search_bussiness = 	" " + 

	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "users_type  ON  " + 
		ojs_configs.db_prefix +  "users_users_type_id = " + 
		ojs_configs.db_prefix +  "users_type_ID  " + 
		
	" LEFT JOIN " + 
		ojs_configs.db_prefix +  "stores  ON  " + 
		ojs_configs.db_prefix +  "users_ID  = " + 
		ojs_configs.db_prefix +  "stores_user_id  " ;
	
		
//@@
//@@
//@@
//@@
//@@
//@@
//1. [insert_users]
//@
const insert_users = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "users  SET ?";
	let dataGo = {
		"users_full_name"					: mysql.escape(datas.users_full_name).replace(/^'|'$/gi, ""),
		"users_password"					: md5(datas.users_password),
		"users_password_lost"				: md5(datas.users_password_lost),		
		"users_first_name"					: mysql.escape(datas.users_first_name).replace(/^'|'$/gi, ""),	
		"users_last_name"					: mysql.escape(datas.users_last_name).replace(/^'|'$/gi, ""),
		"users_adress"						: mysql.escape(datas.users_adress).replace(/^'|'$/gi, ""),
		"users_phone"						: mysql.escape(datas.users_phone).replace(/^'|'$/gi, ""),	
		"users_email"						: mysql.escape(datas.users_email).replace(/^'|'$/gi, ""),
		"users_users_type_id"				: datas.users_users_type_id,
		
		"users_router_version"				: mysql.escape(datas.users_router_version).replace(/^'|'$/gi, ""),			
		"users_view_version"				: mysql.escape(datas.users_view_version).replace(/^'|'$/gi, ""),
		"users_js_css_version"				: mysql.escape(datas.users_js_css_version).replace(/^'|'$/gi, ""),			
		"users_api_version"					: mysql.escape(datas.users_api_version).replace(/^'|'$/gi, ""),
		
		"users_shipping_status"				: mysql.escape(datas.users_shipping_status).replace(/^'|'$/gi, ""),			
		"users_verification_status"			: mysql.escape(datas.users_verification_status).replace(/^'|'$/gi, ""),
		"users_verification_code"			: mysql.escape(datas.users_verification_code).replace(/^'|'$/gi, "")		
	}

	let kes = Object.keys(dataGo);
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
		return  { "error" : "models->users->error_number : 1 ", "message" : error } ;
	}

};
//@@
//1. end of insert_users	
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//2. [login]
//@
const login = async function (datas) {

	//@
	//@
	// check data user login type
	//@
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	if (regex.test(name_check)) {
		//@
		//if data type là email
		var sql_text = 	"SELECT " + sql_select_all +
			sql_from_default + 
			sql_link_default +
			"where " + ojs_configs.db_prefix + "users_email = '" + name_check + "' " + 
			"and " + ojs_configs.db_prefix + "users_password = '" + md5(datas.users_password) + "'";


	} else {
		//@
		//if data type là phone
		var sql_text = 	"SELECT " + sql_select_all +
			sql_from_default + 
			sql_link_default +
			"where " + ojs_configs.db_prefix + "users_phone = '" + name_check + "' " + 
			"and " + ojs_configs.db_prefix + "users_password = '" + md5(datas.users_password) + "'";
	}
	
	//return sql_text;
	//@
	//@
	//run sql
	return new Promise( (resolve,reject) => {
		connection.query( { sql:sql_text, timeout: 20000 } , ( err , results , fields ) => {
			if( err ) reject(err);
			resolve(results);
		} );
	} );

};//end of function login

//2. end of [login]

//@@
//@@
//2.1 [login_lost]
//@
const login_lost = async function (datas) {

	//@
	//@
	// check data user login type
	//@
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	if (regex.test(name_check)) {
		//@
		//if data type là email
		var sql_text = 	"SELECT " + sql_select_all +
			sql_from_default + 
			sql_link_default +
			"where " + ojs_configs.db_prefix + "users_email = '" + name_check + "' " + 
			"and " + ojs_configs.db_prefix + "users_password_lost = '" + md5(datas.users_password) + "'";


	} else {
		//@
		//if data type là phone
		var sql_text = 	"SELECT " + sql_select_all +
			sql_from_default + 
			sql_link_default +
			"where " + ojs_configs.db_prefix + "users_phone = '" + name_check + "' " + 
			"and " + ojs_configs.db_prefix + "users_password_lost = '" + md5(datas.users_password) + "'";
	}
	
	
	//return sql_text;
	
	//@
	//@
	//run sql
	return new Promise( (resolve,reject) => {
		connection.query( { sql:sql_text, timeout: 20000 } , ( err , results , fields ) => {
			if( err ) reject(err);
			resolve(results);
		} );
	} );

};//end of function login

//2.1 end of [login]




//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
// 3.  [get_all_users]
var get_all_users = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all +
					sql_from_default  + 
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
		return  { "error" : "models_users->get_all_users->error_number : 1", "message" : error } ;
	}
};




//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//4.  [get_one_users]
const get_one_users = async function (user_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
					ojs_configs.db_prefix + "users_ID = '" + user_id + "' " 
	
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
		return  { "error" : "models_users->get_one_users->error_number : 1", "message" : error } ;
	}
};

//4. end of  [get_one_users]






//@@
//@@
//@@
//@@
//@@
//@@
//5.  [update_users]
const update_users = async function (datas,user_id) {
	
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
		
		//thay md5 cho passs
		if(item == "users_password"){
			arrValueDatas[i] = md5(arrValueDatas[i]);
		}
		
		
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


	let table_name  = ojs_configs.db_prefix + "users ";
	let field_where  = ojs_configs.db_prefix + "users_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_id + '"';
	
	
	//return sql_text;
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "models_users->update_users->error_number : 1", "message" : error } ;
	}
};
//@
//5. end of  [update_users ]




//@
//@
//@
//@
//5.1 [update_lost_password]
const update_lost_password = async function (datas) {
	
	//@
	//@
	// check data user login type
	//@
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	if (regex.test(name_check)) {
		//@
		//if data type là email
		var sql_text = 	"UPDATE " + 
			ojs_configs.db_prefix + "users set " + 
			ojs_configs.db_prefix + "users_password_lost = '" + 
			md5(datas.users_password) + "' " + 
			"where " + ojs_configs.db_prefix + "users_email = '" + datas.users_login_name + "' " ;


	} else {
		//@
		//if data type là phone
		var sql_text = 	"UPDATE " + 
			ojs_configs.db_prefix + "users set " + 
			ojs_configs.db_prefix + "users_password_lost = ' " + 
			md5(datas.users_password) + "' " + 
			"where " + ojs_configs.db_prefix + "users_phone = '" + datas.users_login_name + "' " ;
	}
	
	
	//return [sql_text];
	
	//@
	//@
	//run sql
	return new Promise( (resolve,reject) => {
		connection.query( { sql:sql_text, timeout: 20000 } , ( err , results , fields ) => {
			if( err ) reject(err);
			resolve(results);
		} );
	} );

};
//@
//5.1 end of  [update_lost_password]

















//@@
//@@
//@@
//@@
//@@
//@@
//6.  [search_email]
const search_email = async function (email) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
					ojs_configs.db_prefix + "users_email = '" + email + "' " 
	
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
		return  { "error" : "models_users->search_email->error_number : 1", "message" : error } ;
	}
};

//6. end of  [search_email]


//@@
//@@
//@@
//@@
//@@
//@@
//6.  [search_phone]
const search_phone = async function (phone) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
					ojs_configs.db_prefix + "users_phone = '" + phone + "' " 
	
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
		return  { "error" : "models_users->search_phone->error_number : 1", "message" : error } ;
	}
};

//6. end of  [search_phone]





//@@
//@@
//@@
//@@
//@@
//@@
//7.  [update_users_email]
const update_users_email = async function (datas,user_id) {
	
	//@
	//@
	//@
	var table_name  = ojs_configs.db_prefix + "users ";
	var field_where  = ojs_configs.db_prefix + "users_ID ";
	var sqlSet = " " + ojs_configs.db_prefix + "users_password_lost = '" + md5(datas.users_password) + "'" ;
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_id + '"';
	
	
	//return sql_text;
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "models_users->update_users_email->error_number : 1", "message" : error } ;
	}
};
//@
//7. end of  [update_users_email ]


//@@
//@@
//@@
//@@
//@@
//@@
//7.1  [update_users_phone]
const update_users_phone = async function (n_password,phone) {
	//@
	//@

	var table_name  = ojs_configs.db_prefix + "users ";
	var field_where  = ojs_configs.db_prefix + "users_phone ";
	var sqlSet = " " + ojs_configs.db_prefix + "users_password_lost = '" + md5(n_password) + "'" ;
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ phone + '"';
	
	//@
	//return [sql_text];
	
	
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
		return  { "error" : "models_users->update_users_phone->error_number : 1", "message" : error } ;
	}
};
//@
//@
//7.1 end of [update_users_phone]







//@@
//@@
//@@
//@@
//@@
//@@
// * 8. [search]
const search = async function (datas) {
	

	//@
	//@
	//@
	//@ lấy oject search	
	var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);	
	//return  get_sql_search;
	//@
	//@
	//@
	var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);	
	

	
	
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
		return  { "error" : "model_users->search->error_number: 1", "message" : error } ;
	}

};

// * end of 8. [search]	
	



//@@
//@@
//@@
//@@
//@@
//@@
// * 8.1. [search_bussiness]
const search_bussiness = async function (datas) {
	

	//@
	//@
	//@
	//@ lấy oject search	
	var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);	
	//return  get_sql_search;
	//@
	//@
	//@
	var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search_bussiness);	
	

	
	
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
		return  { "error" : "model_users->search->error_number: 1", "message" : error } ;
	}

};

// * end of 8. [search]	




//
//@
//@
//@
//@
//. 9. [get_role]
// lấy role text (admin, default .... )
async function get_role(datas_check) {
	

	//@
	//@
	//decode token
	try {
		var users_decode = jwt.decode(datas_check.datas.token);
		if(typeof users_decode.users_ID == 'number' && users_decode.users_ID){
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi decode token -> get_role" );
			return { "error" : "model_users->get_role->error_number : 1", "message": error_send } ; 
		}
	}
	catch (error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi decode token -> get_role" );
		return{ "error" : "model_users->get_role->error_number : 2", "message": error_send } ; 

	}	
	
	//return{ "error" : "", "message": users_decode.users_ID} ; 	

	//@
	//@
	//lấy datauser từ database
	//lấy role
	try {
		var users_data = await get_one_users(users_decode.users_ID);
		
		//return{ "error" : "", "message": users_data} ; 
		
		var users_role = ojs_shares_others.check_role(users_data[0].users_type_infomation);
		return { "error": "", "message": users_role };
	}
	catch (error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		return{  "error" : "model_users->get_role->get_one_users->error_number : 4", "message": error_send } ; 
	}		
}

//@
//@ end of 9.


	
	
	
	
	
//
//@
//@
//@
//@
//* 10. [get_owner_user]
// kiểm tra user token va userid chủ sở hữu user
async function get_owner_user(datas_check) {
	//return{ "error" : "", "resule": datas_check } ; 
	//@
	//@
	//decode token
	try {
		var users_decode = jwt.decode(datas_check.datas.token);
		
		//return{ "error" : "", "resule": users_decode } ; 
		
		if(typeof users_decode.users_ID == 'number' && users_decode.users_ID){
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi decode token -> get_owner_user" );
			return { "error" : "model_users->get_owner_user->error_number : 1", "message": error_send } ; 
		}
	}
	catch (error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi decode token -> get_owner_user" );
		return{ "error" : "model_users->get_owner_user->error_number : 2", "message": error_send } ; 

	}	
	
	//@
	//@
	//so sành 2 user_id nếu = nhau thì return 1 khong = nhau thi return 0
	//
	

	
	if(users_decode.users_ID == datas_check.datas.user_id){
		return { "error" : "", "datas": "1" } ; 
	}else{
		return{ "error" : "", "datas": "0" } ; 
	}


}
//* end of 10. [get_owner_user]
	
	







//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//10.  [delete_users]
var delete_users = async function (user_id) {

	let table_name  = ojs_configs.db_prefix + "users ";
	let field_where  = ojs_configs.db_prefix + "users_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ user_id + '"';
	
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

//10. end of [delete_users]








//export module
module.exports = { 
	login ,
	login_lost,
	search,
	get_all_users,
	get_one_users,
	update_users,
	insert_users,
	delete_users,
	search_email,
	search_phone,
	update_users_email,
	get_role,
	get_owner_user,
	update_lost_password,
	update_users_phone,
	search_bussiness
};
