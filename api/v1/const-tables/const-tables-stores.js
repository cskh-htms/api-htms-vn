

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"stores_user_id"	: "",	
		"stores_name"	: "",	
		"stores_service_type_id": "",	
		"stores_province"		: "",
		"stores_district"		: "",
		"stores_wards"		: "",
		"stores_adress"		: "",
		"stores_local_x"		: "",	
		"stores_local_y"		: "",	
		"stores_local_adress"		: "",	
		"stores_phone"		: "",
		"stores_payment_limit"	:0,
		"stores_status" : 0	,
		"stores_info_banking" : ""		
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "stores_name"){
				if(check_data_fields.check_datas.check_empty(datas.stores_name) == false){check_errer =  "Tên đăng nhập  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_name(datas.stores_name) == false){check_errer =  "Dữ liệu tên đăng nhập không hợp lệ";return;}	
			}
			if(item == "stores_service_type_id"){
				if(check_data_fields.check_datas.check_empty(datas.stores_service_type_id) == false){check_errer =  "service là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
				if( datas.stores_service_type_id == "0" ){check_errer =  "Chưa chọn loại doanh nghiep, bạn chưa nhập dữ liệu";	return;}					
			}
			
			
			if(item == "stores_adress"){
				if(check_data_fields.check_datas.check_empty(datas.stores_adress) == false){check_errer =  "địa chỉ Cửa hàng là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "stores_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.stores_user_id) == false){check_errer =  "Cửa hàng là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}		

		if(item == "stores_phone"){
				if(check_data_fields.check_datas.check_empty(datas.stores_phone) == false){check_errer =  "Số điện thoại là bắt buộc, bạn chưa nhập dữ liệu";	return;}
				if(check_data_fields.check_datas.check_phone(datas.stores_phone) == false){check_errer =  "Số điện thoại không hợp lệ";	return;}
				if(check_data_fields.check_datas.check_min(datas.stores_phone,10) == false){check_errer =  "Số điện thoại í nhất 10 số, bạn chưa nhập dữ liệu";	return;}	
				if(check_data_fields.check_datas.check_max(datas.stores_phone,11) == false){check_errer =  "Số điện thoại nhiều nhất 11 số, bạn chưa nhập dữ liệu";	return;}
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