/*



* 1. [insert_brands]

* 2. [get_all_brands]

* 3. [get_one_brands]

* 4. [update_brands]

* 5. [delete_brands]

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




/////////////////////////////////////////////////////////////////////////////////////////////








var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "brands_ID as brands_ID, " + 
	ojs_configs.db_prefix  + "brands_name as brands_name, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "brands_date_created,'%Y/%m/%d %H:%i:%s') as brands_date_created, " + 	
	
	ojs_configs.db_prefix  + "brands_featured_image as brands_featured_image, " + 
	ojs_configs.db_prefix  + "brands_information as brands_information, " + 
	ojs_configs.db_prefix  + "brands_excerpt as brands_excerpt, " + 
	
	ojs_configs.db_prefix  + "brands_status_admin as brands_status_admin, " + 
	ojs_configs.db_prefix  + "brands_status_stores as brands_status_stores, " + 	
	ojs_configs.db_prefix  + "brands_status_update as brands_status_update, " + 
	
	ojs_configs.db_prefix  + "brands_stores_id as brands_stores_id, " + 
	ojs_configs.db_prefix  + "brands_qoute as brands_qoute ";
	
	
	

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "brands "  ;
	
//link table	
var sql_link_default = 	"";
var sql_link_search = 	"" + 
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "brands_stores_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "service_type  ON  " + 
	ojs_configs.db_prefix + "stores_service_type_id  = " + 
	ojs_configs.db_prefix + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " 



//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "brands_date_created DESC, " + 
	ojs_configs.db_prefix + "brands_name " ;
	
	

//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 1. [insert_brands]
const insert_brands = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "brands  SET ?";
	let dataGo = {
			"brands_name"						    : mysql.escape(datas.brands_name).replace(/^'|'$/gi, ""),
			"brands_featured_image"					: mysql.escape(datas.brands_featured_image).replace(/^'|'$/gi, ""),

			"brands_information"					: mysql.escape(datas.brands_information).replace(/^'|'$/gi, ""),			
			"brands_excerpt"						: mysql.escape(datas.brands_excerpt).replace(/^'|'$/gi, ""),		
	
			"brands_status_stores"					: datas.brands_status_stores,
			"brands_status_admin"					: datas.brands_status_admin,
			"brands_status_update"					: datas.brands_status_update,
			
			"brands_stores_id"						: datas.brands_stores_id,
			"brands_qoute"							: mysql.escape(datas.brands_qoute).replace(/^'|'$/gi, "")			
			
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
		return  { "error" : "model->brands->insert->error_number : 1", "message" : error } ;
	}

};

//@@ end of  * 1. [insert_brands]








//@@
//@@
//@@
//@@
//@@
//@@
//@ * 2.[get_all_brands]
const get_all_brands = async function () {
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
		return  { "error" : "model-brands->get-all->error-nymber : 2", "message" : error } ;
	}
};


//@ *end of  2.[get_all_brands]





//@
//@
//@
// 3. [get_owner_brand]
const get_owner_brand = async function (datas) {
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "brands_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "users_ID = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "brands_ID  = '" + datas.datas.brand_id + "' " 
	
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
		return  { "error" : "models_brands->get_owner_option->error_number : 1", "message" : error } ;
	}
};

// 3. [get_owner_brand]




//@
//@
//@
//@
// 4. [get_one_brand]
var get_one_brands = async function (option_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "brands_ID = '" + option_id + "' " + 
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
		return  { "error" : "model-brands->get_one->error-nymber : 2", "message" : error } ;
	}
};
//@
// 4. end of [get_one_brand]



//@
//@
//@
//@
// 5. [update_brand]
const update_brands = async function (datas,option_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "brands ";
	let field_where  = ojs_configs.db_prefix + "brands_ID ";
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
		return  { "error" : "model-brands->update->error-nymber : 2", "message" : error } ;
	}
};

//@
//@ end of  5. [update_brand]













//@
//@
//@
//@
//@
//@ 6. [delete_brand]
const delete_brands = async function (brand_id) {

	let table_name  = ojs_configs.db_prefix + "brands ";
	let field_where  = ojs_configs.db_prefix + "brands_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ brand_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-brands->delete->error-number : 1", "message" : error } ;
	}
};
//@
//@ end of 6. [delete_brand]








//@
//@
//@
//@
//@
//@ 6. [search]
const search = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	}
	catch(error){
		return  { "error" : "model-brands->search->error-nymber : 3", "message" : error } ;
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
		return  { "error" : "model-brands->search->error-nymber : 2", "message" : error } ;
	}

};



//@
//@
//@
//@
//@
//@ end of 6. [search]

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_brands,
	get_one_brands,
	update_brands,
	insert_brands,
	delete_brands,
	search,
	get_owner_brand
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














