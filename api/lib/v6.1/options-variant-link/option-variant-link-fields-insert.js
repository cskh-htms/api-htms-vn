

//@
const  default_fields = {
		"options_variant_link_product_id"	: "",
		"options_variant_link_option_arr"	: "",		
		"options_variant_link_option_name"	: "",
		"options_variant_link_price"		: 0,
		"options_variant_link_sale_of_price": 0,
		"options_variant_link_stock"		: 0		
}

//@
function get_message_error(error){
			
		if(error.sqlMessage.search("trig_options_product_speciality_name_name_empty") >= 0 ){
			return "Tên options không được để trống";
		}else if(error.sqlMessage.search("trig_options_product_speciality_name_data_type") >= 0){
			return " Tên options không hợp lệ ";	
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};