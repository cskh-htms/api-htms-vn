

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"category_general_speciality_link_product_id"			: "",
		"category_general_speciality_link_category_general_id"	: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "category_general_speciality_link_product_id"){
				if(check_data_fields.check_datas.check_empty(datas.category_general_speciality_link_product_id) == false){check_errer =  "mã sản phẩm  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			if(item == "category_general_speciality_link_category_general_id"){
				if(check_data_fields.check_datas.check_empty( datas.category_general_speciality_link_category_general_id ) == false){check_errer =  "mã danh mục  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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