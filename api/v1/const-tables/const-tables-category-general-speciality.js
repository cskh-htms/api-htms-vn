

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"category_general_speciality_name"					: "",
		"category_general_speciality_category_parent_id"	: 0,	
		"category_general_speciality_infomation"			: "",	
		"category_general_speciality_featured_image"		: "",	
		"category_general_speciality_sort_order"			: 0,	
		"category_general_speciality_show"					: 0
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "category_general_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.category_general_speciality_name) == false){check_errer =  "Tên danh mục  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_name(datas.category_general_speciality_name) == false){check_errer =  "Dữ liệu tên danh mục không hợp lệ";return;}	
			}
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer;
		return 0;
	}
	//
	//
	//
	module.exports = { 
			default_fields,
			check_datas
	};