

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"adress_meta_user_id"		: "",	
		"adress_meta_province"		: "",	
		"adress_meta_district"		: "",
		"adress_meta_wards"			: "",
		"adress_meta_street"		: "",		
		"adress_meta_full_adress"	: "",
		"adress_meta_status" 		: 0
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "adress_meta_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.adress_meta_user_id) == false){check_errer =  " Chưa nhập user_id ";	return;}	
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
		if(error.sqlMessage.search("adress_meta_user_id") >= 0 ){
			return " Chưa nhập tên cửa hàng ";
	
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