

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"session_speciality_name"			: "",
		"session_speciality_line_order"		: "",	
		"session_speciality_product_id"		: "",	
		"session_speciality_qty"			: "",
		"session_speciality_price"			: "",
		"session_speciality_discount"		: "",
		"session_speciality_unit_discount"	: ""
	}
	
	
	

	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "session_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.session_speciality_name) == false){check_errer =  "mã session là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "session_speciality_line_order"){
				if(check_data_fields.check_datas.check_empty(datas.session_speciality_line_order) == false){check_errer =  "line order là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			

		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//
	//
	module.exports = { 
			default_fields,
			check_datas
	};