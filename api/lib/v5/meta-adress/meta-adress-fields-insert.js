

//@
const  default_fields = {
		"adress_meta_user_id"		: "",	
		"adress_meta_name"			: "",
		"adress_meta_phone"			: "",
		"adress_meta_province"		: "",	
		"adress_meta_district"		: "",
		"adress_meta_wards"			: "",
		"adress_meta_street"		: "",		
		"adress_meta_full_adress"	: "",
		"adress_meta_status" 		: 0
}

//@
function get_message_error(error){
	
		if(error.sqlMessage.search("adress_meta_user_id") >= 0 ){
			return " Chưa nhập tên cửa hàng ";
	
		}else if(error.sqlMessage.search("trig_adress_meta_insert_douple") >= 0 ){
			return " Địa chỉ đã có rồi ";	
	
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};