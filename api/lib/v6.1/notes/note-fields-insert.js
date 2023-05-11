

//@
const  default_fields = {
		"notes_user_id"		: "",	
		"notes_contents"	: "",
		"notes_title"		: "",
		"notes_status"		: 0
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("notes_user_id") >= 0 ){
			return " Không tìm thấy user ";			
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};