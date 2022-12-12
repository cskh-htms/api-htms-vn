

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"reviews_speciality_user_id"				: "",
		"reviews_speciality_product_id"				: "",	
		"reviews_speciality_contents"			    : "",
		"reviews_speciality_status_admin"			: 0,
		"reviews_speciality_number_star"			: 5
	}
	

	
	//@
	//@
	//@
	//@
	//@
	//@ check data
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
	//@
	//@
	//@ 
	//@phan tich loi~
	function get_message_error(error){
		//insert
		if(error.sqlState == '12301' ){
			return "Không tìm thấy user đánh giá";
		}else if(error.sqlState == '12302'){
			return "Không tìm thấy sản phẩm đánh giá";
		}else if(error.sqlState == '12303'){
			return "Chỉ đánh giá từ 1 -> 5 sao";	
		}else if(error.sqlState == '12304'){
			return "Bạn chưa mua sản phẩm nên không được đánh giá";
			
		//update
		}else if(error.sqlState == '12311'){
			return "Không tìm thấy khách hàng"
		}else if(error.sqlState == '12312'){
			return "Không tìm thấy sản phẩm ";
		}else if(error.sqlState == '12313'){
			return "Chỉ nhận đánh giá từ 1 -> 5 sao";
			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
	}	

	
	

	
	
	
	//@
	//@
	//@ 
	//@ export
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};