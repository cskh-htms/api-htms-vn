

//@
const  default_fields = {
		"uploads_infomation_user_id"		: "",	
		"uploads_infomation_url"			: "",	
		"uploads_infomation_image_id"		: ""
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