const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const discount_search_product = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search-product.js');
const review_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const product_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');

//@
async  function controllers_discount_by_product_app(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var discount_id = -1;
		if(req.query.c1){
			discount_id = req.query.c1;
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
			"position" : "api/app/v5/ctroller/discounts/controllers_discount_by_product_app",
			"message": error_send 
		}); 
		return;	
	}


	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "customer" 
	|| check_role_result == "default" 
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
			"error" : "2",
			"position" : "api/app/v5/ctroller/discounts/controllers_discount_by_product_app",
			"message": error_send 
		}); 
		return;			
	}


	//@ 3. get product
	try{
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
				"stores_name"		
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"discount_program_ID",
						"value"     : discount_id,
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"check_expired",
						"value"     : 0,
						"compare" : ">"
					},
					{   
						"field"     :"check_date",
						"value"     : 0,
						"compare" : "<"
					},   
					{   
						"field"     :"products_speciality_status_store",
						"value"     : "1",
						"compare" : "="
					} ,				
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_product_link_status",
						"value"     : "1",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_details_status_admin",
						"value"     : "4",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_status_admin",
						"value"     : "4",
						"compare" : "="
					} 	
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_product = await discount_search_product(data_get,res);
		
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
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product discount discount, liên hệ admin" 
		);
		res.send ({ 
			"error" : "3", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}		


	//@ 3. get discount program
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"discount_program_ID",
				"discount_program_name"	
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : model_product_arr,
						"compare" : "in"
					},				
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"check_expired",
						"value"     : 0,
						"compare" : ">"
					},
					{   
						"field"     :"check_date",
						"value"     : 0,
						"compare" : "<"
					},   
					{   
						"field"     :"products_speciality_status_store",
						"value"     : "1",
						"compare" : "="
					} ,				
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_product_link_status",
						"value"     : "1",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_details_status_admin",
						"value"     : "4",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_status_admin",
						"value"     : "4",
						"compare" : "="
					} 	
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_discount = await discount_search_product(data_get,res);
		
		for(x in data_product){
			var add_data = [];
			var add_data_line = {};
			for(y in data_discount){
				if(data_product[x].products_speciality_ID == data_discount[y].products_speciality_ID){
					add_data_line.id = data_discount[y].discount_program_ID;	
					add_data_line.name = data_discount[y].discount_program_name;	
				}							
			}
			add_data.push(add_data_line);
			data_product[x].discount_program = add_data;
		}			
		
		
	}
	catch(error){
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product discount program, liên hệ admin" 
		);
		res.send ({ 
			"error" : "22", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}		

	//@ 3. get product sale
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"orders_details_speciality_product_id",
				"orders_details_speciality_qty"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_details_speciality_product_id",
						"value"     : model_product_arr,
						"compare" : "in"
					}	
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_sale = await product_sale(data_get,res);
		//@ đưa comment vào data return
		var add_data = [];	
		for(x in data_product){
			add_data_line = 0;
			for(y in data_sale){
				if(data_product[x].products_speciality_ID == data_sale[y].orders_details_speciality_product_id){
					add_data_line = data_sale[y].orders_details_speciality_qty;
				}							
			}
			data_product[x].so_luong_da_ban = add_data_line;
		}			
	}
	catch(error){
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product sale discount, liên hệ admin" 
		);
		res.send ({ 
			"error" : "5", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}	







	//@ 3. get review
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"reviews_speciality_ID",
				"reviews_speciality_date_created",
				"reviews_speciality_user_id",
				"reviews_speciality_product_id",
				"reviews_speciality_contents",
				"reviews_speciality_images",
				"reviews_speciality_videos",
				"reviews_speciality_status_admin",
				"reviews_speciality_number_star"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"reviews_speciality_product_id",
						"value"     : model_product_arr,
						"compare" : "in"
					},				
					{   
						"field"     :"reviews_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					}	
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_review = await review_search.search_reviews_spaciality(data_get,res);
		
		
		//@ đưa review vào data return
		var add_data = [];
		for(x in data_product){
			add_data_line = [];
			review_count = 0;
			review_start = 0;
			review_start_one = 0;
			review_start_two = 0;
			review_start_three = 0;
			review_start_four = 0;
			review_start_five = 0;
			for(y in data_review){
				if(data_product[x].products_speciality_ID == data_review[y].reviews_speciality_product_id){
					add_data_line.push(data_review[y]);
					review_count = review_count + 1;
					review_start = review_start + data_review[y].reviews_speciality_number_star;
					if(data_review[y].reviews_speciality_number_star == 1){
						review_start_one = review_start_one + 1;
					}
					if(data_review[y].reviews_speciality_number_star == 2){
						review_start_two = review_start_two + 1;
					}				
					if(data_review[y].reviews_speciality_number_star == 3){
						review_start_three = review_start_three+ 1;
					}					
					if(data_review[y].reviews_speciality_number_star == 4){
						review_start_four = review_start_four+ 1;
					}				
					if(data_review[y].reviews_speciality_number_star == 5){
						review_start_five = review_start_five+ 1;
					}				
				}							
			}
			
			//@ add data line
			if(review_count != 0){
				var review_avg = review_start/review_count;
			}else{
				var review_avg = 0;
			}			
			
			let data_add = {
				"review_datas": add_data_line,
				"review_count": review_count,
				"review_avg": review_avg,
				"review_start_sum": review_start,
				"review_start_one": review_start_one,
				"review_start_two": review_start_two,
				"review_start_three": review_start_three,
				"review_start_four": review_start_four,
				"review_start_five": review_start_five				
			}
			
			data_product[x].reviews = data_add;
		}			
	}
	catch(error){
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get review discount, liên hệ admin" 
		);
		res.send ({ 
			"error" : "4", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}	

	res.send({"error":"","datas":data_product}); 
	return;
	
}

module.exports = controllers_discount_by_product_app;