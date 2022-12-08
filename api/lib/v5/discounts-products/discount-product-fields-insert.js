

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
		if(error.sqlMessage.search("trig_discount_program_product_link_insert") >= 0 ){
			return "Sản phẩm đã có trong chương trình khuyến mãi rồi";
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin thêm sản phẩm vào chương trình";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};