

//@
const  default_fields = {
		"orders_details_speciality_order_id"		: "",
		"orders_details_speciality_line_order"		: "",	
		"orders_details_speciality_product_id"		: 0,	
		"orders_details_speciality_qty"			    : 0,
		"orders_details_speciality_price"			: 0,
		"orders_details_medium_text" 				: ""
}

//@
function get_message_error(error){
	//insert
	if(error.sqlState == '12301' ){
		return "Không tìm thấy đơn hàng";
	}else if(error.sqlState == '12302'){
		return "Không tìm thấy sản phẩm";
	}else if(error.sqlState == '12303'){
		return "Chưa nhập số lượng sản phẩm ";	
	}else if(error.sqlState == '12304'){
		return "Số lượng tồn kho không đủ";
	}else if(error.sqlState == '12305'){
		return "Không tìm thấy mã giảm giá";
		
	//update
	}else if(error.sqlState == '12311'){
		return "Không tìm thấy đơn hàng"
	}else if(error.sqlState == '12312'){
		return "Không thể update mã sản phẩm trong order";
	}else if(error.sqlState == '12313'){
		return "Số lượng tồn kho không đủ";
	}else if(error.sqlState == '12314'){
		return "Không tìm thấy mã giảm giá";			
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};