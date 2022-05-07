const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');


//@
async  function function_export(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "ctroller->api-appdalacom->controllers-note-ajax-load-user-admin-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send(["sdfsdfsdf"]);
	//return;
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "ctroller->api-appdalacom->controllers-note-ajax-load-user-admin-appdalacom-api.js",
			"message": error_send 
		}); 
		return;			
	}

	//res.send(["go"]);
	//return;

	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 3. lấy coupon taget
		let data_users =    
		{
		   "select_field" :
			[
				"users_ID",
				"users_full_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_type_name",
						"value"     : "customer",
						"compare" : "="
					}           
					]    
				}         
			],
			"order" :
			 [
					{    
						"field"  :"users_type_name",
						"compare" : "ASC"
					}   
			]    
		}
		
		var fn_get_user_taget = new Promise((resolve, reject) => {
			let result = user_search(data_users,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_taget);	


		//@
		//@
		//@ promise all go
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi get data coupon add, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "ctroller->api-appdalacom->controllers-note-ajax-load-user-admin-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"2":"user list",	
	}
	promise_result.push(notes);

	res.send(promise_result);
	return;
}

module.exports = function_export;