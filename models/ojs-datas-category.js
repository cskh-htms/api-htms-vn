
/*
-----------------------------------

* 1. get_data_news_admin_menu]
	- lấy số lượng danh mục chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2.[get_all_list_datas]	
	- lấy list category

3. [get_data_news_bussiness_menu]
	- tin tức cho bussiness
	
	
4.[get_all_list_datas_count]	
	- tính count danh mục theo user
	
5.[get_all_list_datas_all]	
	- lấy tat cả danh sách category
	
6.[get_data_category_product_count]	

7.[get_data_category_product_view]	

8.[get_store_info]

9.[get_category_link_datas]	

10.[get_product_by_user_id]

11.[get_category_info]


12.[get_data_category_product_count_admin]	

13.[get_data_category_product_view_admin]

14.[get_category_link_datas_admin]	

-----------------------------------
*/

const ojs_datas_category = {
	
	//@
	//@
	//@ 14.[get_category_link_datas_admin]		
	get_category_link_datas_admin: function(){
		
		let datas_return = 	
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_ID",
					"category_general_speciality_name"
				]
			  }
			}
		return datas_return;
	},		
	//@
	//@
	//@ 13.[get_data_category_product_view_admin]	
	get_data_category_product_view_admin: function(category_id){		
		let datas_return = 	
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
					"products_speciality_ID",
					"products_speciality_date_created",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "category_general_speciality_ID",
						"value": category_id,
						"compare": "="
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
	//@ 12.[get_data_category_product_count_admin]	
	get_data_category_product_count_admin: function(){		
		let datas_return = 	
			{
				"datas" :   {
					"select_field" :
					[ 
					"category_general_speciality_ID",
					"users_ID",
					"stores_ID",
					"product_count"
					]    
				}
			}
		return datas_return;
	},		
	
	//@
	//@
	//@ 
	//@ 11.[get_category_info]
	get_category_info: function(category_id){
		
		let datas_return = 	
			{
				"datas" :   
				{
					"select_field" :
					[ 
					"category_general_speciality_ID",
					"category_general_speciality_name"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "category_general_speciality_ID",
						"value": category_id,
						"compare": "="
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
	//@ 10.[get_product_by_user_id]
	get_product_by_user_id: function(user_id){
		
		let datas_return = 	
			{
				"datas": 
				{
					"select_field": [
					  "orders_details_speciality_product_id",
					  "orders_details_speciality_qty",
					  "stores_ID"
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
					]
				}
			}		

		return datas_return;
	},	
	//@
	//@		
	
	
	//@
	//@
	//@ 9.[get_category_link_datas]		
	get_category_link_datas: function(store_id){
		
		let datas_return = 	
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_ID",
					"category_general_speciality_name"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "stores_ID",
						"value": store_id,
						"compare": "="
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
	//@ 8.[get_store_info]	
	get_store_info: function(store_id){		
		let datas_return = 	
			{
				"datas" :   {
					"select_field" :
					[ 
						"stores_ID",
						"stores_user_id",
						"stores_name" ,
						"stores_date_created",
						"stores_adress",
						"service_type_name",
						"users_first_name",
						"users_last_name",
						"users_full_name",					
						"stores_payment_limit",
						"stores_status_update",
						"stores_status_admin",
						"stores_status_stores",
						"stores_wards",
						"stores_district",
						"stores_province"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "stores_ID",
						"value": store_id,
						"compare": "="
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
	//@ 7.[get_data_category_product_view]	
	get_data_category_product_view: function(category_id,store_id){		
		let datas_return = 	
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
					"products_speciality_ID",
					"products_speciality_date_created",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "stores_ID",
						"value": store_id,
						"compare": "="
					  },
					  {
						"field": "category_general_speciality_ID",
						"value": category_id,
						"compare": "="
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
	//@ 6.[get_data_category_product_count]	
	get_data_category_product_count: function(store_id){		
		let datas_return = 	
			{
				"datas" :   {
					"select_field" :
					[ 
					"category_general_speciality_ID",
					"users_ID",
					"stores_ID",
					"product_count"
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[
							{   
								"field"     :"stores_ID",
								"value"     : store_id,
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
	//@ 5.[get_all_list_datas_all]		
	get_all_list_datas_all: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
				"category_general_speciality_ID",
				"category_general_speciality_date_created",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
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
								"field"     :"category_general_speciality_admin_status",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"category_general_speciality_stores_status",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
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
	//@ 5.[get_all_list_datas_all]		
	
	
	
	//@
	//@
	//@ 
	//@ 4.[get_all_list_datas_count]	
	//@ - count (số lượng category theo cửa hàng)
	get_all_list_datas_count: function(datas){
		
		//return datas;
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"count(category_general_speciality_ID)",
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
								"field"     :"category_general_speciality_admin_status",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"category_general_speciality_stores_status",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
							} 								
						]    
					}
				],
				"group_by" :
				 [
					"users_ID"
				 ]  
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
	//@  * 3. get_data_news_bussiness_menu]
	get_data_news_bussiness_menu : function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"count(category_general_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_stores_status",
							"value"     : '1',
							"compare" 	: "="
						},
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : '3',
							"compare" 	: "="
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
	//@ end of
	//@  * 3. get_category_news_bussiness_menu]	
	
	
	
	
	//@
	//@
	//@
	//@
	//@  * 1. get_data_news_admin_menu]
	get_data_news_admin_menu : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"count(category_general_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_stores_status",
							"value"     : "1",
							"compare" 	: "="
						},
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : [0,2],
							"compare" 	: 'in'
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
	//@ end of
	//@  * 1. get_category_news_admin_menu]
	
	
	
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
				"category_general_speciality_ID",
				"category_general_speciality_date_created",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
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
								"field"     :"category_general_speciality_admin_status",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"category_general_speciality_stores_status",
								"value"     : datas.status_store_value,
								"compare" 	: datas.status_store_compare
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
	//@ 2.[get_all_list_datas]	
	
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//* lấy danh mục cho update order

	//@
	//@
	//@
	//@
	get_data_category_list: function(cat_id,user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{    "field"    :"category_general_speciality_ID",
							"value"     : cat_id,
							"compare" 	: "="
						},
						{    "field"    :"users_ID",
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
	//@@
	//@@
	//@@		
	//@@
	//@@
	//
	//
	//get data choa show all
	get_data_category_list_admin: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_stores_status",
							"value"     : "1",
							"compare" 	: "="
						},
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : [0,1,2],
							"compare" 	: "in"
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
	//@@
	//
	//
	//get data choa show all
	get_data_category_list_admin_news: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
				"users_ID",
				"stores_ID"				
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_stores_status",
							"value"     : "1",
							"compare" 	: "="
						},
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : [0,2],
							"compare" 	: "in"
						}							
						]    
					}     
				]
			}
		}	
		return datas_return;
	},
	//
	//@@
	//
	//
	//get data choa show all
	get_data_category_list_bussiness_news: function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
				"users_ID",
				"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{    "field"    :"users_ID",
							"value"     : user_id,
							"compare" 	: "="
						}						
						]    
					}     
				]
			}
		}	
		return datas_return;
	},	//@@
	//@@		
	//@@
	//@@		
	//@@
	//@@
	//
	//
	//get data choa show all
	get_data_category_list_bussiness: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
				"users_ID",
				"stores_ID"
				]
			}
		}	
		return datas_return;
	},
	//@@		
	//@@
	//
	
	
	//get_data_category_list_admin
	
	
	//
	//get data choa show all
	get_data_category_list_admin_ajax: function(datas){
		
		
		let condition_where = [];
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"category_general_speciality_admin_status",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			
				
		let status_store_where = {
			"field"     :"category_general_speciality_stores_status",
			"value"     : "1",
			"compare" : "="
		}
		condition_where.push(status_store_where);		
		//@
		//@
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
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
	//	
	
	
	
	//
	//get data choa show all
	get_data_category_list_bussiness_ajax: function(datas){
		
		
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
				"field"     :"category_general_speciality_stores_id ",
				"value"     : datas.store_id,
				"compare" : "="
			}
			condition_where.push(store_where);
		}		
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"category_general_speciality_admin_status",
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
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_stores_id",
				"category_general_speciality_stores_status",
				"category_general_speciality_show",
				"category_general_speciality_admin_status",
				"category_general_speciality_update_status",
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
	//
	//
	//get data choa show all
	get_data_check_child: function(cat_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{    "field"    :"category_general_speciality_category_parent_id",
							"value"     : cat_id,
							"compare" 	: "="
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
	//@@
	//@@
	//
	//
	//get data choa show all
	get_data_category_list_select: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : "1",
							"compare" 	: "="
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
	//
	//
	//get data choa show all
	get_data_category_list_add_product: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[ 
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_admin_status",
							"value"     : "1",
							"compare" 	: "="
						}							
						]    
					}     
				]
			}
		}	
		return datas_return;
	}	
	//@@		
	//@@
	//@@	
	//@@		
	//@@
	//@@
	
}//end of oj_loader


module.exports = ojs_datas_category;




