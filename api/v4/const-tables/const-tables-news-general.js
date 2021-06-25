

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"news_title"            : "",	
		"news_featured_image"	: "",	
		"news_contents"			: "",
		"news_excerpt"			: "",
		"news_status_admin"		: 0
	}
	
	
	
	
	
	//@
	//@
	//@
	//check data type	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "news_title"){
				if(check_data_fields.check_datas.check_empty(datas.news_title) == false){check_errer =  "title là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("trig_news_title_name_empty") >= 0 ){
			return "Tiêu đề không được để trống";
			
		}else if(error.sqlMessage.search("category_news_link_news_id") >= 0 ){
			return "Không tìm thấy danh mục";				
			
		}else if(error.sqlMessage.search("category_news_link_category_news_id") >= 0 ){
			return "Không lấy được tin tức ID";				
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ bộ phận cskh, hoặc thao tác lại";
		}
	}
	//@
	//@
	
	
	
	
	//@
	//@
	//@
	//@ export	
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};