
/*
------------------------------------

1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]





------------------------------------
*/

const ojs_datas_discount_program_store_add = {
	
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
					"count(discount_program_details_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "discount_program_details_status_admin" ,
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


module.exports = ojs_datas_discount_program_store_add;




