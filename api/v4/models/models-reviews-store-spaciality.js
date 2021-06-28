


/*



* 1. [insert_reviews_store_spaciality]

* 2. [get_all_reviews_store_spaciality]

* 3. [get_one_reviews_store_spaciality]

* 4. [update_reviews_store_spaciality]

* 5. [delete_reviews_store_spaciality]

* 5. [search]

* 7. [get_check_reviews_store_insert]

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
	ojs_configs.db_prefix  + "reviews_store_speciality_ID as reviews_store_speciality_ID, " + 
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "reviews_store_speciality_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as reviews_store_speciality_date_created, " + 	
	ojs_configs.db_prefix  + "reviews_store_speciality_user_id as reviews_store_speciality_user_id, " + 
	ojs_configs.db_prefix  + "reviews_store_speciality_store_id as reviews_store_speciality_store_id, " + 
	ojs_configs.db_prefix  + "reviews_store_speciality_contents as reviews_store_speciality_contents, " + 
	ojs_configs.db_prefix  + "reviews_store_speciality_status_admin as reviews_store_speciality_status_admin, " +  
	ojs_configs.db_prefix  + "reviews_store_speciality_number_star as reviews_store_speciality_number_star " ;




//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "reviews_store_speciality ";
	
	
	
	
	
//link table	
var sql_link_default = 	""; 
var sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "reviews_store_speciality_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "reviews_store_speciality_store_id  = " + 
	ojs_configs.db_prefix + "stores_ID " ;	





//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "reviews_store_speciality_date_created DESC " ;
	
	

	
	
	
	
	
//@
//@
//@
//@
//@
//@
//@ 1. [insert_reviews_store_spaciality]	
const insert_reviews_store_spaciality = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "reviews_store_speciality  SET ?";
	let dataGo = {
			"reviews_store_speciality_user_id"					: datas.reviews_store_speciality_user_id,	
			"reviews_store_speciality_store_id"					: datas.reviews_store_speciality_store_id,	
			"reviews_store_speciality_contents"					: mysql.escape(datas.reviews_store_speciality_contents).replace(/^'|'$/gi, ""),
			"reviews_store_speciality_status_admin"				: datas.reviews_store_speciality_status_admin,
			"reviews_store_speciality_number_star"				: datas.reviews_store_speciality_number_star					
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
		return  { "error" : " moedel reviews -> store -> insert -> error : 1", "message" : error } ;
	}

};	
//@ end of
//@ 1. [insert_reviews_store_spaciality]		
	
	
	
	
	
	
//@
//@
//@
//@
//@
//@
//@ 2. [get_all_reviews_store_spaciality]
const get_all_reviews_store_spaciality = async function () {
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
		return  { "error" : " moedel reviews store -> store -> get_all -> error : 1 ", "message" : error } ;
	}
};
//@ end of
//@ 2. [get_all_reviews_store_spaciality]
	
	
	
	
	
//@
//@
//@
//@
//@
//@
//@ 3. [get_one_reviews_store_spaciality]
const get_one_reviews_store_spaciality = async function (review_store_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					" where " + 
 					ojs_configs.db_prefix + "reviews_store_speciality_ID = '" + review_store_id + "' " + 
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
		return  { "error" : " moedel reviews -> store -> get_all -> error : 2 ", "message" : error } ;
	}
};
//@ end of
//@ 3. [get_one_reviews_store_spaciality]	
	
	
	
	
//@
//@
//@
//@
//@
//@
//@ 4. [get_one_reviews_store_spaciality]
const update_reviews_store_spaciality = async function (datas,review_store_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "reviews_store_speciality ";
	let field_where  = ojs_configs.db_prefix + "reviews_store_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ review_store_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : " moedel reviews -> store -> store -> update -> error : 1 ", "message" : error } ;
	}
};
//@ end of
//@ 4. [get_one_reviews_store_spaciality]	
	
	
	
	
	
	
	
	
	

//@
//@
//@
//@
//@
//@
// 5. [search]
const search = async function (datas) {
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	}
	catch(error){
		return  { "error" : "model-review-storespeciality->search->error-nymber : 3", "message" : error } ;
	}	




	//return {get_sql_search_group};
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
		return  { "error" : "model-review-store-speciality->search->error_number:1", "message" : error } ;
	}
};

//@ end  of
// 6. [search]	
	
		
	



//@
//@
//@
//@
//@
//@
// 6. [delet_reviews_insert]
const delete_reviews_store_spaciality = async function (review_store_id) {

	let table_name  = ojs_configs.db_prefix + "reviews_store_speciality ";
	let field_where  = ojs_configs.db_prefix + "reviews_store_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ review_store_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-review-store-speciality->delete->error_number:1", "message" : error } ;
	}
};
//@ end of
// 6. [delet_reviews_insert]





//@
//@
//@
// 7. [get_check_reviews_store_insert]
const get_check_reviews_store_insert = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "reviews_store_speciality_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "reviews_store_speciality_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "reviews_store_speciality_store_id  = '" + datas.datas.store_id + "' " 
	
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
		return  { "error" : "models_reviews->get_check_store-reviews_insert->error_number : 1", "message" : error } ;
	}
};

// 7. [get_check_reviews_store_insert]




//@
//@
//@
//@
//@
//@
// 8. [get_owner_review_sote]
const get_owner_review_store = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "reviews_store_speciality_ID  "  + 
					sql_from_default + 
					sql_link_default + 
						
					" WHERE " +  
							ojs_configs.db_prefix + "reviews_store_speciality_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "reviews_store_speciality_ID  = '" + datas.datas.review_store_id + "' " 
	
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
		return  { "error" : "models_reviews-store>get_owner_review->error_number : 1", "message" : error } ;
	}
};

// 8. [get_owner_review_store]





//@
//@
//@
// 9. [get_check_reviews_buy]
const get_check_reviews_store_buy = async function (datas) {
	//return datas;
	//create sql text
	let sql_text = 	" SELECT " +  ojs_configs.db_prefix  + "orders_details_speciality_ID  "  + 
					" from " + 
					ojs_configs.db_prefix  + "orders_details_speciality" + 		
					
					" LEFT JOIN " + 
					ojs_configs.db_prefix + "orders_speciality  ON  " + 
					ojs_configs.db_prefix + "orders_details_speciality_order_id  = " + 
					ojs_configs.db_prefix + "orders_speciality_ID " + 

					" LEFT JOIN " + 
					ojs_configs.db_prefix + "products_speciality  ON  " + 
					ojs_configs.db_prefix + "orders_details_speciality_product_id  = " + 
					ojs_configs.db_prefix + "products_speciality_ID " + 

					" WHERE " +  
							ojs_configs.db_prefix + "orders_speciality_user_id = '" + datas.datas.user_id + "' "  + 
							" AND " + 
							ojs_configs.db_prefix + "products_speciality_store_id  = '" + datas.datas.store_id + "' " 
	
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
		return  { "error" : "models_store-reviews->get_check_reviews_buy->error_number : 1", "message" : error } ;
	}
};

// 9. [get_check_reviews_buy]



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_reviews_store_spaciality,
	get_one_reviews_store_spaciality,
	update_reviews_store_spaciality,
	insert_reviews_store_spaciality,
	delete_reviews_store_spaciality,
	search,
	get_check_reviews_store_insert,
	get_owner_review_store,
	get_check_reviews_store_buy
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














