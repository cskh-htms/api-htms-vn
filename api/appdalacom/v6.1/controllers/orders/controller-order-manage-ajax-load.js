//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ reqiure
const express = require('express');
const router = express.Router();






const config_api = require('../../configs/config');





//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model database
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');




//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ error all
	try{

		//@
		//@
		//@ lấy req data
		try {
			var token = req.headers['token'];
			var datas  = req.body;
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
				"position" : "api->appdalacom->controller->order->manage->ajax-load",
				"message": error_send 
			}); 
				
		}	
		//return res.send([datas]);
		//	


	
		
	
	
	
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
			const check_owner_store_resuilt = await check_owner_store(token,datas.store_id,res);
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
					"position" : "api->appdalacom->controller->order->manage->ajax-load",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//
	
	
	
			


		
		//@
		//@
		//@
		//@ promise
		try{	
			var promise_all = [];
			promise_all.push(0);
			
				
				
				
				
				
				
				
			//@ lấy order list
			let data_order_list =    
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
							"value"     : datas.store_id,
							"compare" : "="
						},
						{   
							"field"     :"orders_speciality_status_pull_money",
							"value"     : 1,
							"compare" : "<>"
						},						
						{   
							"field"     :"orders_speciality_status_orders",
							"value"     : JSON.parse(datas.status_send),
							"compare" : "in"
						},
						{   
							"field"     :"orders_speciality_date_orders",
							"value"     : datas.date_star,
							"compare" : ">"
						},
						{   
							"field"     :"orders_speciality_date_orders",
							"value"     : datas.date_end,
							"compare" : "<"
						}				
						] 				
					}         
				],
				"group_by":
				[
					"orders_speciality_ID"
				],				
				"order" :
				[		 
					{    
						"field"  :"orders_speciality_date_orders",
						"compare" : "DESC"
					}			
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
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data review, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "100", 
				"position" : "api->appdalacom->controller->order->manage->ajax-load",
				"message": error_send 
			}); 
				
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"user_list",
			"3":"notes"
		}
		//promise_result.push(data_product);	
		//promise_result.push(category_resuilt);
		promise_result.push(notes);
		
		
		
		
		
		
		//@
		//@
		//@ send data result
		return res.send(promise_result);
		
		
		
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		return res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->order->manage->ajax-load",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->order->manage->ajax-load",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
			
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






