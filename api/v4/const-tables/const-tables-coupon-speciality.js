

	//@
	//@
	//configs/config
	//function share
	const ojs_configs = require('../../../configs/config');
	const ojs_shares_date = require('../../../models/ojs-shares-date');	





	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
		"coupon_speciality_code"				:"",
		"coupon_speciality_stores_id_created"	: 0,
		"coupon_speciality_info"				: "",
		"coupon_speciality_type"				: 0,
		"coupon_speciality_formula_price"		: 0,
		"coupon_speciality_formula_price_value"	: 0,
		"coupon_speciality_condition"			: 0,
		"coupon_speciality_condition_value"		: 0,
		"coupon_speciality_price_max"			: 0,
		"coupon_speciality_date_star"			:null,
		"coupon_speciality_date_end"			:null,
		"coupon_speciality_multiple"			: 0,
		"coupon_speciality_status_admin"		: 0,
		"coupon_speciality_status_update"		: 0,
		"coupon_speciality_limit_user"			: 0,
		"coupon_speciality_qoute":""
	}
	
	
	
	
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "coupon_speciality_code"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_code) == false){check_errer =  "ma code là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}
			
			if(item == "coupon_speciality_price"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_price) == false){check_errer =  "tiền khuyến mãi là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
			}			
			
			if(item == "coupon_speciality_formula"){
				if(check_data_fields.check_datas.check_empty(datas.coupon_speciality_formula) == false){check_errer =  "mã cônt thức là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
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
		if(error.sqlMessage.search("trig_coupon_speciality_code_empty") >= 0 ){
			return "Chưa nhập code";
		}else if(error.sqlMessage.search("coupon_speciality_stores_id_created") >= 0){
			return " Không tìm thấy cửa hàng ";
			
		}else{
			return "Lỗi nhập dữ liệu vui lòng liên hệ admin";
		}
	}	
	//@
	//@
	
	

	//@
	//@
	//@
	//@
	//@
	//@
	//get_select_field
	get_select_fields =  function(field_arr,sql_select_all){
		//return field_arr;
		var sql_field = "";
		//@
		if(Object.keys(field_arr).length == 0){
			sql_field = sql_select_all ;
		}else{
			for (var x in field_arr){
				
				var sql_field_check = "";
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
				// nếu là kiểu ngày tháng
				if
				(	
				field_arr[x] == "products_speciality_date_start" 
				|| field_arr[x] == "products_speciality_date_end" 
				|| field_arr[x] == "stores_date_created" 
				|| field_arr[x] == "orders_speciality_date_orders" 
				)
				{
					sql_field_check  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
				//@
				//@
				//@ nếu là biểu thức
				}else if(regex.test(field_arr[x]) ){
					sql_field_check  = " " + split_arr[0].trim() + "(" + ojs_configs.db_prefix  + split_arr[1].trim();	

				//@
				//@
				//@
				//@	check hạn cửa coupon			
				}else if(field_arr[x] == "check_expired" ){	
					sql_field_check  = " " + 	
					"(CASE " + 
						" WHEN " + ojs_configs.db_prefix  + "coupon_speciality_date_star is null " + 
							"and " + ojs_configs.db_prefix  + "coupon_speciality_date_end is null  " + 
						" THEN " +  
							" 1 "  + 
							
						" WHEN " + ojs_configs.db_prefix  + "coupon_speciality_date_star is null " + 
							"and " + ojs_configs.db_prefix  + "coupon_speciality_date_end is not null  THEN " +  
							"IF( " + 
								" UNIX_TIMESTAMP() - UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "coupon_speciality_date_end) < 0  ,1,0 " + 
							")" +  
							
						" WHEN " + ojs_configs.db_prefix  + "coupon_speciality_date_star is not null " + 
							"and " + ojs_configs.db_prefix  +  "coupon_speciality_date_end is null  THEN " +  
							" IF( " + 
								"UNIX_TIMESTAMP() - UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "coupon_speciality_date_star) < 0  ,0,1 " + 
							") " + 		
							
						" WHEN " + ojs_configs.db_prefix  + "coupon_speciality_date_star is not null " + 
							"and " + ojs_configs.db_prefix  + "coupon_speciality_date_end is not null  THEN " + 
							
							" CASE " +  
							" WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "coupon_speciality_date_star) < 0 ) THEN " + 		
								" 0 " +  
								
							" WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(" +  ojs_configs.db_prefix  +"coupon_speciality_date_star) > 0  ) THEN " + 		
							
								" IF( " + 
									" UNIX_TIMESTAMP() - UNIX_TIMESTAMP(" + ojs_configs.db_prefix  + "coupon_speciality_date_end) < 0  ,1,0 " +
								") " + 			
								
							" END " + 
						" ELSE " +    
							" 100 " + 
					" END) " 
	
				}else{
					sql_field_check  = ojs_configs.db_prefix + field_arr[x];
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
	}//end of get_select_field

	
	
	
	
	//@
	//@
	//@
	//@having
	get_having = function(condition_arr){
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
					//
					//@@ edit date order
					if(ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == true || ojs_shares_date.check_date(condition_arr[x].where[s].value) == true ){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
					}else if(condition_arr[x].where[s].compare == "in"){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}else if(condition_arr[x].where[s].compare == "is not null"){
						consition_value = condition_arr[x].where[s].value;
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}else if(condition_arr[x].where[s].field == "check_expired"){
						consition_value = condition_arr[x].where[s].value;
						consition_field = condition_arr[x].where[s].field;						
					}else{
						consition_value = " '" + condition_arr[x].where[s].value + "' ";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
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
	},//end of get_having		
	
	
	
	
	
	
	
	module.exports = { 
			default_fields,
			check_datas,
			get_message_error,
			get_select_fields,
			get_having
	};