

const mysql = require('mysql');

const ojs_configs = require('../../../configs/config');
const config_database = require ('../../configs/config-database');
const config_api = require ('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors.js');


//@
const order_details_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/order-details/order-detail-search-by-coupon.js');

const coupon_search_by_marketing = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/coupons/coupon-search-marketing.js');






//@
//@
//@
//@
const function_export = async function (data_user,model_user_arr,res) {
	var data_return = {};
	
	
	
	
	//@
	//@
	//@
	//@ 1. get coupon list
	var data_get =    
	{
	   "select_field" :
		[
			"coupon_speciality_code"	
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"users_ID",
					"value"     : model_user_arr,
					"compare" : "in"
				}
				]    
			}         
        ],
        "group_by" :
        [
            "coupon_speciality_code"
        ]		
	}
	
	//@ get datas
	var coupon_list_result = await coupon_search_by_marketing(data_get,res);	


	//res.send([coupon_list_result]);
	//return;	
	
	
	
	
	
	//@
	//@
	//@
	//@ 2. get order in coupon
	var data_get =    
	{
	   "select_field" :
		[
			"coupon_speciality_ID",
			"orders_speciality_ID",
			"coupon_speciality_code",
			"coupon_speciality_intro_price",
			"orders_speciality_date_orders",
			"orders_speciality_status_orders",
			"users_ID"				
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"users_ID",
					"value"     : model_user_arr,
					"compare" : "in"
				}
				]    
			}         
		], 
		"order" :
		 [
			{    
				"field"   :"orders_speciality_date_orders",
				"compare" : "DESC"
			}    
		 ],			
	}
	
	//@ get datas
	var coupon_result = await coupon_search_by_marketing(data_get,res);	


	//res.send([coupon_result]);
	//return;




	//@ create arr ID product
	var order_arr = [0];
	if(coupon_result.length > 0){
		for(x in coupon_result){
			if(coupon_result[x].orders_speciality_ID){
				order_arr.push(coupon_result[x].orders_speciality_ID);
			}
		}
	}	
	//res.send([order_arr]);
	//return;
	
	
	
	
	
	
	//@
	//@
	//@
	//@ 3. get order list in coupon
	var data_get =    
	{
	   "select_field" :
		[
			"orders_details_speciality_order_id",
			"orders_details_speciality_line_order",
			"orders_details_speciality_qty",
			"orders_details_speciality_price",
			"orders_details_medium_text",
			"orders_speciality_status_orders"			
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_details_speciality_order_id",
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
	
	//@ get datas
	var order_result = await order_details_search(data_get,res);	
	res.send([order_result]);
	return;



	for(let x in coupon_list_result){
		var add_data_line = [];
		for(let y in coupon_result){
			if(coupon_list_result[x].coupon_speciality_code == coupon_result[y].coupon_speciality_code){
				let data_push_line = order_result[y].orders_speciality_ID
				add_data_line.push(data_push_line);
			}			


			var add_data_line2 = [];
			for(let z in order_result){
				if(coupon_result[y].orders_speciality_ID == order_result[z].orders_details_speciality_order_id){
					let data_push_line2 = order_result[z]
					add_data_line2.push(data_push_line);
				}		
				
				
			}

			
		}
		
		
		coupon_list_result[x].order = add_data_line;
	}

	
	res.send([coupon_list_result]);
	return;	
	
	
	
	//@
	//@
	//@
	//@ 3. get coupon
	var data_get =    
	{
	   "select_field" :
		[
			"coupon_speciality_ID",
			"coupon_speciality_code",
			"coupon_speciality_intro_price",
			"users_ID"				
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"users_ID",
					"value"     : model_user_arr,
					"compare" : "in"
				},
				{   
					"field"     :"orders_details_speciality_line_order",
					"value"     : "coupon",
					"compare" : "="
				},
				{   
					"field"     :"orders_speciality_status_orders",
					"value"     : [-1,102,20,21],
					"compare" : "not in"
				}	
				]    
			}         
		], 
		"order" :
		 [
			{    
				"field"   :"orders_speciality_date_orders",
				"compare" : "DESC"
			}    
		 ],			
	}
	
	//@ get datas
	var coupon_result = await coupon_search_by_marketing(data_get,res);	


	res.send([model_user_arr]);
	return;	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@ 3. get coupon
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"users_ID",
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_intro_price",
				"sum(orders_details_speciality_price)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : model_user_arr,
						"compare" : "in"
					},
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "coupon",
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}	
					]    
				}         
			],
			"group_by": 
			[
				"users_ID",
				"coupon_speciality_code"
			]			
		}
		
		//@ get datas
		var data_user_meta = await order_details_search(data_get,res);
		for(let x in data_user){
			let add_data_line = [];
			for(let y in data_user_meta){
				if(data_user[x].users_ID == data_user_meta[y].users_ID){
					let data_push_line = {
						"coupon": data_user_meta[y].coupon_speciality_code,
						"tong_ban": (data_user_meta[y].sum_orders_details_speciality_price  * data_user_meta[y].coupon_speciality_intro_price) / 100
					}
					add_data_line.push(data_push_line);
				}							
			}
			data_user[x].coupon_sale = add_data_line;
		}	
	}
	catch(error){
		let evn = ojs_configs.evn;
		evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get data, liên hệ admin" 
		);
		res.send ({ 
			"error" : "222", 
			"position" : "api/shares/get meta user",
			"message": error_send 
		});
	}			
		
	
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@ 3. get coupon
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"users_ID",
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_intro_price",
				"sum(orders_details_speciality_price)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : model_user_arr,
						"compare" : "in"
					},
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "coupon",
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}	
					]    
				}         
			],
			"group_by": 
			[
				"users_ID",
				"coupon_speciality_code"
			]			
		}
		
		//@ get datas
		var data_user_meta = await order_details_search(data_get,res);
		for(let x in data_user){
			let add_data_line = [];
			for(let y in data_user_meta){
				if(data_user[x].users_ID == data_user_meta[y].users_ID){
					let data_push_line = {
						"coupon": data_user_meta[y].coupon_speciality_code,
						"tong_ban": (data_user_meta[y].sum_orders_details_speciality_price  * data_user_meta[y].coupon_speciality_intro_price) / 100
					}
					add_data_line.push(data_push_line);
				}							
			}
			data_user[x].coupon_sale = add_data_line;
		}	
	}
	catch(error){
		let evn = ojs_configs.evn;
		evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get data, liên hệ admin" 
		);
		res.send ({ 
			"error" : "222", 
			"position" : "api/shares/get meta user",
			"message": error_send 
		});
	}			
	
	
	
	
	return data_user; 


};	





module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














