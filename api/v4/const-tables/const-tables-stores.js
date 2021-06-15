

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"stores_user_id"			: "",	
		"stores_name"				: "",	
		"stores_payment_limit"		: 0,
		"stores_service_type_id"	: "",
		
		"stores_adress"				: "",		
		"stores_province"			: "",
		"stores_district"			: "",
		"stores_wards"				: "",

		"stores_status_admin" 		: 0	,
		"stores_status_stores" 		: 0	,
		"stores_info_banking" 		: "",

		"stores_local_x"			: "",	
		"stores_local_y"			: "",	
		"stores_local_adress"		: "",	

		"stores_qoute" 				: "",		
		"stores_status_update" 		: 0,
		"stores_payment_methods"	: 0,
		"stores_payment_time"		:28,

		"stores_upload_limit_day"	: 20,
		"stores_upload_limit_month"	: 300,
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "stores_name"){
				if(check_data_fields.check_datas.check_empty(datas.stores_name) == false){check_errer =  "Tên cửa hàng  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
				if(check_data_fields.check_datas.check_name(datas.stores_name) == false){check_errer =  "Tên cửa hàng không hợp lệ, bạn chưa nhập dữ liệu";	return;}
			}
			
			if(item == "stores_service_type_id"){
				if(check_data_fields.stores_service_type_id == 0){check_errer =  "Chưa chọn service";	return;}
			}				
			
			
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}

	//@
	//@
	//@
	//phan tich loi~
	function get_message_error(error){
		if(error.sqlMessage.search("trig_stores_name_empty") >= 0 ){
			return "Tên cửa hàng chưa có dữ liệu";
		}else if(error.sqlMessage.search("trig_stores_name_data_type") >= 0){
			return " Tên cửa hàng không hợp lệ ";
			
	
		}else if(error.sqlMessage.search("trig_stores_user_id_empty") >= 0 ){
			return " Chưa nhập id user ";		
		}else if(error.sqlMessage.search("trig_stores_service_type_id_empty") >= 0){
			return " Chưa chọn loại dịch vụ ";	

	
		}else if(error.sqlMessage.search("stores_user_id") >= 0){
			return "Không tìm thấy  user này hoặc bạn chưa nhập users";		
		}else if(error.sqlMessage.search("stores_service_type_id") >= 0){
			return " bạn chưa chọn loại dịch vụ, hoặc không tìm thấy loại dịch vụ này ";		
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};