

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
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
		//insert
		if(error.sqlState == '12301' ){
			return "Không tìm thấy user id";
		}else if(error.sqlState == '12302'){
			return "Số điện thoại không hợp lệ";
		}else if(error.sqlState == '12303'){
			return "Địa chỉ đã trùng";	

		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};