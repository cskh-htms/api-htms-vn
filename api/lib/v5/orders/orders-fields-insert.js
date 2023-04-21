

//@
const  default_fields = {
		"orders_speciality_user_id"				: "",
		"orders_speciality_store_id"			: "",
		"orders_speciality_orders_speciality_master_id" : 0,
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

		"orders_speciality_service"				: 0,
		"orders_speciality_shipping_code"		:"",
		
		"orders_speciality_total_qty"			: 0,
		"orders_speciality_total_product"		: 0,
		"orders_speciality_total_coupon"		: 0,
		"orders_speciality_total_shipping"		: 0,
		"orders_speciality_total_fee"			: 0
}

//@
function get_message_error(error){
	//return error;
	//insert
	if(error.sqlMessage.length > 0 ){
		return error.sqlMessage;			
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};