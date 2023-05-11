

//@
const  default_fields = {
		"discount_program_gift_link_discount_program_product_link_id"		: 0,	
		"discount_program_gift_link_product_speciality_id"					: 0,	
		"discount_program_gift_link_product_speciality_gift_id"				: 0
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("discount_program_product_link_discount_program_details_id") >= 0 ){
			return "Không tìm thấy id chương trình";
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin thêm sản phẩm vào chương trình";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};