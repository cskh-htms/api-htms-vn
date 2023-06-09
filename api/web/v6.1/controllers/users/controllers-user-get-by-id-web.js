const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');




const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-get.js');


const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const get_meta_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-user.js');


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
			return res.send({ 
				"error" : "01", 
				"position" : "api/web/v5/ctronller/controllers-user-get-by-id-app",
				"message": "user không khớp với phiên làm việc"
			}); 	
						
		}
		
		//return res.send([token,user_id,de_token]);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/ctronller/controllers-user-get-by-id-app",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"controllers-user-get-by-id-app", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//




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
				"users_status",
				"users_ID",	
				"users_adress"			
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
		
		//return res.send(data_get);
		//return ;
		
		var data_user = await user_search(data_get,res);
		
		/*
		
		//@ create arr ID product
		var model_user_arr = [0];
		if(data_user.length > 0){
			for(x in data_user){
				if(data_user[x].users_ID){
					model_user_arr.push(data_user[x].users_ID);
				}
			}
		}			
		
		
		
		

		//@ lấy meta
		try {
			var get_meta_user_resuilt = await get_meta_user(data_user,model_user_arr,res);
		}
		catch(error){
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "44", 
				"position" : "api/web/v5/ctronller/controllers-user-get-by-id-app",
				"message": error_send 
			}); 
				
		}

		*/

		
		
		return res.send(data_user);

	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data  , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5", 
			"position" : "api/web/v5/ctronller/controllers-user-get-by-id-app",
			"message": error_send 
		}); 
			
	}			
		

}

module.exports = function_export;