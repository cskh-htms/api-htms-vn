
	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
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
		'order_list_by_user' : ojs_configs.orders_all,
		'order_sum_count' : ojs_configs.orders_all
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
	
	
	//res.send(get_orders_datas);
	//return;	


