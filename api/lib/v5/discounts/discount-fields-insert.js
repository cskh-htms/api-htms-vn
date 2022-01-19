

//@
const  default_fields = {
		"discount_program_name" : "",
		"discount_program_position" : 1,
		"discount_program_featured_image" : "",
		"discount_program_price_created" : 0,
		"discount_program_price_sale" : 0,
		"discount_program_type"  : 0,
		"discount_program_time_type"  : 0,
		"discount_program_price_one_day" : 0,
		"discount_program_price_one_product" : 0,
		"discount_program_limit_product" : 0,
		"discount_program_limit_day" : 0,
		"discount_program_date_star" :  "",
		"discount_program_date_end" : "",
		"discount_program_information" : "",
		"discount_program_store_id_created":"",
		"discount_program_status_admin":0,
		"discount_program_status_update":0,
		"discount_program_qoute":""
}

//@
function get_message_error(error){
		if(error.sqlMessage.search("trig_discount_program_name_empty") >= 0 ){
			return "Tên chương trình chưa có dữ liệu";
			
		}else if(error.sqlMessage.search("discount_program_name_store_id_created") >= 0){
			return "Không tìm thấy cửa hàng";
		}else{
			return "Có lỗi thao tác. nếu bạn muốn xoá chương trình thì hãy xoá các cửa hàng tham gia trước, nếu bạn đang tạo chương trình mới hãy kiểm tra lại dữ liệu. nếu không hãy thông báo admin DALA";
		}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};