

//@
const  default_fields = {
	"payment_coupon_order_id"		: 0,	
	"payment_coupon_coupon_code"	: "",	
	"payment_coupon_contents"		: "",
	"payment_coupon_payment" 		: 0
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '11101' ){
		return "Vui lòng nhập mã coupon";

	}else if(error.sqlState == '11102'){
		return "Vui lòng nhập order ID";	
		
	}else if(error.sqlState == '11103'){
		return "Không tìm thấy mã coupon trong hệ thống";	
		
	}else if(error.sqlState == '11104'){
		return "Không tìm thấy mã id đơn hàng trong hệ thống";			
		
	}else if(error.sqlState == '11105'){
		return "Đơn hàng chưa hoàn thành không thể thanh toán công nợ";			
		
	}else if(error.sqlState == '22201'){
		return "Không cho phép chỉnh sữa thông tin này";			
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};