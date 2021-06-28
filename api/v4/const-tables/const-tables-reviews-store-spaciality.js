

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"reviews_store_speciality_user_id"				: "",
		"reviews_store_speciality_store_id"				: "",	
		"reviews_store_speciality_contents"			    : "",
		"reviews_store_speciality_status_admin"			: 0,
		"reviews_store_speciality_number_star"			: 5
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
			if(item == "reviews_store_speciality_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_store_speciality_user_id) == false){check_errer =  "user là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "reviews_store_speciality_store_id"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_store_speciality_store_id) == false){check_errer =  "Mã cửa hàng là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "reviews_store_speciality_contents"){
				if(check_data_fields.check_datas.check_empty(datas.reviews_store_speciality_contents) == false){check_errer =  "nội dung review là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("trig_dala_reviews_store_speciality_user_id_empty") >= 0 ){
			return " chưa nhập id user ";
		}else if(error.sqlMessage.search("trig_reviews_store_speciality_store_id_empty") >= 0){
			return " Chưa nhập id cửa hàng ";
			
	
		}else if(error.sqlMessage.search("reviews_store_speciality_user_id") >= 0 ){
			return " không tìm thấy user ";		
		}else if(error.sqlMessage.search("reviews_store_speciality_store_id") >= 0){
			return " không tìm thấy cửa hàng ";	

		
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