

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');
	const ojs_api_functions_shares = require('../functions-shares/api-functions-shares');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"service_type_name"		: "",
		"service_type_information"	: ""	
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "service_type_name"){
				if(check_data_fields.check_datas.check_empty(datas.service_type_name) == false){check_errer =  "Tên đăng nhập  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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