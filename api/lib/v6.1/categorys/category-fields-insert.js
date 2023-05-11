

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
			
	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tên danh mục";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy cửa hàng id";
	}else if(error.sqlState == '12303'){
		return "Không tìm thấy danh mục cha";	
		

	//update
	}else if(error.sqlState == '12311'){
		return "Không tìm thấy cửa hàng id";
	}else if(error.sqlState == '12312'){
		return "Không tìm thấy danh mục cha";	
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};