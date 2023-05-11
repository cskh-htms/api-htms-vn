

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
	//insert
	if(error.sqlState == '12301' ){
		return "Không tìm thấy user đánh giá";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy sản phẩm đánh giá";
	}else if(error.sqlState == '12303'){
		return "Chỉ đánh giá từ 1 -> 5 sao";	
	}else if(error.sqlState == '12304'){
		return "Bạn chưa mua sản phẩm nên không được đánh giá";
	}else if(error.sqlState == '12305'){
		return "Đã đánh giá sản phẩm rồi. Không thể đánh giá nữa";
		
	//update
	}else if(error.sqlState == '12311'){
		return "Không tìm thấy khách hàng"
	}else if(error.sqlState == '12312'){
		return "Không tìm thấy sản phẩm ";
	}else if(error.sqlState == '12313'){
		return "Chỉ nhận đánh giá từ 1 -> 5 sao";
		
		
	}else if(error.sqlState == '22201'){
		return "Không được phép sữa id đánh giá"
	}else if(error.sqlState == '22202'){
		return "Không được phép sữa id user";
	}else if(error.sqlState == '22203'){
		return "Không được phép sữa id product";		
		
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};