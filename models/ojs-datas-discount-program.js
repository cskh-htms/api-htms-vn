
/*
------------------------------------




1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2. [get_data_news_bussiness_menu]
	- news bussiness
 5.[get_all_list_datas_count]




------------------------------------
*/

const ojs_datas_discount_program = {
	
	
	
	//@
	//@
	//@ 
	//@ 5.[get_all_list_datas_count]		
	get_all_list_datas_count: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(discount_program_ID)"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"discount_program_store_id_created",
								"value"     : datas.store_id,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"discount_program_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
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
	//@ 5.[get_all_list_datas_count]		
	
	
	
	
	
	//@
	//@
	//@ 
	//@ 3.[get_all_list_datas]		
	get_all_list_datas: function(datas){
		
		
		//@
		//@
		//@
		var data_store_value;
		if(datas.store_compare == 'in'){
			data_store_value = [17,datas.store_id];
		}else{
			data_store_value = datas.store_id
		}
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"discount_program_ID",
				"discount_program_date_created",
				"discount_program_name",
				"discount_program_store_id_created",
				"discount_program_featured_image",
				"discount_program_position",
				"discount_program_status_admin",
				"discount_program_status_update",
				"discount_program_information",
				"discount_program_type",
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
								"field"     :"stores_ID",
								"value"     : data_store_value,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"discount_program_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"discount_program_check_expired",
								"value"     : datas.discount_program_check_expired_value,
								"compare" 	: datas.discount_program_check_expired_compare
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
					"count(discount_program_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_status_admin" ,
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
					"count(discount_program_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_status_admin" ,
								"value" : [2],
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


module.exports = ojs_datas_discount_program;




