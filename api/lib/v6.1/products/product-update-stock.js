

const mysql = require('mysql2');



const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');



const product_update_stock = function (datas,product_id,res) {

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
					sqlSet = config_api.PREFIX + item + '=' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
				}else{
					sqlSet = sqlSet + ',' + config_api.PREFIX + item  + '=' +  mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
				}
			}else{
				if(sqlSet.length == 0){
					sqlSet = config_api.PREFIX + item + '="' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") + '"';
				}else{
					sqlSet = sqlSet + ',' + config_api.PREFIX + item  + '= "' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "")  + '"' ;
				}		
			}

			i = i + 1 ;
		});		


		let table_name  = config_api.PREFIX + "products_speciality ";
		let field_where  = config_api.PREFIX + "products_speciality_ID ";
		//create sql text
		
		sql_text =  sql_text + ' UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ product_id + '" ;';

		sql_text = sql_text + " COMMIT;"


	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "lib/products/product update stock", 
			"message": error_send 
			}); 
			
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi product search, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "2",
						"position" : "lib/products/product update stock", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product search, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/products/product update stock", 
			"message": error_send 
		}); 
		
	}	
};	


module.exports = product_update_stock;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














