
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




let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "brands_ID as brands_ID, " + 
	ojs_configs.db_prefix  + "brands_name as brands_name, " + 
	ojs_configs.db_prefix  + "brands_featured_image as brands_featured_image, " + 
	ojs_configs.db_prefix  + "brands_information as brands_information, " + 
	ojs_configs.db_prefix  + "brands_excerpt as brands_excerpt, " + 
	ojs_configs.db_prefix  + "brands_status_admin as brands_status_admin, " + 
	ojs_configs.db_prefix  + "brands_status_stores as brands_status_stores, " + 	
	ojs_configs.db_prefix  + "brands_status_update as brands_status_update, " + 
	ojs_configs.db_prefix  + "brands_stores_id as brands_stores_id, " + 
	ojs_configs.db_prefix  + "brands_qoute as brands_qoute " 	

//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "brands "  ;
	
//link table	
let sql_link_default = 	"" ;


let sql_link_search = 	""  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "stores  ON  " + 
	ojs_configs.db_prefix + "brands_stores_id  = " + 
	ojs_configs.db_prefix + "stores_ID " +    
	
	" LEFT JOIN " + 
	ojs_configs.db_prefix + "users  ON  " + 
	ojs_configs.db_prefix + "stores_user_id  = " + 
	ojs_configs.db_prefix + "users_ID " 

//link table	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "brands_name " ;
	
	
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
var insert_brands = async function (datas) {
	//@
	let sql_text = "INSERT INTO " + ojs_configs.db_prefix + "brands  SET ?";
	let dataGo = {
			"brands_name"						    : mysql.escape(datas.brands_name).replace(/^'|'$/gi, ""),
			"brands_excerpt"						: mysql.escape(datas.brands_excerpt).replace(/^'|'$/gi, ""),		
			"brands_information"					: mysql.escape(datas.brands_information).replace(/^'|'$/gi, ""),	
			"brands_featured_image"					: mysql.escape(datas.brands_featured_image).replace(/^'|'$/gi, ""),
			"brands_qoute"							: mysql.escape(datas.brands_qoute).replace(/^'|'$/gi, ""),
			"brands_status_stores"					: datas.brands_status_stores,
			"brands_status_admin"					: datas.brands_status_admin,
			"brands_status_update"					: datas.brands_status_update,
			"brands_stores_id"						: datas.brands_stores_id,			
			
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
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_brands = async function () {
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
var update_brands = async function (datas,option_id) {
	
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
var delete_brands = async function (option_id) {

	let table_name  = ojs_configs.db_prefix + "brands ";
	let field_where  = ojs_configs.db_prefix + "brands_ID ";
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
	let get_sql_search  = ojs_shares.get_sql_search(datas,sql_select_all);
	let get_sql_search_group  = ojs_shares.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
					
	//@
					
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
	get_all_brands,
	get_one_brands,
	update_brands,
	insert_brands,
	delete_brands,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














