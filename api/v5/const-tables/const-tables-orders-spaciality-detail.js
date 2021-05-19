

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
		"orders_details_speciality_discount"		: 0,
		"orders_details_speciality_unit_discount"	: 0,
		"orders_details_medium_text" 				: ""
	}
	
	
	
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "orders_details_speciality_order_id"){
				if(check_data_fields.check_datas.check_empty(datas.orders_details_speciality_order_id) == false){check_errer =  "mã đơn hàng là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
				
			}
			
			if(item == "orders_details_speciality_line_order"){
				if(check_data_fields.check_datas.check_empty(datas.orders_details_speciality_line_order) == false){check_errer =  "line order là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}	

			if(item == "orders_details_speciality_price"){
				if(check_data_fields.check_datas.check_empty(datas.orders_details_speciality_price) == false){check_errer =  "line order là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_number(datas.orders_details_speciality_price) == false){check_errer =  "giá bán Kiểu dữ liệu là số, bạn chưa nhập dữ liệu";	return;}			
			}				

		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//
	//
	//@@
	//@@
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

	
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_select_fields
	};