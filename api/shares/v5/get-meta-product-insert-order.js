

const mysql = require('mysql');

const ojs_configs = require('../../../configs/config');
const config_database = require ('../../configs/config-database');
const config_api = require ('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors.js');

const discount_search_product = require('../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search-product.js');
const review_search = require('../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const product_sale = require('../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search.js');

//@
const discount_product_gift_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/discounts-products-gift/discount-product-gift-search.js');

//@
const price_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/product-speciality-price-meta/product-speciality-price-meta-search.js');


//@
const product_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/products/product-search.js');





//@
//@
//@
//@
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
				"discount_program_name",
				"discount_program_gift_type"				
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
					add_data_line.type = data_discount[y].discount_program_gift_type;
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
		return res.send({ 
			"error" : "1",
			"position" : "api/shares/get meta product", 
			"message": error_send 
			}); 
			
	}	






	//@
	//@
	//@
	//@ 3. get product price
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_price_meta_product_id",
				"products_speciality_price_meta_from",
				"products_speciality_price_meta_to",
				"products_speciality_price_meta_price",
				"products_speciality_price"				
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
					},
					{   
						"field"     :"discount_program_product_link_status",
						"value"     : 1,
						"compare" : "="
					}	
					]    
				}         
			]  
		}
		
		//@ get datas
		var data_product_price = await price_search(data_get,res);
		for(let x in data_product){
			let add_data_line = [];
			for(let y in data_product_price){
				if(data_product[x].products_speciality_ID == data_product_price[y].products_speciality_price_meta_product_id){
					let data_push_line = {
						"from": data_product_price[y].products_speciality_price_meta_from,
						"to": data_product_price[y].products_speciality_price_meta_to,
						"price": data_product_price[y].products_speciality_price_meta_price,
						"percent": Math.floor((
						(data_product_price[y].products_speciality_price - data_product_price[y].products_speciality_price_meta_price)
						* 100 ) / 
						data_product_price[y].products_speciality_price)
						,
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
			"lỗi get product price, liên hệ admin" 
		);
		return res.send ({ 
			"error" : "222", 
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














