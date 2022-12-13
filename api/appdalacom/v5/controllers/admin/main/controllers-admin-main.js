//@
//@
//@
//@
//@ file start


const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');


const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');


const store_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_sale = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');
const order_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');



//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];
		//res.send([store_id]);
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
			"error" : "1", 
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
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
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
			"message": error_send 
		}); 
		return;			
	}

	//res.send(["adasdasdasd 1"]);
	//return;
	


	
	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);


		
		
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
		//@ promise go 
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
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
			"message": error_send 
		}); 
		return;	
	}	

	
	

	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"2":"service",
		"3":"user-list",
		"4":"local",
		"5":"notes"
	}
	//promise_result.push(data_product);	
	//promise_result.push(category_resuilt);	
	

	promise_result.push(notes);

	res.send(promise_result);
	return;
}



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







