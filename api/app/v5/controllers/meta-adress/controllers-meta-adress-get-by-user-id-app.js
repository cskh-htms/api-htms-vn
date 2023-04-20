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


const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-get.js');


const meta_adress_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-search.js');
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
			return res.send({ 
				"error" : "01", 
				"position" : "api/app/v5/controller/controllers-meta-adress-get-by-user-id-app",
				"message": "user không khớp với phiên làm việc"
			}); 	
						
		}
		
		//return res.send([token,user_id,de_token]);
		//
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/controller/controllers-meta-adress-get-by-user-id-app",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"controllers-user-get-by-id-web", "message": error_send } ); 
		
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
				"adress_meta_ID",
				"adress_meta_date_created",
				"adress_meta_user_id",
				"adress_meta_name",
				"adress_meta_phone",
				"adress_meta_province",
				"adress_meta_district",
				"adress_meta_wards",
				"adress_meta_street",
				"adress_meta_full_adress",
				"adress_meta_status"				
		   ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"adress_meta_user_id",
						"value"     : user_id,
						"compare" : "="
					}	
					] 				
				}         
			]   
		}
		
		//return res.send(data_get);
		//return ;
		
		var meta_adress_search_redult= await meta_adress_search(data_get,res);
		
		return res.send({"error":"","datas":meta_adress_search_redult});
		return ;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data  , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5", 
			"position" : "api/app/v5/controller/controllers-meta-adress-get-by-user-id-app",
			"message": error_send 
		}); 
			
	}			
		

}

module.exports = function_export;