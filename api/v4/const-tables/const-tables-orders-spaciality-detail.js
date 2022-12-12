

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');

	//@
	//@
	//configs/config
	//function share
	const ojs_configs = require('../../../configs/config');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"orders_details_speciality_order_id"		: "",
		"orders_details_speciality_line_order"		: "",	
		"orders_details_speciality_product_id"		: 0,	
		"orders_details_speciality_qty"			    : 0,
		"orders_details_speciality_price"			: 0,
		"orders_details_medium_text" 				: ""
	}
	
	
	
	//@
	//@
	//@
	//@
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
	//@
	//@
	//@
	//phan tich loi~
	function get_message_error(error){
		//insert
		if(error.sqlState == '12301' ){
			return "Không tìm thấy đơn hàng";
		}else if(error.sqlState == '12302'){
			return "Không tìm thấy sản phẩm";
		}else if(error.sqlState == '12303'){
			return "Chưa nhập số lượng sản phẩm ";	
		}else if(error.sqlState == '12304'){
			return "Số lượng tồn kho không đủ";
		}else if(error.sqlState == '12305'){
			return "Không tìm thấy mã giảm giá";
			
		//update
		}else if(error.sqlState == '12311'){
			return "Không tìm thấy đơn hàng"
		}else if(error.sqlState == '12312'){
			return "Không thể update mã sản phẩm trong order";
		}else if(error.sqlState == '12313'){
			return "Số lượng tồn kho không đủ";
		}else if(error.sqlState == '12314'){
			return "Không tìm thấy mã giảm giá";			
			
			
		}else{
			return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
		}
	}	
			
	
	//@
	//@
	//@
	//@
	module.exports = { 
		default_fields,
		check_datas,
		get_message_error
	};
	
	
	
	
	
	
	
	
	
	
	
	
	

	//@@
	//@@
	/*
	function get_select_fields(field_arr,sql_select_all){
		var sql_field = "";
		//@
		if(Object.keys(field_arr).length == 0){
			sql_field = sql_select_all ;
		}else{
			for (var x in field_arr){
				
				let sql_field_check = "";
				if(	
					field_arr[x] == "orders_speciality_date_orders" 
				|| 
					field_arr[x] == "products_speciality_date_created" 
				|| 
					field_arr[x] == "products_speciality_date_start" 
				|| 
					field_arr[x] == "products_speciality_date_end" 
				|| 
					field_arr[x] == "stores_date_created" 		
				|| 
					field_arr[x] == "users_date_created" 						
				){
					sql_field_check  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
					
				}else if(field_arr[x] == "orders_details_speciality_qty_sum" ){	
					sql_field_check  = "sum(" + ojs_configs.db_prefix  + "orders_details_speciality_qty" + ")";
				
				}else if(field_arr[x] == "orders_details_speciality_price_sum" ){	
					sql_field_check  = "sum( " + 
										ojs_configs.db_prefix  + "orders_details_speciality_price * " + 
										ojs_configs.db_prefix  + "orders_details_speciality_qty " + 
										" )";		
					
				}else if(field_arr[x] == "orders_details_speciality_discount_sum" ){	
					sql_field_check  = 	"sum(if(" + ojs_configs.db_prefix + "orders_details_speciality_unit_discount = 0 , " + 
					
											ojs_configs.db_prefix + "orders_details_speciality_discount * " + 
											ojs_configs.db_prefix + "orders_details_speciality_price / 100  * " + 
											ojs_configs.db_prefix + "orders_details_speciality_qty, " +  
											
											ojs_configs.db_prefix + "orders_details_speciality_discount * " + 
											ojs_configs.db_prefix + "orders_details_speciality_qty " +  										
										"))";		

		
				}else{
					sql_field_check = ojs_configs.db_prefix + field_arr[x];
				}
				//@@
				//@@
				//@@
				if(sql_field == ""){
					sql_field =  sql_field_check  + " as " +  field_arr[x];
				}else{
					sql_field =  sql_field  + ", " + sql_field_check  + " as " +  field_arr[x];
				}
			}
		}
		sql_field = sql_field + " ";
		return sql_field;
	}
	*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	