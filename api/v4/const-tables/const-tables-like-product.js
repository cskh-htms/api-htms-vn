

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"like_product_user_id"			: "",	
		"like_product_product_id"		: "",
		"like_product_status"			: 0
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "like_product_user_id"){
				if(check_data_fields.check_datas.check_empty(datas.like_product_user_id) == false){check_errer =  "mã khách hàng  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
			}
			
			if(item == "like_product_product_id"){
				if(check_data_fields.check_datas.check_empty(datas.like_product_product_id) == false){check_errer =  "Mã sản phẩm  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("like_product_user_id") >= 0 ){
			return " Không tìm thấy user ";
		}else if(error.sqlMessage.search("like_product_product_id") >= 0){
			return " Không tìm thấy sản phẩm ";
			
		}else if(error.sqlMessage.search("trig_like_product_double") >= 0){
			return " Đã like sản phẩm này rồi ";
			
			
			
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