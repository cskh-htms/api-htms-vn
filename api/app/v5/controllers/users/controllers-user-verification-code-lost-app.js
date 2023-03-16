const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-get.js');

const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search.js');
const user_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-update.js');
const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

//const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
//const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
//const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
//const token_insert_web = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-insert-web.js');



const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');


//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		//res.send([datas]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctronller/controllers-user-verification-code-lost-app",
			"message": error_send 
		}); 
		return;	
	}	
	


		
	let data_get =    
	{
	   "select_field" : fields_get.fields_search_arr,
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"users_phone",
					"value"     : datas.phone,
					"compare" : "="
				}	
				] 				
			}         
		]   
	}
	
	
	
	user_search(data_get,res).then( results => {
		//res.send(results);
		//return;
		
		//@
		//@
		//@ nếu có datas
		if(results.length > 0){
			//@
			//@
			//@
			// kiểm tra mã xác thực
			if(results[0].users_verification_code == datas.users_verification_code){
				//@
				//@
				//@
				//@
				//@
				//tinh htoi gian song cua code
				try {
					var date_now = Date.now();
					var date_database = Date.parse(results[0].users_verification_time);
					var date_live = date_now - date_database;
					var date_minute = Math.floor(date_live / ( 60 * 1000 ));
					//@
					//@
					// nếu quá hạn 10 phú thì là hết hạn
					if(date_minute > 10 ){
						res.send({ 
						"error" : "6", 
						"position":"api/app/v5/ctronller/controllers-user-verification-code-lost-app", 
						"message": "hết thời gian"} ); 
						return;								
					}
					
				}
				catch(error){
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tính thời gian code live, Liên hệ bộ phan HTKT dala" );
					res.send({ "error" : "7", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-app", "message": error_send } );  
					return;	
				}		


				res.send( {"error" : "", "message" : "Đã xác nhận"} );
				return;
			
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, 
				"Mã xác thực không đúng hoặc đã hết hạn", 
				"Mã xác thực không đúng hoặc đã hết hạn" );
				res.send({ "error" : "10", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-app", "message": error_send } ); 
				return;					
			}
		//@
		//@
		//@ nếu không có datas
		}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
				res.send({ "error" : "11", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-app", "message": error_send } );  
				return;				
		}			

	}, error => {
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "12", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-app", "message": error_send } ); 
		return;			
	});



















}

module.exports = function_export;