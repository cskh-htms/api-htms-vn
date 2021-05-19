

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"shipping_speciality_name"				: "",
		"shipping_speciality_parent_id"			: 0,	
		"shipping_speciality_information"		: "",	
		"shipping_speciality_price"			    : null,
		"shipping_speciality_show"				: 0
	}
	
	
	
	
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "shipping_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.shipping_speciality_name) == false){check_errer =  "shipping name là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "shipping_speciality_show"){
				if(check_data_fields.check_datas.check_empty(datas.shipping_speciality_show) == false){check_errer =  "ẩn hiện là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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