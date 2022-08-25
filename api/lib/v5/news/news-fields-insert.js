

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
	
	if(error.sqlMessage.search("trig_stores_name_empty") >= 0 ){
		return "Tên cửa hàng chưa có dữ liệu";

	}else{
		return "Lỗi liên quan đến datas cửa hàng, vui lòng liên hệ admin dala";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};