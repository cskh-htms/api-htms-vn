



/*
-----------------------------------------------------------


1. [orders_al]
	- tạo data cho get_orders_all

2.[datas_all_admin]	
	- tạo data cho get_all_list_datas_all

3.[datas_all]	
	- tạo data cho get_all_list_datas

4.[datas_news_bussiness]	
	- tạo đata config cho news bussiness







-----------------------------------------------------------
*/





const ojs_config_app = {
	
	//@
	//@
	domain : process.env.domain,

	
	//@
	//@ cấu hình giao hàng tiết kiệm
	domain_ghtk : process.env.domain_ghtk,
	token_ghtk 	: process.env.token_ghtk,	
	province 	: process.env.province,
	Districts 	: process.env.Districts,	
	domain_ghtk_push_order : process.env.domain_ghtk_push_order,
	
	
	
	//@
	//@
	//@
	//@
	//@ 
	//@ 4.[datas_news_bussiness]	
	//@ 	- tạo đata config cho news bussiness
	email_admin_01 : process.env.email_admin_01,
	email_admin_02 : process.env.email_admin_02,		
	email_admin_03 : process.env.email_admin_03,		
	email_admin_04 : process.env.email_admin_04,		



	//@
	//@
	//@
	//@
	//@ 
	//@ phone admin 
	phone_admin_01 : process.env.phone_admin_01,
	phone_admin_02 : process.env.phone_admin_02,
	
	//@
	//@
	//@
	//@
	//@ 
	//@ 4.[datas_news_bussiness]	
	//@ 	- tạo đata config cho news bussiness
	datas_news_bussiness : {
		'user_compare': '=',
		'store_compare':'=',
	},		
	
	
	//@
	//@
	//@
	//@
	//@ tạo data cho get_all_list_datas
	//@ 3.[datas_all]	
	//@ * [discount_program_check_expired_compare] check hạn chương trình khuyến mãi
	//@ * [discount_program_check_date_compare] check số lượng ngày tham gia khuyến mãi
	datas_all : {
		'user_compare': '=',
		'store_compare':'=',
		
		'status_admin_compare':'=',
		'status_admin_value':1,
		
		'status_store_compare':'=',
		'status_store_value':1,
		
		'status_check_compare':"in",
		'status_check_value':[0,1],	

		'discount_program_check_expired_compare':'<>',
		'discount_program_check_expired_value': "100",
		'discount_program_check_date_compare':'<>',
		'discount_program_check_date_value': "-2",			
		
		'order' : []
	},	
	//@
	//@
	//@
	//@
	//@ tạo data cho get_all_list_datas admin
	//@ 2.[datas_all_admin]	
	datas_all_admin : {
		'user_compare': '<>',
		'store_compare':'<>',
		
		'status_admin_compare':'=',
		'status_admin_value':1,
		
		'status_store_compare':'=',
		'status_store_value':1,
		'order' : []		
	},		
	
	//@
	//@
	//@
	//@
	//@ tạo data cho get_orders_datas
	//@ 1. [orders_al]
	orders_all : {
		'user_compare': '=',
		'store_compare':'<>',
		
		'status_admin_compare':'=',
		'status_admin_value':1,
		
		'status_payment_compare':'=',
		'status_payment_value':1,
		
		'line_order_compare':'=',
		'line_order_value':'product',		
		
		'order' : []	
	},	
	
	
	
	//@
	//@
	//@
	//version default
	//nếu không lấy dc version thì mặc định version là đây
	//user mới tạo sẽ lấy version mặc đ5nh này
	router_version : process.env.router_version,
	controller_version : process.env.controller_version,
	api_version : process.env.api_version,
	view_version : process.env.view_version,
	js_css_version : process.env.js_css_version,
	
	
	//@
	//@
	//@
	status_page : process.env.status_page,	//active hoặt maintenance
	

	token_supper_job : process.env.token_supper_job,	
	//@
	//@
	//@
	//chế độ code dự án "dev" = thử nghiệm, finish = hoàn thành
	
	//@
	//@
	//@
	evn : process.env.evn,
	
	//@
	//@
	//@
	//prefix database
	db_prefix : process.env.db_prefix,
	
	//@
	//@
	//@
	//thiết lập user guest
	user_guest : JSON.parse(process.env.user_guest),
	
	//@
	//@
	//@
	//ma bi mật jwt
	jwt_secret : process.env.jwt_secret,
	
	
	//@
	//@
	//@
	//crypt hash
	hash_code : process.env.hash_code,
	hash_secret : process.env.hash_secret,
	
	
	//@
	//@
	//@
	//role data
	//key và số thứ tự phải giống nahu
	user_role_text : JSON.parse(process.env.user_role_text),
	//@
	//giá trịnh trong database user infomation(md5)
	user_role_database : JSON.parse(process.env.user_role_database),
	//@
	// biến cấu hình cho search 
	// dùng trong search api
	valiable_search : {
		"sql_select_type" 	: "",
		"sql_select_fields" : "",
		"sql_conditions" 	: "",
		"sql_group_by" 		: "",
		"sql_having" 		: "",
		"sql_order" 		: "",
		"sql_limit" 		: ""
	},
	
	
	

	
	
}

module.exports = ojs_config_app 