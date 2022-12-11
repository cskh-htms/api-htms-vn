

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"options_product_speciality_name"					: "",
		"options_product_speciality_featured_image"			: "",		
		"options_product_speciality_parent_id"				: 0,		
		"options_product_speciality_stores_id"				: "",


		"options_product_speciality_status_stores"			: 0,
		"options_product_speciality_status_admin"			: 0,
		"options_product_speciality_status_update"			: 0,
		
		"options_product_speciality_information"			: "",	
		"options_product_speciality_qoute"					: ""


		
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
	//
	//
	//
	//@
	//@
	//@
	//phan tich loi~	
	function get_message_error(error){
		//insert
		if(error.sqlState == '12301' ){
			return "Chưa nhập tên option";
		}else if(error.sqlState == '12302'){
			return "Không tìm thấy cửa hàng id";
		}else if(error.sqlState == '12303'){
			return "Không tìm thấy option cha";	
			

		//update
		}else if(error.sqlState == '12311'){
			return "Không tìm thấy cửa hàng id";
		}else if(error.sqlState == '12312'){
			return "Không tìm thấy option cha";	
			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
	}	
		
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};