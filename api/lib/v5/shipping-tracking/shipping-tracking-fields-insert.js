

//@
const  default_fields = {
	"shipping_tracking_users_id"		: "",	
	"shipping_tracking_orders_id"		: "",	
	"shipping_tracking_infomation"		: "",
	"shipping_tracking_orders_status"	: 0,		
	"shipping_tracking_qoute"			: ""
}

//@
function get_message_error(error){
	if(error.sqlMessage.search("shipping_tracking_users_id") >= 0 ){
		return " Không tìm thấy user ";
	}else if(error.sqlMessage.search("shipping_tracking_orders_id") >= 0){
		return " Không tìm thấy orders ";
		
	}else{
		return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};