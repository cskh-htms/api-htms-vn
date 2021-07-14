/*

* 1. [insert_ordres_spaciality_details]

* 2. [update_ordres_spaciality_details]

* 3. [delete_ordres_spaciality_details]



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




///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



	
	
	
//@
//@
//@
//@
//@
//@
//@ * 1. [insert_orders_spaciality_detail]
const insert_orders_spaciality_detail = async function (datas) {
	//@
	//@
	//@
	//@
	//return datas;
	//@
	var sql_text = "INSERT INTO " + ojs_configs.db_prefix + "orders_details_speciality  SET ?";
	var dataGo = {

			"orders_details_speciality_order_id"			: datas.orders_details_speciality_order_id,
			"orders_details_speciality_line_order"			: datas.orders_details_speciality_line_order,		
			"orders_details_speciality_product_id"			: datas.orders_details_speciality_product_id,	
			"orders_details_speciality_qty"					: datas.orders_details_speciality_qty,
			"orders_details_speciality_price"				: datas.orders_details_speciality_price,
			"orders_details_medium_text"					: datas.orders_details_medium_text
	}
	
	
	//@
	//@
	//@
	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
	}
	
	//return sql_text;
	//@
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
		return  { "error" : "model->orders_details_speciality->insert-> error : 1", "message" : error } ;
	}

};
//@
//@ end of * 1. [insert_orders_spaciality_detail]





//@
//@
//@
//@
//@
//@ * 2. [update_orders_spaciality_detail]
const update_orders_spaciality_detail = async function (datas,detail_id) {
	
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


	let table_name  = ojs_configs.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_details_speciality_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ detail_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->orders_details_speciality->update-> error : 1", "message" : error } ;
	}
};
//@
//@ end of  * 2. [update_orders_spaciality_detail]






//@
//@
//@
//@
//@
//@  * 3. [delete_orders_spaciality_detail]
const delete_orders_spaciality_detail = async function (detail_id) {

	let table_name  = ojs_configs.db_prefix + "orders_details_speciality ";
	let field_where  = ojs_configs.db_prefix + "orders_details_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ detail_id + '"';
	
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
//@
//@ end of  * 3. [delete_orders_spaciality_detail]


/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	update_orders_spaciality_detail,
	insert_orders_spaciality_detail,
	delete_orders_spaciality_detail
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














