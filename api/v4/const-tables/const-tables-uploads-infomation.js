

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"uploads_infomation_user_id"		: "",	
		"uploads_infomation_url"			: "",	
		"uploads_infomation_image_id"		: ""
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
		if(error.sqlMessage.search("uploads_infomation_user_id") >= 0 ){
			return " Không tìm thấy user upload ";

	
		}else{
			return "Lỗi liên quan đến datas upload, vui lòng liên hệ admin dala";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};