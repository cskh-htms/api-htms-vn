

//@
const  default_fields = {
		"discount_program_product_link_discount_program_details_id"		: 0,	
		"discount_program_product_link_discount_program_id"				: 0,	
		"discount_program_product_link_product_speciality_id"			: 0,	
		"discount_program_product_link_status"							: 0,
		"discount_program_product_link_qoute"							: "",
		"discount_program_product_link_sale_of_price"					: 0,
		"discount_program_product_link_date_star"						: "",
		"discount_program_product_link_date_end"						: ""
}

//@
function get_message_error(error){		
	//insert
	if(error.sqlState == '12301' ){
		return "Sản phẩm đã có trong chương trình khuyến mãi rồi";
	}else if(error.sqlState == '12302'){
		return "Sản phẩm đã tham chương trình khuyến mãi khác";

	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}				
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};