

//@
const  default_fields = {
	"payment_period_order_id"	: "",	
	"payment_period_contents"	: "",	
	"payment_period_payment"	: 0
}

//@
function get_message_error(error){
	
	//insert
	if(error.sqlState == '11101' ){
		return "Chưa nhập mã đơn hàng";

	}else if(error.sqlState == '11102'){
		return "Không tìm thấy mã đơn hàng trong hệ thống";			
		
	}else if(error.sqlState == '11103'){
		return "Đơn hàng chưa hoàn thành không thể thanh toán công nợ";	
		
	}else if(error.sqlState == '11104'){
		return "Đã thanh toán công nợ rùi";			
		
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