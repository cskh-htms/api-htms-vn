var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');


const ojs_datas_bussiness = require('../../models/ojs-datas-bussiness.js');
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
	//
	//let session_token = req.session;
	let token = req.session.token;	
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
			var error_send = ojs_shares.show_error( evn, danhSachCuaHang.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_list", "message": error_send } ); 
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
	//@
	try {
		let user_id_send = ojs_shares.get_users_id(token);
		let user_type = check_datas_result.user_role;	
		let users_full_name = ojs_shares.get_users_full_name(token);
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi send data, liên hệ admin");
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
router.get('/manage/:store_id/:user_id', async  function(req, res, next) {
	//
	let token = req.session.token;	
	let store_id = req.params.store_id;
	let user_id = req.params.user_id;
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
	let datas_check = {
		"token":token,
		"user_id": user_id
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
		res.send({ "error" : "2.1.router_stores(app)->manage ", "message": error_send } ); 
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_stores(app)->manage", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_stores(app)->manage", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	
	//@	
	
	


	//
	//Lấy danh sách products news
	var product_list;
	try {

		
		product_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/products/speciality/search', 
			ojs_datas_products.get_data_product_list_store_news(store_id), 
			token
		);	
		
		if(product_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,product_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_app->bussiness->get", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_admin(app)->bussiness->get", "message": error_send } ); 
			return;		
	}
	//		
	
	//@
	//@
	//@
	//@	tin tức category	
	var category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_bussiness_news(user_id), 
				token
			);

		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_general_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "41.router_admin(app)->bussiness->category_general_list", "message": error_send } ); 
			return;				
		}
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "42.router_admin(app)->bussiness->category_general_list", "message": error_send } ); 
		return;	
	}
	
	//@
	//@


	//@
	//@
	//@
	//@	tin tức options	
	var options_list;
	try {
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_bussiness_news(), 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "33.router_bussiness(app)->get->options_list", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "34.router_bussiness(app)->get->options_list", "message": error_send } ); 
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
			ojs_datas_brands.get_data_brands_list_bussiness_news(), 
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
	//@
	//@
	//@
	//@end of news
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_store(app)->manage", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
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
			var error_send = ojs_shares.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->name", "message": error_send } ); 
		return;			
	}	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//@
		//@
		data_send = {
			'title' : 'Quản lý cửa hàng',
			'sidebar_type' : 4,
			'users_type' : check_datas_result.user_role,
			'store_id' : store_id,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"service_type_name" : service_type_name,
			'product_list':product_list.datas,
			'brands_list':brands_list.datas,
			'category_general_list':category_general_list.datas,
			'options_list':options_list.datas,
			'js_css_version' : check_datas_result.js_css_version,
			'store_name' : store_name.datas[0].stores_name,
			'menu_taget':'sidebar_quan_ly'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/stores/manage', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router_store(app)->manage", "message": error_send } ); 
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
	let token = req.session.token;	
	let store_id = req.params.store_id;
	let status_int = req.params.status_int;
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
		res.send({ "error" : "2.1.router_stores(app)->manage ", "message": error_send } ); 
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_stores(app)->manage_orders", "message": error_send } ); 
		return;			
	}
	
	
	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_store(app)->manage", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
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
			var error_send = ojs_shares.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->orders->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
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
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->stores->manage_orders", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->router->stores->manage_orders", "message": error_send } ); 
			return;		
	}
	//		
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = check_datas_result.user_role;	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
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
		var error_send = ojs_shares.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
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
	let token = req.session.token;	
	let datas  = req.body.datas;
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->stores->ajax-orders-list", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->router->stores->ajax-orders-list", "message": error_send } ); 
			return;		
	}
	//		
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = check_datas_result.user_role;	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
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
		var error_send = ojs_shares.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router->stores->ajax-orders-list", "message": error_send } ); 
		return;	
	}	
});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@












module.exports = router;