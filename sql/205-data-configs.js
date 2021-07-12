










//@
//@
//@
//@
//@
var datas_orders_list_sum = {
	'date_star':ojs_shares_date.get_current_month_now(),
	'date_end':ojs_shares_date.get_current_date_end()
}	
var x = {...ojs_configs.orders_all};
var s = Object.assign(x,datas_orders_list_sum);		




var data_edit = {
	'date_star':ojs_shares_date.get_current_month_now(),
	'date_end':ojs_shares_date.get_current_date_end()
}	
var data_edit_x = {...ojs_configs.datas_all};
var data_edit_s = Object.assign(data_edit_x,data_edit);		






//@
//@		
var data_user_edit = {
	'status_admin_compare':'<>',
	'status_admin_value':'0',
	'status_store_compare':'<>',
	'status_store_value':'0',
	'order':	user_order,	
}	
var data_user_edit_x = {...ojs_configs.datas_all};
var data_user_edit_s = Object.assign(data_user_edit_x,data_user_edit);		
//@
//@







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
		
		


