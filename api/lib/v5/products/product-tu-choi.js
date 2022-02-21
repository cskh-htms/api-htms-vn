

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');




const tu_choi_product = function (datas,product_id,res) {

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

		sql_text = sql_text + " COMMIT;"


	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "lib/products/product tu choi", 
			"message": error_send 
			}); 
		return;	
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi product từ chối sàn phẩm, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/products/product tu choi", 
						"message": error_send 
					}); 
					return;
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/products/product tu choi", 
			"message": error_send 
		}); 
		return;
	}	
};	


module.exports = tu_choi_product;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














