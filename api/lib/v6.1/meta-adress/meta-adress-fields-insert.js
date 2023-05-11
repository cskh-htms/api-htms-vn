

//@
const  default_fields = {
		"adress_meta_user_id"		: "",	
		"adress_meta_name"			: "",
		"adress_meta_phone"			: "",
		"adress_meta_province"		: "",	
		"adress_meta_district"		: "",
		"adress_meta_wards"			: "",
		"adress_meta_street"		: "",		
		"adress_meta_full_adress"	: "",
		"adress_meta_status" 		: 0
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '12301' ){
		return "Không tìm thấy user id";
	}else if(error.sqlState == '12302'){
		return "Số điện thoại không hợp lệ";
	}else if(error.sqlState == '12303'){
		return "Địa chỉ đã trùng";	

	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};