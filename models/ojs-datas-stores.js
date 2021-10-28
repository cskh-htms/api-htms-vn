
/*
-------------------------------------------------------

1.[get_all_list_datas]	
	- lấy danh sách store theo user
	
2.[get_all_list_datas_all]	
	- lấy danh sách store all 

3.[get_store_info]






--------------------------------------------------------
*/

const ojs_datas_stores = {
	

	//@
	//@
	//@ 3.[get_store_info]	
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









	
	//@
	//@
	//@ 
	//@ 2.[get_all_list_datas_all]		
	get_all_list_datas_all: function(datas){
		
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
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"stores_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"stores_status_stores",
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
	//@ 2.[get_all_list_datas_all]		
		
	
	//@
	//@
	//@ 
	//@ 1.[get_all_list_datas]		
	get_all_list_datas: function(datas){
		
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
								"field"     :"stores_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"stores_status_stores",
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
	//@ 1.[get_all_list_datas]		
	
	
	
	
	
	
	
	
	
	
	
	//
	//
	//
	stores_payment_list_datas: function(){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"stores_ID",
					"stores_name",
					"stores_payment_limit",
					"payment_period_payment"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "stores_status" ,
								"value" : [0,2],
								"compare" : "in"
							}							
						]    
					}         
				],
				"order" :
				 [
					{    
						"field"  :"stores_name",
						"compare" : "ASC"
					}   
				 ]
			}
		}	
		return datas_return;
	},
	
	//
	//
	//
	get_data_store_list_admin: function(){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"stores_user_id",
					"stores_name" ,
					"stores_date_created",
					"stores_adress",
					"stores_phone",
					"service_type_name",
					"users_first_name",
					"users_last_name",
					"stores_payment_limit",
					"stores_status_update",
					"stores_status",
					"stores_status_stores",
					"users_type_name",
					"stores_province",
					"stores_district",
					"stores_wards"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "stores_status" ,
								"value" : [0,1,2],
								"compare" : "in"
							}							
						]    
					}         
				],
				"order" : 
				[	
					{	
						"field"	: "service_type_name",
						"compare" : "ASC"
					},
					{	
						"field"	: "stores_date_created",
						"compare" : "DESC"
					}						
				]
			}//data
		}	
		return datas_return;
	},	
	//@
	//@	
	//@
	//@
	//news
	get_data_store_list_admin_news: function(){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"stores_user_id",
					"stores_name" ,
					"stores_date_created",
					"stores_adress",
					"stores_phone",
					"service_type_name",
					"users_first_name",
					"users_last_name",
					"stores_payment_limit",
					"stores_status_update",
					"stores_status",
					"stores_status_stores",
					"users_type_name"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "stores_status_stores" ,
								"value" : 1,
								"compare" : "="
							},							
							{
								"field" : "stores_status" ,
								"value" : [0,2],
								"compare" : "in"
							}
							
						]    
					}         
				],
				"order" : 
				[	
					{	
						"field"	: "service_type_name",
						"compare" : "ASC"
					},
					{	
						"field"	: "stores_date_created",
						"compare" : "DESC"
					}						
				]
			}//data
		}	
		return datas_return;
	},	
	//@
	//@
	//@
	//news
	get_data_store_list_bussiness_news: function(user_id){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"stores_user_id",
					"stores_name" ,
					"stores_date_created",
					"stores_adress",
					"stores_phone",
					"service_type_name",
					"users_first_name",
					"users_last_name",
					"stores_payment_limit",
					"stores_status_update",
					"stores_status",
					"stores_status_stores",
					"users_type_name"
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
							},							
							{
								"field" : "stores_status" ,
								"value" : [0,1,2,3],
								"compare" : "in"
							}
							
						]    
					}         
				],
				"order" : 
				[	
					{	
						"field"	: "service_type_name",
						"compare" : "ASC"
					},
					{	
						"field"	: "stores_date_created",
						"compare" : "DESC"
					}						
				]
			}//data
		}	
		return datas_return;
	},	
	//@
	//@
	//data cho ojs_shares->get_datas_check
	get_data_danhSachCuaHang: function(user_id,store_id){	
	
		let datas_return = 
		{ 
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"stores_user_id"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"stores_user_id",
							"value" 	: user_id,
							"compare" : "="
						},
						{	"field"		:"stores_ID",
							"value" 	: store_id,
							"compare" : "="
						}								
						]	
					}				
				]
			}//data
		}//send_datas		
		return datas_return;
	},//end of function get_data_danhSachCuaHang	
	
	//
	//
	//lấy danh sách cửa hàng theo user id
	get_data_store_list: function(){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"stores_user_id",
					"stores_name" ,
					"stores_date_created",
					"stores_adress",
					"stores_phone",
					"service_type_name",
					"users_first_name",
					"users_last_name",
					"stores_payment_limit",
					"stores_status_update",
					"stores_status",
					"users_type_name"
				],
				"order" : 
				[	
					{	
						"field"	: "service_type_name",
						"compare" : "ASC"
					},
					{	
						"field"	: "stores_date_created",
						"compare" : "DESC"
					}						
				]
			}//data
		}	
		return datas_return;
	},
	//
	//@@
	//@@
	//@@
	//
	//
	//lấy danh sách cửa hàng theo user id
	get_sevice_type: function(store_id){
		
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_service_type_id",
					"service_type_name"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"stores_ID",
							"value" 	: store_id,
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
	//
	//
}//end of oj_loader


module.exports = ojs_datas_stores;




