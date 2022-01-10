

//@
const  default_fields = {
	"reviews_speciality_user_id"				: "",
	"reviews_speciality_product_id"				: "",	
	"reviews_speciality_contents"			    : "",
	"reviews_speciality_images"			    	: "",
	"reviews_speciality_videos"			    	: "",
	"reviews_speciality_status_admin"			: 0,
	"reviews_speciality_number_star"			: 5
}

//@
function get_message_error(error){
	if(error.sqlMessage.search("stores_user_id") >= 0){
		return "Không tìm thấy  user này hoặc bạn chưa nhập users";		
	}else{
		return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};