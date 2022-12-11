

const mysql = require('mysql');

const ojs_configs = require('../../../configs/config');
const config_database = require ('../../configs/config-database');
const config_api = require ('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors.js');

const discount_search_product = require('../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search-product.js');
const review_search = require('../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const product_sale = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');

//@
const discount_product_gift_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/discounts-products-gift/discount-product-gift-search.js');

//@
const price_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/product-speciality-price-meta/product-speciality-price-meta-search.js');



const get_meta_product = async function (data_product,model_product_arr,res) {
	var data_return = {};
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
						"value"     : 1,
						"compare" : "="
					},  
					{   
						"field"     :"products_speciality_status_store",
						"value"     : "1",
						"compare" : "="
					},				
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
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get meta product discount propram, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1",
			"position" : "api/shares/get meta product", 
			"message": error_send 
			}); 
		return;	
	}	





	//@
	//@
	//@
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
			"error" : "2", 
			"position" : "api/shares/get meta product",
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
				"reviews_speciality_number_star",
				"users_full_name"			
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
			"error" : "3", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}	
	
	
	
	
	//@ 3. get product gift
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"discount_program_gift_link_product_speciality_id",
				"products_speciality_featured_image",
				"products_speciality_name",			
				"stores_name",
				"stores_ID"			
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"discount_program_gift_link_product_speciality_id",
						"value"     : model_product_arr,
						"compare" : "in"
					},
					{   
						"field"     :"check_expired",
						"value"     : 1,
						"compare" : "="
					}					
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_product_gift = await discount_product_gift_search(data_get,res);
		//@ đưa comment vào data return
		let add_data = [];	
		for(let x in data_product){
			let add_data_line = [];
			for(let y in data_product_gift){
				if(data_product[x].products_speciality_ID == data_product_gift[y].discount_program_gift_link_product_speciality_id){
					let data_push_line = {
						"product_gift_id": data_product_gift[y].products_speciality_ID,
						"product_gift_name": data_product_gift[y].products_speciality_name,
						"product_gift_image": data_product_gift[y].products_speciality_featured_image,
					}
					add_data_line.push(data_push_line);
				}							
			}
			data_product[x].product_gift = add_data_line;
		}			
	}
	catch(error){
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product discount gift, liên hệ admin" 
		);
		res.send ({ 
			"error" : "22", 
			"position" : "api/shares/get meta product",
			"message": error_send 
		});
	}		
	
	
	
	//@ 3. get product price
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_price_meta_product_id",
				"products_speciality_price_meta_from",
				"products_speciality_price_meta_to",
				"products_speciality_price_meta_price"		
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_price_meta_product_id",
						"value"     : model_product_arr,
						"compare" : "in"
					},
					{   
						"field"     :"check_expired",
						"value"     : 1,
						"compare" : "="
					}					
					]    
				}         
			]   
		}
		
		//@ get datas
		var data_product_price = await price_search(data_get,res);
		//@ đưa comment vào data return
		let add_data = [];	
		for(let x in data_product){
			let add_data_line = [];
			for(let y in data_product_gift){
				if(data_product[x].products_speciality_ID == data_product_price[y].discount_program_gift_link_product_speciality_id){
					let data_push_line = {
						"from": data_product_price[y].products_speciality_price_meta_from,
						"to": data_product_price[y].products_speciality_price_meta_to,
						"price": data_product_price[y].products_speciality_price_meta_price,
					}
					add_data_line.push(data_push_line);
				}							
			}
			data_product[x].product_price = add_data_line;
		}			
	}
	catch(error){
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product discount gift, liên hệ admin" 
		);
		res.send ({ 
			"error" : "22", 
			"position" : "api/shares/get meta product",
			"message": error_send 
		});
	}			
	
	
	
	
	

	return(data_product); 
};	


module.exports = get_meta_product;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














