

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"options_product_speciality_name"					: "",
		"options_product_speciality_parent_id"				: 0,	
		"options_product_speciality_information"			: "",	
		"options_product_speciality_featured_image"			: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "options_product_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.options_product_speciality_name) == false){check_errer =  "Tên option  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_name(datas.options_product_speciality_name) == false){check_errer =  "Dữ liệu tên option không hợp lệ";return;}	
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