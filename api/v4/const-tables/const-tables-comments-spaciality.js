

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"comments_speciality_user_id"				: "",
		"comments_speciality_comment_parent_id"		: null,	
		"comments_speciality_product_id"			: "",	
		"comments_speciality_contents"			    : "",
		"comments_speciality_status_admin"			: 0
	}
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ 
	//@ check datas	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "comments_speciality_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.comments_speciality_user_id) == false){check_errer =  "user là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "comments_speciality_product_id"){
				if(check_data_fields.check_datas.check_empty(datas.comments_speciality_product_id) == false){check_errer =  "Mã sản phẩm là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "comments_speciality_contents"){
				if(check_data_fields.check_datas.check_empty(datas.comments_speciality_contents) == false){check_errer =  "nội dung comments là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("comments_speciality_user_id") >= 0 ){
			return " Chưa nhặt mã khách hàng hoặc không tìm thấy mã khách hàng ";
		}else if(error.sqlMessage.search("comments_speciality_product_id") >= 0){
			return " Chưa nhập mã sản phẩm , hoặc không tìm thấy mã sản phẩm";
			
		}else if(error.sqlMessage.search("trig_comments_speciality_user_id_empty") >= 0){
			return " Chưa nhập user id ";			
			
		}else if(error.sqlMessage.search("trig_comments_speciality_product_id_empty") >= 0){
			return " Chưa nhập product id ";				

		}else if(error.sqlMessage.search("trig_comments_speciality_comment_parent_id_no_parent") >= 0){
			return " Không tìm thấy comment cha ";
			
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
	}	
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};