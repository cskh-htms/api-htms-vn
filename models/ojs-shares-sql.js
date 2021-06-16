
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/


const ojs_shares_date = require('./ojs-shares-date.js');
const ojs_configs = require('../configs/config');



const ojs_shares_sql = {
	//@@
	//@@
	//@@
	//@@
	get_select_type : function(select_type){
		var select_type = " " + select_type + " ";
		//@
		return select_type;
	},
	
	
	//@
	//@
	//@
	//get_select_field
	get_select_field : function(field_arr,sql_select_all){
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
					sql_field_date  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
				}else{
					sql_field_date  = ojs_configs.db_prefix + field_arr[x];
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
	},//end of get_select_field

	//@
	//@
	//@
	// get condition text
	get_condition : function(condition_arr){
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
					ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == true 
					|| 
					ojs_shares_date.check_date(condition_arr[x].where[s].value) == true 
					){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
					
					}
					
					
					
					//
					//@in condition
					if(condition_arr[x].where[s].compare == "in"){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
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

	},//end of get_condition
	
	//@
	//@
	//@
	//@having
	get_having : function(condition_arr){
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


	//@
	//@
	//@
	//get order text
	get_order_text : function(order_arr){
		var sql_order = "";
		//@
		if(Object.keys(order_arr).length == 0){
			sql_order = "";
		}else{
			for (var x in order_arr){
				if(sql_order == ""){
					sql_order = "order by " + ojs_configs.db_prefix + order_arr[x].field + " " + 
					order_arr[x].compare +  " " 
				}else{
					sql_order = sql_order + " , " + ojs_configs.db_prefix + order_arr[x].field + " " + 
					order_arr[x].compare +  " " 				
				}
			}
		}
		return sql_order;
	},//end of get_order_text 

	//
	//
	
	//
	//@@
	//@@get_group_by
	get_group_by : function(group_arr){
		var sql_group = "";
		//@
		for (var x in group_arr){
			if(sql_group == ""){
				sql_group =  sql_group  + ojs_configs.db_prefix +  group_arr[x];
			}else{
				sql_group =  sql_group  + ", "  + ojs_configs.db_prefix + group_arr[x];
			}
		}

		sql_group = " group by " + sql_group + " ";
		return sql_group;
	},	
	//
	//
	//

	//
	//
	//
	//@@
	//@@get limit
	get_limit : function(limit_arr){
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
	},	
	//
	//
	//
	//@@
	//@@get serrch sql 
	get_sql_search : function(datas,sql_select_all){
		//return datas;
		//@
		let sql_result = "";
		ojs_assign = ojs_configs.valiable_search;
		
		//@
		//@
		//@
		//@ select type
		var ojs_1 = {...ojs_assign};
		try {
			if(datas.select_type){
				var sql_select_type = ojs_shares_sql.get_select_type(datas.select_type);
				Object.assign(ojs_1,  { 'sql_select_type' : sql_select_type } );
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number : 1 ", "message" : error } ;
		}		
		
		
		//@
		//@
		//@
		//@ select field
		var ojs_2 = {...ojs_1};
		try {
			if(datas.select_field){
				var sql_field = ojs_shares_sql.get_select_field(datas.select_field, sql_select_all);
				Object.assign(ojs_2, { 'sql_select_fields' : sql_field });
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number : 2 ", "message" : error } ;
		}	
		
		
		
		//@
		//@
		//@
		//@ conditon
		var ojs_3 = {...ojs_2};
		try {
			if(datas.condition){
				var sql_conditions = ojs_shares_sql.get_condition(datas.condition);
				Object.assign(ojs_3, { 'sql_conditions' : sql_conditions });
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number : 3" , "message" : error } ;
		}	

		//@
		//@
		//@
		//@ group by
		var ojs_4 = {...ojs_3};
		try {
			if(datas.group_by){
				var sql_group_by = ojs_shares_sql.get_group_by(datas.group_by);
				Object.assign(ojs_4, { 'sql_group_by' : sql_group_by });
			}				
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number : 4 ", "message" : error } ;
		}	


		//@
		//@
		//@
		//@ having
		var ojs_5 = {...ojs_4};
		try {
			if(datas.having){
				var sql_having = ojs_shares_sql.get_having(datas.having);
				Object.assign(ojs_5, { 'sql_having' : sql_having });
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number :  5", "message" : error } ;
		}	



		//@
		//@
		//@
		//@ order
		var ojs_6 = {...ojs_5};
		try {
			if(datas.order){
				var sql_order = ojs_shares_sql.get_order_text(datas.order);
				Object.assign(ojs_6, { 'sql_order' : sql_order });
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number : 6 ", "message" : error } ;
		}	


		//@
		//@
		//@
		//@ limit
		var ojs_7 = {...ojs_6};
		try {
			if(datas.limit){
				var sql_limit = ojs_shares_sql.get_limit(datas.limit);
				Object.assign(ojs_7, { 'sql_limit' : sql_limit });
			}		
		}
		catch(error){
			return  { "error" : "ojs_share_sql->get_sql_search->error_number :  7", "message" : error } ;
		}	


	
		//@
		//@
		//@
		//@
		return ojs_7;
	},	
	//
	//
	//
	//@@
	//@@get limit
	get_sql_search_group : function(data_assigns,sql_from_default,sql_link_default){
		//@
		//@
		//@
		/*
		if(data_assigns.sql_conditions == "" && sql_link_search.length > 0){
			sql_link_search = " where " + sql_link_search;
		}else{
			if(sql_link_search != ""){
				sql_link_search = " and " + sql_link_search;
			}
		}
		*/
		//@
		var sql_text = 	"SELECT  " + 
						data_assigns.sql_select_type + 
						data_assigns.sql_select_fields +
						sql_from_default + 
						sql_link_default + 
						data_assigns.sql_conditions + 
						data_assigns.sql_group_by + 
						data_assigns.sql_having + 
						data_assigns.sql_order + 
						data_assigns.sql_limit
		
		
		return sql_text;
	}	







	
}//end of oj_loader


module.exports = ojs_shares_sql;




