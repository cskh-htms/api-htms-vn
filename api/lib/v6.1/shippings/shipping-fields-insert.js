

//@
const  default_fields = {
		"shipping_speciality_name"			: "",	
		"shipping_speciality_code"			: "",
		"shipping_speciality_parent_id"		: 0,	
		"shipping_speciality_information"	: "",	
		"shipping_speciality_price"			: 0,
		"shipping_speciality_show"			: 0	
}

//@
function get_message_error(error){
	if(error.sqlMessage.search("trig_shipping_speciality_name_empty") >= 0 ){
		return " Bạn chưa nhập tên tỉnh thành";
	}else if(error.sqlMessage.search("shipping_speciality_unique_code") >= 0){
		return " Mã tình thành này đã bị trùng ";
	}else if(error.sqlMessage.search("trig_shipping_speciality_insert_no_parent") >= 0){
		return " Không tìm thấy mã tỉnh thành cha ";			
	}else{
		return "Lỗi nhập dữ liệu data type vui lòng liên hệ admin";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};