

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"discount_program_details_discount_program_id"	: "",	
		"discount_program_details_store_id"				: "",	
		"discount_program_details_status_admin"			: 0,
		"discount_program_details_status_update"		: 0,
		"discount_program_details_price"				: 0,
		
		"discount_program_details_linit_day"			: 0,		
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
			
		}else if(error.sqlMessage.search("trig_check_owner_discount_program_no_owner") >= 0){
			return " Không đủ quyền thao tác ";			
		}else if(error.sqlMessage.search("trig_check_owner_discount_program_no_discount_program") >= 0){
			return " Không tìm thấy chương trình giảm giá ";			

		}else if(error.sqlMessage.search("trig_check_owner_discount_program_double") >= 0){
			return " Đã tham gia chương trình rồi ";		
			
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin, chương trình giảm giá details";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};