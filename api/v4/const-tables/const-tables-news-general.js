

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
			return "Chưa nhập tiêu đề";
			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
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