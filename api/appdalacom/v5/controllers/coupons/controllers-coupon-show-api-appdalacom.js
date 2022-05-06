const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_coupon = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-coupon');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const coupon_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search');


//@
async  function function_export(req, res, next) {
	//@ lấy req data
	try {
		var coupon_id = req.params.coupon_id;
		var store_id = req.params.store_id;
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
			"position" : "ctroller->api-appdalacom->controllers-coupon-add-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send([store_id,coupon_id]);
	//return;
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bussiness" 
	|| check_role_result == "admin" 
	){
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
			"position" : "ctroller->api-appdalacom->controllers-coupon-show-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}


	//@ lấy id cửa để check owner store
	if(check_role_result == "bussiness"){
		//@
		//@ check owner store id
		const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
		if(	
		check_owner_store_resuilt == "1" 
		|| check_role_result == "admin" 
		){
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
				"error" : "3333",
				"position" : "ctroller->api-appdalacom->controllers-coupon-show-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}		


		//@
		//@ check owner coupon			
		var check_owner_coupon_resuilt = await check_owner_coupon(token,coupon_id,res);
		//res.send([check_owner_coupon_resuilt]);
		//return;				
		
		if(	check_owner_coupon_resuilt == "1" ){
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
				"error" : "232",
				"position" : "ctroller->api-appdalacom->controllers-coupon-show-appdalacom-api.js",  
				"message": error_send 
			}); 
			return;			
		}		
	
	}//@enf fi check store owner




	//@ 3. lấy user_id của cửa hàng
	try{
		
		let data_store =    
		{
		   "select_field" :
			[
				"users_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}

		var store_search_result = await store_search(data_store,res);
		//res.send([store_search_result]);		
		//return;	
		var user_id = store_search_result[0].users_ID;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				//evn, 
				error, 
				"Lỗi get data, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "105", 
			"position" : "ctroller->api-appdalacom->controllers-coupon-show-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send([user_id]);
	//return;






	//res.send(["go"]);
	//return;

	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);


		//@ 3. lấy store taget
		let data_store =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_name" ,
				"stores_adress",
				"stores_province",
				"stores_district",
				"stores_wards" ,
				"stores_payment_limit",
				"stores_discount_price",
				"service_type_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		var fn_get_store_taget = new Promise((resolve, reject) => {
			let result = store_search(data_store,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_taget);	
		


		//@ 3. lấy coupon taget
		let data_coupon =    
		{
		   "select_field" :
			[
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_featured_image",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_pay_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_show_hide",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_limit_number",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"coupon_speciality_ID",
						"value"     : coupon_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		var fn_get_coupon_taget = new Promise((resolve, reject) => {
			let result = coupon_search(data_coupon,res);
			resolve(result);
		});	
		promise_all.push(fn_get_coupon_taget);	


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
			"position" : "ctroller->api-appdalacom->controllers-coupon-show-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",
		"4":"coupon taget",	
	}
	promise_result.push(notes);

	res.send(promise_result);
	return;
}

module.exports = function_export;