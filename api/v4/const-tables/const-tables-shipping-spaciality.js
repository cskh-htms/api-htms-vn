

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"shipping_speciality_name"			: "",	
		"shipping_speciality_code"			: "",
		"shipping_speciality_parent_id"		: 0,	
		"shipping_speciality_information"	: "",	
		"shipping_speciality_price"			: 0,
		"shipping_speciality_show"			: 0		
	}
	
	
	
	
	//@
	//@
	//@
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "shipping_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.shipping_speciality_name) == false){check_errer =  "shipping name là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("trig_shipping_speciality_name_empty") >= 0 ){
			return " Bạn chưa nhập tên tỉnh thành";
		}else if(error.sqlMessage.search("shipping_speciality_unique_code") >= 0){
			return " Mã tình thành này đã bị trùng ";
		}else if(error.sqlMessage.search("trig_shipping_speciality_insert_no_parent") >= 0){
			return " Không tìm thấy mã tỉnh thành cha ";			
		}else{
			return "Lỗi nhập dữ liệu data type vui lòng liên hệ admin";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};