//@
//@
//@
//@
//@
const  default_fields = {
		"token_key"		: "",
		"token_type"	: 0,
		"token_value"	: "",
		"token_user_id"	 : 0	
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("trig_check_users_email_data_double") >= 0 ){
			return "Email đã có người đăng ký";
		}else{
			return "Lỗi data type insert vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};