
	//--------------------------------------------------
	//              list datas
	// -------------------------------------------------



	//@
	//@
	//@ datas_orders
	var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
	var data_order_order_edit = {'order':data_order_order};
	var data_order_order_copy = {...ojs_configs.orders_all};	
	var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
	//@
	var data_order_data_edit = {'store_compare':'=','status_admin_compare': '<>','status_admin_value': '100'};
	//@
	var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);	

	
	
	
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
	
	
	
	
	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':ojs_configs.datas_all,
		'datas_order': data_order_ok,
		'datas_note': data_note_ok
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
		res.send({ "error" : "routers stores web -> get_all_list_datas -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas);
	//return;







	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_brand': ojs_configs.datas_all,
	}
	
	//res.send( datas_get_all_list_datas );	
	//return;		
	var get_all_list_datas_all;
	try{
		get_all_list_datas_all = await ojs_shares_get_all_list_datas_all.get_all_list_datas_all(datas_get_all_list_datas_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "routers bussiness web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas_all);
	//return;
