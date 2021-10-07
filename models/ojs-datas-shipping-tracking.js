
/*
-------------------------------------


1.[get_orders_list]	

2.[get_orders_list_arr]	

3.[get_orders_list_infor]	







-------------------------------------
*/

const ojs_datas_shipping_tracking = {
	//@
	//@
	//@ 	
	
	
	//@
	//@ 	
	//@
	//@
	//@ 
	//@ 3.[get_orders_list_infor]		
	get_orders_list_infor: function(user_id){
		
		let datas_return = 	
			{
				"datas" :   {
					"select_type":"DISTINCT",
					"select_field" :
					[ 
						"shipping_tracking_orders_id",
						"shipping_tracking_date_created",
						"shipping_tracking_orders_status"
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[
							{   
								"field"     :"shipping_tracking_users_id",
								"value"     : user_id,
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
	//@ 2.[get_orders_list_details]		
	get_orders_list_details: function(order_arr){
		
		let datas_return = 	
			{
				"datas" :   {
					"select_type":"DISTINCT",
					"select_field" :
					[
					"orders_speciality_ID",
					"products_speciality_name",
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
	//@ 2.[get_orders_list_arr]		
	get_orders_list_arr: function(order_arr){
		
		let datas_return = 	
			{
				"datas" :   {
					"select_type":"DISTINCT",
					"select_field" :
					[
					"orders_speciality_ID",
					"users_full_name",
					"orders_speciality_province",
					"orders_speciality_district",
					"orders_speciality_wards",
					"orders_speciality_adress",
					"orders_speciality_notes",
					"orders_speciality_phone",
					"stores_province",
					"stores_district",
					"stores_wards",
					"stores_adress",
					"stores_phone",
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
							"field"     :"orders_speciality_ID",
							"value"     : order_arr,
							"compare" : "in"
						},  
						{   
							"field"     :"stores_name",
							"value"     : "",
							"compare" : "not null"
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
			}	
		return datas_return;
	},
	//@
	//@
	//@ 	
	//@
	//@
	//@ 
	//@ 1.[get_orders_list]		
	get_orders_list: function(user_id){
		
		let datas_return = 	
			{
				"datas" :   {
					"select_type":"DISTINCT",
					"select_field" :
					[ 
						"shipping_tracking_orders_id"
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[
							{   
								"field"     :"shipping_tracking_users_id",
								"value"     : user_id,
								"compare" : "="
							} ,
							{   
								"field"     :"shipping_tracking_orders_status",
								"value"     : 100,
								"compare" : "<>"
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
	//@@
	//@
}//end of oj_loader


module.exports = ojs_datas_shipping_tracking;




