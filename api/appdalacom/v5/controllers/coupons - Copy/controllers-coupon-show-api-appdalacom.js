
//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();




//@
//@
//@
//@ config
const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');



//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');



//@
//@
//@
//@ model database
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_coupon = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-coupon');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const coupon_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search');
const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');






//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	

		//@
		//@
		//@ lấy data req
		try {
			var token = req.headers['token'];			
			//@
			//@
			var coupon_id = 0;
			if(req.query.c1){
				coupon_id = req.query.c1;
			}else{
				res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controllers->coupons->show",
					"message": "vui lòng nhập id"
				}); 	
				return;
			}				
			
			
			//@
			//@
			var store_id = 0;
			if(req.query.c2){
				store_id = req.query.c2;
			}else{
				res.send({ 
					"error" : "02", 
					"position" : "api->appdalacom->controllers->coupons->show",
					"message": "vui lòng nhập id"
				}); 	
				return;
			}				
			
			
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
				"position" : "api->appdalacom->controllers->coupons->show",
				"message": error_send 
			}); 
			return;	
		}			
		//res.send([store_id,coupon_id]);
		//return;
		
		
		
		
		
		//@
		//@
		//@ check phân quyền
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
				"position" : "api->appdalacom->controllers->coupons->show", 
				"message": error_send 
			}); 
			return;			
		}




		//@
		//@
		//@ check owner store
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
					"position" : "api->appdalacom->controllers->coupons->show", 
					"message": error_send 
				}); 
				return;			
			}		




			//@
			//@
			//@ check owner store		
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
					"position" : "api->appdalacom->controllers->coupons->show",  
					"message": error_send 
				}); 
				return;			
			}		
		
		}





		//@
		//@
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
				"position" : "api->appdalacom->controllers->coupons->show", 
				"message": error_send 
			}); 
			return;	
		}	
		
		//res.send([user_id]);
		//return;








		//@
		//@
		//@ promise all call
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
					"coupon_speciality_intro",
					"coupon_speciality_intro_price",
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





			//@ 3. lấy users list
			let data_user_list =    
			{
			   "select_field" :
				[
					"users_ID",
					"users_full_name",
					"users_phone"
				] 
			}
			
			var fn_get_user_list = new Promise((resolve, reject) => {
				let result = user_search(data_user_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_user_list);	







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
				"position" : "api->appdalacom->controllers->coupons->show", 
				"message": error_send 
			}); 
			return;	
		}	
		
		
		
		
		//@
		//@
		//@ add notes	
		let notes = {
			"0":"no", 
			"1":"news bussiness",
			"2":"count item", 
			"3":"store taget",
			"4":"coupon taget",	
		}
		promise_result.push(notes);





		//@
		//@
		//@ send resuilt	
		res.send(promise_result);
		return;




	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		res.send({ 
			"error" : "1000", 
			"position":"api->appdalacom->controllers->coupons->show",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controllers->coupons->show",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;	
	
};





//@
//@
//@
//@
//@ export
module.exports = function_export;



//@
//@
//@
//@
//@ file end