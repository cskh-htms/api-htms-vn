

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"category_news_name"				: "",
		"category_news_parent_id"           : 0,
		"category_news_featured_image"		: "",	
		"category_news_infomation"			: "",	
		"category_news_sort_order"			: 0,
		"category_news_show"				: 0,
		"category_news_status_admin"		: 0
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "category_news_name"){
				if(check_data_fields.check_datas.check_empty(datas.category_news_name) == false){check_errer =  "Tên danh mục  là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
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
		//@
		//@		
		//@ category-name			
		if(error.sqlMessage.search("trig_category_news_name_empty") >= 0 ){
			return "Tên Danh mục không được để trống";

		}else if(error.sqlMessage.search("trig_check_category_news_no_parent") >= 0 ){
			return "T không tìm thấy danh mục cha";

			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
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