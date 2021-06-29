

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"discount_program_details_discount_program_id"	: "",	
		"discount_program_details_store_id"				: "",	
		"discount_program_details_status"				: 0,
		"discount_program_details_price"				: 0,
		
		"discount_program_details_date_number"			: 0,		
		"discount_program_details_limit_product"		: 0,
		"discount_program_details_qoute"				: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "discount_program_details_discount_program_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_details_discount_program_id) == false){check_errer =  "Tên chương trình  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
			}
			if(item == "discount_program_details_store_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_details_store_id) == false){check_errer =  "Tên cửa hàng  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("discount_program_details_discount_program_id") >= 0 ){
			return "Không tìm thấy chương trình";
		}else if(error.sqlMessage.search("discount_program_details_store_id") >= 0){
			return " Không tìm thấy cửa hàng ";
			
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