

//@
const  default_fields = {
	"service_type_name":"",
	"service_type_information":""
}

//@
function get_message_error(error){
	
	if(error.sqlMessage.search("trig_stores_name_empty") >= 0 ){
		return "Tên cửa hàng chưa có dữ liệu";
	}else if(error.sqlMessage.search("trig_check_store_double") >= 0){
		return " user đã có cửa hàng ";
	}else{
		return "Lỗi liên quan đến datas cửa hàng, vui lòng liên hệ admin dala";
	}
	
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};