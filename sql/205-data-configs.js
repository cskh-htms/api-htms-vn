








<%= datas[0].discount_program_price_sale %>



<%= ojs_share.show_price_format(datas[0].discount_program_price_sale,0,",",".","đ") %>



<%- ojs_share.show_discount_program_time_type(datas[0].discount_program_time_type) -%>


<%- ojs_share.unCape(datas[0].discount_program_information) -%>




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
//@ product
var data_product_order_copy = {...ojs_configs.datas_all};	
var data_product_data_edit = {
		'status_admin_compare': '=',
		'status_admin_value': '1',
		'status_store_compare': '=',
		'status_store_value': '1',			
	};
var data_product_ok = Object.assign(data_product_order_copy,data_product_data_edit);







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
//@ datas_store
var data_store_copy = {...ojs_configs.datas_all};	
var data_store_data_edit = {'user_compare':'<>'};
var data_store_ok = Object.assign(data_store_copy,data_store_data_edit);



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




//@
//@
//@ datas_brand
var data_brand_order = [{'field':'brands_date_created','compare':'DESC'}];
var data_brand_order_edit = {'order':data_brand_order};
var data_brand_order_copy = {...ojs_configs.datas_all};	
var data_brand_order_assign = Object.assign(data_brand_order_copy,data_brand_order_edit);
//@
var data_brand_data_edit = {'user_compare':'<>','status_admin_compare': '<>'};
var data_brand_ok = Object.assign(data_brand_order_assign,data_brand_data_edit);




//@
//@
//@ datas_note
var data_note_order = [{'field':'notes_date_created','compare':'DESC'}];
var data_note_order_edit = {'order':data_note_order};
var data_note_order_copy = {...ojs_configs.datas_all};	
var data_note_order_assign = Object.assign(data_note_order_copy,data_note_order_edit);
//@
var data_note_data_edit = {'status_admin_compare': '<>','status_admin_value': '100'};
//@
var data_note_ok = Object.assign(data_note_order_assign,data_note_data_edit);	



////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@
datas_all_admin : {
	'user_compare': '<>',
	'store_compare':'<>',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_store_compare':'=',
	'status_store_value':1	,
	'order' : []	
}



//@
//@
//@
//@
//@
datas_all : {
	'user_compare': '=',
	'store_compare':'=',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_store_compare':'=',
	'status_store_value':1	,
	'order' : []	
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
	'date_end':ojs_shares_date.get_current_date_end(),
	'order':[]
}		
		
		


