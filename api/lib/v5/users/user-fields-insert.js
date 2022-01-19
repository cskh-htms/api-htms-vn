

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
		if(error.sqlMessage.search("trig_check_users_email_data_double") >= 0 ){
			return "Email đã có người đăng ký";
		}else if(error.sqlMessage.search("trig_check_users_email_double") >= 0){
			return "Email đã có người đăng ký";
		}else if(error.sqlMessage.search("users_phone_unique") >= 0){
			return "Số điện thoại này đã đăng ký";
			
			
		}else if(error.sqlMessage.search("trig_check_users_full_name_insert") >= 0){
			return "Dữ liệu tên full khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("trig_check_users_first_name_insert") >= 0){
			return "Dữ liệu tên khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("trig_check_users_last_name_insert") >= 0){
			return "Dữ liệu họ khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("trig_check_users_phone_data_empty") >= 0){
			return "Chưa nhập số điện thoại";
		}else if(error.sqlMessage.search("trig_check_users_phone_data_type") >= 0){
			return "Số điện thoại không hợp lệ";
			
		}else if(error.sqlMessage.search("trig_check_users_full_name_update") >= 0){
			return "Dữ liệu tên full khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("trig_check_users_first_name_update") >= 0){
			return "Dữ liệu tên khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("trig_check_users_last_name_update") >= 0){
			return "Dữ liệu họ khách hàng không hợp lệ";
		}else if(error.sqlMessage.search("users_users_type_id") >= 0){
			return "Loại user không hợp lệ";
			
			
		}else if(error.sqlMessage.search("trig_dala_users_email_data_type") >= 0){
			return " Email không hợp lệ, vui lòng đổi email ";
		}else if(error.sqlMessage.search("users_users_type_id") >= 0){
			return "Loại user không hợp lệ";			
			
	
			
		}else if(error.sqlMessage.search("a parent row") >= 0){
			return " Tài khảon đã có data liên kết, không thể xoá, (ví dụ : tài khoản đã có cửa hàng) ";			
			
			
			
			
		}else{
			return "Lỗi data type insert vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};