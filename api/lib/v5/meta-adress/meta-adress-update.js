

const mysql = require('mysql');
const md5 = require('md5');

const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./meta-adress-fields-insert.js');



const function_export = async function (user_id,datas,meta_adress_id,res) {
	
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


	let table_name  = config_database.PREFIX + "adress_meta ";
	let field_where  = config_database.PREFIX + "adress_meta_ID ";
	//create sql text
	sql_text = "START TRANSACTION ; "
	sql_text = sql_text + 'UPDATE ' + table_name + 
	' SET ' + config_database.PREFIX + "adress_meta_status = 0 " + ' where ' + 
	config_database.PREFIX + "adress_meta_user_id " + ' = "'+ user_id + '"; ';
	
	
	
	
	sql_text = sql_text + 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ meta_adress_id + '"; ';
	sql_text = sql_text + " COMMIT;"	
	//return sql_text;
	
	
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					
					var error_massage = fields_insert.get_message_error(err);
					
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					res.send({ 
						"error" : "10", 
						"position" : "lib->meta-adress->update.js",
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
				//evn, 
				error, 
				"Lỗi insert data user add, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "lib->meta-adress-web->update.js",
			"message": error_send 
		}); 
		return;	
	}	
	
};	


module.exports = function_export;
















