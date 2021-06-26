

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"shipping_company_name"			: "",	
		"shipping_company_information"	: ""
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "stores_name"){
				if(check_data_fields.check_datas.check_empty(datas.stores_name) == false){check_errer =  "Tên cửa hàng  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("trig_stores_name_empty") >= 0 ){
			return "Tên cửa hàng chưa có dữ liệu";
	
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};