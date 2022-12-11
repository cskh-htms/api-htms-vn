

//@
const  default_fields = {
	"stores_user_id"			: "",	
	"stores_name"				: "",	
	"stores_payment_limit"		: 0,
	"stores_service_type_id"	: "",
	
	"stores_adress"				: "",		
	"stores_province"			: "",
	"stores_district"			: "",
	"stores_wards"				: "",
	
	"stores_phone"				: "",
	"stores_logo_image"			: "",
	"stores_banner_image"		: "",
	"stores_information"		: "",
	
	"stores_discount_price" 	: 0,
	"stores_sort_order" 		: 0,
	

	"stores_status_admin" 		: 0	,
	"stores_status_stores" 		: 0	,
	"stores_info_banking" 		: "",

	"stores_local_x"			: "",	
	"stores_local_y"			: "",	
	"stores_local_adress"		: "",	

	"stores_qoute" 				: "",		
	"stores_status_update" 		: 0,
	"stores_payment_methods"	: 0,
	"stores_payment_time"		:28,

	"stores_upload_limit_day"	: 20,
	"stores_upload_limit_month"	: 300
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tên cửa hàng";
	}else if(error.sqlState == '12302'){
		return "Tài khoản tạo cửa hàng không có trong hệ thống";
	}else if(error.sqlState == '12303'){
		return "Số điện thoại không hợp lệ";	
	}else if(error.sqlState == '12304'){
		return "email không hợp lệ";
	}else if(error.sqlState == '12305'){
		return "Bạn chưa nhập id loại cửa hàng";
		
	//update
	}else if(error.sqlState == '12311'){
		return "User tạo cửa hàng không có trên hệ thống"
	}else if(error.sqlState == '12312'){
		return "Số điện thoại không hợp lệ";
	}else if(error.sqlState == '12313'){
		return "Email không hợp lệ";
	}else if(error.sqlState == '12314'){
		return "Bạn chưa nhập id loại cửa hàng";			
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};