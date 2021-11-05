



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




const ojs_shares_date = require('../models/ojs-shares-date');





const ojs_config_app = {
	
	//@
	//@
	//domain : "http://localhost:2021",
	domain : "https://appdala.com",

	
	//@
	//@ cấu hình giao hàng tiết kiệm
	domain_ghtk : "https://services.giaohangtietkiem.vn/services/shipment/fee?",
	token_ghtk 	: "b483402A0E97BF9906883F8DE5133D07DB4279Dc",	
	province 	: "Tỉnh Lâm Đồng",
	Districts 	: "Thành phố Đà Lạt",	
	domain_ghtk_push_order : "https://services.ghtklab.com/services/shipment/order/?ver=1.5",
	
	
	
	
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
		
		'date_star':ojs_shares_date.get_current_month_now(),
		'date_end':ojs_shares_date.get_current_date_end(),
		'order' : []	
	},	
	
	
	
	//@
	//@
	//@
	//version default
	//nếu không lấy dc version thì mặc định version là đây
	//user mới tạo sẽ lấy version mặc đ5nh này
	router_version : "v4",
	api_version : "v4",
	view_version : "v4",
	js_css_version : "v4",
	
	
	//@
	//@
	//@
	status_page : "active",	//active hoặt maintenance
	

	token_supper_job : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19JRCI6NjIsInVzZXJzX2Z1bGxfbmFtZSI6InN1cHBlci1qb2IiLCJ1c2VyX3JvbGUiOiJzdXBwZXItam9iIiwiaWF0IjoxNjIzNTUxNTE3fQ.lPM-4c93GPDnmwHwayVp94AXPtG0Zn7oyt5U8djJVwQ",	
	//@
	//@
	//@
	//chế độ code dự án "dev" = thử nghiệm, finish = hoàn thành
	
	//@
	//@
	//@
	evn : "publish",
	
	//@
	//@
	//@
	//prefix database
	db_prefix : "dala_",
	
	//@
	//@
	//@
	//thiết lập user guest
	user_guest : { "users_name" : "GuestDalaAll", "users_password" : "" },
	
	//@
	//@
	//@
	//ma bi mật jwt
	jwt_secret : "dalaappsecret2020goodluck",
	
	
	//@
	//@
	//@
	//crypt hash
	hash_code : 'aes-128-cbc',
	hash_secret : 'appdala@concua@lucbaovuong2020',
	
	
	//@
	//@
	//@
	//role data
	//key và số thứ tự phải giống nahu
	user_role_text : [
		"admin",
		"bussiness",
		"customer",
		"default",
		"supper-job",
		"shipping"
	],
	//@
	//giá trịnh trong database user infomation(md5)
	user_role_database : {
		"0" : "admin-ne",
		"1" : "bussiness-ne",
		"2" : "customer-ne",
		"3" : "default-ne",
		"4" : "supper-job-ne",
		"5" : "shipping-ne"
	},
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