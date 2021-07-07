
/*
-----------------------------------

* 1. get_data_news_admin_menu]
	- lấy số lượng danh mục chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]






-----------------------------------
*/

const ojs_datas_category = {
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
							"value"     : [1],
							"compare" 	: "not in"
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
				]
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
	get_data_category_list_update_order: function(order_id){	
		let datas_return = 	
		{	
			"datas" :   {
				"select_field" :
				[
					"orders_speciality_user_id",
					"orders_speciality_status_orders",
					"orders_speciality_status_payment",
					"orders_speciality_adress",
					"orders_speciality_notes",
					"orders_speciality_phone",
					"orders_speciality_email",
					"orders_details_speciality_line_order",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"orders_details_speciality_price",
					"orders_details_speciality_discount",
					"orders_details_speciality_unit_discount",
					"products_speciality_name",
					"orders_speciality_ID",
					"orders_details_medium_text",
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
				],
				"order" :
				 [
						{    "field"  :"orders_details_speciality_line_order",
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




