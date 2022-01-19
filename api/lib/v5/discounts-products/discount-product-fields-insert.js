

//@
const  default_fields = {
		"discount_program_product_link_discount_program_details_id"		: "",	
		"discount_program_product_link_product_speciality_id"			: "",	
		"discount_program_product_link_status"							: 0,
		"discount_program_product_link_qoute"							: "",
		"discount_program_product_link_sale_of_price"					: 0,
		"discount_program_product_link_date_star"						: "",
		"discount_program_product_link_date_end"						: ""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("discount_program_product_link_discount_program_details_id") >= 0 ){
			return "Không tìm thấy id chương trình";
		}else if(error.sqlMessage.search("discount_program_product_link_product_speciality_id") >= 0){
			return " Không tìm thấy id sản phẩm ";


		}else if(error.sqlMessage.search("trig_discount_program_product_link_no_owner") >= 0){
			return " Sản phẩm không thuộc cửa hàng cửa bạn ";
		}else if(error.sqlMessage.search("trig_discount_program_product_link_double") >= 0){
			return " sản phẩm đã tham gia khuyến mãi này rồi, hoặc đã tham gia 1 chường trình khuyến mãi khác. Mỗi sản phẩm chỉ đoực tham gia 1 chương trình khuyến mãi";			


		}else if(error.sqlMessage.search("trig_discount_program_product_link_limit_product") >= 0){
			return " Số sản phẩm tham gia đã đủ ";
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin thêm sản phẩm vào chương trình";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};