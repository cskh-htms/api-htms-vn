
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users




 1.[get_orders_list_bussiness] 
	* lấy danh sách line orders của cửa hàng bằng user
	* dùng ở trang bussiness/user_id

2.[get_store_by_user_id]	
	* lấy thông tin cửa ah2ng của user

3.[get_product_by_user_id]	
	* lấy danh sách sản phẩm đang khuyến mãi

4.[get_product_order_by_user_id]
	* lấy danh sách sản phẩm bán chạy theo  user (chi lấy id)

5.[get_product_by_user_id_max_details]	
	* lấy danh sách sản phẩm bán chạy theo  user lấy details

*/

const ojs_datas_bussiness = {
	//
	//
	//
	//@
	//@
	//@
	//@
	//@ 5.[get_product_by_user_id_max_details]	
	get_product_by_user_id_max_details:function(users_id){
		let datas_return = 		
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
				  "products_speciality_ID",
				  "products_speciality_name",
				  "products_speciality_price",
				  "products_speciality_sale_of_price",
				  "products_speciality_featured_image",
				  "products_speciality_price_caution"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "users_ID",
						"value": users_id,
						"compare": "="
					  }         
					]
				  }
				]
			  }
			}	
		return datas_return;	
	},//@ end of
	
	//@
	//@
	//@
	//@
	//@ 4.[get_product_order_by_user_id]	
	get_product_order_by_user_id:function(users_id){
		let datas_return = 		
			{
			  "datas": {
				"select_field": [
				  "orders_details_speciality_product_id",
				  "orders_details_speciality_qty"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "users_ID",
						"value": users_id,
						"compare": "="
					  }         
					]
				  }
				]
			  }
			}	
		return datas_return;	
	},//@ end of 
	//@
	//@
	//@
	//@
	//@ 3.[get_product_by_user_id]	
	get_product_by_user_id:function(users_id){
		let datas_return = 		
			{
			  "datas": {
				"select_type": "DISTINCT",
				"select_field": [
				  "products_speciality_ID",
				  "products_speciality_name",
				  "products_speciality_price",
				  "products_speciality_sale_of_price",
				  "products_speciality_featured_image"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "users_ID",
						"value": users_id,
						"compare": "="
					  },
					  {
						"field": "products_speciality_sale_of_price",
						"value": 0,
						"compare": ">"
					  }          
					]
				  }
				]
			  }
			}	
		return datas_return;	
	},//@ end of 
		
	//@
	//@
	//@
	//@
	//@ 2.[get_store_by_user_id]	
	get_store_by_user_id:function(users_id){
		let datas_return = 		
			{
				"datas" :   {
				   "select_field" :
					[
						"stores_ID",
						"stores_name" ,
						"stores_adress",
						"stores_province",
						"stores_district",
						"stores_wards" ,
						"stores_payment_limit",
						"stores_discount_price"						
					],
					"condition" :
					[
						{    
						"relation": "and",
						"where" :
							[
							{   
								"field"     :"stores_user_id",
								"value"     : users_id,
								"compare" : "="
							}           
							]    
						}         
					]   
				}
			}	
		return datas_return;	
	},//@ end of
	
		
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ 1.[get_orders_list_bussiness]
	get_orders_list_bussiness:function(users_id){
		let datas_return = 	
		{
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_ID",
					"orders_speciality_ID",
					"orders_details_speciality_line_order",
					"orders_details_speciality_qty" ,
					"orders_details_speciality_price",
					"price_caution",
					"orders_speciality_status_pull_money"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"users_ID",
							"value" 	: users_id,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_orders",
							"value" 	: 100,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 1,
							"compare" : "<>"
						}
						]	
					}				
				]					
			}//data
		}	
		return datas_return;		
		
	},//@ end of 
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ 
	get_data_store_list: function(users_id){
		
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
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"stores_user_id",
							"value" 	: users_id,
							"compare" : "="
						}						
						]	
					}				
				]
			}//data
		}	
		return datas_return;
	},
	//
	
	//
	//get product order data
	//báo cáo theo sản phẩm bán
	get_product_order_list_datas : function(users_id,date_star,date_end,sattus_number){
		let datas_return = 	
		{		
			"datas" :   {
				"select_type" : "",
				"select_field" :
				[ 
					"products_speciality_name",
					"products_speciality_ID",
					"stores_name",
					"orders_details_speciality_qty_sum",
					"orders_details_speciality_price_sum",
					"orders_details_speciality_discount_sum"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[             
							{
								"field" : "users_ID" ,
								"value" : users_id,
								"compare" : "="
							},
							{	
								"field"		:"orders_details_speciality_line_order",
								"value" 	: "product",
								"compare" : "="
							},
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
				"order" :[
						{    
							"field"  :"products_speciality_name",
							"compare" : "ASC"
						},
						{    
							"field"  :"stores_name",
							"compare" : "ASC"
						}					
				],
				"group_by" :	
				[
					"products_speciality_ID",
					"products_speciality_name",
					"stores_name"
				]				
			}
		}	
		return datas_return;			
	},
	//@@
	//@@
	//@@
	get_order_list_datas : function(user_id){
		let datas_return = { 
			"datas" :   {
				"select_field" :
				[ 
					"orders_speciality_user_id",
					"orders_speciality_status_orders",
					"orders_speciality_status_payment",
					"orders_speciality_adress",
					"orders_speciality_notes",
					"orders_speciality_phone",
					"orders_speciality_email",
					"orders_details_speciality_line_order",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"orders_details_speciality_price",
					"orders_details_speciality_discount",
					"orders_details_speciality_unit_discount",
					"products_speciality_name",
					"orders_speciality_ID",
					"orders_details_medium_text",
					"orders_details_speciality_ID",
					"orders_speciality_date_orders"	,
					"stores_name",
					"orders_speciality_status_orders",
					"orders_speciality_status_payment"
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
				],
				"order" :[
						{    "field"        :"products_speciality_name",
							"compare" : "ASC"
						}      
				
				]
			}
		}//token	
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
}//end of oj_loader


module.exports = ojs_datas_bussiness;




