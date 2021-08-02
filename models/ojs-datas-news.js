
/*
------------------------------------

1. [get_all_list_datas_all]


------------------------------------
*/

const ojs_datas_news = {
	

	
	//@
	//@
	//@
	//@
	//@ 1. [get_all_list_datas_all]	
	get_all_list_datas_all: function(datas){
		//@
		//@
		//@
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"news_ID",
				"news_title",
				"news_date_created",
				"news_featured_image",
				"news_excerpt",
				"news_contents",
				"news_status_admin"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"news_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
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
	//@ 3.[get_all_list_datas]		

	//
	//
	//
}//end of oj_loader


module.exports = ojs_datas_news;




