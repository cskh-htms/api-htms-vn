
/*
------------------------------------

1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2. [get_data_news_bussiness_menu]
	- news  bussiness


4.[get_discount_details_data_taget]	


------------------------------------
*/

const ojs_datas_discount_program_store_add = {
	
	
	
	
	
	
	
	//@
	//@
	//@ 
	//@ 4.[get_discount_details_data_taget]		
	get_discount_details_data_taget: function(datas){
		//@
		//@
		//@
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"discount_program_details_ID",
				"discount_program_details_discount_program_id",
				"discount_program_details_store_id",
				"discount_program_details_status_admin",
				"discount_program_details_price",
				"discount_program_details_limit_day",
				"discount_program_details_limit_product",
				"discount_program_details_qoute",
				"discount_program_details_date_created",
				"discount_program_ID",
				"discount_program_name",
				"check_date"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"discount_program_details_ID",
								"value"     : datas.id,
								"compare" 	: '='
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
				"discount_program_details_ID",
				"discount_program_details_discount_program_id",
				"discount_program_details_store_id",
				"discount_program_details_status_admin",
				"discount_program_details_price",
				"discount_program_details_limit_day",
				"discount_program_details_limit_product",
				"discount_program_details_qoute",
				"discount_program_details_date_created",
				"stores_name",
				"stores_ID",
				"discount_program_name",
				"discount_program_featured_image",
				"discount_program_ID",
				"check_date"
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
								"field"     :"discount_program_details_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
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
	//@ 1. [get_data_news_bussiness_menu]
	get_data_news_bussiness_menu : function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(discount_program_details_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_details_status_admin" ,
								"value" : '3',
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
	//@ 1. [get_data_news_bussiness_menu]		
	
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
					"count(discount_program_details_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_details_status_admin" ,
								"value" : [4,3],
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


module.exports = ojs_datas_discount_program_store_add;




