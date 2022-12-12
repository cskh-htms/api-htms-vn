

//@
const  default_fields = {
		"news_title"            : "",	
		"news_featured_image"	: "",	
		"news_contents"			: "",
		"news_excerpt"			: "",
		"news_status_admin"		: 0
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tiêu đề";
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};