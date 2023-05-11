

//@
const  default_fields = {
		"products_speciality_price_meta_discount_product_link_id"		: 0,	
		"products_speciality_price_meta_product_id"						: 0,	
		"products_speciality_price_meta_from"							: 0,
		"products_speciality_price_meta_to"								: 0,
		"products_speciality_price_meta_price"							: 0,
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