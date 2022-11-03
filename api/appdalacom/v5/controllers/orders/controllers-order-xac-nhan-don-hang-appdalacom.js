const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');




const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');
const order_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update');

//@
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var url = "";
		if(req.query.c1){
			url = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
				"message": "vui lòng nhập id don hang"
			}); 	
			return;
		}
		//res.send([url]);
		//return;		
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
			"error" : "2", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	//res.send([url]);
	//return;
	
	
	//@
	//@
	//@
	//@ get store id
	let url_code = crypto.AES.encrypt("U2FsdGVkX1+dfbPo6H53zGoP7cFVK1cggMUc+xt4brw=",ojs_configs.hash_secret).toString();
	var bytes = crypto.AES.decrypt(url_code, ojs_configs.hash_secret);
	//res.send([bytes]);
	//return;	
	
	
	
	var message_decode = bytes.toString(crypto.enc.Utf8);		
	
	res.send([url_code,bytes,message_decode]);
	return;

	
	//@
	//@lấy store taget
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
			"stores_discount_price"						
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
	
	var store_taget_result = await store_search(data_store,res);
	
	//res.send(result);
	//return;	
	
	

	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(store_taget_result[0].stores_user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(store_taget_result[0].stores_user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);


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
				"sum(price_caution)"					
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
		
		var fn_get_order_list = new Promise((resolve, reject) => {
			let result = order_search(data_order,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list);	


		
		var promise_result = await Promise.all(promise_all);
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",	
	}
	promise_result.push(notes);

	res.send(promise_result);
	return;
}

module.exports = function_export;