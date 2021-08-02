
/*
-------------------------------------

1.[get_data_user_list_add_store]

2.[get_data_user_taget]





-------------------------------------
*/

const ojs_datas_users = {
	
	
	
	
	//@
	//@
	//@ 
	//@ 2.[get_data_user_taget]		
	get_data_user_taget: function(user_id){
		
		let datas_return = 	
		{
			"datas" :   
			{
				"select_field" :
				[
				"users_ID",
				"users_full_name",
				"users_adress",
				"users_phone",
				"users_email",
				"users_type_ID",
				"users_type_name"
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
	//@ 1.[get_data_user_list_add_store]		
	get_data_user_list_add_store: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"users_ID",
				"users_full_name"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"users_type_name",
								"value"     : "bussiness",
								"compare" 	: "="
							},
							{   
								"field"     :"stores_ID",
								"value"     : "",
								"compare" 	: "null"
							} 								
						]    
					}
				],
				"order" :[
					{    
						"field" :"users_full_name",
						"compare" : "ASC"
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
	//@ 5.[get_all_list_datas_all]		
	get_all_list_datas_all: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"users_date_created",
				"users_ID",
				"users_full_name",
				"users_adress",
				"users_phone",
				"users_email",
				"users_type_ID",
				"users_type_name",
				"users_status"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"users_type_name",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"users_phone",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
							} 								
						]    
					}
				],
				"order" : datas.order,
			}
		}
		return datas_return;
	},	
	//@
	//@
	//@ 
	//@ 5.[get_all_list_datas_all]






	
	//@
	//@
	//@ 
	//@ 4.[get_all_list_datas_count]		
	get_all_list_datas_count: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"count(brands_ID)",
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
								"value"     : datas.user_id,
								"compare" 	: datas.user_compare
							},
							{   
								"field"     :"stores_ID",
								"value"     : datas.store_id,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"brands_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"brands_status_stores",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
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
	//@ 4.[get_all_list_datas_count]			
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ 3. [get_data_news_bussiness_menu]
	get_data_news_bussiness_menu : function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"count(brands_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "brands_status_admin" ,
								"value" : '3',
								"compare" : "="
							},
							{
								"field" : "users_ID" ,
								"value" : datas.user_id,
								"compare" : datas.user_compare
							},
							{
								"field" : "store_ID" ,
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
	//@ 3. [get_data_news_bussiness_menu]		
	
	
	
	
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
				"count(brands_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "brands_status_admin" ,
								"value" : [1],
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
	
	
	
	//@
	//@
	//@ 
	//@ 2.[get_all_list_datas]		
	get_all_list_datas: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID",
				"users_status"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"users_ID",
								"value"     : datas.user_id,
								"compare" 	: datas.user_compare
							},
							{   
								"field"     :"stores_ID",
								"value"     : datas.store_id,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"brands_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"brands_status_stores",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
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
	//@ 2.[get_all_list_datas]		
	
	
	//
	//
	//data cho check owner option 
	get_data_brand_list_check_owner : function(brand_id,user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_ID" ,
								"value" : brand_id,
								"compare" : "="
							},
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}						
						]    
					}         
				]
			}
		}	
		return datas_return;
	},
	//@@
	//@@
	//@@
	//@@
	//data cho  option list data amin
	get_data_brands_list_admin : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "brands_status_admin" ,
								"value" : [0,1,2],
								"compare" : "in"
							}							
						]    
					}         
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
	get_data_brand_list_ajax : function(datas){
		
		
		let condition_where = [];
		//@
		//@add user_where
		if(datas.user_id){
			let user_where = {
				"field"     :"users_ID",
				"value"     : datas.user_id,
				"compare" : "="
			}
			condition_where.push(user_where);
		}
		//@
		//@add store_where
		if(datas.store_id){
			let store_where = {
				"field"     :"brands_stores_id",
				"value"     : datas.store_id,
				"compare" : "="
			}
			condition_where.push(store_where);
		}		
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"brands_status_admin",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			
		
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :condition_where   
					}
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
	//
	get_data_brand_list_admin_ajax	 : function(datas){
		
		
		let condition_where = [];
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"brands_status_admin",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			
		
		//@
		//@add status_admin_where
		if(datas.status_store){
			let status_store_where = {
				"field"     :"brands_status_stores",
				"value"     : "1",
				"compare" : "="
			}
			condition_where.push(status_store_where);
		}	
		
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :condition_where   
					}
				]
			}
		}	
		return datas_return;
	},
	//@@
	//@@
	//@@		
	
	

	
	
	
	
	
	//@@
	//data cho  option list data amin
	get_data_brands_list_bussiness : function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "users_ID" ,
								"value" : user_id,
								"compare" : "="
							}						
						]    
					}         
				]
			}
		}	
		return datas_return;
	},
	//
	//
	//
	//@@
	//@@
	//@@
	//@@
	//data cho  option list data amin
	get_data_brands_list_admin_news : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "brands_status_admin" ,
								"value" : [0,2],
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
	//@@
	//@@
	//@@
	//@@
	//data cho  option list data amin
	get_data_brands_list_bussiness_news : function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "users_ID" ,
								"value" : user_id,
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
	//@@
	//@@
	//@@
	//@@
	//data cho  option list data amin
	get_data_brands_list_add_product : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"brands_ID",
				"brands_name",
				"brands_status_stores",
				"brands_status_admin",
				"brands_stores_id",
				"brands_status_update",
				"users_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "brands_status_admin" ,
								"value" : "1",
								"compare" : "="
							}							
						]    
					}         
				]
			}
		}	
		return datas_return;
	},
	//@@
	//@@
	//@
}//end of oj_loader


module.exports = ojs_datas_users;




