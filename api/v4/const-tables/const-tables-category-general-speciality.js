

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"category_general_speciality_name"					: "",
		"category_general_speciality_category_parent_id"	: 0,	
		"category_general_speciality_infomation"			: "",	
		"category_general_speciality_featured_image"		: "",	
		"category_general_speciality_sort_order"			: 0,	
		"category_general_speciality_show"					: 0,
		
		"category_general_speciality_stores_status"			: 0,		
		"category_general_speciality_stores_id"				: "",
		"category_general_speciality_update_status"			: 0,
		"category_general_speciality_admin_status"			: 0,		
		"category_general_speciality_qoute"					: 0,		
		
		
	}
	function check_datas (datas){
		
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			//@
			//@
			// check name empty
			//check name data type
			if(item == "category_general_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.category_general_speciality_name) == false){check_errer =  "Tên danh mục  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer;
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
		
		
		//@
		//@		
		//@ category-name			
		if(error.sqlMessage.search("trig_category_general_speciality_name_name_empty") >= 0 ){
			return "Tên Danh mục không được để trống";
		}else if(error.sqlMessage.search("trig_category_general_speciality_name_data_type") >= 0){
			return " Tên category không hợp lệ ";		

		//@
		//@		
		//@ store id			
		}else if(error.sqlMessage.search("trig_category_general_speciality_stores_id_empty") >= 0){
			return " chưa nhập  id cửa hàng ";		


		//@
		//@		
		//@ danh muc cha
		}else if(error.sqlMessage.search("trig_check_category_general_speciality_category_parent_id_no_parent") >= 0){
			return " Không tìm thấy danh mục cha ";			



		//@
		//@
		//@ constraint
		}else if(error.sqlMessage.search("category_general_speciality_stores_id") >= 0){
			return " id cửa hàng chưa có  trong hệ thống ";		





			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}

	}//
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};