

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"reviews_speciality_user_id"				: "",
		"reviews_speciality_product_id"				: "",	
		"reviews_speciality_contents"			    : "",
		"reviews_speciality_status_admin"			: 0,
		"reviews_speciality_number_star"			: 5
	}
	

	
	//@
	//@
	//@
	//@
	//@
	//@ check data
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "reviews_speciality_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_speciality_user_id) == false){check_errer =  "user là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "reviews_speciality_product_id"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_speciality_product_id) == false){check_errer =  "Mã sản phẩm là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "reviews_speciality_contents"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_speciality_contents) == false){check_errer =  "nội dung review là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}

	

	
	//@
	//@
	//@
	//@
	//@
	//@ 
	//@phan tich loi~
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
	//@ 
	//@ export
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};