

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"shipping_tracking_users_id"		: "",	
		"shipping_tracking_orders_id"		: "",	
		"shipping_tracking_infomation"		: "",
		"shipping_tracking_orders_status"	: 0,		
		"shipping_tracking_qoute"			: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "shipping_tracking_users_id"){
				if(check_data_fields.check_datas.check_empty(datas.shipping_tracking_users_id) == false){check_errer =  " Chưa nhập user_id ";	return;}	
			}
			if(item == "shipping_tracking_orders_id"){
				if(check_data_fields.check_datas.check_empty(datas.shipping_tracking_orders_id) == false){check_errer =  " Chưa nhập orders id ";	return;}	
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
		if(error.sqlMessage.search("shipping_tracking_users_id") >= 0 ){
			return " Không tìm thấy user ";
		}else if(error.sqlMessage.search("shipping_tracking_orders_id") >= 0){
			return " Không tìm thấy orders ";
			
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