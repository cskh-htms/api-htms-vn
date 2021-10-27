
/*
@user : van luc 
@date : 21.10.2020


[ojs_datas_orders]

* 1. [orders_check_menu_data]
	* làm datas cho [news_order]
	* module dùng 
		1. [ojs_shares_news_admin_menu]
		
2. [get_orders_datas]		
	- thống kê theo cửa hàng	
		
	
 3. [get_datas_orders_product_list]
	- thống kê theo sản phẩm
	
4.[orders_check_bussiness_menu_data]
	- news bussiness datas
	
5.[get_order_list_by_user]
	- lấy danh sách dơn hàng theo user	
	
	
6.[get_all_list_datas]
	- lấy danh sách dơn hàng tất cả theo user		
	
	
7.[get_all_list_datas_count]	
	-  lấy count dơn hàng theo user
	
	
8.[get_data_products_count]		
	- tổng số lượng sản phẩm bán theo cửa hàng
	
	
9.[get_order_list_sum_count]	
	- lấy danh sách order có sum qty, sum price
	
10.[get_data_orders_detail_bussiness]	
	- xem order	
	
	
11.[get_data_orders_detail_bussiness_taget]	
	- lấy orders theo id	
	
	
	
12.[get_all_list_datas_all]	
	- lấy orders all	
	
	
	
13.[get_orders_arr_admin]	
	- lấy arr order yêu cầu thanh toán	
	
14.[get_stores_arr_admin]	
	- lấy arr order yêu cầu thanh toán	 detail theo arr
	
15.[get_stores_details_admin]
	- lấy danh sách detial theo order arr (admin)

16.[get_coupon_data]

17.[get_data_coupon_list_view_orders]
	
*/







const ojs_datas_orders = {
	
	
	//@ 17.[get_data_coupon_list_view_orders]
	get_data_coupon_list_view_orders : function(order_id){
		let datas_return = 			
		{
			"datas": {
				"select_field": [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type",
					"sum(orders_details_speciality_price)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"orders_speciality_ID",
							"value"     : order_id,
							"compare" : "="
						}                                      
						]    
					}         
				],
				"group_by" :
				 [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type"
				 ] 
			}
		}		
		return datas_return;		
	},		
	
	
	
	//@
	//@ 16.[get_coupon_data]	
	get_coupon_data : function(user_id){
		let datas_return = 			
		{
			"datas": {
				"select_field": [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type",
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
							"value"     : user_id,
							"compare" : "="
						}                                      
						]    
					}         
				],
				"group_by" :
				 [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type"
				 ] 
			}
		}		
		return datas_return;		
	},		
	//@
	//@	
	//@	
	//@
	//@		
	
	
	
	//@
	//@	
	//@	
	//@
	//@	15.[get_stores_details_admin]
	get_stores_details_admin : function(){
		let datas_return = 			
			{
				"datas" :   {
					"select_field" :
					[
					"orders_speciality_ID",
					"orders_details_speciality_line_order",
					"orders_details_speciality_product_id",
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
									"field" : "orders_speciality_status_pull_money" ,
									"value" : 2,
									"compare" : "="
								}					
							]    
						}         
					]
				}
			}	
		return datas_return;			
	},		
	//@
	//@	
	//@	
	//@
	//@	
	
	//@
	//@	
	//@	
	//@
	//@	
	//@	14.[get_stores_arr_admin]	
	get_stores_arr_admin : function(){
		let datas_return = 	
			{
				"datas" :   {
					"select_type" : "DISTINCT",
					"select_field" :
					[
					"stores_name",
                    "stores_phone",
                    "stores_adress",
                    "stores_province",
                    "stores_district",
                    "stores_wards",					
					"orders_speciality_store_id",
					"stores_discount_price"
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[  
								{
									"field" : "orders_speciality_status_pull_money" ,
									"value" : 2,
									"compare" : "="
								}					
							]    
						}         
					]
				}
			}		
		return datas_return;			
	},		
	//@
	//@	
	//@	
	//@
	//@			
	
	
	//@
	//@	
	//@	
	//@
	//@	
	//@	13.[get_orders_arr_admin]	
	get_orders_arr_admin : function(){
		let datas_return = 	
			{
				"datas" :   {
					"select_type" : "DISTINCT",
					"select_field" :
					[
					"orders_speciality_store_id",
					"orders_speciality_ID"
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[  
								{
									"field" : "orders_speciality_status_pull_money" ,
									"value" : 2,
									"compare" : "="
								}					
							]    
						}         
					]
				}
			}	
		return datas_return;			
	},		
	//@
	//@	
	//@	
	//@
	//@		
	
	
	
	
	
	
	
	
	
	
	
	//@
	//@	
	//@	
	//@
	//@	
	//@
	//@ 12.[get_all_list_datas_all]	
	//@ - lấy orders all
	get_all_list_datas_all_customer : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[ 
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"stores_ID",
					"stores_name",
					"users_full_name",
					"orders_speciality_notes",
					"orders_speciality_adress",
					"orders_speciality_status_payment"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							},
							{
								"field" : "orders_speciality_status_payment" ,
								"value" : datas.status_payment_value,
								"compare" : datas.status_payment_compare
							}						
						]    
					}          
				],
				"order":datas.order			
			}
		}	
		return datas_return;			
	},		
		
	
	//@
	//@	
	//@	
	//@
	//@	
	//@
	//@ 12.[get_all_list_datas_all]	
	//@ - lấy orders all
	get_all_list_datas_all : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[ 
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"stores_ID",
					"stores_name",
					"users_full_name",
					"orders_speciality_notes",
					"orders_speciality_adress",
					"orders_speciality_status_payment"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							},
							{
								"field" : "orders_speciality_status_payment" ,
								"value" : datas.status_payment_value,
								"compare" : datas.status_payment_compare
							}						
						]    
					}          
				],
				"order":datas.order			
			}
		}	
		return datas_return;			
	},		
	
	
	
	
	
	
	
	
	
	//@
	//@	
	//@
	//@ 11.[get_data_orders_detail_bussiness_taget]	
	//@ - lấy orders theo id	
	get_data_orders_detail_bussiness_taget : function(order_id){
		
		let datas_return = 		
		{
			"datas" :   {
				"select_field" :
				[
					"orders_speciality_ID",
					"orders_speciality_status_orders",
					"orders_speciality_adress",
					"orders_speciality_date_orders",
					"users_full_name"					
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[        
							{   "field"     :"orders_speciality_ID",
								"value"     : order_id,
								"compare" 	: "="
							} 					
						]    
					}         
				]
			}	
		}	
		return datas_return;	
	},	
	
	//@
	//@
	//@	
	//@
	//@ 10.[get_data_orders_detail_bussiness]	
	//@ - lấy order details
	get_data_orders_detail_bussiness : function(order_id){
		
		let datas_return = 		
		{
			"datas" :   {
				"select_field" :
				[
					"orders_details_speciality_line_order",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"orders_details_speciality_price",
					"products_speciality_name",
					"orders_details_medium_text",
					"price_caution",
					"orders_details_speciality_ID"					
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[        
							{   "field"     :"orders_details_speciality_order_id",
								"value"     : order_id,
								"compare" 	: "="
							} 					
						]    
					}         
				]
			}	
		}	
		return datas_return;	
	},	
	
	//@
	//@
	//@
	//@	
	//@
	//@ 9.[get_order_list_sum_count]	
	get_order_list_sum_count : function(datas){
		
		//return datas;
		
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_speciality_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders",
					"sum(orders_details_speciality_qty)",
					"sum(price_caution)",
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							}						
						]    
					}          
				],
				"group_by" :	
				[
					"orders_speciality_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				]			
			}
		}	
		return datas_return;			
	},	
	//@
	//@	
	//@ end of 
	
	
	
	
	
	
	//@	
	//@	
	//@	
	//@	
	//@	
	//@
	//@ 8.[get_data_products_count]	
	get_data_products_count : function(store_id){	
		let datas_return = 		
		{	
			"datas" :   {
				"select_field" :
				[
					"products_speciality_ID",		
					"orders_details_speciality_qty_sum"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "stores_ID" ,
								"value" : store_id,
								"compare" : "="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : "1",
								"compare" : "="
							}	
						]    
					}          
				],
				"order" :
				 [
					{    "field"  :"products_speciality_ID",
						"compare" : "ASC"
					} 				
				],
				"group_by" : 
				[
					"products_speciality_ID"
				]
			}	
		}		
		return datas_return;	
	},		
	//@	
	//@ end of
	//@ 8.[get_data_products_count]		
	
	
	
	
	//@
	//@
	//@
	//@	
	//@
	//@ 7.[get_all_list_datas_count]	
	get_all_list_datas_count : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_field" :
				[ 					
					"count(orders_speciality_ID)",
					"users_ID",
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							}			
						]    
					}          
				],
				"group_by" :
				[
					"users_ID"
				],			
			}
		}	
		return datas_return;			
	},	
	//@
	//@
	//@
	//@	
	//@ end of 
	//@ 7.[get_all_list_datas_count]		
	
	//@
	//@
	//@
	//@	
	//@
	//@ 6.[get_all_list_datas]	
	get_all_list_datas : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_field" :
				[ 
					
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"stores_ID",
					"stores_name",
					"orders_speciality_status_payment"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							}					
						]    
					}          
				],
				"order":datas.order			
			}
		}	
		return datas_return;			
	},	
	//@
	//@
	//@
	//@	
	//@ end of 
	//@ 6.[get_all_list_datas]	
		
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@	
	//@
	//@ 5.[get_order_list_by_user]	
	get_order_list_by_user : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[ 
					
					"stores_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							}						
						]    
					}          
				]		
			}
		}	
		return datas_return;			
	},	
	//@
	//@
	//@
	//@	
	//@ end of 
	//@ 5.[get_order_list_by_user]	
	
	
	
	
	
	//@
	//@
	//@
	//@ 
	//@ 4.[orders_check_bussiness_menu_data]		
	orders_check_bussiness_menu_data: function(datas){
		var datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"count(orders_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : [datas.status_number],
								"compare" : "not in"
							},
							{
								"field" : "users_ID" ,
								"value" : datas.user_id,
								"compare" : datas.user_compare
							}								
						]    
					}         
				]
			}
		}	
		return datas_return;
	},		
	//@
	//@
	//@
	//@ end of
	//@ 4.[orders_check_bussiness_menu_data]		
	
	
	
	
		
	
	//@
	//@
	//@
	//@	thống kê theo sản phẩm
	//@ 3. [get_datas_orders_product_list]
	get_datas_orders_product_list : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					"products_speciality_ID",
					"products_speciality_name",
					"stores_name",
					"sum(orders_details_speciality_qty)",
					"sum(price_caution)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							},
							{
								"field" : "orders_speciality_status_payment" ,
								"value" : datas.status_payment_value,
								"compare" : datas.status_payment_compare
							},								
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"products_speciality_name",
							"compare" : "ASC"
						}      
				],
				"group_by" :	
				[
					"products_speciality_ID",
					"products_speciality_name",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},	
	
	//@
	//@
	//@
	//@
	//@ 3. [get_datas_orders_product_list]		
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@ thống kê theo cửa hàng
	//@ 2. [get_orders_datas]
	get_orders_datas : function(datas){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					"stores_ID",
					"stores_name",
					"sum(orders_details_speciality_qty)",
					"sum(price_caution)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" 	: "users_ID" ,
								"value" 	: datas.user_id,
								"compare" 	: datas.user_compare
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: datas.line_order_value,
								"compare" 	: datas.line_order_compare
							},
							{
								"field" 	: "orders_speciality_date_orders" ,
								"value" 	: datas.date_star,
								"compare" 	: ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : datas.date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : datas.status_admin_value,
								"compare" : datas.status_admin_compare
							},
							{
								"field" : "orders_speciality_status_payment" ,
								"value" : datas.status_payment_value,
								"compare" : datas.status_payment_compare
							},								
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"stores_name",
							"compare" : "ASC"
						}      
				],
				"group_by" :	
				[
					"stores_ID",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},	
	
	//@
	//@
	//@
	//@
	//@ 2. [get_orders_datas]	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@ 
	//@ 1.[orders_check_menu_data]
	orders_check_menu_data: function(date_star,date_end,status_number){
		var datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"count(orders_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : [100],
								"compare" : "not in"
							}							
						]    
					}         
				]
			}
		}	
		return datas_return;
	},	
	//@
	//@
	//@
	//@ end of 
	//@ 1.[orders_check_menu_data]	
	

	
	//@
	//@
	//* 
	// * lấy dố lượng bán của sản phẩm (cho admin)
	//* lấy danh sách sản phẩm và số lượng bán của mỗi sản phẩm
	//* cho product trình bày
	get_data_products_count_admin : function(){	
		let datas_return = 		
		{	
			"datas" :   {
				"select_field" :
				[
					"products_speciality_ID",		
					"orders_details_speciality_qty_sum"		
				],
				"order" :
				 [
					{    "field"  :"products_speciality_ID",
						"compare" : "ASC"
					} 				
				],
				"group_by" : 
				[
					"products_speciality_ID"
				]
			}	
		}		
		return datas_return;	
	},	
	//@
	//* 	
	//* 
	// * data order list 
	get_data_orders_list_admin : function(){
		
		let datas_return = 		
		{	
	
		"datas" :   {
			"select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_date_orders",
				"stores_name",
				"users_first_name",
				"users_last_name",
				"orders_speciality_status_payment",
				"orders_speciality_phone",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_adress",
				"orders_speciality_notes",			
				"orders_details_speciality_qty_sum"		
			],
			"order" :
			 [
				{    "field"  :"orders_speciality_date_orders",
					"compare" : "DESC"
				},
				{    "field"  :"stores_name",
					"compare" : "ASC"
				}  				
			],
			"group_by" : 
			[
				"orders_speciality_ID",
				"orders_speciality_date_orders",
				"stores_name",
				"users_first_name",
				"users_last_name",
				"orders_speciality_phone",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_adress",
				"orders_speciality_notes",	
			],
			"having" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_name",
						"value"     : " ",
						"compare" : "is not null"
					}                         
					]    
				}         
			],
		}	
		}	
		return datas_return;	
	},	
	
		
	//@
	//@
	//@
	//* 
	// * data order list 
	get_data_orders_list : function(){
		
		let datas_return = 		
		{	
	
		"datas" :   {
			"select_field" :
			[
            "orders_speciality_ID",
            "orders_speciality_date_orders",
            "orders_speciality_user_id",
			"users_first_name",
			"users_last_name",
			"orders_speciality_phone",
            "orders_speciality_status_orders",
            "orders_speciality_status_payment",
            "orders_speciality_adress",
            "orders_speciality_notes",
            "orders_speciality_email",
			"orders_speciality_status_payment",
			"stores_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[  
						{
							"field" : "orders_speciality_status_orders" ,
							"value" : "0",
							"compare" : "="
						}					
					]    
				}         
			],
			"order" :
			 [
					{    "field"  :"orders_speciality_date_orders",
						"compare" : "DESC"
					}   
			 ]
		}	
		}	
		return datas_return;	
	},	
	
	//@
	//* 
	// * data order list ajax for admin
	get_data_orders_list_ajax : function(date_star,date_end,status_number){	
		let datas_return = 		
		{	
			"datas" :   {
				"select_field" :
				[
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"stores_name",
					"users_first_name",
					"users_last_name",
					"orders_speciality_phone",
					"orders_speciality_status_orders",
					"orders_speciality_status_payment",
					"orders_speciality_adress",
					"orders_speciality_notes",		
					"orders_speciality_status_payment",					
					"orders_details_speciality_qty_sum"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[   
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : status_number,
								"compare" : "in"
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							}								
						]    
					}         
				],
				"order" :
				 [
					{    "field"  :"orders_speciality_date_orders",
						"compare" : "DESC"
					},
					{    "field"  :"stores_name",
						"compare" : "ASC"
					}  				
				],
				"group_by" : 
				[
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"stores_name",
					"users_first_name",
					"users_last_name",
					"orders_speciality_phone",
					"orders_speciality_status_orders",
					"orders_speciality_status_payment",
					"orders_speciality_adress",
					"orders_speciality_notes",
					"orders_speciality_status_payment",					
				],
				"having" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"stores_name",
							"value"     : " ",
							"compare" : "is not null"
						}                         
						]    
					}         
				],
			}	
		}		
		return datas_return;	
	},		

	//@
	//@
	//@
	//* 
	// * show-all-order bussiness
	get_data_orders_list_sale_bussiness : function(user_id,date_star,date_end,sattus_number){
		
		let datas_return = 		
		{
			"datas" :   {
				"select_field" :
				[
					"orders_details_speciality_line_order",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"orders_details_speciality_price",
					"orders_details_speciality_discount",
					"orders_details_speciality_unit_discount",
					"products_speciality_name",
					"orders_details_medium_text",
					"orders_speciality_date_orders",
					"stores_name",
					"orders_speciality_status_payment",
					"orders_speciality_status_orders"				
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				]
			}	
		}	
		return datas_return;	
	},
	//	
	//@
	//@	
	//@
	//@
	//@
	//* get_data_orders_detail_bussiness
	// * load detail oeder khi click vao

	//	
	//@
	//@
	//@
	//* get_data_orders_detail_bussiness
	// * load detail oeder khi click vao


	//
	//ghet all data view order
	orders_data_report_all: function(date_star,date_end){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"view_order_report_line_order",
					"view_order_report_price_caution_sum",
					"view_order_report_discount_caution_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "view_order_report_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "view_order_report_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							}						
						]    
					}         
				],
				"group_by" : 
				[
					"view_order_report_line_order"
				]
			}
		}	
		return datas_return;
	},
	//
	//ghet all data view order
	orders_report_store_datas : function(date_star,date_end){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"view_order_report_stores_id",
					"view_order_report_stores_name",
					"view_order_report_price_caution_sum",
					"view_order_report_discount_caution_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "view_order_report_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "view_order_report_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "view_order_report_line_order" ,
								"value" : "product",
								"compare" : "="
							}							
						]    
					}         
				],
				"group_by" : 
				[
					"view_order_report_stores_id",
					"view_order_report_stores_name"
				]
			}
		}	
		return datas_return;
	},
	
	//
	//ghet all data view order
	//bussiness làm báo cáo
	get_order_list_datas : function(users_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"stores_name",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "users_ID" ,
								"value" : users_id,
								"compare" : "="
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							}							
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"stores_name",
							"compare" : "ASC"
						}      
				],
				"group_by" :	
				[
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@
	//
	//
	//
	get_order_list_datas_all : function(users_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"stores_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "users_ID" ,
								"value" : users_id,
								"compare" : "="
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							}							
						]    
					}          
				],
				"group_by" :	
				[
					"stores_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@
	//
	//
	//
	get_order_list_datas_all_store : function(store_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"stores_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "stores_ID" ,
								"value" : store_id,
								"compare" : "="
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							}							
						]    
					}          
				],
				"group_by" :	
				[
					"stores_ID",
					"orders_speciality_status_orders",
					"orders_speciality_date_orders"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@
	//@@	//@@
	//
	//ghet all data view order
	//bussiness làm báo cáo
	get_order_list_datas_sum : function(users_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					"stores_ID",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "users_ID" ,
								"value" : users_id,
								"compare" : "="
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							}							
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"stores_ID",
							"compare" : "ASC"
						}      
				],
				"group_by" :	
				[
					"stores_ID"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//
	//
	//bussiness loader orders
	get_data_orders_list_bussiness : function(user_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_details_speciality_order_id",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum",
					"orders_speciality_date_orders",
					"stores_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				],
				"group_by" :	
				[
					"orders_details_speciality_order_id",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@	
	//
	//
	//bussiness loader orders
	get_data_orders_list_bussiness_load : function(user_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_details_speciality_order_id",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum",
					"orders_speciality_date_orders",
					"stores_name",
					"orders_speciality_status_orders"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				],
				"group_by" :	
				[
					"orders_details_speciality_order_id",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@		
	//@@
	//@@
	//@@
	//@@
	//get_data_orders_list_store_order	
	get_data_orders_list_store_order : function(store_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "stores_ID" ,
								"value" : store_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				],
				"group_by" :	
				[
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders"
				]				
			}
		}	
		return datas_return;			
	},	
	//
	//
	//bussiness
	get_data_orders_detail_bussiness_ajax : function(user_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_details_speciality_order_id",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum",
					"orders_speciality_date_orders",
					"stores_name",
					"orders_speciality_status_orders"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				],
				"group_by" :	
				[
					"orders_details_speciality_order_id",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@		
	
	
	//
	//
	//get_data_orders_detail_bussiness_store_ajax
	get_data_orders_detail_bussiness_store_ajax : function(store_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "in"
							},
							{
								"field" : "stores_ID" ,
								"value" : store_id,
								"compare" : "="
							}		
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_speciality_date_orders",
							"compare" : "DESC"
						}      
				],
				"group_by" :	
				[
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@		
		
	
	
	
	
	
	
	
	
	//
}//end of oj_loader


module.exports = ojs_datas_orders;




