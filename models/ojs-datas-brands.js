
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const ojs_datas_brands = {
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


module.exports = ojs_datas_brands;




