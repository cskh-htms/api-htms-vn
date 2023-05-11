

const mysql = require('mysql');

const ojs_configs = require('../../../configs/config');
const config_database = require ('../../configs/config-database');
const config_api = require ('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors.js');

//const discount_search_product = require('../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search-product.js');
//const review_search = require('../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
//const product_sale = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');

const orders_search_by_customer = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const shipping_tracking_search = require('../../lib/' + config_api.API_LIB_VERSION + '/shipping-tracking/shipping-tracking-search.js');

const function_export = async function (data_order,order_arr,res) {
	var data_return = {};
	
	
	//@
	//@ 
	//@ order details
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"products_speciality_name",
				"products_speciality_featured_image",
				"orders_details_speciality_line_order",
				"orders_details_speciality_qty",
				"orders_details_speciality_price",
				"price_caution"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_ID",
						"value"     : order_arr,
						"compare" : "in"
					},						
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "product",
						"compare" : "="
					}
					]    
				}         
			]   
		}
		
		//@ data_order
		var data_order_details = await orders_search_by_customer(data_get,res);
		//return res.send(data_order);
		//return;
		
		
		
		
		for(x in data_order){
			var add_data = [];
			var add_data_line = {};
			for(y in data_order_details){
				if(data_order[x].orders_speciality_ID == data_order_details[y].orders_speciality_ID){
					//add_data_line.name = data_order_details[y].products_speciality_name;	
					add_data.push(data_order_details[y]);
				}							
			}
			//add_data.push(add_data_line);
			data_order[x].order_details = add_data;
		}				
		//return data_order;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//res.send ({ 
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
	//@ gift sản phẩm quà tặng
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"products_speciality_name",
				"products_speciality_featured_image",
				"orders_details_speciality_line_order",
				"orders_details_speciality_qty",
				"orders_details_speciality_price",
				"price_caution"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_ID",
						"value"     : order_arr,
						"compare" : "in"
					},						
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "gift",
						"compare" : "="
					}
					]    
				}         
			]   
		}
		
		//@ data_order
		var data_gift = await orders_search_by_customer(data_get,res);
		//return res.send(data_order);
		//return;
		
		
		
		
		for(x in data_order){
			var add_data = [];
			var add_data_line = {};
			for(y in data_gift){
				if(data_order[x].orders_speciality_ID == data_gift[y].orders_speciality_ID){
					add_data.push(data_gift[y]);
				}							
			}
			//add_data.push(add_data_line);
			data_order[x].order_gift = add_data;
		}				
		//return data_order;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//res.send ({ 
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get meta product discount propram, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "001",
			"position" : "api/shares/get meta product", 
			"message": error_send 
			}); 
			
	}	







	//@
	//@
	//@
	//@ shipping price
	let data_get =    
	{
	   "select_field" :
		[
			"orders_speciality_ID",
			"products_speciality_name",
			"products_speciality_featured_image",
			"orders_details_speciality_line_order",
			"orders_details_speciality_qty",
			"orders_details_speciality_price",
			"price_caution"				
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_speciality_ID",
					"value"     : order_arr,
					"compare" : "in"
				},						
				{   
					"field"     :"orders_details_speciality_line_order",
					"value"     : "shipping",
					"compare" : "="
				}
				]    
			}         
		]   
	}
	
	//@ data_order
	var data_shipping = await orders_search_by_customer(data_get,res);
	//return res.send([data_shipping]);
	//return;
	
	for(let x in data_order){
		let add_data = [];
		let add_data_line = {};
		for(let y in data_shipping){
			if(data_order[x].orders_speciality_ID == data_shipping[y].orders_speciality_ID){
				add_data_line.price = data_shipping[y].orders_details_speciality_price;	
			}							
		}
		add_data.push(add_data_line);
		data_order[x].shipping_price = add_data;
	}		
	
	//return data_order;		

	
	
	
	//@
	//@
	//@
	//@ fee
	let data_get_fee =    
	{
	   "select_field" :
		[
			"orders_speciality_ID",
			"products_speciality_name",
			"products_speciality_featured_image",
			"orders_details_speciality_line_order",
			"orders_details_speciality_qty",
			"orders_details_speciality_price",
			"orders_details_medium_text",
			"price_caution"				
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_speciality_ID",
					"value"     : order_arr,
					"compare" : "in"
				},						
				{   
					"field"     :"orders_details_speciality_line_order",
					"value"     : "add_fee",
					"compare" : "="
				}
				]    
			}         
		]   
	}
	
	//@ data_order
	var data_fee = await orders_search_by_customer(data_get_fee,res);
	//return res.send([data_shipping]);
	//return;
	
	for(let x in data_order){
		let add_data = [];
		let add_data_line = {};
		for(let y in data_fee){
			if(data_order[x].orders_speciality_ID == data_fee[y].orders_speciality_ID){
				add_data_line.fee_price = data_fee[y].orders_details_speciality_price;	
				add_data_line.fee_name = data_fee[y].orders_details_medium_text;	
				add_data.push(add_data_line);
			}							
		}
		
		data_order[x].fee = add_data;
	}		
	
	//return data_order;		
	
	

	//@
	//@
	//@
	//@ shipping tracking
	let data_get_tracking =    
	{
	   "select_field" :
		[
			"shipping_tracking_ID",
			"orders_speciality_ID",
			"users_full_name",
			"shipping_tracking_date_created",
			"shipping_tracking_users_id",
			"shipping_tracking_orders_id",
			"shipping_tracking_orders_status",
			"shipping_tracking_qoute",
			"shipping_tracking_infomation"				
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"shipping_tracking_orders_id",
					"value"     : order_arr,
					"compare" : "in"
				}
				]    
			}         
        ],
        "order" :
        [
             {    "field"  :"shipping_tracking_date_created",
                   "compare" : "ASC"
             }   
        ] 		
	}
	
	//@ data_order
	var data_shipping_tracking = await shipping_tracking_search(data_get_tracking,res);
	//return res.send([data_shipping_tracking]);
	//return;
	
	
	
	for(let x in data_order){
		let add_data = [];
		let add_data_line = {};
		for(let y in data_shipping_tracking){
			if(data_order[x].orders_speciality_ID == data_shipping_tracking[y].orders_speciality_ID){
				add_data.push(data_shipping_tracking[y]);
			}							
		}
		data_order[x].shipping_tracking = add_data;
	}		
	
	//return data_order;		
	
	
	
	
	
	//@
	//@
	//@
	//@ coupon
	var data_get_coupon =    
	{
	   "select_field" :
		[
			"orders_speciality_ID",
			"products_speciality_name",
			"products_speciality_featured_image",
			"orders_details_speciality_line_order",
			"orders_details_speciality_qty",
			"orders_details_speciality_price",
			"price_caution",
			"orders_details_medium_text"			
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_speciality_ID",
					"value"     : order_arr,
					"compare" : "in"
				},						
				{   
					"field"     :"orders_details_speciality_line_order",
					"value"     : "coupon",
					"compare" : "="
				}
				]    
			}         
		]   
	}
	
	//@ data_order
	var data_order_coupon = await orders_search_by_customer(data_get_coupon,res);
	//return res.send(data_order_coupon);
	//return;
	
	for(x in data_order){
		var add_data = [];
		var add_data_line = {};
		for(y in data_order_coupon){
			if(data_order[x].orders_speciality_ID == data_order_coupon[y].orders_speciality_ID){
				//add_data_line.name = data_order_details[y].products_speciality_name;	
				add_data.push(data_order_coupon[y]);
			}							
		}
		//add_data.push(add_data_line);
		data_order[x].order_coupon = add_data;
	}				
	//return data_order;	
	
	return(data_order); 
};	


module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














