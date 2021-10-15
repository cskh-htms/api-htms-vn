
/*

* 1. [insert_adress_meta]

* 2. [get_all_adress_meta]

* 3. [get_one_adress_meta]

* 4. [update_adress_meta]

* 5. [delete_adress_meta]



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
	ojs_configs.db_prefix  + "adress_meta_ID as adress_meta_ID, " + 
	ojs_configs.db_prefix  + "adress_meta_user_id as adress_meta_user_id, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "adress_meta_date_created,'%Y/%m/%d %H:%i:%s') as adress_meta_date_created, " +	
	
	ojs_configs.db_prefix  + "adress_meta_province as adress_meta_province, " + 
	ojs_configs.db_prefix  + "adress_meta_district as adress_meta_district, " + 
	ojs_configs.db_prefix  + "adress_meta_wards as adress_meta_wards, " + 
	ojs_configs.db_prefix  + "adress_meta_street as adress_meta_street, " + 	
	
	ojs_configs.db_prefix  + "adress_meta_full_adress as adress_meta_full_adress, " + 
	ojs_configs.db_prefix  + "adress_meta_status as adress_meta_status "; 	
	

//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "adress_meta "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "adress_meta_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " ;
	
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "adress_meta_date_created DESC " ;
	
	
	

//@
//@
//@
//@
//@ * 1. [insert_adress_meta]
const insert_adress_meta = async function (datas) {
	
	//@
	//@
	//@
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "adress_meta  SET ?";
	var dataGo = {
			"adress_meta_user_id"					: datas.adress_meta_user_id,	
			"adress_meta_province"					: mysql.escape(datas.adress_meta_province).replace(/^'|'$/gi, ""),
			"adress_meta_district"					: mysql.escape(datas.adress_meta_district).replace(/^'|'$/gi, ""),
			"adress_meta_wards"						: mysql.escape(datas.adress_meta_wards).replace(/^'|'$/gi, ""),
			"adress_meta_street" 					: mysql.escape(datas.adress_meta_street).replace(/^'|'$/gi, ""),			
			"adress_meta_full_adress" 				: mysql.escape(datas.adress_meta_full_adress).replace(/^'|'$/gi, ""),
			"adress_meta_status" 					: mysql.escape(datas.adress_meta_status).replace(/^'|'$/gi, "")
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
		return  { "error" : "1", "position":"md-adress-meta->insert", "message" : error } ;
	}

};

//@ end of * 1. [insert_adress_meta]





//@@
//@@
//@@
//@@
//@ * 2. [get_all_adress_meta]
const get_all_adress_meta = async function () {
	
	
	
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
		return  { "error" : "1", "position":"md-adress-meta->get all", "message" : error } ;
	}
};



//@ end of * 2. [get_all_adress_meta]



//@
//@
//@
//@
//@
//@ * 3. [get_one_adress_meta]
const get_one_adress_meta = async function (adress_meta_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " +  
					ojs_configs.db_prefix + "adress_meta_ID = '" + adress_meta_id + "' "				
	
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
		return  { "error" : "1", "position":"md-adress-meta->get one", "message" : error } ;
	}
};

//@ * end of  3. [get_one_adress_meta]



//@
//@
//@
//@
//@* 4. [update_adress_meta]
const update_adress_meta = async function (datas,adress_meta_id) {
	var sql_text = "";
	///sql_text = "START TRANSACTION ;"
	///sql_text = sql_text + "INSERT INTO " + ojs_configs.db_prefix + "products_speciality  SET ? ;";
	///sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";
	///sql_text = sql_text + " COMMIT;"		
	var table_name  = ojs_configs.db_prefix + "adress_meta ";



	sql_text = sql_text + "START TRANSACTION ;"
	sql_text = sql_text +  	" UPDATE " + table_name +
							" SET " + 
							ojs_configs.db_prefix + "adress_meta_status = 0 " + 
							" where " + 
							ojs_configs.db_prefix + "adress_meta_user_id = " + datas.adress_meta_user_id + "; ";
	
	
	sql_text = sql_text +  	" UPDATE " + table_name +
							" SET " + 
							ojs_configs.db_prefix + "adress_meta_status = 1 " + 
							" where " + 
							ojs_configs.db_prefix + "adress_meta_ID = " + adress_meta_id + "; ";	

	sql_text = sql_text + " COMMIT;"	


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
		return  { "error" : "1", "position":"md-adress-meta->update", "message" : error } ;
	}
};



//@* end of 4. [update_adress_meta]


//@
//@
//@
//@
//@* 5. [delete_adress_meta]
const delete_adress_meta = async function (adress_meta_id) {

	var table_name  = ojs_configs.db_prefix + "adress_meta ";
	var field_where  = ojs_configs.db_prefix + "adress_meta_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ adress_meta_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "position":"md-adress-meta->delete", "message" : error } ;
	}
};


//@* end of 5. [delete_adress_meta]




//@
//@
//@
//@
//@* 6. [delete_adress_meta]
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
		return  { "error" : "1", "position":"md-adress-meta->search", "message" : error } ;
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
		return  { "error" : "2", "position":"md-adress-meta->search", "message" : error } ;
	}
};

//@* end of 6. [search]




//@
//@
//@
// 7. [get_owner_adress]
const get_owner_adress = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "adress_meta_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "adress_meta_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "adress_meta_ID  = '" + datas.datas.adress_id + "' " 
	
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
		return  { "error" : "1", "position":"md-adress-meta->get_owner", "message" : error } ;
	}
};

// 7. [get_owner_adress]







//export module
module.exports = {
			search,
			insert_adress_meta,
			get_one_adress_meta,
			update_adress_meta,
			delete_adress_meta,
			get_all_adress_meta,
			get_owner_adress
};

















