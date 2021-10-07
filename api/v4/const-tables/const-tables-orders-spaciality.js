

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
			if(item == "orders_speciality_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.orders_speciality_user_id) == false){check_errer =  "user là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "orders_speciality_phone"){
				if(check_data_fields.check_datas.check_empty(datas.orders_speciality_phone) == false){check_errer =  "Điện thoại là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "orders_speciality_adress"){
				if(check_data_fields.check_datas.check_empty(datas.orders_speciality_adress) == false){check_errer =  "Địa chỉ là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("trig_orders_speciality_phone_empty") >= 0 ){
			return "Chưa nhập số điện thoại";
			
		}else if(error.sqlMessage.search("trig_orders_speciality_phone_data_type") >= 0){
			return " Số điện thoại không hợp lệ ";		

		}else if(error.sqlMessage.search("trig_dala_orders_speciality_email_data_type") >= 0){
			return " Email không hợp lệ ";	

		}else if(error.sqlMessage.search("trig_orders_speciality_user_id_empty") >= 0){
			return " Chưa nhập user_ID  ";	
			
		}else if(error.sqlMessage.search("orders_speciality_user_id") >= 0){
			return " Không tìm thấy khách hàng ";				
			
		}else if(error.sqlMessage.search("orders_details_speciality_order_id") >= 0){
			return " Không tìm thấy đơn hàng ";	
			
		}else if(error.sqlMessage.search("trig_dala_orders_speciality_adress_empty") >= 0){
			return " Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng ";				
			
		}else if(error.sqlMessage.search("trig_dala_orders_speciality_name_empty") >= 0){
			return " Vui lòng điền đầy đủ tên gười nhận  ";				
			
			
		}else if(error.sqlMessage.search("trig_dala_orders_speciality_sipper_refer") >= 0){
			return " Shipper không có trong hệ thống  ";					
			
		}else if(error.sqlMessage.search("orders_speciality_store_id") >= 0){
			return " Không tìm thấy cửa hàng ";				
			
			
			
			
		}else{
			return "Lỗi nhập liệu vui lòng liên hệ bộ phận cskh," + 
			"hoặc thao tác lại," + 
			"Kiểm tra fields ," + 
			"Kiểm tra kiểu dữ liệu" 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	