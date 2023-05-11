

//@
const  default_fields = {
		"users_tracking_action"		: 0,	
		"users_tracking_user_id"	: "",	
		"users_tracking_status"		: 0,
		"users_tracking_info "		: ""	
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("users_tracking_user_id") >= 0 ){
			return " Không tìm thấy user ";
		}else if(error.sqlMessage.search("trig_users_tracking_insert_lock") >= 0){
			return " user đã bị loked ";
			
		}else{
			return "Lỗi nhập dữ liệu tracking users vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};