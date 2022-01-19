

//@
const  default_fields = {
		"discount_program_details_discount_program_id"	: "",	
		"discount_program_details_store_id"				: "",	
		"discount_program_details_status_admin"			: 0,
		"discount_program_details_status_update"		: 0,
		"discount_program_details_price"				: 0,
		
		"discount_program_details_linit_day"			: 0,		
		"discount_program_details_limit_product"		: 0,
		"discount_program_details_qoute"				: ""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("discount_program_details_discount_program_id") >= 0 ){
			return "Không tìm thấy chương trình";
		}else if(error.sqlMessage.search("discount_program_details_store_id") >= 0){
			return " Không tìm thấy cửa hàng ";
			
		}else if(error.sqlMessage.search("trig_check_owner_discount_program_no_owner") >= 0){
			return " Không đủ quyền thao tác ";			
		}else if(error.sqlMessage.search("trig_check_owner_discount_program_no_discount_program") >= 0){
			return " Không tìm thấy chương trình giảm giá ";			

		}else if(error.sqlMessage.search("trig_check_owner_discount_program_double") >= 0){
			return " Đã tham gia chương trình rồi ";		
			
			
		}else{
			return "Có lỗi thao tác. nếu bạn muốn xoá cửa hàng tham gia chương trình thì hãy xoá các sản phẩm tham gia trước, nếu bạn đang tạo chương trình mới hãy kiểm tra lại dữ liệu. nếu không hãy thông báo admin DALA";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};