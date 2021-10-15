

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');

	
	//@
	//@
	//configs/config
	//function share
	const ojs_configs = require('../../../configs/config');
	const ojs_shares_date = require('../../../models/ojs-shares-date');	



	/////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////








	//create default data frome mysql tblUsers
	const  default_fields = {
		"discount_program_product_link_discount_program_details_id"		: "",	
		"discount_program_product_link_product_speciality_id"			: "",	
		"discount_program_product_link_status"							: 0,
		"discount_program_product_link_qoute"							: "",
		"discount_program_product_link_sale_of_price"					: 0
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			
			if(item == "discount_program_product_link_discount_program_details_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_product_link_discount_program_details_id) == false)
				{check_errer =  "ID chương trình  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
			}
			
			if(item == "discount_program_product_link_product_speciality_id"){
				if(check_data_fields.check_datas.check_empty(datas.discount_program_product_link_product_speciality_id) == false)
				{check_errer =  "ID sản phẩm  là bắt buộc, bạn chưa nhập dữ liệu";	return;}	
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
		if(error.sqlMessage.search("discount_program_product_link_discount_program_details_id") >= 0 ){
			return "Không tìm thấy id chương trình";
		}else if(error.sqlMessage.search("discount_program_product_link_product_speciality_id") >= 0){
			return " Không tìm thấy id sản phẩm ";


		}else if(error.sqlMessage.search("trig_discount_program_product_link_no_owner") >= 0){
			return " Sản phẩm không thuộc cửa hàng cửa bạn ";
		}else if(error.sqlMessage.search("trig_discount_program_product_link_double") >= 0){
			return " sản phẩm đã tham gia khuyến mãi này rồi, hoặc đã tham gia 1 chường trình khuyến mãi khác. Mỗi sản phẩm chỉ đoực tham gia 1 chương trình khuyến mãi";			


		}else if(error.sqlMessage.search("trig_discount_program_product_link_limit_product") >= 0){
			return " Số sản phẩm tham gia đã đủ ";
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin thêm sản phẩm vào chương trình";
		}
	}
	
	
	
	
	
	//@
	//@
	//@	
	//@
	//@
	//@
	//@ search fileds
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
	//@
	//@
	//@
	//@
	//@
	//@
	//@	














	//@
	//@
	//@
	//@	
	//@
	//@
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error,
			get_select_fields
	};