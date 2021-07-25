

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"users_tracking_action"		: 0,	
		"users_tracking_user_id"	: "",	
		"users_tracking_status"		: 0,
		"users_tracking_info "		: ""		
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
		

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
		if(error.sqlMessage.search("users_tracking_user_id") >= 0 ){
			return " Không tìm thấy user ";
		}else if(error.sqlMessage.search("trig_users_tracking_insert_lock") >= 0){
			return " user đã bị loked ";
			
		}else{
			return "Lỗi nhập dữ liệu tracking users vui lòng liên hệ admin";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};