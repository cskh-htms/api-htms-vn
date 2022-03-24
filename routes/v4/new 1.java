






//@
//@
//@
//@
//@
//@
//@ 0. [/store-active]
router.get('asdasdasd/store-active', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers option web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//@
	var  user_id = ojs_shares_others.get_users_id(token);		
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}	
	
	//res.send( [user_id] );	
	//return;		
	
	
	
	
	//@
	//@
	//@
	//@ check new
	var datas_check_news_admin_menu = {
		'res':res,
		'token':token,
		'news_order': 'news_order',
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_product': 'news_product',
		'news_brand': 'news_brand',
		'news_comment': 'news_comment',
		'news_review': 'news_review',
		'news_discount': 'news_discount',
		'news_discount_store_add' : 'news_discount_store_add',
		'news_discount_product_add' : 'news_discount_product_add',
		'news_review_store' : 'news_review_store',
		'news_coupon' : 'news_coupon'
	}
	
	//res.send( datas_check_news_admin_menu );	
	//return;	


	var get_datas_news_admin_menu;
	try{
		get_datas_news_admin_menu = await ojs_shares_news_admin_menu.get_news_admin_menu(datas_check_news_admin_menu);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy news admin menu" );
		res.send({ "error" : "routers admin web -> get_news_admin_menu -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_datas_news_admin_menu);
	//return;





	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
		
	//@
	//@
	//@ data_discount
	var data_discount_order = [{'field':'discount_program_date_created','compare':'DESC'}];
	var data_discount_order_edit = {'order':data_discount_order};
	var data_discount_order_copy = {...ojs_configs.datas_all};	
	var data_discount_order_assign = Object.assign(data_discount_order_copy,data_discount_order_edit);
	//@
	var data_discount_data_edit = {
			'status_admin_compare':'in',
			'status_admin_value':[0],
			'user_compare':'<>',
			'store_compare':'<>'
		};
	var data_discount_ok = Object.assign(data_discount_order_assign,data_discount_data_edit);	
	
	
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' :0,
		'store_id' : 0,
		'datas_discount_store_add': data_discount_ok
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



	datas_info = {
		'title' 			: 'Quản lý chương trình khuyến mãi',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_discount_program',
		'sidebar_type'		:  "",
		
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'discount_program_store_add_list' : get_all_list_datas[9].datas
	}


	data_send = {
		'title' 			: 'Quản lý chương trình khuyến mãi',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_discount_program',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'discount_program_store_add_list' : get_all_list_datas[9].datas,
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	//cua bao admin-show-all
	
	res.render( ojs_configs.view_version + '/discount-program/speciality/admin-show-store-active', data_send );	

});
//@
//@
//@
//@