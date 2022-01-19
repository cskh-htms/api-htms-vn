

//@
const  default_fields = {
		"brands_name"					: "",
		"brands_featured_image"			: "",		
		"brands_information"			: "",			
		"brands_excerpt"				: "",	

		"brands_status_stores"			: 0,
		"brands_status_admin"			: 0,
		"brands_status_update"			: 0,
		
		"brands_stores_id"				: "",
		"brands_qoute"					: ""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("trig_brands_name_data_type") >= 0 ){
			return "Tên brands không được để trống";
			
		}else if(error.sqlMessage.search("trig_brands_name_data_type") >= 0){
			return " Tên brands không hợp lệ ";		

		}else if(error.sqlMessage.search("trig_brands_stores_id_empty") >= 0){
			return " Chưa nhập id cửa hàng ";	

		}else if(error.sqlMessage.search("brands_stores_id") >= 0){
			return " Không tìm thấy id cửa hàng ";

		}else if(error.sqlMessage.search("trig_brands_name_name_empty") >= 0){
			return " Tên thương chưa nhập ";				
						

		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};