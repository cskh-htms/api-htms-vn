const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');
const order_count_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');



//@
//@
//@
//@
//@ 
async  function store_order_get_all(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];

		//@
		//@
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->order->manage->show all",
				"message": "vui lòng nhập id"
			}); 	
			
		}	



		//@
		//@
		var status_int = 0;
		if(req.query.c2){
			status_int = req.query.c2;
			if(status_int == "all"){
				status_int = '[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,123,127,128,45,49,410,100,101,102]';
			}
			
			
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->order->manage->show all",
				"message": "vui lòng nhập id"
			}); 	
			
		}	



		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api->appdalacom->controller->order->manage->show all",
			"message": error_send 
		}); 
			
	}		
	//return res.send([store_id ,status_int]);
	//
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	
	
	
	
	//@
	//@
	//@ 
	//@ check owner store		
	if(check_role_result == "bussiness"){			
		const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
		if(	check_owner_store_resuilt == "1" ){
			//go
		}
		else{
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "333",
				"position" : "api->appdalacom->controller->order->manage->show all",
				"message": error_send 
			}); 
						
		}				
	}
	//return res.send([check_role_result,"store_ok"]);
	//
	
	
	

	

	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);











		//@
		//@
		//@
		//@
		//@ 3. lấy store taget
		let data_store =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_user_id",
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
		
		var fn_get_store_list = new Promise((resolve, reject) => {
			let result = store_search(data_store,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_list);	








		//@
		//@
		//@
		//@
		//@ 3. lấy order list
		let data_order =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_date_orders" ,
				"orders_speciality_status_orders",
				"sum(orders_details_speciality_qty)",
				"sum_price_caution"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_store_id",
						"value"     : store_id,
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_pull_money",
						"value"     : 1,
						"compare" : "<>"
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : JSON.parse(status_int),
						"compare" : "in"
					},	
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : 'product',
						"compare" : "="
					}					
					]    
				}         
			],
			"group_by":
			[
				"orders_speciality_ID"
			],
			"order":
			 [
				{ 
					"field"  :"orders_speciality_date_orders",
					"compare" : "DESC"
				}   
			]   
		}
		
		var fn_get_order_list = new Promise((resolve, reject) => {
			let result = order_search(data_order,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list);	




		//@
		//@
		//@
		//@
		//@ 3. lấy order count
		let data_order_count =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_date_orders" ,
				"orders_speciality_status_orders"			
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_store_id",
						"value"     : store_id,
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_pull_money",
						"value"     : 1,
						"compare" : "<>"
					}					
					]    
				}         
			]  
		}
		
		var fn_get_order_count = new Promise((resolve, reject) => {
			let result = order_count_search(data_order_count,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_count);	



		//@
		//@
		//@
		//@
		//@ 3. lấy order list		
		var promise_result = await Promise.all(promise_all);
		
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api->appdalacom->controller->order->manage->show all",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",	
	}
	promise_result.push(notes);

	return res.send(promise_result);
	
}


//@
//@
//@
//@
//@ 
module.exports = store_order_get_all;












//@
//@
//@
//@
//@ 








