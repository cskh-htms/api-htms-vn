

//@
const  default_fields = {
		"orders_details_speciality_order_id"		: "",
		"orders_details_speciality_line_order"		: "",	
		"orders_details_speciality_product_id"		: 0,	
		"orders_details_speciality_qty"			    : 0,
		"orders_details_speciality_price"			: 0,
		"orders_details_medium_text" 				: ""
}

//@
function get_message_error(error){
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