
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const ojs_datas_orders = {
	//
	//
	//
	orders_check_menu_data: function(date_star,date_end,sattus_number){
		
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
				"orders_speciality_email"
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
								"value" : sattus_number,
								"compare" : "="
							}							
						]    
					}         
				],
				"order" :
				 [
						{    "field"  :"orders_speciality_date_orders",
							"compare" : "ASC"
						}   
				 ]
			}
		}	
		return datas_return;
	},
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
								"compare" : "="
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
	//@@
	//
	
	//
	//
	//bussiness
	get_data_orders_list_bussiness : function(users_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					
					"orders_details_speciality_order_id",
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
							}							
						]    
					}          
				],
				"order" :[
						{    
							"field"  :"orders_details_speciality_order_id",
							"compare" : "ASC"
						}      
				],
				"group_by" :	
				[
					"orders_details_speciality_order_id"
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




