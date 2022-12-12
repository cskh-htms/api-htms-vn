

//@
const  default_fields = {
		"coupon_speciality_code"				:"",
		"coupon_speciality_stores_id_created"	: 0,
		"coupon_speciality_info"				: "",
		"coupon_speciality_featured_image"		: "",
		"coupon_speciality_type"				: 0,
		"coupon_speciality_pay_type"			: 0,
		"coupon_speciality_formula_price"		: 0,
		"coupon_speciality_formula_price_value"	: 0,
		"coupon_speciality_condition"			: 0,
		"coupon_speciality_condition_value"		: 0,
		"coupon_speciality_price_max"			: 0,
		"coupon_speciality_date_star"			:null,
		"coupon_speciality_date_end"			:null,
		"coupon_speciality_multiple"			: 0,
		"coupon_speciality_show_hide"			: 0,
		"coupon_speciality_status_admin"		: 0,
		"coupon_speciality_status_update"		: 0,
		"coupon_speciality_limit_user"			: 0,
		"coupon_speciality_limit_number"		: 0,		
		"coupon_speciality_qoute":""
}

//@
function get_message_error(error){
	//insert
	if(error.sqlState == '12301' ){
		return "Tên coupon không hợp lệ";
	}else if(error.sqlState == '12302'){
		return "Chưa nhập tên coupon";
	}else if(error.sqlState == '12303'){
		return "Ngày khuyến mãi không hợp lệ";	
	}else if(error.sqlState == '12304'){
		return "Không tìm thấy cửa hàng";
		
	//update
	}else if(error.sqlState == '12311'){
		return "Tên coupon không hợp lệ";
	}else if(error.sqlState == '12312'){
		return "Ngày khuyến mãi không hợp lệ";	
	}else if(error.sqlState == '12313'){
		return "Không tìm thấy cửa hàng";
		
		
	//delete
	}else if(error.sqlState == '34501'){
		return "Mã giảm giá đã có đơn hàng không thể xóa";
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};