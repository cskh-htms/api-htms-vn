
//@
//@
//@
//@ file start







//@
//@
//@
//@ require
const mysql = require('mysql2');









//@
//@
//@
//@ config
const ojs_configs = require('../../../../configs/config');
const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');





//@
//@
//@
//@ share
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


//@
//@
//@
//@ model
const connection = require('../connections/connections');
const fields_insert = require('./category-fields-insert.js');







//@
//@
//@
//@ function export
const function_export = async function (datas,id,res) {
	
	let sqlSet = "";
	
	let arrDatas = Object.keys(datas);
	
	let arrValueDatas = [];
	let x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
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

	let table_name  = config_database.PREFIX + "category_general_speciality ";
	let field_where  = config_database.PREFIX + "category_general_speciality_ID ";
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ id + '"';
	
	//return(sql_text);
	
	
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					////evn = "dev";;
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib/category_general_speciality/store-update",
						"message": error_send 
					}); 
						
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi update, Vui lòng liên hệ admin DALA " 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/category_general_speciality/store-update",
			"message": error_send 
		}); 
		
	}
};	






//@
//@
//@
//@ function export
module.exports = function_export;






//@
//@
//@
//@ file end









