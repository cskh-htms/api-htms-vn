
/*
------------------------------------

1.[get_data_news_admin_menu]
	- lấy số lượng option chưa phê duyệt
	- module su dung
		1. [ojs_shares_news_admin_menu]


2. [get_all_list_datas]	


3. [get_coupon_taget]	


------------------------------------
*/

const ojs_datas_coupon = {
	
	//@
	//@
	//@
	//@
	//@ 3. [get_coupon_taget]	
	get_coupon_taget: function(coupon_id){
		//@
		//@
		//@

		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_limit_number",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"coupon_speciality_ID",
								"value"     : coupon_id,
								"compare" 	: '='
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
	//@ 3.[get_all_list_datas]		
	
	
	//@
	//@
	//@
	//@
	//@ 2. [get_all_list_datas]	
	get_all_list_datas: function(datas){
		//@
		//@
		//@
		var data_store_value;
		if(datas.store_compare == 'in'){
			data_store_value = [17,datas.store_id];
		}else{
			data_store_value = datas.store_id
		}
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"stores_ID",
								"value"     : data_store_value,
								"compare" 	: datas.store_compare
							},
							{   
								"field"     :"coupon_speciality_status_admin",
								"value"     : datas.status_admin_value,
								"compare" 	: datas.status_admin_compare
							},
							{   
								"field"     :"check_expired",
								"value"     : datas.status_check_value,
								"compare" 	: datas.status_check_compare
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
					"count(coupon_speciality_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "coupon_speciality_status_admin" ,
								"value" : [4],
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


module.exports = ojs_datas_coupon;




