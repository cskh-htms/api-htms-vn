const ojs_config_app = {
	
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
	
	//@
	//@
	//@
	domain : "https://appdala.com",
	
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
		"supper-job"
	],
	//@
	//giá trịnh trong database user infomation(md5)
	user_role_database : {
		"0" : "admin-ne",
		"1" : "bussiness-ne",
		"2" : "customer-ne",
		"3" : "default-ne",
		"4" : "supper-job-ne"
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
	}	
	
}

module.exports = ojs_config_app 