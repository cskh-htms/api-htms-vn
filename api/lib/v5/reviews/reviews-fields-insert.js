

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
	if(error.sqlState == 12344 ){
		return "Khách hàng này chưa mua sản phẩm, Không thể đánh giá";	
		
	}else if(error.sqlState == 12343 ){
		return "Khách hàng đã đánh giá sản phẩm rồi. Không thể đánh giá tiếp";	
		
	}else if(error.sqlState == 12342 ){
		return "Chưa có id khách hàng đánh giá";			

	}else if(error.sqlState == 12341 ){
		return "Chưa có id sản phẩm để đánh giá";	
		
	}else if(error.sqlState == 12345 ||  error.sqlState == 12353 ){
		return "Chưa nhập nội dung đánh giá";					
		
	}else if(error.sqlState == 12351 ){
		return "Không cho thay đổi user_id";			

	}else if(error.sqlState == 12352 ){
		return "Không cho thay đổi product_id";					

	}else if(error.sqlState == 12346 || error.sqlState == 12356 ){
		return "số sao từ 1-5";	
		
	}else if(error.sqlState == 12347){
		return "Không cho phép insert trạng thái admin khác 0 ";	
		
	}else{
		return "Lỗi không Xác định, có thể do dữ liệu đánh giá truyền lên không hợp lệ, " + 
				"Vui lòng liên hệ admin";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};