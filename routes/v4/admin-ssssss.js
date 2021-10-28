
//@
//@
//@
//@
//@ 1. [/]
router.get('/', async  function(req, res, next) {
try {	
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
		res.send({ "error" : "1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	var  user_id = ojs_shares_others.get_users_id(token);	
	var promise_all = [];
	promise_all.push(0);





	//--------------------------------------------------
	//             new menu
	// -------------------------------------------------
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
	var fn_get_datas_news_admin_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_admin_menu.get_news_admin_menu(datas_check_news_admin_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_admin_menu);




	//--------------------------------------------------
	//             datas
	// -------------------------------------------------
	
	//store arr
	var datas_send = ojs_datas_orders.get_stores_arr_admin();
	var fn_store_arr = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_store_arr);
	
	
	//@ order arr
	var datas_send = ojs_datas_orders.get_orders_arr_admin();
	var fn_orders_arr = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_orders_arr);
	
	
	//@orders_details
	var datas_send = ojs_datas_orders.get_stores_details_admin();
	var fn_orders_details = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	
	promise_all.push(fn_orders_details);	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	//@
	//@ promise all
	var promise_result = await Promise.all(promise_all);
	if(	promise_result[2].error != "" 
	|| 	promise_result[3].error != "" 
	|| 	promise_result[4].error != ""
	){
		res.send('<h1 style="width:100%; text-align:center; padding-top:40px;">Lỗi lấy data, vui lòng liên hệ CSKH dala</h1>');			
		return;		
	}


	datas_info = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: promise_result[1],
		'store_arr'			: promise_result[2].datas,
		"orders_arr"		: promise_result[3].datas,
		'orders_details'	: promise_result[4].datas
	}


	data_send = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: promise_result[1],
		'store_arr'			: promise_result[2].datas,
		"orders_arr"		: promise_result[3].datas,
		'orders_details'	: promise_result[4].datas,
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	
	
	res.render( ojs_configs.view_version + '/users/admin', data_send );	


}
catch(error){
	if(orders_list.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "113.router_app->admins", "message": error_send } ); 
		return;				
	}
}	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@