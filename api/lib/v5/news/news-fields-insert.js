

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
	
	if(error.sqlMessage.search("trig_stores_name_empty") >= 0 ){
		return "Tên cửa hàng chưa có dữ liệu";
	}else if(error.sqlMessage.search("trig_check_store_double") >= 0){
		return " user đã có cửa hàng ";

	}else if(error.sqlMessage.search("stores_user_id") >= 0 ){
		return " Không tìm thấy user doanh nghiệp ";		
	}else if(error.sqlMessage.search("stores_service_type_id") >= 0){
		return " chưa nhập loại dịch vụ, hoặc Không tìm thấy dịch vụ  ";	

	}else if(error.sqlMessage.search("parent row") >= 0){
		return "  Cửa hàng đã có liên kết, không thể xoá  ";

	}else if(error.sqlMessage.search("trig_stores_phone_empty") >= 0){
		return "  Vui lòng nhập số điện thoại ";

	}else if(error.sqlMessage.search("trig_stores_phone_data_type") >= 0){
		return "  số điện thoại không hợp lệ ";

	}else if(error.sqlMessage.search("trig_stores_insert_adress_empty") >= 0){
		return "  vui lòng nhập đầu đủ địa chỉ ";

	}else{
		return "Lỗi liên quan đến datas cửa hàng, vui lòng liên hệ admin dala";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};