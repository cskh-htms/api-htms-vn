

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"coupon_speciality_code"				:"",
		"coupon_speciality_type"				: 0,
		"coupon_speciality_info"				: "",
		"coupon_speciality_formula"				: 0,	
		"coupon_speciality_condition"			: 0,	
		"coupon_speciality_condition_value"		: 0,
		"coupon_speciality_price"				: 0,
		"coupon_speciality_price_max"			: 0,
		"coupon_speciality_date_star"			: null,
		"coupon_speciality_date_end"			: null,
		"coupon_speciality_qty"					: 0,		
		"coupon_speciality_multi"				: 0
	}
	
	
	
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "coupon_speciality_code"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_code) == false){check_errer =  "ma code là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "coupon_speciality_price"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_price) == false){check_errer =  "tiền khuyến mãi là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "coupon_speciality_formula"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_formula) == false){check_errer =  "mã cônt thức là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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