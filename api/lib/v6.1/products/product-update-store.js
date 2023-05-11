

const mysql = require('mysql2');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');




const product_update_store = function (datas,product_id,cat_string, option_string,res) {

	//@
	//@
	try{
		if(cat_string){
			//var cat_arr = JSON.parse(cat_string);
			var cat_arr = cat_string;
		}
		if(option_string){
			//var option_arr = JSON.parse(option_string);
			var option_arr = option_string;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product store update, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "lib/products/product update store", 
			"message": error_send 
			}); 
			
	}





	try{	
		var sqlSet = "";
		
		//tao arr key
		var arrDatas = Object.keys(datas);
		
		//tao arr value 
		let arrValueDatas = [];
		let x;
		for (x in datas){
			arrValueDatas.push(datas[x]);
		}	
		var sql_text = "START TRANSACTION ; "

		//
		// sql product update
		//
		let i = 0;
		arrDatas.forEach(function(item) {
			//
			if(arrValueDatas[i]== null){
				if(sqlSet.length == 0){
					sqlSet = config_database.PREFIX + item + '=' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
				}else{
					sqlSet = sqlSet + ',' + config_database.PREFIX + item  + '=' +  mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
				}
			}else{
				if(sqlSet.length == 0){
					sqlSet = config_database.PREFIX + item + '="' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") + '"';
				}else{
					sqlSet = sqlSet + ',' + config_database.PREFIX + item  + '= "' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "")  + '"' ;
				}		
			}

			i = i + 1 ;
		});		


		let table_name  = config_database.PREFIX + "products_speciality ";
		let field_where  = config_database.PREFIX + "products_speciality_ID ";
		//create sql text
		
		sql_text =  sql_text + ' UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ product_id + '" ;';

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/products/product update store", 
			"message": error_send 
			}); 
			
	}	


	//option
	try{
		if(option_string && option_arr.length > 0){	
			var sql_option_all = "";
			var table_name_option  = config_database.PREFIX + "options_product_speciality_link ";
			var field_where_option  = config_database.PREFIX + "options_product_speciality_link_product_id ";	
			var sql_option_delete = 'DELETE FROM ' + table_name_option + ' where ' + field_where_option + ' = "'+ product_id + '" ; ';		
		
			for(let i = 0; i < option_arr.length; i ++){
				
				///ex
				sql_option = "INSERT INTO " + config_database.PREFIX + "options_product_speciality_link  ";
				sql_option = sql_option + "(" +
								config_database.PREFIX + "options_product_speciality_link_product_id" + "," + 
								config_database.PREFIX + "options_product_speciality_link_option_id" + 
							") " + 
							"values(" + 
							product_id + ", " + 
							option_arr[i] + 
							") ; ";		
				sql_option_all	= sql_option_all + 	sql_option		
			}//end of for option_arr	
			
			
			//sql_text = sql_text + sql_option_delete + sql_option_all;
			sql_text = sql_text + sql_option_delete + sql_option_all;
		}else{
			var sql_option_all = "";
			var table_name_option  = config_database.PREFIX + "options_product_speciality_link ";
			var field_where_option  = config_database.PREFIX + "options_product_speciality_link_product_id ";	
			var sql_option_delete = 'DELETE FROM ' + table_name_option + ' where ' + field_where_option + ' = "'+ product_id + '" ; ';		
			
			//sql_text = sql_text + sql_option_delete + sql_option_all;
			sql_text = sql_text + sql_option_delete;		
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product update store option arr, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/products/product update store", 
			"message": error_send 
			}); 
			
	}	



	//cat string
	try{
		if(cat_string && cat_arr.length > 0){	
			var sql_cat_all = "";
			var table_name_cat  = config_database.PREFIX + "category_general_speciality_link ";
			var field_where_cat  = config_database.PREFIX + "category_general_speciality_link_product_id ";
			var sql_cat_delete = 'DELETE FROM ' + table_name_cat + ' where ' + field_where_cat + ' = "'+ product_id + '" ; ';	
		
		
			for(let i = 0; i < cat_arr.length; i ++){
				///ex
				sql_cat = "INSERT INTO " + config_database.PREFIX + "category_general_speciality_link  ";
				sql_cat = sql_cat + "(" +
								config_database.PREFIX + "category_general_speciality_link_product_id" + "," + 
								config_database.PREFIX + "category_general_speciality_link_category_general_id" + 
							") " + 
							"values(" + 
							product_id + ", " + 
							cat_arr[i] + 
							") ; ";		
				sql_cat_all	= sql_cat_all  + sql_cat		
			}//end of for option_arr	
			//sql_text = sql_text + sql_cat_delete +  sql_cat_all;
			sql_text = sql_text + sql_cat_delete +  sql_cat_all;
		}else{
			var sql_cat_all = "";
			var table_name_cat  = config_database.PREFIX + "category_general_speciality_link ";
			var field_where_cat  = config_database.PREFIX + "category_general_speciality_link_product_id ";
			var sql_cat_delete = 'DELETE FROM ' + table_name_cat + ' where ' + field_where_cat + ' = "'+ product_id + '" ; ';	

			sql_text = sql_text + sql_cat_delete;		
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product update store cat arr, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "4",
			"position" : "lib/products/product update store", 
			"message": error_send 
			}); 
			
	}	


	sql_text = sql_text + " COMMIT;"


	//@ run
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi product search, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "5",
						"position" : "lib/products/product update store", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "6",
			"position" : "lib/products/product update store", 
			"message": error_send 
		}); 
		
	}	
};	


module.exports = product_update_store;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














