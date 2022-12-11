

//@
const  default_fields = {
		"users_full_name"		: "",
		"users_password"		: "",
		"users_password_lost"	: "",		
		"users_first_name"		: "",	
		"users_last_name"		: "",	
		"users_adress"			: "",	
		"users_phone"			: "",
		"users_email"			: "",
				
		"users_router_version" 	: "v4",
		"users_view_version" 	: "v4",
		"users_js_css_version" 	: "v4",
		"users_api_version" 	: "v4",
		"users_users_type_id" 	: "",		
		
		"users_shipping_status" : 0,
		"users_status" 			: 0,
		"users_verification_status" : 0,
		"users_verification_code" 	: ""
}

//@
function get_message_error(error){
	
		//insert
		if(error.sqlState == '12301' ){
			return "Chưa nhập số điện thoại, hoặc số điện thoại không hợp lệ";
		}else if(error.sqlState == '12302'){
			return "Email không hợp lệ";
		}else if(error.sqlState == '12303'){
			return "Chưa nhập user type id, lỗi này là do không bạn chưa nhập kiểu user";	
		}else if(error.sqlState == '23000'){
			return "Số điện thoại này đã có trong hệ thống";

		//update
		}else if(error.sqlState == '12311'){
			return "Chưa nhập số điện thoại, hoặc số điện thoại không hợp lệ"
		}else if(error.sqlState == '12312'){
			return "Email không hợp lệ";
		}else if(error.sqlState == '12313'){
			return "Số điện thoại này đã có trong hệ thống";



			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};