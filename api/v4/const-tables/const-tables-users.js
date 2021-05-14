

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"users_name"		: "",
		"users_password"	: "",	
		"users_first_name"	: "",	
		"users_last_name"	: "",	
		"users_adress"		: "",	
		"users_phone"		: "",
		"users_email"		: "",
		"users_users_type_id" : 0,
		"users_router_version" : "v1",
		"users_view_version" : "v1",
		"users_js_css_version" : "v1",
		"users_api_version" : "v1"			
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "users_name"){
				if(check_data_fields.check_datas.check_empty(datas.users_name) == false){check_errer =  "Tên đăng nhập  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_name(datas.users_name) == false){check_errer =  "Dữ liệu tên đăng nhập không hợp lệ";return;}	
			}
			if(item == "users_password"){
				if(check_data_fields.check_datas.check_empty(datas.users_password) == false){check_errer =  "Mật khẩu là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "users_first_name"){
				if(check_data_fields.check_datas.check_empty(datas.users_first_name) == false){check_errer =  "ho tên là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}	
			
			if(item == "users_last_name"){
				if(check_data_fields.check_datas.check_empty(datas.users_last_name) == false){check_errer =  "họ tên là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "users_users_type_id"){
				if( datas.users_users_type_id == "0" ){check_errer =  "Chưa chọn loại user, bạn chưa nhập dữ liệu";	return;}					
			}	
			
			if(item == "users_email"){
				if(check_data_fields.check_datas.check_email(datas.users_email) == false){check_errer =  "email không hợp lệ ";	return;}	
				
			}

			
			if(item == "users_phone"){
				if(check_data_fields.check_datas.check_empty(datas.users_phone) == false){check_errer =  "Số điện thoại là bắt buộc, bạn chưa nhập dữ liệu";	return;}
				if(check_data_fields.check_datas.check_phone(datas.users_phone) == false){check_errer =  "Số điện thoại không hợp lệ";	return;}
				if(check_data_fields.check_datas.check_min(datas.users_phone,10) == false){check_errer =  "Số điện thoại í nhất 10 số, bạn chưa nhập dữ liệu";	return;}	
				if(check_data_fields.check_datas.check_max(datas.users_phone,11) == false){check_errer =  "Số điện thoại nhiều nhất 11 số, bạn chưa nhập dữ liệu";	return;}
			}
			
			
			
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//@
	//@
	//@
	//phan tich loi~
	
	function get_message_error(error){
		if(error.sqlMessage.search("users_name_unique") >= 0 ){
			return "Tên đăng nhập đã bị trùng";
		}else if(error.sqlMessage.search("users_phone_unique") >= 0){
			return "Số điện thoại này đã đăng ký";
		}else if(error.sqlMessage.search("dala_users_email") >= 0){
			return "Email này đã có rong hệ thống vui lòng chọn email khác";
		}else if(error.sqlMessage.search("dala_users_phone") >= 0){
			return "Số điện thoại không hợp lệ";
		}else if(error.sqlMessage.search("dala_users_chk_2") >= 0){
			return "Số điện thoại chưa có";
		}else if(error.sqlMessage.search("dala_users_chk_1") >= 0){
			return "Vui lòng nhập tên đăng nhập";
		}else if(error.sqlMessage.search("dala_users_chk_3") >= 0){
			return "Email chưa nhập hoặc không hợp lệ";
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
		
		
		
		
		
	}	//
	//
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};