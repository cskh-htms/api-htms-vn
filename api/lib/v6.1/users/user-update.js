

const mysql = require('mysql2');
const md5 = require('md5');


const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const fields_insert = require('./user-fields-insert.js');



const function_export = async function (datas,user_id,res) {
	
	
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
		
		//thay md5 cho passs
		if(item == "users_password"){
			arrValueDatas[i] = md5(arrValueDatas[i].toString());
		}
		
		
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


	let table_name  = config_api.PREFIX + "users ";
	let field_where  = config_api.PREFIX + "users_ID ";
	//create sql text
	let sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ user_id + '"';
	
	//return res.send([sql_text]);
	//
	
	
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->user->update",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert data user add, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->user->update",
			"message": error_send 
		}); 
			
	}	
	
};	


module.exports = function_export;
















