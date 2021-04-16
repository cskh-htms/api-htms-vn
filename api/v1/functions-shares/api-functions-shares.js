
const ojs_api_config = require('../api-configs/api-config');

const crypto = require('crypto');


const md5 = require('md5');





//@
//@ 
//hash
const encrypt = function (txt){
	var mykey = crypto.createCipher(ojs_api_config.hash_code,ojs_api_config.hash_secret);
	var mystr = mykey.update(txt, 'utf8', 'hex')
	mystr += mykey.final('hex');
	return mystr;
}
const decrypt = function (txt){
	var mykey = crypto.createDecipher(ojs_api_config.hash_code,ojs_api_config.hash_secret);
	var mystr = mykey.update(txt, 'hex', 'utf8')
	mystr += mykey.final('utf8');	

	return mystr;
}


//
//kiểm tra chế độ code show ra error
//nếu chế độ evn show ra lỗi
//nếu chế độ finish show ra message
//@evn -> chế độ code (evn)
//@ error -> lỗi trả về
//@message -> thông báo 
const show_error = function(evn,error,message){
	if(evn == "dev"){
		return error;
	}else{
		return message;
	}
}//end of showError

//
//@
//@
//@@
//@kieu tra xem dung kieu du lieu date ko
const  check_date_full = function(string_date){
   if(string_date == ""){
	   return true;
   }		
   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})([ ])(\d{1,2}[:]\d{1,2}[:]\d{1,2})$/;
   var inputEmail = string_date;

   if (regex.test(inputEmail)) {
	  return true;
   } else {           
		return false;
   }
}

//
//@
//@
//@@
//@kieu tra xem dung kieu du lieu date ko
const  check_date = function(string_date){
   if(string_date == ""){
	   return true;
   }		
   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})$/;
   var inputEmail = string_date;

   if (regex.test(inputEmail)) {
		return true;
   } else {           
		return false;
   }
}


//
//
//*
//!fn:check user role
//*
//notes: get role 
//
//*
//@toke:token tu web
//*
//file:api-config.js -> @user_role_return_text
//*
//return ->return text role
const check_role = function(token){
	
	
for (const [key, value] of Object.entries(ojs_api_config.user_role_database)) {

	if(md5(value) == role){
		return true;
	}else{
		return false;
	}  

}	
	
	
	
	
	if(md5("default-ne") == role){
		return true;
	}else{
		return false;
	}
}//end of showError
//@
//

//
//
//
//@lấy check role mac dinh
const check_role_default = function(role){
	if(md5("default-ne") == role){
		return true;
	}else{
		return false;
	}
}//end of showError
//@
//
//
//
//@lấy check role bussisness
const check_role_bussiness = function(role){
	if(md5("bussiness-ne") == role){
		return true;
	}else{
		return false;
	}
}//end of showError
//@

//

//

//
//@lấy check role bussisness
const check_role_admin = function(role){
	if(md5("admin-ne") == role){
		return true;
	}else{
		return false;
	}
}//end of showError
//@

//@
const get_select_field = function(field_arr,sql_select_all){
	var sql_field = "";
	//@
	if(Object.keys(field_arr).length == 0){
		sql_field = sql_select_all ;
	}else{
		for (var x in field_arr){
			
			let sql_field_date = "";
			
			if
			(	
			field_arr[x] == "products_speciality_date_start" 
			|| field_arr[x] == "products_speciality_date_end" 
			|| field_arr[x] == "stores_date_created" 
			|| field_arr[x] == "orders_speciality_date_orders" 
			
				
			)
			{
				sql_field_date  = "DATE_FORMAT(" + ojs_api_config.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
			}else{
				sql_field_date  = ojs_api_config.db_prefix + field_arr[x];
			}
			
			if(sql_field == ""){
				sql_field =  sql_field_date  + " as " +  field_arr[x];
			}else{
				sql_field =  sql_field  + ", " + sql_field_date  + " as " +  field_arr[x];
			}
		}
	}
	sql_field = sql_field + " ";
	return sql_field;
}//end of get_select_field


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
				//
				//@@ edit date order
				if(check_date_full(condition_arr[x].where[s].value) == true || check_date(condition_arr[x].where[s].value) == true ){
					consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
					consition_field = " UNIX_TIMESTAMP(" + ojs_api_config.db_prefix + condition_arr[x].where[s].field + ") ";
				
				}else if(condition_arr[x].where[s].compare == "in"){
					consition_value = "(" + condition_arr[x].where[s].value + ")";
					consition_field = ojs_api_config.db_prefix + condition_arr[x].where[s].field;
				}else{
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = ojs_api_config.db_prefix + condition_arr[x].where[s].field;
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



//@
const get_condition = function(condition_arr){
	var sql_condition = "";
	var sql_conditions = " where '2020' = '2020' ";
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
				if(check_date_full(condition_arr[x].where[s].value) == true || check_date(condition_arr[x].where[s].value) == true ){
					consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
					consition_field = " UNIX_TIMESTAMP(" + ojs_api_config.db_prefix + condition_arr[x].where[s].field + ") ";
				
				}else if(condition_arr[x].where[s].compare == "in"){
					consition_value = "(" + condition_arr[x].where[s].value + ")";
					consition_field = ojs_api_config.db_prefix + condition_arr[x].where[s].field;
				}else{
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = ojs_api_config.db_prefix + condition_arr[x].where[s].field;
				}				
				
				
				
				sql_condition = sql_condition + condition_arr[x].relation + " ";
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

//@
const get_order_text = function(order_arr){
	var sql_order = "";
	//@
	if(Object.keys(order_arr).length == 0){
		sql_order = "";
	}else{
		for (var x in order_arr){
			if(sql_order == ""){
				sql_order = "order by " + ojs_api_config.db_prefix + order_arr[x].field + " " + 
				order_arr[x].compare +  " " 
			}else{
				sql_order = sql_order + " , " + ojs_api_config.db_prefix + order_arr[x].field + " " + 
				order_arr[x].compare +  " " 				
			}
		}
	}
	return sql_order;
}//end of get_order_text 

//@@
//@@
//@@@@@@@@
//@@@@@@@@
//@@
//@@rename key ojs
const rename_key = (object, key, new_key) => {
	  const cloned_obj = clone(object);
	  const target_key = cloned_obj[key];
	  delete cloned_obj[key];
	  //@
	  cloned_obj[new_key] = target_key;
	  //@
	  //@
	  return cloned_obj;
};
const clone = (obj) => Object.assign({}, obj);





//
//
//
//@@
//@@get_group_by
const get_group_by = function(group_arr){
	var sql_group = "";
	//@
	for (var x in group_arr){
		if(sql_group == ""){
			sql_group =  sql_group  + ojs_api_config.db_prefix +  group_arr[x];
		}else{
			sql_group =  sql_group  + ", "  + ojs_api_config.db_prefix + group_arr[x];
		}
	}

	sql_group = " group by " + sql_group + " ";
	return sql_group;
}	
//
//
//
//@@
//@@
const get_select_type = function(select_type){
	var select_type = " " + select_type + " ";
	//@
	return select_type;
}	

//
//
//
//@@
//@@
const get_limit = function(limit_arr){
	var limit = "";
	if(limit_arr.length > 0){
		if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_number') != undefined){
			limit = " " + limit_arr[0].limit_number + " ";
			
			if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_offset') != undefined){
				limit = limit + " offset " + limit_arr[0].limit_offset;
			}	
			limit = "limit " + limit ;
		}	
	}
	//@
	return limit;
}	


//
//@@@@@@@
//@@
//@@
//@@@@@@@@
//@@@@@@@@
//@@
//@@
module.exports = {
		show_error,
		get_select_field,
		get_condition,
		get_order_text,
		rename_key,
		check_role_default,
		check_role_bussiness,
		check_role_admin,
		encrypt,
		decrypt,
		check_date_full,
		check_date,
		get_group_by,
		get_select_type,
		get_limit,
		get_having
}