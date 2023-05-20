

//@
const  default_fields = {
		"ip_black_list_ip"		: ""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("ip_black_list_user_id") >= 0 ){
			return " ";
		}else if(error.sqlMessage.search("trig_ip_black_list_insert_lock") >= 0){
			return "  ";
			
		}else{
			return "Lỗi nhập dữ liệu ip black list vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};