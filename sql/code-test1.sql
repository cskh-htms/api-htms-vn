



-- 
-- 
-- 
-- 

-- list-datas
var note = {
	'0':'khong có',
	'1': 'datas_user',
	'2': 'datas_store',
	'3': 'datas_order',
	'4': 'datas_cat',
	'5': 'datas_option',
	'6': 'datas_brand',
	'7': 'datas_product',
	'8': 'datas_discount',
	'9': 'datas_discount_store_add',
	'10': 'datas_discount_product_add',
	'11': 'datas_comment',
	'12': 'datas_review',	
	'13': 'datas_review_store',
	'14': 'datas_coupon'		
}

-- order all
var note = {
	'0':'khong có',
	'1':'datas_orders_list_sum(thống kê theo cửa hàng)',
	'2':'datas_orders_product_list(thống kê theo sản phẩm)'	,
	'3':'order_list_by_user(thống kê order by store theo user)'			
}
		
		
-- 
datas_all : {
	'user_compare': '=',
	'store_compare':'<>',
	
	'status_admin_compare':'=',
	'status_admin_value':1,
	
	'status_store_compare':'=',
	'status_store_value':1		
},	
-- 
-- 
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
		
		
		
		
		
		
--
--
--
var datas_orders_list_sum = {
	'date_star':ojs_shares_date.get_current_month_now(),
	'date_end':ojs_shares_date.get_current_date_end()
}	
var x = {...ojs_configs.orders_all};
var s = Object.assign(x,datas_orders_list_sum);		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		