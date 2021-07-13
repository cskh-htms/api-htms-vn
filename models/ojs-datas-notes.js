
/*
-------------------------------------

1. [get_data_news_admin_menu]
	- lấy số lượng notes chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2.[get_all_list_datas]	
	- làm data cho [get_all_list_datas]

3. [get_data_news_bussiness_menu]
	- [get_data_news_bussiness_menu]


4.[get_all_list_datas_count]	
	- lấy count notes theo user


-------------------------------------
*/

const ojs_datas_notes = {
	
	
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
				"count(notes_ID)",
				"users_ID"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[ 
							{
								"field" : "users_ID" ,
								"value" : datas.user_id,
								"compare" : datas.user_compare
							},	
							{   
								"field"     :"notes_status",
								"value"     : '100',
								"compare" 	: '<>'
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
				"count(notes_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[ 
							{
								"field" : "notes_status" ,
								"value" : '0',
								"compare" : "="
							},
							{
								"field" : "users_ID" ,
								"value" : datas.user_id,
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
				"count(notes_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "notes_status" ,
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
					"notes_date_created",
					"notes_ID",
					"notes_user_id",	
					"notes_title",					
					"notes_contents",
					"notes_status"
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
	
	
//@@
	//@@
	//@
}//end of oj_loader


module.exports = ojs_datas_notes;




