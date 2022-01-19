

//@
const  default_fields = {
		"options_product_speciality_name"					: "",
		"options_product_speciality_featured_image"			: "",		
		"options_product_speciality_parent_id"				: 0,		
		"options_product_speciality_stores_id"				: "",


		"options_product_speciality_status_stores"			: 0,
		"options_product_speciality_status_admin"			: 0,
		"options_product_speciality_status_update"			: 0,
		
		"options_product_speciality_information"			: "",	
		"options_product_speciality_qoute"					: ""
}

//@
function get_message_error(error){
			
		if(error.sqlMessage.search("trig_options_product_speciality_name_name_empty") >= 0 ){
			return "Tên options không được để trống";
		}else if(error.sqlMessage.search("trig_options_product_speciality_name_data_type") >= 0){
			return " Tên options không hợp lệ ";	
			
			
		}else if(error.sqlMessage.search("trig_options_product_speciality_stores_id_empty") >= 0){
			return " Chưa nhập id cửa hàng ";
		}else if(error.sqlMessage.search("options_product_speciality_stores_id") >= 0){
			return " Không tìm thấy cửa hàng này tạo option này ";
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};