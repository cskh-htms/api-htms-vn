

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
	if(error.sqlMessage.search("orders_details_speciality_order_id") >= 0 ){
		return "Không tìm thấy đơn hàng trong chi tiết đơn hàng";
		
	}else if(error.sqlMessage.search("trig_orders_details_speciality_insert_product_id_not_refer") >= 0){
		return " Không tìm thấy sản phẩm để tạo đơn hàng ";		
		
	}else if(error.sqlMessage.search("trig_orders_details_speciality_insert_coupon_id_not_refer") >= 0){
		return " Không tìm thấy mã coupon để tạo đơn hàng ";			
		
	}else{
		return "Lỗi insert details orders ";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};