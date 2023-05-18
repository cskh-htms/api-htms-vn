

//@
const  default_fields = {
		"ip_tracking_ip"		: ""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("ip_block_user_id") >= 0 ){
			return " ";
		}else if(error.sqlMessage.search("trig_ip_block_insert_lock") >= 0){
			return "  ";
			
		}else{
			return "Lỗi nhập dữ liệu ip tracking vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};