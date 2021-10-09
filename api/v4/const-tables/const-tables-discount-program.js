

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {		
		"discount_program_name" : "",
		"discount_program_position" : 1,
		"discount_program_featured_image" : "",
		"discount_program_price_created" : 0,
		"discount_program_price_sale" : 0,
		"discount_program_type"  : 0,
		"discount_program_time_type"  : 0,
		"discount_program_price_one_day" : 0,
		"discount_program_price_one_product" : 0,
		"discount_program_limit_product" : 0,
		"discount_program_limit_day" : 0,
		"discount_program_date_star" :  "",
		"discount_program_date_end" : "",
		"discount_program_information" : "",
		"discount_program_store_id_created":"",
		"discount_program_status_admin":0,
		"discount_program_status_update":0,
		"discount_program_qoute":""
		
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {

			if(item == "discount_program_name"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_name) == false){check_errer =  "Tên cửa hàng  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("trig_discount_program_name_empty") >= 0 ){
			return "Tên chương trình chưa có dữ liệu";
			
		}else if(error.sqlMessage.search("discount_program_name_store_id_created") >= 0){
			return "Không tìm thấy cửa hàng";
		}else{
			return "Có lỗi thao tác. nếu bạn muốn xoá chương trình thì hãy xoá các cửa hàng tham gia trước, nếu bạn đang tạo chương trình mới hãy kiểm tra lại dữ liệu. nếu không hãy thông báo admin DALA";
		}
	}	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error
	};