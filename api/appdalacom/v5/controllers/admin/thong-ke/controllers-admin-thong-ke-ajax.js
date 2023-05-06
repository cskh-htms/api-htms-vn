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
const ojs_shares_date = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');



const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');


const order_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');


//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas  = req.body;		
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
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke-ajax",
			"message": error_send 
		}); 
			
	}		
	//return res.send([datas]);	
	
	
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
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
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke-ajax",
			"message": error_send 
		}); 
					
	}
	//return res.send([datas]);
	
	


	
	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@
		//@
		//@lấy order list
		
		
		//@ 
		//@ limit
		var limit_data = [];
		if(datas.limit){
			limit_data.push(
				{
					"limit_number" : datas.limit
				}
			);		
		}
		if(datas.offset){
			limit_data.push(
				{
					"limit_offset" : datas.offset
				}
			);		
		}		



		//@ order
		var order_data = [];
		if(datas.sort_field){
			order_data.push(
				{
					"field"  :datas.sort_field
				}					
			)
		}
		if(datas.sort_type){
			order_data.push(
				{
					"compare"  :datas.sort_type
				}					
			)
		}
		
	
		
		
		//@
		//@ condition
		var condition_data = [];
		condition_data.push(	
			{   
				"field"     :"orders_speciality_date_orders",
				"value"     : datas.date_star,
				"compare" : ">"
			},
			{   
				"field"     :"orders_speciality_date_orders",
				"value"     : datas.date_end,
				"compare" : "<="
			}		
		)	


		//@
		//@ loc store
		if(datas.loc_by_store != "all"){
			condition_data.push(	
				{   
					"field"     :"orders_speciality_store_id",
					"value"     : datas.loc_by_store,
					"compare" : "="
				}			
			)
		}
	


		//@
		//@ loc order status
		if(datas.loc_order_status != "all"){
			if(datas.loc_order_status == 1){
				condition_data.push(	
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}			
				)				
			}else{
				condition_data.push(	
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 21,
						"compare" : "="
					}			
				)					
			}
		}else{			
			condition_data.push(	
				{   
					"field"     :"orders_speciality_status_orders",
					"value"     : [100,21],
					"compare" : "in"
				}			
			)				
		}



		//@
		//@ loc cong no
		if(datas.loc_cong_no != "all"){
			if(datas.loc_cong_no == 1){
				condition_data.push(	
					{   
						"field"     :"payment_period_ID",
						"value"     : "",
						"compare" : "not null"
					}			
				)				
			}else{
				condition_data.push(	
					{   
						"field"     :"payment_period_ID",
						"value"     : "",
						"compare" : "null"
					}			
				)					
			}

		}
		//return res.send(condition_data);


		//@
		//@
		//@ goo
		var data_order_list =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_adress",
				"orders_speciality_date_orders" ,
				"orders_speciality_notes",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_name",
				"orders_speciality_province",
				"orders_speciality_district",
				"orders_speciality_wards",
				"stores_ID" ,
				"stores_discount_price",
				"stores_name",
				"users_full_name",
				"payment_period_ID",
				"orders_speciality_total_qty",
				"orders_speciality_total_product",
				"orders_speciality_total_shipping",
				"orders_speciality_total_coupon_store",
				"orders_speciality_total_coupon_dala",
				"orders_speciality_total_fee",
				"orders_speciality_total_caution",
				"payment_period_payment"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :condition_data		
				}         
			],	
			"limit":limit_data,
			"order" :order_data				
		 }
		
		var fn_get_order_list = new Promise((resolve, reject) => {
			let result = order_search(data_order_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list);	
			



		//@
		//@
		//@ goo
		var data_order_list =    
		{
		   "select_field" :
			[
				"payment_period_ID",
				"orders_speciality_total_product",
				"orders_speciality_total_coupon_store",
				"orders_speciality_total_coupon_dala",
				"orders_speciality_total_fee",
				"orders_speciality_total_caution",
				"stores_discount_price",
				"orders_speciality_status_orders",					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :condition_data		
				}         
			],	
			"limit":limit_data,
			"order" :order_data				
		 }
		
		var fn_get_order_list2 = new Promise((resolve, reject) => {
			let result = order_search(data_order_list,res);
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke-ajax",
			"message": error_send 
		}); 
			
	}	

	
	

	
	
	let notes = {
		"0":"no", 
		"1":"data_merketing",
		"2":"data_merketing_all",
	}
	
	promise_result.push(notes);
	return res.send(promise_result);
	
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







