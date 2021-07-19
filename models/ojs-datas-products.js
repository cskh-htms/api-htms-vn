
/*
------------------------------------------


1.[get_data_news_admin_menu]
	- lấy số lượng sản phẩm chưa phê duyệt
	- 1. [ojs_shares_news_admin_menu]


2.[get_all_list_datas]


3.[get_data_news_bussiness_menu]
	lấy ness bussiness


4.[get_all_list_datas_count]	
	- count product theo user


5.[get_category_link_datas_show_update]	
	- lấy data cho update product 


6.[get_options_link_datas_show_update]	
	- lấy data cho update product 


7.[get_category_link_datas]	


-------------------------------------------
*/

const ojs_datas_products = {
	
	
	//@
	//@
	//@ 
	//@ 8.[get_all_list_datas]		
	get_all_list_datas_all: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
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
								"field"     :"products_speciality_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"products_speciality_status_store",
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
	//@ 8.[get_all_list_datas]			
	
	
	
	
	
	
	//@
	//@
	//@
	//@	
	//@ 
	//@ 7.[get_category_link_datas]		
	get_category_link_datas: function(){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_ID",
					"category_general_speciality_name"
				]
			}//data
		}
		return datas_return;
	},	
	
	
	//@
	//@	
	//@
	//@
	//@ 
	//@ 6.[get_options_link_datas_show_update]		
	get_options_link_datas_show_update: function(product_id){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[
					"options_product_speciality_link_ID",
					"options_product_speciality_link_product_id",
					"options_product_speciality_link_option_id"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"options_product_speciality_link_product_id",
							"value" 	: product_id,
							"compare" : "="
						}						
						]	
					}				
				],
				"order" :[]
			}//data
		}
		return datas_return;
	},	
	
	//@
	//@
	//@ end of
	//@ 6.[get_category_link_datas_show_update]		
	
	//@
	//@
	//@ 
	//@ 5.[get_category_link_datas_show_update]	
	get_category_link_datas_show_update: function(product_id){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"category_general_speciality_link_product_id",
							"value" 	: product_id,
							"compare" : "="
						}						
						]	
					}				
				]
			}//data
		}
		return datas_return;
	},	
	//@
	//@
	//@ end of 
	//@ 5.[get_category_link_datas_show_update]		
	
	
	
	
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
					"count(products_speciality_ID)",
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
								"field"     :"products_speciality_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"products_speciality_status_store",
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
	//@
	//@ 1.[get_data_news_bussiness_menu]
	get_data_news_bussiness_menu: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(products_speciality_ID)"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
								"compare" : "="
							},
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : '3',
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
	//@ end of
	//@ 1.[get_data_news_bussiness_menu]		
	
	
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ 1.[get_data_news_admin_menu]
	get_data_news_admin_menu: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(products_speciality_ID)"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
								"compare" : "="
							},
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : [0,2],
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
	//@ end of
	//@ 1.[get_data_news_admin_menu]	
	
	
	
	
	//@
	//@
	//@ 
	//@ 2.[get_all_list_datas]		
	get_all_list_datas: function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
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
								"field"     :"products_speciality_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"products_speciality_status_store",
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
	
	
	
	//
	//
	//lay products all 
	get_data_products_list: function(store_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_store",
								"value"     : [0,1],
								"compare" : "in"
							},  
							{   
								"field"     :"products_speciality_store_id",
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
	//
	//lay products all 
	get_data_products_list_ajax: function(datas){
		
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
				"field"     :"products_speciality_store_id",
				"value"     : datas.store_id,
				"compare" : "="
			}
			condition_where.push(store_where);
		}		
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"products_speciality_status_admin",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			
		
		
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
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
	//@
	//
	//lay products all 
	get_data_products_list_bussiness: function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
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
							},							
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : [0,1,2,3],
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
	//
	//lay products all 
	get_data_products_list_admin: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
								"compare" : "="
							},
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : [0,1,2,3],
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
	//lay products all 
	get_data_products_list_admin_ajax: function(datas){
		
		let condition_where = [];
		//@
		//@add user_where
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"products_speciality_status_admin",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			

		//@
		//@add status_admin_where
		if(datas.status_store){
			let status_store_where = {
				"field"     :"products_speciality_status_store",
				"value"     : "1",
				"compare" : "="
			}
			condition_where.push(status_store_where);
		}	
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
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
	//@
	//@
	//
	//lay products chưa puslish
	get_data_product_check: function(status_number){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID"

				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : "0",
								"compare" : "="
							},
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
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
	//
	//
	//lay products chưa puslish

	//@
	//@	
	//@
	//@
	//
	//
	//lay products chưa puslish

	//@
	//@	
	//@
	//@
	//
	//
	//lay products chưa puslish

	//@
	//
	//
	//lay products all 
	get_data_product_list_check_owner: function(product_id,user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
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
							},  
							{   
								"field"     :"products_speciality_ID",
								"value"     : product_id,
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
	//
	
	//
	//
	//lay products all 
	get_data_product_list_admin_news: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition" :
				[
					{    
						"relation": "and",
						"where" :
						[
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
								"compare" : "="
							},
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : [0,2],
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
	//
	//
	//lay products all 
	get_data_product_list_bussiness_news: function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
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
		
	//
	//
	//lay products all 
	get_data_product_list_store_news: function(store_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin",
					"products_speciality_featured_image"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"products_speciality_store_id",
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
	
	
	
	
	
	//@@
	//@@
	//@@
	//@@
	//
	//
}//end of oj_loader


module.exports = ojs_datas_products;




