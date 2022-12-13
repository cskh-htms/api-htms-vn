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
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');




//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var token = req.headers['token'];
		var user_id = req.params.user_id;
		var de_token = jwt.decode(token);
		
		if(user_id != de_token.users_ID){
			res.send({ 
				"error" : "01", 
				"position" : "api/web/v5/ctronller/controllers-user-get-by-id-web",
				"message": "user không khớp với phiên làm việc"
			}); 	
			return;			
		}
		
		//res.send([token,user_id,de_token]);
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
			"position" : "api/web/v5/ctronller/controllers-user-get-by-id-web",
			"message": error_send 
		}); 
		return;	
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"controllers-user-get-by-id-web", "message": error_send } ); 
		return;
	}	
		
	//res.send(de_token);
	//return;





	//@
	//@
	//@
	//@ check login lock	
	try{
		let data_get =    
		{
		   "select_field" :
		   [
				"users_full_name",
				"users_phone",
				"users_email",
				"users_verification_status",
				"users_type_name",
				"users_status"				
		   ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : user_id,
						"compare" : "="
					}	
					] 				
				}         
			]   
		}
		
		//res.send(data_get);
		//return ;
		
		var user_taget = await user_search(data_get,res);
		
		res.send(user_taget);
		return ;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data  , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "5", 
			"position" : "api/web/v5/ctronller/controllers-user-get-by-id-web",
			"message": error_send 
		}); 
		return;	
	}			
		

}

module.exports = function_export;