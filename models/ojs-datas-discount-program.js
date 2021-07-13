
/*
------------------------------------




1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]

2. [get_data_news_bussiness_menu]
	- news bussiness





------------------------------------
*/

const ojs_datas_discount_program = {
	
	//@
	//@
	//@
	//@
	//@ 1. [get_data_news_bussiness_menu]
	get_data_news_bussiness_menu : function(datas){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
					"count(discount_program_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_status_admin" ,
								"value" : '3',
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
	//@
	//@ end of
	//@ 1. [get_data_news_bussiness_menu]		
	
	
	
	
	
	
	
	
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
					"count(discount_program_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_status_admin" ,
								"value" : [2],
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
	//
	//
}//end of oj_loader


module.exports = ojs_datas_discount_program;




