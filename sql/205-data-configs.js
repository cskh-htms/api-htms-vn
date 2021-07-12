





















//@
//@
//@
//@ datas_user_all
var data_user_order = [{'field':'users_date_created','compare':'DESC'}];
var data_user_order_edit = {'order':data_user_order};
var data_user_order_copy = {...ojs_configs.datas_all_admin};	
var data_user_order_assign = Object.assign(data_user_order_copy,data_user_order_edit);
//@
var data_user_data_edit = {'status_admin_compare':'<>','status_store_compare':'<>'};
//@
var data_user_ok = Object.assign(data_user_order_assign,data_user_data_edit);







//@
//@
//@
//@
//@ datas_store_all
var data_store_order = [{'field':'stores_date_created','compare':'DESC'}];
var data_store_order_edit = {'order':data_store_order};
var data_store_order_copy = {...ojs_configs.datas_all_admin};	
var data_store_order_assign = Object.assign(data_store_order_copy,data_store_order_edit);
//@
//@






//@
//@
//@ datas_orders_all
var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
var data_order_order_edit = {'order':data_order_order};
var data_order_order_copy = {...ojs_configs.orders_all};	
var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
//@
var data_order_data_edit = {'store_compare':'<>','status_admin_compare': '<>'};
//@
var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);	





////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@
datas_all_admin : {
	'user_compare': '=',
	'store_compare':'<>',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_store_compare':'=',
	'status_store_value':1		
}



//@
//@
//@
//@
//@
datas_all : {
	'user_compare': '=',
	'store_compare':'<>',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_store_compare':'=',
	'status_store_value':1		
}


//@
//@
//@
//@
//@

orders_all : {
	'user_compare': '=',
	'store_compare':'<>',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_payment_compare':'=',
	'status_payment_value':1,
	
	'line_order_compare':'=',
	'line_order_value':'product',		

	'date_star':'2021/01/01 00:00:00',
	'date_end':ojs_shares_date.get_current_date_end()
}		
		
		


