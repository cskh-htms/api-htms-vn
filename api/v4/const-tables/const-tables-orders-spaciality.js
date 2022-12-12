

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');

	//@
	//@
	//configs/config
	//function share
	const ojs_configs = require('../../../configs/config');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"orders_speciality_user_id"				: "",
		"orders_speciality_store_id"			: "",
		"orders_speciality_status_orders"		: 0,	
		"orders_speciality_status_payment"		: 0,	
		"orders_speciality_adress"			    : "",
		"orders_speciality_notes"				: "",
		"orders_speciality_phone"				: "",
		"orders_speciality_email"				: "",
		"orders_speciality_company"				: 0,
		
		
		"orders_speciality_province"			: "",
		"orders_speciality_district"			: "",
		"orders_speciality_wards"				: "",
		"orders_speciality_name"				: "",

		
		"orders_speciality_shipping_code"		:""
	}
	
	
	
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
		
			
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
		//insert
		if(error.sqlState == '12301' ){
			return "Không tìm thấy cửa hàng";
		}else if(error.sqlState == '12302'){
			return "Không tìm thấy khách hàng";
		}else if(error.sqlState == '12303'){
			return "Vui lòng thêm số điện thoại nhận hàng";	
		}else if(error.sqlState == '12304'){
			return "Số điện thoại không hợp lệ";
		}else if(error.sqlState == '12305'){
			return "Email không hợp lệ";
		}else if(error.sqlState == '12306'){
			return "Chưa có địa chỉ nhận hàng";	
		
		//update
		}else if(error.sqlState == '12311'){
			return "Số điện thoại không hợp lệ"
		}else if(error.sqlState == '12312'){
			return "Email không hợp lệ";
		}else if(error.sqlState == '12313'){
			return "Không tìm thấy cửa hàng";
		}else if(error.sqlState == '12314'){
			return "Không tìm thấy kh1ch hàng";			
		}else if(error.sqlState == '12315'){
			return "Không tìm thấy shipper";			
			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
	}






	//@
	//@
	//@
	//@
	//@
	module.exports = { 
		default_fields,
		check_datas,
		get_message_error
	};
	
	
	
	














	//
	//
	//
	//@@
	//@@
	/*
	function get_select_fields_view(field_arr,sql_select_all){
		var sql_field = "";
		//@
		if(Object.keys(field_arr).length == 0){
			sql_field = sql_select_all ;
		}else{
			for (var x in field_arr){
				let sql_field_check = "";
				if(	field_arr[x] == "view_order_report_date_orders" ){
					sql_field_check  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
					
				}
				
				
				if(field_arr[x] == "view_order_report_price_caution_sum" ){	
					sql_field_check  = "sum(" + ojs_configs.db_prefix  + "view_order_report_price_caution" + ")";
				
				}else if(field_arr[x] == "view_order_report_discount_caution_sum" ){	
					sql_field_check  = "sum( " + 
										ojs_configs.db_prefix  + "view_order_report_discount_caution " + 
										" )";		

		
				}else{
					sql_field_check = ojs_configs.db_prefix + field_arr[x];
				}
				//@@
				//@@
				//@@
				if(sql_field == ""){
					sql_field =  sql_field_check  + " as " +  field_arr[x];
				}else{
					sql_field =  sql_field  + ", " + sql_field_check  + " as " +  field_arr[x];
				}
			}
		}
		sql_field = sql_field + " ";
		return sql_field;
	}
	*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	