

//@
const  default_fields = {
		"category_general_speciality_name"					: "",
		"category_general_speciality_category_parent_id"	: 0,	
		"category_general_speciality_infomation"			: "",	
		"category_general_speciality_featured_image"		: "",	
		"category_general_speciality_sort_order"			: 0,	
		"category_general_speciality_show"					: 0,
		
		"category_general_speciality_stores_status"			: 0,		
		"category_general_speciality_stores_id"				: "",
		"category_general_speciality_update_status"			: 0,
		"category_general_speciality_admin_status"			: 0,		
		"category_general_speciality_qoute"					: 0
}

//@
function get_message_error(error){
			
		if(error.sqlMessage.search("trig_category_general_speciality_name_name_empty") >= 0 ){
			return "Tên Danh mục không được để trống";
		}else if(error.sqlMessage.search("trig_category_general_speciality_name_data_type") >= 0){
			return " Tên category không hợp lệ ";		
			
		}else if(error.sqlMessage.search("trig_category_general_speciality_stores_id_empty") >= 0){
			return " chưa nhập  id cửa hàng ";		

		}else if(error.sqlMessage.search("trig_check_category_general_speciality_category_parent_id_no_parent") >= 0){
			return " Không tìm thấy danh mục cha ";			

		}else if(error.sqlMessage.search("category_general_speciality_stores_id") >= 0){
			return " id cửa hàng chưa có  trong hệ thống ";		

		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};