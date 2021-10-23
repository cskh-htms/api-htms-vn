

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"brands_name"					: "",
		"brands_featured_image"			: "",		
		"brands_information"			: "",			
		"brands_excerpt"				: "",	

		"brands_status_stores"			: 0,
		"brands_status_admin"			: 0,
		"brands_status_update"			: 0,
		
		"brands_stores_id"				: "",
		"brands_qoute"					: ""
	}
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "brands_name"){
				if(check_data_fields.check_datas.check_empty(datas.brands_name) == false){check_errer =  "Tên brand là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//
	//@
	//@
	//@
	//phan tich loi~
	
	function get_message_error(error){
		if(error.sqlMessage.search("trig_brands_name_data_type") >= 0 ){
			return "Tên brands không được để trống";
			
		}else if(error.sqlMessage.search("trig_brands_name_data_type") >= 0){
			return " Tên brands không hợp lệ ";		

		}else if(error.sqlMessage.search("trig_brands_stores_id_empty") >= 0){
			return " Chưa nhập id cửa hàng ";	

		}else if(error.sqlMessage.search("brands_stores_id") >= 0){
			return " Không tìm thấy id cửa hàng ";

		}else if(error.sqlMessage.search("trig_brands_name_name_empty") >= 0){
			return " Tên thương chưa nhập ";				
						

		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
	}	
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
			
	};