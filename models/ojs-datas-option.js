
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const ojs_datas_option = {
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
								"value" : [0,1],
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




