

//@
const  default_fields = {
		"coupon_speciality_code"				:"",
		"coupon_speciality_stores_id_created"	: 0,
		"coupon_speciality_info"				: "",
		"coupon_speciality_featured_image"		: "",
		"coupon_speciality_type"				: 0,
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
		if(error.sqlMessage.search("trig_coupon_speciality_code_empty") >= 0 ){
			return "Chưa nhập code";
		}else if(error.sqlMessage.search("coupon_speciality_stores_id_created") >= 0){
			return " Không tìm thấy cửa hàng ";
			
		}else if(error.sqlMessage.search("trig_coupon_speciality_code_date_end_less_star") >= 0){
			return " ngày tháng không hợp lệ ";			
			
			
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};