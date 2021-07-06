
/*
------------------------------------

1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]





------------------------------------
*/

const ojs_datas_option = {
	
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
					"count(options_product_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "options_product_speciality_status_admin" ,
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
	
	
	
	
	
	
	
	
	//
	//
	//data cho check owner option 
	get_data_option_list_check_owner : function(option_id,user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_ID" ,
								"value" : option_id,
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
	get_data_option_list_admin : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "options_product_speciality_status_admin" ,
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
	//@@
	//data cho  option list data amin
	get_data_option_list_admin_news : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_status_stores" ,
								"value" : "1",
								"compare" : "="
							},
							{
								"field" : "options_product_speciality_status_admin" ,
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
	//@@
	//@@
	//@@
	//data cho  option list data bussiness news
	get_data_option_list_bussiness_news : function(user_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
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
	
	//@@
	//@@
	//@@
	//@@
	get_data_option_list_bussiness_ajax : function(datas){
		
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
				"field"     :"options_product_speciality_stores_id",
				"value"     : datas.store_id,
				"compare" : "="
			}
			condition_where.push(store_where);
		}		
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"options_product_speciality_status_admin",
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
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update",
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
	//	
	//@@
	//@@
	//@@
	//@@
	get_data_option_list_admin_ajax : function(datas){
		
		let condition_where = [];
		//@
		//@
		//@add status_admin_where
		if(datas.status_admin){
			let status_admin_where = {
				"field"     :"options_product_speciality_status_admin",
				"value"     : datas.status_admin,
				"compare" : "in"
			}
			condition_where.push(status_admin_where);
		}			
				
		let status_store_where = {
			"field"     :"options_product_speciality_status_stores",
			"value"     : "1",
			"compare" : "="
		}
		condition_where.push(status_store_where);	
	
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update",
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
	//data cho  option list data amin
	get_data_option_list_bussiness : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update",
				"users_ID"
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
	get_data_option_list_select : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_status_admin" ,
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
	//@@	
	
	
	
	//@@
	//@@
	//
	//
	//get data choa show all
	get_data_check_child: function(option_id){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_ID",
				"options_product_speciality_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_parent_id" ,
								"value" : option_id,
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
	//@@
	//@@
	//data cho  option list data amin
	get_data_option_list_add_product : function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"options_product_speciality_parent_id",
				"options_product_speciality_name",
				"options_product_speciality_ID",
				"options_product_speciality_stores_id",
				"options_product_speciality_status_admin",
				"options_product_speciality_status_stores",
				"options_product_speciality_status_update"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "options_product_speciality_status_admin" ,
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
	
	
	
	
	
	
	
	
	
	//
	//
	//
	//
}//end of oj_loader


module.exports = ojs_datas_option;




