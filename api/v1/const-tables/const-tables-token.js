

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');
	const ojs_api_functions_shares = require('../functions-shares/api-functions-shares');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"token_key"		: "",
		"token_value"	: ""	
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "token_key"){
				if(check_data_fields.check_datas.check_empty(datas.token_key) == false){check_errer =  "token key  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}	
			
			if(item == "token_value"){
				if(check_data_fields.check_datas.check_empty(datas.token_key) == false){check_errer =  "token value là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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