

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');
	const ojs_shares = require('../../../models/ojs-shares');


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



			
		}else if(error.sqlMessage.search("trig_orders_details_speciality_insert_product_id_not_refer") >= 0){
			return " Không tìm thấy sản phẩm để tạo đơn hàng ";				
		}else if(error.sqlMessage.search("trig_orders_details_speciality_insert_coupon_id_not_refer") >= 0){
			return " Không tìm thấy mã coupon để tạo đơn hàng ";				
			
			
		}else{
			return "Lỗi nhập liệu vui lòng liên hệ bộ phận cskh," + 
			"hoặc thao tác lại," + 
			"Kiểm tra fields ," + 
			"Kiểm tra kiểu dữ liệu" 
		}
	}
	//
	//
	module.exports = { 
		default_fields,
		check_datas,
		get_message_error
	};