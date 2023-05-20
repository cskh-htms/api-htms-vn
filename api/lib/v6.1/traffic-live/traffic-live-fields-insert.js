

//@
const  default_fields = {
	"traffic_live_ip" : "",	
	"traffic_live_url" : "",
	"traffic_live_service" : 0,
	"traffic_live_user_id" : 0 		
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tên cửa hàng";
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};