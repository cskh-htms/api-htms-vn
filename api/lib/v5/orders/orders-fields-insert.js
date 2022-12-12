

//@
const  default_fields = {
		"orders_speciality_user_id"				: "",
		"orders_speciality_store_id"			: "",
		"orders_speciality_status_orders"		: 0,	
		"orders_speciality_status_payment"		: 0,	
		"orders_speciality_adress"			    : "",
		"orders_speciality_notes"				: "",
		"orders_speciality_phone"				: "",
		"orders_speciality_email"				: "",
		"orders_speciality_company"				: 0,
		
		
		"orders_speciality_province"			: "",
		"orders_speciality_district"			: "",
		"orders_speciality_wards"				: "",
		"orders_speciality_name"				: "",

		
		"orders_speciality_shipping_code"		:""
}

//@
function get_message_error(error){
	//insert
	if(error.sqlState == '12301' ){
		return "Không tìm thấy cửa hàng";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy khách hàng";
	}else if(error.sqlState == '12303'){
		return "Vui lòng thêm số điện thoại nhận hàng";	
	}else if(error.sqlState == '12304'){
		return "Số điện thoại không hợp lệ";
	}else if(error.sqlState == '12305'){
		return "Email không hợp lệ";
	}else if(error.sqlState == '12306'){
		return "Chưa có địa chỉ nhận hàng";	
	
	//update
	}else if(error.sqlState == '12311'){
		return "Số điện thoại không hợp lệ"
	}else if(error.sqlState == '12312'){
		return "Email không hợp lệ";
	}else if(error.sqlState == '12313'){
		return "Không tìm thấy cửa hàng";
	}else if(error.sqlState == '12314'){
		return "Không tìm thấy kh1ch hàng";			
	}else if(error.sqlState == '12315'){
		return "Không tìm thấy shipper";			
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};