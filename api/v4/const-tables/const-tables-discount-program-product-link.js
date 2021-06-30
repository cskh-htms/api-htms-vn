

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"discount_program_product_link_discount_program_details_id"		: "",	
		"discount_program_product_link_product_speciality_id"			: "",	
		"discount_program_product_link_status"							: 0,
		"discount_program_product_link_qoute"							: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "discount_program_product_link_discount_program_details_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_product_link_discount_program_details_id) == false)
				{check_errer =  "ID chương trình  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
			}
			
			if(item == "discount_program_product_link_product_speciality_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_product_link_product_speciality_id) == false)
				{check_errer =  "ID sản phẩm  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("discount_program_product_link_discount_program_details_id") >= 0 ){
			return "Không tìm thấy id chương trình";
		}else if(error.sqlMessage.search("discount_program_product_link_product_speciality_id") >= 0){
			return " Không tìm thấy id sản phẩm ";
			
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