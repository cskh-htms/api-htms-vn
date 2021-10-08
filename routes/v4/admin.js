//@
//@
//@
//@
//@ loader express
const express = require('express');
const router = express.Router();


//@
//@
//@
//@ loader extends module
const fetch = require('node-fetch');
const md5 = require('md5');

//@
//@
//@
//@ loader configs
const ojs_configs = require('../../configs/config');



//@
//@
//@
//@ loader function shares
const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_all = require('../../models/ojs-shares-get-all-list-datas-all');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');



const ojs_datas_orders = require('../../models/ojs-datas-orders');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

* 1. [/]








--------------------------------------------------------------
*/



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
	//@	
	//@ Lấy option tager
	var store_arr;
	try {
		
		var datas_send = ojs_datas_orders.get_stores_arr_admin();
		//res.send( datas_send );
		//return;
		store_arr = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',datas_send,ojs_configs.token_supper_job);
		
		//res.send(store_arr);
		//return;
	
		if(store_arr.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, store_arr.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins-store_arr", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(store_arr.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins-store_arr", "message": error_send } ); 
			return;				
		}
	}	


	//res.send(store_arr);
	//return;




	//@
	//@
	//@	
	//@ Lấy option tager
	var orders_arr;
	try {
		
		var datas_send = ojs_datas_orders.get_orders_arr_admin();
		//res.send( datas_send );
		//return;
		orders_arr = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',datas_send,ojs_configs.token_supper_job);
		
		//res.send(orders_arr);
		//return;
	
		if(orders_arr.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_arr.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins-orders_arr", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(orders_arr.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins-orders_arr", "message": error_send } ); 
			return;				
		}
	}	


	//res.send(orders_arr);
	//return;


	//@
	//@
	//@	
	//@ Lấy option tager
	var orders_details;
	try {
		
		var datas_send = ojs_datas_orders.get_stores_details_admin();
		//res.send( datas_send );
		//return;
		orders_details = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',datas_send,ojs_configs.token_supper_job);
		
		//res.send(orders_details);
		//return;
	
		if(orders_details.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_details.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins->orders_details", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(orders_details.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->admins-orders_details", "message": error_send } ); 
			return;				
		}
	}	


	//res.send(orders_details);
	//return;




	datas_info = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'store_arr'			: store_arr.datas,
		"orders_arr"		: orders_arr.datas,
		'orders_details'	: orders_details.datas
	}


	data_send = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'store_arr'			: store_arr.datas,
		"orders_arr"		: orders_arr.datas,
		'orders_details'	: orders_details.datas,
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





















//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-report-all', async  function(req, res, next) {
	//
	//@
	//@
	//get data req
	var datas  = req.body.datas;
	
	
	//@
	//=======================
	//=======================
	//=====header check ====
	//@
	//@
	//@
	//lấy token
	var token = req.session.token;	
	//@
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}

	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	//@
	//@
	//@	thong ke ban hang all
	var orders_report_all
	try {
		//var date_star = ojs_shares.get_current_month_now();
		//var date_end = ojs_shares.get_current_date_end();
		
		orders_report_all = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_data_report_all(datas.date_star,datas.date_end),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admin->orders_report_all", "message": error_send } ); 
			return;	
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	
	//send web
	data_send = {
		'orders_report_all' : orders_report_all.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render(  check_datas_result.view_version + '/masterpage/widget-admin-report-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



//get
//ajax payment
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-payment', async  function(req, res, next) {
	var datas  = req.body.datas;


	//@
	//=======================
	//=======================
	//=====header check ====
	//@
	//@
	//@
	//lấy token
	var token = req.session.token;	
	//@
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	//=======================
	//=======================
	//=====/header check ====
	//@

	//
	//@
	//@
	//@
	//@	bao` cao doanh thu theo cua hang
	try {
		var orders_report_store_view = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(datas.date_star,datas.date_end),
			token
		);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_admin->ajax-payment", "message": error_send } ); 
		return;	
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	
	
	//send web
	data_send = {
		'orders_report_store_view' : orders_report_store_view.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render(  check_datas_result.view_version + '/masterpage/widget-admin-payment-store-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





//get
//ajax payment
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-payment-checkout', async  function(req, res, next) {
	//
	var datas  = req.body.datas;
	

	//@
	//=======================
	//=======================
	//=====header check ====
	//@
	//@
	//@
	//lấy token
	var token = req.session.token;	
	//@
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	//=======================
	//=======================
	//=====/header check ====
	//@

	//@
	//@
	//@
	//@	bao` cao doanh thu theo cua hang
	var orders_report_store;
	try {
		//var date_star = ojs_shares.get_current_month_prev_star();
		//var date_end = ojs_shares.get_current_month_prev_end();
		//res.send( { "error" : "" , "message" : [date_star,date_end] } );
		//return;		
		
		orders_report_store = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(datas.date_star,datas.date_end),
			token
		);
		//res.send( orders_report_store );
		//return;
	}
	catch(error){
		res.send( { "error" : "01_orders_check" , "message" : error } );
	}	
	//@
	//@	end of admin menu order check	
	
	
	//@
	//@
	//@
	//@ lay danh sach stores theo payment ( lấy limit pay ment )
	var stores_payment_list ;
	try {
		stores_payment_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search-payment',
			ojs_datas_stores.stores_payment_list_datas(),
			token
		);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_admin->ajax-payment-checkout", "message": error_send } ); 
		return;	
	}	
	//@
	//@	end of admin menu order check	
		
	
		
	
	
	//send web
	data_send = {
		'orders_report_store' : orders_report_store.datas,
		'stores_payment_list' : stores_payment_list.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render( check_datas_result.view_version + '/masterpage/widget-admin-payment-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@












module.exports = router;