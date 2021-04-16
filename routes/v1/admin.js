var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');

const ojs_datas_orders = require('../../models/ojs-datas-orders.js');
const ojs_datas_stores = require('../../models/ojs-datas-stores.js');
const ojs_datas_products = require('../../models/ojs-datas-products.js');
const ojs_datas_category = require('../../models/ojs-datas-category.js');
const ojs_datas_option = require('../../models/ojs-datas-option.js');


const ojs_datas_brands = require('../../models/ojs-datas-brands.js');




//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.get('/', async  function(req, res, next) {
	
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
	
	//res.send(datas_check );	
	//return;		
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
	

	//@
	//@
	//@
	//kiem tra role
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
	
	//res.send( { "error" : "" , "message" : "hú hú"} );
	//return;	
	
	
	
	//@
	//@
	//@
	//@	admin menu order check
	try {
		var date_star = "2020/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number = "0";
		
		var orders_check = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search',
			ojs_datas_orders.orders_check_menu_data(date_star,date_end,sattus_number),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admi->orders_check ", "message": error_send } ); 
			return;	
	}	
	//@
	//@	end of admin menu order check
	
	
		
	//@
	//@
	//@
	//@	admin menu produst  check
	var product_check;
	try {
		var sattus_number = 0;
		product_check = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/search',
			ojs_datas_products.get_data_product_check(sattus_number),
			token
		);
		//res.send(product_check);
		//return;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_admi->product_check ", "message": error_send } ); 
		return;	
	}	
	//@
	//@	end of admin menu product check	
			
	
	
	
	//@
	//@
	//@
	//@	thong ke ban hang all
	try {
		var date_star = "2020/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		
		var orders_report_all = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_data_report_all(date_star,date_end),
			token
		);
		//res.send( { "error" : "" , "message" : orders_report_all } );
		//return;
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
	
	
	
	
	
	//@
	//@
	//@
	//@	bao` cao theo cua hang kỳ thanh toán
	try {
		var date_star = "2020/01/01 00:00:00";
		var date_end = ojs_shares.get_current_month_prev_end();
		//res.send( { "error" : "" , "message" : [date_star,date_end] } );
		//return;		
		
		var orders_report_store = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(date_star,date_end),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admin->orders_report_store", "message": error_send } ); 
			return;		
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	//@
	//@
	//@
	//@	bao` cao theo cua hang 
	try {
		var date_star = ojs_shares.get_current_month_now();
		var date_end = ojs_shares.get_current_date_end();
		//res.send( { "error" : "" , "message" : [date_star,date_end] } );
		//return;		
		
		var orders_report_store_view = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(date_star,date_end),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admin->orders_report_store_view", "message": error_send } ); 
			return;		
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	//@
	//@
	//@
	//@ lay danh sach stores theo payment ( lấy limit pay ment )
	try {
		var stores_payment_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search-payment',
			ojs_datas_stores.stores_payment_list_datas(),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admin->stores_payment_list", "message": error_send } ); 
			return;		
	}	
	//@
	//@	end of admin menu order check	
		
	
	
	
	
	//@
	//@
	//@
	//@	tin tức cửa hàng	
	var danhSachCuaHang;
	try {
		danhSachCuaHang = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
			ojs_datas_stores.get_data_store_list_admin_news(), 
			token
		);	
		
		if(danhSachCuaHang.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, danhSachCuaHang.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "48.router_stores(app)->show-all->store_list", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->show-all", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//@
	//@	tin tức category	
	var category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_admin_news(), 
				token
			);

		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_general_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "41.router_admin(app)->category_general_list", "message": error_send } ); 
			return;				
		}
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "42.router_admin(app)->category_general_list", "message": error_send } ); 
		return;	
	}
	
	//@
	//@
	//@
	//@	tin tức options	
	var options_list;
	try {
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_admin_news(), 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "33.router_admin(app)->options_list", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "34.router_admin(app)->options_list", "message": error_send } ); 
			return;		
	}
	//
	//	
	
	
	
	
	
	//
	//Lấy danh sách các options
	var brands_list;
	try {

		
		brands_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/brands/search', 
			ojs_datas_brands.get_data_brands_list_admin_news(), 
			token
		);	
		
		if(brands_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,brands_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_app->brands->get", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_admin(app)->brands", "message": error_send } ); 
			return;		
	}
	//	
	
	
	//
	//Lấy danh sách các options
	var product_list;
	try {

		
		product_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/products/speciality/search', 
			ojs_datas_products.get_data_product_list_admin_news(), 
			token
		);	
		
		if(product_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,product_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_app->brands->get", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_admin(app)->brands", "message": error_send } ); 
			return;		
	}
	//		
	
	
	
	//send web
	var news_sum = 	
		danhSachCuaHang.datas.length +	
		category_general_list.datas.length + 
		brands_list.datas.length + 
		product_list.datas.length + 
		options_list.datas.length ;
	
	data_send = {
		'title' : 'Admin quản lý dala',
		'sidebar_type' : 1,
		'users_type' : check_datas_result.user_role,
		'orders_check' : orders_check.datas,
		'orders_report_all' : orders_report_all.datas,
		'orders_report_store' : orders_report_store.datas,
		'orders_report_store_view' : orders_report_store_view.datas,
		'stores_payment_list' : stores_payment_list.datas,
		'product_check' : product_check.datas,
		'js_css_version' : check_datas_result.js_css_version,
		'stores_new': danhSachCuaHang.datas.length,
		'category_new': category_general_list.datas.length,
		'option_new': options_list.datas.length,
		'brand_new': brands_list.datas.length,
		'product_new': product_list.datas.length,
		"news_sum": news_sum
	}
	
	//res.send(data_send);
	//return;	
	res.render( check_datas_result.view_version + '/users/admin', data_send );	

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