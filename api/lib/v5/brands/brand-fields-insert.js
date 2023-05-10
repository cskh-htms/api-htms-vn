

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
	//insert
	if(error.sqlState == '11101' ){
		return "Vui lòng nhập tên thương hiệu";
	}else if(error.sqlState == '11102'){
		return "Không tìm thấy cửa hàng trong hệ thống ";
	}
		
	//update
	}else if(error.sqlState == '22201'){
		return "Cửa hàng không có trên hệ thống"
	}else if(error.sqlState == '23201'){
		return "Vui lòng nhập tên thương hiệu";
	}else if(error.sqlState == '23202'){
		return "Cửa hàng không có trên hệ thống"
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra trong database . Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};