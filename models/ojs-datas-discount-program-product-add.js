
/*
------------------------------------




1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2. [get_data_news_bussiness_menu]
	news bussiness

3.[get_all_list_datas]	




------------------------------------
*/

const ojs_datas_discount_program_product_add = {
	
	
	
	//@
	//@
	//@ 
	//@ 4.[get_all_id_product_active]		
	get_all_id_product_active: function(){	
		//@
		//@
		//@
		let datas_return = 	
		{
			"datas" :   {
				"select_type":"DISTINCT",
				"select_field" :
				[ 
					"discount_program_ID",
					"discount_program_featured_image",
					"discount_program_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"discount_program_product_link_status",
							"value"     : [0,2],
							"compare" : "in"							
						},
						{   
							"field"     :"discount_program_status_admin",
							"value"     : "4",
							"compare" : "="							
						},
						{   
							"field"     :"discount_program_details_status_admin",
							"value"     : "4",
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
	//@ 3.[get_all_list_datas]		
	get_all_list_datas: function(datas){
		
		
		//@
		//@
		//@
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"discount_program_product_link_ID",
				"discount_program_details_ID",
				"discount_program_ID",
				"products_speciality_ID",
				"products_speciality_name",
				"discount_program_product_link_status",
				"discount_program_details_status_admin",
				"products_speciality_sale_of_price",
				"products_speciality_price",
				"stores_ID",
				"stores_name",
				"discount_program_name",
				"discount_program_featured_image"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"stores_ID",
								"value"     : datas.store_id,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"discount_program_product_link_status",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"check_expired",
								"value"     : datas.discount_program_check_expired_value,
								"compare" 	: datas.discount_program_check_expired_compare
							},
							{   
								"field"     :"check_date",
								"value"     : datas.discount_program_check_date_value,
								"compare" 	: datas.discount_program_check_date_compare
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
	//@ 3.[get_all_list_datas]		
	
	
	//@
	//@
	//@
	//@
	//@ 2. [get_data_news_bussiness_menu]
	get_data_news_bussiness_menu : function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(discount_program_product_link_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_product_link_status" ,
								"value" : '2',
								"compare" : "="
						},
						{
							"field" : "users_ID" ,
							"value" : datas.user_id,
							"compare" : datas.user_compare
						},
						{
							"field" : "stores_ID" ,
							"value" : datas.store_id,
							"compare" : datas.store_compare
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
	//@ 2. [get_data_news_bussiness_menu]		
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ 1. [get_data_news_admin_menu]
	get_data_news_admin_menu : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(discount_program_product_link_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_product_link_status" ,
								"value" : [1,3],
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
	//@ 1. [get_data_news_admin_menu]	

	//
	//
	//
	//
}//end of oj_loader


module.exports = ojs_datas_discount_program_product_add;




