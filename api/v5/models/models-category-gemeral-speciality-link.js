
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
var mysql = require('mysql');


//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');


//from table
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "category_general_speciality_link_ID as category_general_speciality_link_ID, " + 
	ojs_configs.db_prefix  + "category_general_speciality_link_product_id as category_general_speciality_link_product_id, " + 
	ojs_configs.db_prefix  + "category_general_speciality_link_category_general_id as category_general_speciality_link_category_general_id " 


//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_general_speciality_link " 
	
//link table	
let sql_link_default = 	" " ;


let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "category_general_speciality_link_product_id ASC, " +  
	ojs_configs.db_prefix + "category_general_speciality_link_category_general_id ASC " 
	
	
//link search
let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "category_general_speciality  ON  " + 
	ojs_configs.db_prefix + "category_general_speciality_link_category_general_id  = " + 
	ojs_configs.db_prefix + "category_general_speciality_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "products_speciality  ON  " + 
	ojs_configs.db_prefix + "category_general_speciality_link_product_id  = " + 
	ojs_configs.db_prefix + "products_speciality_ID " 	





//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_category_general_speciality_link = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "category_general_speciality_link  SET ?";
	let dataGo = {
			"category_general_speciality_link_product_id"				: datas.category_general_speciality_link_product_id,
			"category_general_speciality_link_category_general_id"		: datas.category_general_speciality_link_category_general_id
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
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
		return  { "error" : "m_13", "message" : error } ;
	}

};
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//update
var update_category_general_speciality_link = async function (datas,link_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_link_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ link_id + '"';
	
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

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var delete_category_general_speciality_link = async function (link_id) {

	let table_name  = ojs_configs.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_link_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ link_id + '"';
	
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

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//delete theo product
var delete_category_general_speciality_link_product = async function (product_id) {

	let table_name  = ojs_configs.db_prefix + "category_general_speciality_link ";
	let field_where  = ojs_configs.db_prefix + "category_general_speciality_link_product_id ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ product_id + '"';
	
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





//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_category_general_speciality_link = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
	//@
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
		return  { "error" : "m_13", "message" : error } ;
	}
};

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_one_category_general_speciality_link = async function (link_id) {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "category_general_speciality_link_ID = '" + link_id + "' " + 
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


//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var check_category_link = async function ( product_id ) {
	//create sql text
	let sql_text = 	"SELECT " + ojs_configs.db_prefix + "category_general_speciality_link_ID " + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "category_general_speciality_link_product_id = '" + product_id + "' " 
	//@
	//return ({"error" : "a" , "datas": sql_text })
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




//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
var search = async function (datas) {
	//@
		
	//@
	//@
	//@
	//@ghep data	
	let get_sql_search  = ojs_shares.get_sql_search(datas,sql_select_all);
	//@
	//@
	//@
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);	

	
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




/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_category_general_speciality_link,
	insert_category_general_speciality_link,
	update_category_general_speciality_link,
	delete_category_general_speciality_link,
	get_one_category_general_speciality_link,
	search,
	check_category_link,
	delete_category_general_speciality_link_product
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/













