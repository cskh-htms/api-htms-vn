


//@
//@
//@
//@ file start



const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');



const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');


const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');
const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');
//@












//@
//@
//@
//@ function
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {

		var token = req.headers['token'];
		var user_id = 0;
		if(req.query.c1){
			user_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "01", 
				"position" : "api->controller->appdalacom->bussiness->show-all",
				"message": "vui lòng nhập id"
			}); 	
			
		}			
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api->controller->appdalacom->bussiness->show-all",
			"message": error_send 
		}); 
			
	}	
	//return res.send([user_id]);
	//
	
	
	
	
	
	
	
	
	
	
	
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
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api->controller->appdalacom->bussiness->show-all", 
			"message": error_send 
		}); 
					
	}


	
	//@ check owner user id
	const check_owner_user_resuilt = await check_owner_user.check_owner_user(token,user_id,res);
	if(	
	check_owner_user_resuilt == "1" 
	|| check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "333",
			"position" : "api->controller->appdalacom->bussiness->show-all", 
			"message": error_send 
		}); 
					
	}	


	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);




		//@
		//@
		//@
		//@
		//@ store list
		let data_store_list =    
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
				"stores_discount_price"						
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_user_id",
						"value"     : user_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		var fn_get_store_list = new Promise((resolve, reject) => {
			let result = store_search(data_store_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_list);	
		
		
		
		
		
		//@
		//@
		//@
		//@ product sale
		let data_product_sale = 	
			{
				"select_field" :
				[ 
					"stores_ID",
					"users_ID",
					"products_speciality_ID",
					"products_speciality_name",
					"orders_details_speciality_line_order",
					"orders_details_speciality_qty" ,
					"orders_details_speciality_price",
					"price_caution",
					"orders_speciality_status_pull_money",
					"orders_speciality_status_orders"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"users_ID",
							"value" 	: user_id,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}
						]	
					}				
				]					
			}	
		var fn_get_product_sale = new Promise((resolve, reject) => {
			let result = product_sale(data_product_sale,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_sale);	
		
		
		
		
		
		//@
		//@
		//@
		//@ order list
		let data_order_list = 	
			{
				"select_field" :
				[ 
					"count(orders_speciality_store_id)",
					"orders_speciality_store_id",
					"orders_speciality_status_orders"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"users_ID",
							"value" 	: user_id,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}
						]	
					}				
				],
				"group_by" :
				 [
					"orders_speciality_store_id"
				 ]   			
			}	
		var fn_get_order_list = new Promise((resolve, reject) => {
			let result = order_search(data_order_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list);			
		
		
		

		//@
		//@
		//@
		//@ order list2
		let data_order_list2 = 	
			{
				"select_field" :
				[ 
					"orders_speciality_ID",
					"orders_speciality_store_id",
					"orders_speciality_status_orders"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"users_ID",
							"value" 	: user_id,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}
						]	
					}				
				]  			
			}	
		var fn_get_order_list2 = new Promise((resolve, reject) => {
			let result = order_search(data_order_list2,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list2);









		//@
		//@
		//@
		//@ promise go	
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/contriller/bussiness/controllers-bussiness-by-user-id-appdalacom-api.js",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"store list",
		"2":"product sale",
		"3":"order list"			
	}
	promise_result.push(notes);

	return res.send(promise_result);
	
}






//@
//@
//@
//@ export
module.exports = function_export;












//@
//@
//@
//@ file end










