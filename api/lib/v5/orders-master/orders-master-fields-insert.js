

//@
const  default_fields = {
		"orders_speciality_master_user_id"			: "",
		"orders_speciality_master_province"			: "",
		"orders_speciality_master_district"			: "",
		"orders_speciality_master_wards"			: "",
		"orders_speciality_master_adress"			: "",		
		"orders_speciality_master_notes"			: "",
		"orders_speciality_master_phone"			: "",
		"orders_speciality_master_name"				: "",		
		"orders_speciality_master_email"			: ""		
}

//@
function get_message_error(error){
	//insert
	if(error.sqlState == '11101' ){
		return "Chưa nhập khách hàng hoặc khách hàng không có trong hệ thống";

	}else if(error.sqlState == '11102'){
		return "Chưa nhập số điện thoại hoặc số điện thoại không hợp lệ";	
		
	}else if(error.sqlState == '11103'){
		return "Chưa nhập số điện thoại hoặc số điện thoại không hợp lệ";	
		
	}else if(error.sqlState == '11104'){
		return "Email không hợp lệ";			
		
	}else if(error.sqlState == '11105'){
		return "Chưa nhập địa chỉ giao hàng hoặc địa chỉ không hợp lệ";	
		
		
	//update	
	}else if(error.sqlState == '22201'){
		return "Chưa nhập số điện thoại hoặc số điện thoại không hợp lệ";	
		
	}else if(error.sqlState == '22202'){
		return "Email không hợp lệ";	
		
	}else if(error.sqlState == '22203' ){
		return "Chưa nhập khách hàng hoặc khách hàng không có trong hệ thống";		
	
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};