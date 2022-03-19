const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../shares/get-data-news-admin-appdalacom-api.js');

const discount_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search');



//@
async  function controllers_discount_program_quan_ly(req, res, next) {
	
	
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
			"position" : "api/appdalacom/contriller/discounts/controllers-discount-program-quan-ly-admin",
			"message": error_send 
		}); 
		return;	
	}	
	
	
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
			"position" : "api/appdalacom/contriller/discounts/controllers-discount-program-quan-ly-admin",
			"message": error_send 
		}); 
		return;			
	}

	//res.send(["adasdasdasd 1"]);
	//return;
	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);

		
		//@ 2. discunt list
		var data_discount = 		
		{
			"select_field" :
			[
			"discount_program_ID",
			"discount_program_date_created",
			"discount_program_name",
			"discount_program_store_id_created",
			"discount_program_featured_image",
			"discount_program_position",
			"discount_program_status_admin",
			"discount_program_status_update",
			"discount_program_information",
			"discount_program_type",
			"stores_name",
			"stores_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"discount_program_status_admin",
						"value"     : [0,1,2,3],
						"compare" : "in"
					},
					{   
						"field"     :"check_expired",
						"value"     : 1,
						"compare" : "="
					}
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"discount_program_date_created",
					"compare" : "DESC"
				}			
			]	

		}

		var fn_get_data_discount = new Promise((resolve, reject) => {
			let result = discount_search(data_discount,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_discount);		
		
		
		
		//@
		//@
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/contriller/discounts/controllers-discount-program-quan-ly-admin",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"2":"discount list"
	}
	promise_result.push(notes);

	res.send(promise_result);
	return;
}

module.exports = controllers_discount_program_quan_ly;