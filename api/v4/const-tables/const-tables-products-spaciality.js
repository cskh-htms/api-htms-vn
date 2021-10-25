

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');

	
	//@
	//@
	//configs/config
	//function share
	const ojs_configs = require('../../../configs/config');
	const ojs_shares_date = require('../../../models/ojs-shares-date');	
	

	//create default data frome mysql tblUsers
	const  default_fields = {
				products_speciality_name : '',
				products_speciality_type :  0,
				products_speciality_sku : '',
				products_speciality_store_id : '',
				products_speciality_parent_id : '0',
				products_speciality_featured_image : '',
				products_speciality_image_slider : '',
				products_speciality_contents : '',
				products_speciality_origin : '',				
				
				products_speciality_price : '',
				products_speciality_sale_of_price : null,
				products_speciality_date_start : null,
				products_speciality_date_end : null,
				products_speciality_stock : 0,
				products_speciality_stock_status : 0,
				products_speciality_brand : null,
				products_speciality_status_admin : 0,
				products_speciality_status_update : 0,
				products_speciality_status_store : 0,
				
				
				products_speciality_variation_option : '',
				products_speciality_excerpt : '',	
				products_speciality_qoute : '',
				
				products_speciality_height : null,
				products_speciality_width : null,
				products_speciality_length : null,
				products_speciality_weight : null
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {		
			if(item == "products_speciality_names"){
				if(check_data_fields.check_datas.check_empty(datas.products_speciality_name) == false){check_errer =  "tên phẩm là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
			}
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//
	
	
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
				
				//@
				//@
				//@
				//@ check match fileds
				var regex = /^[a-zA-Z]+\([a-zA-Z0-9_]+\)$/;
				var split_arr;
				var split_arr2;
				
				if(regex.test(field_arr[x])){
					split_arr = field_arr[x].split("(");
					split_arr2 = split_arr[1].split(")");
				}
				
				
				//@
				//@
				//@
				//@ nếu là ngày tháng
				var sql_field_check = "";
				if(	field_arr[x] == "products_speciality_date_start"  
				|| 
					field_arr[x] == "products_speciality_date_end"  
				|| 
					field_arr[x] == "products_speciality_date_created" 
				|| 
					field_arr[x] == "category_general_speciality_date_created" 
				|| 
					field_arr[x] == "options_product_speciality_date_created" 
				|| 
					field_arr[x] == "stores_date_created" 
				|| 
					field_arr[x] == "users_date_created" 					
				){
				//@
				//@
					sql_field_check  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
				
				//@
				//@
				//@ nếu là biểu thức
				}else if(regex.test(field_arr[x]) ){
					sql_field_check  = " " + split_arr[0].trim() + "(" + ojs_configs.db_prefix  + split_arr[1].trim();	

				//@
				//@
				//@
				//@	lấy giá 			
				}else if(field_arr[x] == "products_speciality_price_caution" ){	
					sql_field_check  = " " + 			
								
						"(CASE " + 
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_sale_of_price IS NULL " + 
							"THEN " + 
								ojs_configs.db_prefix  + "products_speciality_price " + 
								
								
							// date_star = null 	
							// date_end = null 
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NULL " + 
							"THEN " + 
								ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 			
								
								
							// date_star = yes 	
							// date_end = null 
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0 " + 
							"THEN " + 
								ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 		

								
							// date_star = null 	
							// date_end = yes 
							// date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) < 0 " + 
							"THEN " + 
								ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 																	
								
								
							// date_star = yes 	
							// date_end = yes 
							// date_now - date_star > 0 (da toi han khuyen mai)
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0  and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) < 0  " + 								
							"THEN " + 
								ojs_configs.db_prefix  + "products_speciality_sale_of_price " + 			

							"ELSE " +  
								ojs_configs.db_prefix  + "products_speciality_price " + 
						"END ) "
						
				}else if(field_arr[x] == "products_speciality_sale_of_price_time_check" ){	
					sql_field_check  = " " + 			
								
						"(CASE " + 
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_sale_of_price IS NULL " + 
							"THEN " + 
								" '0' " + 
								
								
							// date_star = null 	
							// date_end = null 
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NULL " + 
							"THEN " + 
								" '1' " +  			
								
								
							// date_star = yes 	
							// date_end = null 
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0 " + 
							"THEN " + 
								" '1' " +  		

							// date_star = yes 	
							// date_end = null 
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) < 0 " + 
							"THEN " + 
								" '2' " +  

								
							// date_star = null 	
							// date_end = yes 
							// date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) > 0 " + 
							"THEN " + 
								" '3' " + 																	
								
								
							// date_star = yes 	
							// date_end = yes 
							// date_now - date_star > 0 (da toi han khuyen mai)
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) > 0  and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_end ) > 0  " + 								
							"THEN " + 
								" '3' " + 		

							// date_star = yes 	
							// date_end = yes 
							// date_now - date_star < 0 (da toi han khuyen mai)
							// date_now - date_star > 0 (da toi han khuyen mai)
							"WHEN " +  
								ojs_configs.db_prefix  + "products_speciality_date_start IS NOT NULL and " + 
								ojs_configs.db_prefix  + "products_speciality_date_end IS NOT NULL and " + 
								"UNIX_TIMESTAMP(NOW()) - " + 
								"UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "products_speciality_date_start ) < 0  " + 								
							"THEN " + 
								" '2' " + 	

								

							"ELSE " +  
								" '4' " + 
						"END ) "				
				
				}else{
					sql_field_check = ojs_configs.db_prefix + field_arr[x];
				}

				//@@
				//@@
				//@@ kết quả sql
				if(sql_field == ""){
					//@
					//@
					//@nếu là biểu thức
					if(regex.test(field_arr[x]) ){
						sql_field = sql_field_check  + " as " + split_arr[0] + "_" + split_arr2[0].trim();
					}else{
						sql_field =  sql_field_check  + " as " +  field_arr[x];
					}
				}else{
					//@
					//@
					//@nếu là biểu thức
					if(regex.test(field_arr[x]) ){
						sql_field =  sql_field  + ", " +  sql_field_check  + " as "  + split_arr[0] + "_" + split_arr2[0].trim();
					}else{
						sql_field =  sql_field  + ", " + sql_field_check  + " as " +  field_arr[x];
					}					
				}
			}
		}
		sql_field = sql_field + " ";
		return sql_field;
	}	
	
	
	
	
	
//@
const get_order_text = function(order_arr){
	var sql_order = "";
	//@
	if(Object.keys(order_arr).length == 0){
		sql_order = "";
	}else{
		for (var x in order_arr){
			//
			//
			let sql_value_text = "";
			if(	order_arr[x].field == "products_speciality_price_caution" 
				|| order_arr[x].field == "products_speciality_price_sum"  
				|| order_arr[x].field == "products_speciality_sale_of_price_time_check" 
			){
				sql_value_text = order_arr[x].field;
			}else{	
				sql_value_text  = ojs_configs.db_prefix + order_arr[x].field;
			}
			
			//
			//
			if(sql_order == ""){
				sql_order = "order by " + sql_value_text + " " + 
				order_arr[x].compare +  " " 
			}else{
				sql_order = sql_order + " , " + sql_value_text + " " + 
				order_arr[x].compare +  " " 				
			}
		}
	}
	return sql_order;
}//end of get_order_text 
	
	
	
//@
const get_condition = function(condition_arr){
	var sql_condition = "";
	var sql_conditions = " where '2020' = '2020' and ";
	//@
	//@
	var relation_check = [
		"or",
		"and"
	];
	
	//@
	if(Object.keys(condition_arr).length == 0){
		sql_condition = "";
	}else{
		//return sql_conditions;
		for (var x in condition_arr){
			for (var s in condition_arr[x].where){
				let consition_value = "";
				let consition_field = "";//condition_arr[x].where[s].field
				
				//
				//ac dinh set value va file
				consition_value = " '" + condition_arr[x].where[s].value + "' ";
				consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;				
				
				//
				//@@
				//var number_check = 0;
				//
				//
				//@@ edit date 

				if(
				ojs_shares_date.check_date(condition_arr[x].where[s].value) == 1  
				|| ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == 1  
				){
					consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
					consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
				
				}

				
				
				//
				//@[in] and [not in] condition
				if(
					condition_arr[x].where[s].compare == "in" 
					|| condition_arr[x].where[s].compare == "IN" 
					|| condition_arr[x].where[s].compare == "not in" 
					|| condition_arr[x].where[s].compare == "NOT IN" 
				){
					consition_value = "(" + condition_arr[x].where[s].value + ")";
					consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
				}
				
				
				//@
				//@
				//@
				//@[null] and [not null] condition
				if(
					condition_arr[x].where[s].compare == "null" 
					|| condition_arr[x].where[s].compare == "not null" 
					|| condition_arr[x].where[s].compare == "NULL" 
					|| condition_arr[x].where[s].compare == "NOT NULL" 
				){
					consition_value = " ";
					consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field + " IS ";
				}				
				
	

				//@
				//@
				//@
				//@[like] condition
				if(
					condition_arr[x].where[s].compare == "like" 
					|| condition_arr[x].where[s].compare == "LIKE" 
					|| condition_arr[x].where[s].compare == "not like" 
					|| condition_arr[x].where[s].compare == "NOT LIKE" 
				){
					let arr_value =  condition_arr[x].where[s].value.split(' ');
					let txt_value = "";
					
					//return arr_value;
					
					if(arr_value.length > 0){
						for (let x in arr_value){
							txt_value = txt_value + '%' + arr_value[x];
						}
						
						txt_value =  txt_value + '%';
						//return txt_value;
						
						consition_value = "'" + txt_value + "'";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field ;		
					}else{
						consition_value = "'%" + condition_arr[x].where[s].value + "%'";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field ;
					}
				}		

				
				
				
				//
				//neu file dat biet
				if( 
				condition_arr[x].where[s].field == "products_speciality_price_caution"  
				|| 
				condition_arr[x].where[s].field =="products_speciality_price_sum" 
				|| 
				condition_arr[x].where[s].field =="products_speciality_sale_of_price_time_check" 				
				){
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = condition_arr[x].where[s].field;
				}				
				
				
	
				var relation = condition_arr[x].relation;
				
				if(relation_check.indexOf(relation) < 0 ){
					relation = "and";
				}						
				
				
				if(s == 0 && x == 0){
					relation = " ";
				}
								
							

				
				sql_condition = sql_condition + relation + " ";
				sql_condition = sql_condition + 
					consition_field + " " + 
					condition_arr[x].where[s].compare +  " " + 
					" " + consition_value + " "
			}
		}
	}
	
	sql_conditions = sql_conditions + sql_condition;
	sql_conditions = sql_conditions + " ";
	return sql_conditions;
}//end of get_condition	
	
	
	
//@having
const get_having = function(condition_arr){
	var sql_condition = "";
	var sql_conditions = " having ";
	//@
	if(Object.keys(condition_arr).length == 0){
		sql_condition = "";
	}else{
		for (var x in condition_arr){
			for (var s in condition_arr[x].where){
				let consition_value = "";
				let consition_field = "";//condition_arr[x].where[s].field
				
				//
				//default value
				consition_value = " '" + condition_arr[x].where[s].value + "' ";
				consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
				//
				//@@ edit date order
				if(
				ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == true  
				|| 
				ojs_shares_date.check_date(condition_arr[x].where[s].value) == true 
				){
					consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
					consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
				
				}
				//
				//@in where
				if(condition_arr[x].where[s].compare == "in"){
					consition_value = "(" + condition_arr[x].where[s].value + ")";
					consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
				}

				
				//
				//neu file dat biet
				if( 
				condition_arr[x].where[s].field == "products_speciality_price_caution"  
				|| 
				condition_arr[x].where[s].field =="products_speciality_price_sum" 
				|| 
				condition_arr[x].where[s].field =="products_speciality_sale_of_price_time_check" 				
				){
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = condition_arr[x].where[s].field;
				}					
				//@
				//@
				//@
				if(sql_condition == ""){
					//@
					//@
					//@
					sql_condition = sql_condition + 
						consition_field + " " + 
						condition_arr[x].where[s].compare +  " " + 
						" " + consition_value + " "					
				}else{
					//@
					//@
					//@
					sql_condition = sql_condition + condition_arr[x].relation + " ";
					sql_condition = sql_condition + 
						consition_field + " " + 
						condition_arr[x].where[s].compare +  " " + 
						" " + consition_value + " "
				}
			}
		}
	}
	
	sql_conditions = sql_conditions + sql_condition;
	sql_conditions = sql_conditions + " ";
	return sql_conditions;
}//end of get_having	
	
	
	
	
	
//
//@
//@
//@
//phan tich loi~
function get_message_error(error){
	if(error.sqlMessage.search("trig_products_speciality_name_empty") >= 0 ){
		return "Tên sản phẩm không được để trống";
	}else if(error.sqlMessage.search("trig_products_speciality_price_empty") >= 0 ){
		return "Bạn chưa nhập giá sản phẩm";		
	}else if(error.sqlMessage.search("trig_products_speciality_store_id_empty") >= 0 ){
		return "Bạn chưa chọn cửa hàng";			
		
		

	}else if(error.sqlMessage.search("trig_products_speciality_brand_no_refe") >= 0 ){
		return " Thương hiệu chưa có trong hệ thống ";		
	}else if(error.sqlMessage.search("products_speciality_store_id") >= 0 ){
		return "Cửa hàng không có trong hệ thống";	


	}else if(error.sqlMessage.search("options_product_speciality_link_option_id") >= 0 ){
		return " một số option chưa có trong hệ thống ";		
	}else if(error.sqlMessage.search("category_general_speciality_link_category_general_id") >= 0 ){
		return " Một số danh mục chưa được tạo sãn ";			
	}else if(error.sqlMessage.search("a foreign key constraint fails") >= 0 ){
		return " Danh mục hoặc option id không tìm thấy ";		
		
	}else if(error.sqlMessage.search("trig_products_speciality_insert_weight_empty") >= 0 ){
		return " vui lòng nhập cân nặng của sản phẩm, có thể ước lượng khoảng 200 gram ";			
		
	}else if(error.sqlMessage.search("trig_products_speciality_update_date_end_less_star") >= 0 ){
		return " ngày khuyến mãi không hợp lệ ";			
	
	}else if(error.sqlMessage.search("trig_products_speciality_insert_peice_less_then") >= 0 ){
		return " giá khuyến mãi không hợp lệ ";
	
	
		
		
	}else{
		return "Lỗi data type insert, xem lại dữ liệu gữi lên";
	}
}	//
//
//	
	
	
	
	
	
	//
	module.exports = { 
			default_fields,
			check_datas,
			get_select_fields,
			get_order_text,
			get_condition,
			get_having,
			get_message_error
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	