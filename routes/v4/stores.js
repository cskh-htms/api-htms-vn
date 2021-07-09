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


//@
//@
//@
//@ loader configs
const ojs_configs = require('../../configs/config');



//@

//@
//@
//@ loader function shares
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');


const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
-------------------------------------------------------------------

1. [/manage/:store_id/:user_id]













--------------------------------------------------------------------
*/



//@
//@
//@
//@
//@
//@ 1. [/manage/:store_id/:user_id]
router.get('/manage/:store_id/:user_id', async  function(req, res, next) {

	
	//@
	//@
	//@
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		var user_id = req.params.user_id;
		
		if(token == "" || token == null || token == undefined){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers bussiness web -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@
	//@ check new bussiness
	var datas_order_send = {
		'status_admin_compare':'<>'
	}
	
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);		
	
	//@
	//@
	//@
	var datas_note_send = {
		'status_admin_compare':'<>'
	}
	
	var datas_note_send_x = {...ojs_configs.datas_all};
	var datas_note_send_s = Object.assign(datas_note_send_x,datas_note_send);	
	
	
	
	var datas_check_news_bussiness_menu = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id':user_id,
		'store_id':store_id,
		'news_user':'news_user',
		'news_order': datas_order_send_s,
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_note':datas_note_send_s		

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

		
	



	//res.send(s);
	//return;
	var datas_store_send = {
		'store_compare':'='
	}	
	var datas_store_send_x = {...ojs_configs.datas_all};
	var datas_store_send_s = Object.assign(datas_store_send_x,datas_store_send);		
	
	
	//@
	//@
	//@
	//@ datas_get_all_list_datas
	var datas_order_send = {
		'status_admin_compare': '<>',
		'status_admin_value': '100',
		'store_compare': '=',
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);
	
	
	
	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':datas_store_send_s,
		'datas_order': datas_order_send_s,
		'datas_note': ojs_configs.datas_all
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
	
	//res.send(get_all_list_datas[15].datas);
	//return;




	//@
	//@
	//@
	//@ datas_get_all_list_datas
	var datas_order_send = {
		'date_star':ojs_shares_date.get_current_month_now()
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);	
	
	
	//@
	//@
	//@
	var datas_note_send = {
		'status_admin_compare':'<>'
	}
	var datas_note_send_x = {...ojs_configs.datas_all};
	var datas_note_send_s = Object.assign(datas_note_send_x,datas_note_send);		
	
	
	var datas_get_all_list_datas_count = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_order':datas_order_send_s,
		'datas_cat':ojs_configs.datas_all,
		'datas_option':ojs_configs.datas_all,
		'datas_brand':ojs_configs.datas_all,
		'datas_product':ojs_configs.datas_all,	
		'datas_note' : datas_note_send_s
	}
	
	//res.send( datas_get_all_list_datas_count );	
	//return;		
	
	
	var get_all_list_datas_count;
	try{
		get_all_list_datas_count = await ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas count bussiness" );
		res.send({ "error" : "routers bussiness web -> get_all_list_datas_count -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas_count);
	//return;





	
	//@
	//@
	//@
	//@
	//@ send
	try {	
		data_send = {
			'title' 				: 'Quản lý doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_quan_ly',
			
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'store_list' 			: get_all_list_datas[2].datas,
			'order_list' 			: get_all_list_datas[3].datas,
			'notes_list' 			: get_all_list_datas[15].datas
			
		}
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/stores/manage', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send", "Lỗi send" );
		res.send({ "error" : "router_store(app)->manage", "message": error_send } ); 
		return;	
	}	
});
//@
//@
//@
//@
//@ end of 
//@ 1. [/manage/:store_id/:user_id]



















//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.get('/', async  function(req, res, next) {
	//
	//var session_token = req.session;
	var token = req.session.token;	
	//
	//
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
	var datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_stores(app)->ajax-report-order-store ", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_stores(app)->ajax-report-order-store", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_stores(app)->show-all", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@
	
	
	
	var danhSachCuaHang;
	try {
		danhSachCuaHang = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
			ojs_datas_stores.get_data_store_list_admin(), 
			token
		);	
		
		if(danhSachCuaHang.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, danhSachCuaHang.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_list", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->show-all", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@
	//@
	try {
		var user_id_send = ojs_shares.get_users_id(token);
		var user_type = check_datas_result.user_role;	
		var users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý cửa hàng',
			'users_type' : user_type,
			'user_role': user_type,
			'user_id'	: user_id_send,
			'store_list' : danhSachCuaHang.datas,
			'users_full_name' : users_full_name,
			"js_css_version": check_datas_result.js_css_version,
			'menu_taget': 'sidebar_cua_hang'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/stores/admin', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi send data, liên hệ admin");
		res.send({ "error" : "3.3.router_storess(app)->show-all", "message": error_send } ); 
		return;				
	}	
});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@













//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.get('/manage/orders/:store_id/:status_int', async  function(req, res, next) {
	//
	var token = req.session.token;	
	var store_id = req.params.store_id;
	var status_int = req.params.status_int;
	var user_id = ojs_shares.get_users_id(token);
	//
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
	var datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_stores(app)->manage ", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_stores(app)->manage_orders", "message": error_send } ); 
		return;			
	}
	
	
	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		var service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_store(app)->manage", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_store(app)->manage", "message": error_send } ); 
		return;	
	}	
	//
	
		
	
	//@
	//@
	//@
	//@
	//lấy tên cửa ah2ng
	var store_name;
	try {
		store_name = await ojs_shares.get_data_send_token_get(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id , token
		);	
		
		if(store_name.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->orders->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->name", "message": error_send } ); 
		return;			
	}	
		
		

	

	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	

	var orders_list;
	try {
		var date_star = "2000/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number;
		
		if(status_int == "all"){
			sattus_number = [0,1,2,3,4,5,6,7,8,9];
		}else{
			sattus_number = [status_int];
		}
		
		
		orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_store_order(store_id,date_star,date_end,sattus_number),
			token
		);
		
		//res.send(orders_list);
		//return;
		
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->stores->manage_orders", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->router->stores->manage_orders", "message": error_send } ); 
			return;		
	}
	//		
	
	
	
	//
	var sattus_number = [0,1,2,3,4,5,6,7,8,9];
	
	//var date_star = ojs_shares.get_current_month_now();
	var date_star = "2020/01/01 00:00:00";
	var date_end = ojs_shares.get_current_date_end() ;
	//	
	var order_list_all;
	try {

		order_list_all = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search', 
			ojs_datas_orders.get_order_list_datas_all_store(store_id,date_star,date_end,sattus_number), 
			token
		);
	
		if(order_list_all.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;;
			var error_send = ojs_shares_show_errors.show_error( evn, order_list_all.error, "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "41.router_stores(app)->order_list_all", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy dữ liệu order", "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "42.router_stores(app)->order_list_all", "message": error_send } ); 
			return;	
	}		
	//res.send(order_list_all);
	//return;	

	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		var users_type = check_datas_result.user_role;	
		var users_full_name = ojs_shares.get_users_full_name(token);
		//@
		//@
		data_send = {
			'title' : 'Quản lý đơn hàng',
			'sidebar_type' : 4,
			'users_type' : check_datas_result.user_role,
			'store_id' : store_id,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_don_hang',
			'orders_list' : orders_list.datas,
			'order_list_all' : order_list_all.datas,
			"status_int":status_int,
			'store_name' : store_name.datas[0].stores_name,
			"service_type_name" : service_type_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/stores/orders', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router->stores->manage_orders", "message": error_send } ); 
		return;	
	}	
});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-orders-list', async  function(req, res, next) {
	//
	var token = req.session.token;	
	var datas  = req.body.datas;
	//

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
	var datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_stores(app)->ajax-orders-list ", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_stores(app)->ajax-orders-list", "message": error_send } ); 
		return;			
	}
	



	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	

	
	var orders_list;
	try {
		orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_store_order(datas.store_id,datas.date_star,datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->stores->ajax-orders-list", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->router->stores->ajax-orders-list", "message": error_send } ); 
			return;		
	}
	//		
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		var users_type = check_datas_result.user_role;	
		var user_id = ojs_shares.get_users_id(token);	
		var users_full_name = ojs_shares.get_users_full_name(token);
		//@
		//@
		data_send = {
			'orders_list' : orders_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-order-show-table-stores', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router->stores->ajax-orders-list", "message": error_send } ); 
		return;	
	}	
});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@












module.exports = router;