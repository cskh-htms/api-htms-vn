

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
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-best-sale.js');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');



//@
//@
//@
//@ function export
async  function controllers_product_by_category_app(req, res, next) {
	
	try {
		var token = req.headers['token'];
		
		//@		
		var limit = 20;
		if(req.query.c1){
			limit = req.query.c1;
		}	
		
		//@
		var offset = 0;
		if(req.query.c3){
			offset = req.query.c3;
		}		
		
		//@		
		//@ limit
		var limit_data = [];
		limit_data.push(
			{
				"limit_number" : limit
			}
		);		

		limit_data.push(
			{
				"limit_offset" : offset
			}
		);		


		
		//@
		//@		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctroller/controllers-product-by-category2-app",
			"message": error_send 
		}); 
		return;	
	}


	//res.send(limit_data);
	//return;



	//@ condition
	var condition_data = [		
		{   
			"field"     :"stores_status_admin",
			"value"     : "1",
			"compare" : "="
		},				
		{   
			"field"     :"products_speciality_status_admin",
			"value"     : "1",
			"compare" : "="
		},				
		{   
			"field"     :"out_of_stock",
			"value"     : "0",
			"compare" : "="
		},				
		{   
			"field"     :"products_speciality_show_hide",
			"value"     : "0",
			"compare" : "="
		} 				
	]	





	//@ lấy req data
	try {
		
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_featured_image",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",				
				"stores_name",
				"stores_ID",
				"products_speciality_sort_by_percen",
				"sum_best_sale",
				"orders_speciality_status_orders"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" : condition_data			
				}         
			],
			"group_by":
			[
				"products_speciality_ID",
				"orders_speciality_status_orders"
			],
			"having" :
			[
				{    
				"relation": "or",
				"where" :
					[
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : "100",
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : "",
						"compare" : "is null"
					}                            
					]    
				}         
			], 			
			"order" :
			 [		 
				{    
					"field"  :"sum_best_sale",
					"compare" : "DESC"
				}			
			 ],
			 "limit" :limit_data
		}
	
		//@ get datas
		var data_product = await product_search(data_get,res);
		//res.send(data_product);
		//return;
		
		
		
		
		//@ create arr ID product
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}	

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/controllers-product-by-category2-app",
			"message": error_send 
		}); 
		return;	
	}		
		



	//@ lấy meta
	try {
		var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "4", 
			"position" : "api/app/v5/ctroller/controllers-product-by-category2-app",
			"message": error_send 
		}); 
		return;	
	}



	res.send({"error":"","datas":get_meta_product_resuilt}); 
	return;
	
}



//@
//@
//@
//@ export
module.exports = controllers_product_by_category_app;





//@
//@
//@
//@ file end