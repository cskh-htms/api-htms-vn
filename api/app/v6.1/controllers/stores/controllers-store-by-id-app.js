const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-fields-get.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search.js');
const store_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');



//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/ctroller/stores/controllers-store-by-id-app",
				"message": "vui lòng nhập id"
			}); 	
			
		}
		//return res.send(store_id);
		//
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
			"position" : "api/app/v5/ctroller/stores/controllers-store-by-id-app",
			"message": error_send 
		}); 
			
	}




	//@ lấy req data
	try {
		//@ 3. get model
		var data_get =    
		{
		   "select_field" :fields_get.fields_search_arr,
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
	
	
		//@ get datas
		var store_data = await store_search(data_get,res);
		
		
		//@ store sale
		var data_get =    
		{
		   "select_field" :
		   [
		   "stores_ID",
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
						"field"     :"orders_details_speciality_line_order",
						"value"     : "product",
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : "100",
						"compare" : "="
					}
					]    
				}  
			],				
			"group_by" :
			 [
				"stores_ID"
			 ]   
		}		
		var store_data_sale = await store_sale(data_get,res);		
		//return res.send({ "error" : "", "datas": store_data_sale } );
		//		
		
		
		
		
		//@
		//@
		//@
		//@ gôm data return	
		var add_data = [];
		for(x in store_data){
			for(y in store_data_sale){
				if(store_data[x].stores_ID == store_data_sale[y].stores_ID){
					add_data = [{ 
					"stores_ID": store_data[x].stores_ID ,
					"qty":store_data_sale[y].sum_orders_details_speciality_qty, 
					"price":store_data_sale[y].sum_price_caution }];
				}							
			}
			store_data[x].so_luong_ban = add_data;
		}	
		
		return res.send({ "error" : "", "datas": store_data } );
						
		

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
			"error" : "3", 
			"position" : "api/app/v5/ctroller/stores/controllers-store-by-id-app",
			"message": error_send 
		}); 
			
	}		
	
}

module.exports = function_export;