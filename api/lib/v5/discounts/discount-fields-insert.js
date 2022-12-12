

//@
const  default_fields = {
		"discount_program_name" : "",
		"discount_program_position" : 1,
		"discount_program_featured_image" : "",
		"discount_program_price_created" : 0,
		"discount_program_price_sale" : 0,
		"discount_program_type"  : 0,
		"discount_program_time_type"  : 0,
		"discount_program_gift_type"  : 0,
		"discount_program_price_one_day" : 0,
		"discount_program_price_one_product" : 0,
		"discount_program_limit_product" : 0,
		"discount_program_limit_day" : 0,
		"discount_program_date_star" :  "",
		"discount_program_date_end" : "",
		"discount_program_information" : "",
		"discount_program_store_id_created":"",
		"discount_program_status_admin":0,
		"discount_program_status_update":0,
		"discount_program_qoute":""
}

//@
function get_message_error(error){

	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tên chương trình";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy cửa hàng";
	}else if(error.sqlState == '12303'){
		return "Ngày tháng không hợp lệ";	

		
	//update
	}else if(error.sqlState == '12311'){
		return "Cửa hàng không có trên hệ thống"
	}else if(error.sqlState == '12312'){
		return "Ngày tháng không hợp lệ";


	//update
	}else if(error.sqlState == '34501'){
		return "Chương trình đã có đơn hàng không thể xóa"
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};