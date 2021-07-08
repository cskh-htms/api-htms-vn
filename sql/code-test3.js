	//@
	//@
	//@
	//@ check new bussiness
	var datas_check_news_bussiness_menu = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id':user_id,
		'store_id':store_id,
		'news_user':'news_user',
		'news_store': 'news_store',
		'news_order': 'news_order',
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_discount': 'news_discount',
		'news_discount_store_add': 'news_discount_store_add',
		'news_discount_product_add': 'news_discount_product_add'		

	}
	
	//res.send( datas_check_news_bussiness_menu );	
	//return;		
	var get_datas_news_bussiness_menu;
	try{
		get_datas_news_bussiness_menu = await ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy news bussiness menu" );
		res.send({ "error" : "routers bussiness web -> get_news_bussiness_menu -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_datas_news_bussiness_menu);
	//return;




	//@
	//@
	//@
	//@ datas_get_all_list_datas
	var datas_order_datas_send = {
		'status_admin_compare': '<>',
		'status_admin_value': '1'
	}
	var x = {...ojs_configs.orders_all};
	var s = Object.assign(x,datas_order_datas_send);
	
	//res.send(s);
	//return;
	
	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_product':ojs_configs.datas_all,
		'datas_cat':ojs_configs.datas_all,
		'datas_option':ojs_configs.datas_all,
		'datas_store':ojs_configs.datas_all,		
		'datas_brand':ojs_configs.datas_all,
		'datas_order': s
	}
	
	//res.send( datas_get_all_list_datas );	
	//return;		
	var get_all_list_datas;
	try{
		get_all_list_datas = await ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "routers bussiness web -> get_all_list_datas -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas);
	//return;
	
	
	
	//@
	//@
	//@
	//@ get_orders_datas
	
	var datas_orders_list_sum = {
		'date_star':ojs_shares_date.get_current_month_now(),
		'date_end':ojs_shares_date.get_current_date_end()
	}	
	var x = {...ojs_configs.orders_all};
	var s = Object.assign(x,datas_orders_list_sum);	
	
	//res.send( s );	
	//return;
	
	var datas_get_orders_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,		
		'datas_orders_list_sum':s,
		'datas_orders_product_list':ojs_configs.orders_all,
		'order_list_by_user' : ojs_configs.orders_all
	}
	
	//res.send( datas_get_orders_datas );	
	//return;	

	//@
	//@
	//@	
	//@
	var get_orders_datas;
	try{
		get_orders_datas = await ojs_shares_get_orders_datas.get_orders_datas(datas_get_orders_datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "routers bussiness web -> get_orders_datas -> 1", "message": error_send } ); 
		return;			
	}	