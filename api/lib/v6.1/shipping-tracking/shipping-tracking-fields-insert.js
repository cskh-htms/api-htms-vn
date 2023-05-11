


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
	//insert
	if(error.sqlState == '12301' ){
		return "Không tìm thấy đơn hàng";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy shipping";
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};