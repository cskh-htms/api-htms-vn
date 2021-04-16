
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const ojs_datas = {
	//
	//
	//
	orders_check_menu_data: function(date_star,date_end,sattus_number){
		
		let datas_return = 	
		{
			"datas" :   {
				"select_field" :
				[
				"orders_speciality_ID",
				"orders_speciality_date_orders",
				"orders_speciality_user_id",
				"users_first_name",
				"users_last_name",
				"orders_speciality_phone",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_adress",
				"orders_speciality_notes",
				"orders_speciality_email"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_star,
								"compare" : ">="
							},
							{
								"field" : "orders_speciality_date_orders" ,
								"value" : date_end,
								"compare" : "<="
							},
							{
								"field" : "orders_speciality_status_orders" ,
								"value" : sattus_number,
								"compare" : "="
							}							
						]    
					}         
				],
				"order" :
				 [
						{    "field"  :"orders_speciality_date_orders",
							"compare" : "ASC"
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
	//
	//
}//end of oj_loader


module.exports = ojs_datas;




