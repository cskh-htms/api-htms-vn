
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const ojs_datas_category = {
	//
	//
	//
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
				"category_general_speciality_update_status"
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
				"category_general_speciality_update_status"
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
							"value"     : "0",
							"compare" 	: "="
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
				"category_general_speciality_update_status"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"    :"category_general_speciality_stores_status",
							"value"     : [0,1],
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




