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
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');


const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

* 1. [bussiness]/user_id








--------------------------------------------------------------
*/



//@
//@
//@
//@
//@ 1. [bussiness]/user_id
router.get('/:user_id', async  function(req, res, next) {
	//@
	//@
	//@
	//lấy token
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;
		var store_id = 0;
		
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
	
	
	//res.send(get_orders_datas);
	//return;	
	
	
	
	//res.send([   get_all_list_datas[2].datas    ]);
	//return;	



	//@
	//@
	//@
	//@
	//@ create data send
	try {	
		data_send = {
			'title' 				: 'Quản lý tài khoản doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'store_list' 			: get_all_list_datas[2].datas,
			'product_list' 			: get_all_list_datas[7].datas,
			'order_list_sum' 		: get_orders_datas[1].datas,
			'order_list_all' 		: get_orders_datas[3].datas,
			'order_list' 			: get_all_list_datas[3].datas
			
		}
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/bussiness/bussiness',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			res.send({ "error" : "router_bussiness(web)->data_send", "message": error_send } ); 
			return;		
	}	


});
//
//
//
//
//quản lý cửa hàng
//bussiness/store
router.get('/store', async  function(req, res, next) {
	
	//
	let session_token = req.session;
	let token = req.session.token;	
	
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}
	//
	//neu khong phai admin thi ra login
	if(ojs_shares.get_users_type(token) == "2" || ojs_shares.get_users_type(token) == "1") {
		//goo
	}else{
		res.redirect("/login")
	}
	
	//check token data 
	let send_datas_token = { 
		"datas" : {
			"token" : token
		}
	}
	//call api check token  
	//check token
	try {
		let check_user = await ojs_shares.call_api_post_datas_no_token(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error == "") { session_token.token = check_user.token; }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	let users_type = ojs_shares.get_users_type(token);
	let user_id = ojs_shares.get_user_id(token);		
	data_send = {
		'title' : 'Quản lý store',
		'sidebar_type' : 4,
		'users_type' : users_type
	}
	res.render( 'bussiness/bussiness-store', data_send  );	
});
//end of quan ly cua hang


//
//
//
//danh sách cửa hàng
//bussiness/store/show-all/:userID
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
router.get('/stores/show-all/:user_id', async  function(req, res, next) {
	
	//
	//let session_token = req.session;
	let token = req.session.token;	
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->ajax-report-order-store ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax-report-order-store", "message": error_send } ); 
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
			ojs_datas_bussiness.get_data_store_list(user_id), 
			token
		);	

		if(danhSachCuaHang.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, danhSachCuaHang.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_bussiness(app)->show-all->store_list", "message": error_send } ); 
			return;				
		}
		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_bussiness(app)->show-all", "message": error_send } ); 
		return;			
	}	
	
	
	

	

	
	
	//@
	try {
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý cửa hàng',
			'sidebar_type' : 2,
			'users_type' : check_datas_result.user_role,
			'user_id'	: user_id,
			'datas' : danhSachCuaHang.datas,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version
			
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/bussiness/bussiness-store', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi send view, liên hệ admin");
		res.send({ "error" : "2.4.router_bussiness(app)->show-all", "message": error_send } ); 
		return;			
	}
});
//end of quan ly cua hang




//
//
//
//
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
//show
router.get('/stores/add/:user_id', async  function(req, res, next) {
	
	//
	//let session_token = req.session;
	let token = req.session.token;	
	let user_id = req.params.user_id;
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->check_datas_result ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->check_datas_result", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_bussiness(app)->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	

	//
	//Lấy danh sách service
	let service_type_list;
	try {
		service_type_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/service-type',token);
		if(service_type_list.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_list", "Lỗi lấy dữ liệu service_type_list" );
			res.send({ "error" : "1.1.router_bussiness(app)->store/add", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu service_type_list, liên hệ admin" );
		res.send({ "error" : "1.2.router_bussiness(app)->store/add ", "message": error_send } ); 
		return;	
	}
	//@	
	
	

	//
	//Lấy danh sách users
	let users_list;
	try {
		users_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users',token);
		if(users_list.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu users_list", "Lỗi lấy dữ liệu users_list" );
			res.send({ "error" : "2.1.router_bussiness(app)->store/add", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu service_type_list, liên hệ admin" );
		res.send({ "error" : "2.2.router_bussiness(app)->store/add ", "message": error_send } ); 
		return;	
	}
	//@	
	
		
	
	//@
	try {
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Tạo cửa hàng',
			'sidebar_type' : 2,
			'users_type' : check_datas_result.user_role,
			'user_id'	: user_id,
			'users_full_name' : users_full_name,
			"users_list" : users_list.datas,
			"service_type_list" : service_type_list.datas,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_tao_cua_hang'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/bussiness-store-add', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi send data , liên hệ admin" );
		res.send({ "error" : "3.1.router_bussiness(app)->store/add ", "message": error_send } ); 
		return;			
	}
});
//end of quan ly cua hang






//
//
//
//
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
//show
router.get('/stores/show/:store_id/:user_id', async  function(req, res, next) {
	
	//
	//let session_token = req.session;
	let token = req.session.token;	
	let user_id = req.params.user_id;
	let store_id = req.params.store_id;
	
	
	
	//res.send("sdasdasdasd");
	//return;
	//
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->stores/show ", "message": error_send } ); 
		return;			
	}
	

	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->stores/show", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_bussiness(app)->stores/show", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	
	//@

	//
	//Lấy danh sách service
	let service_type_list;
	try {
		service_type_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/service-type',token);
		if(service_type_list.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, service_type_list.error, "Lỗi lấy dữ liệu service type" );
			res.send({ "error" : "31.router_bussiness(app)->stores/show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn,error, "Lỗi lấy dữ liệu service type, liên hệ admin" );
		res.send({ "error" : "32.router_bussiness(app)->stores/show", "message": error_send } ); 
		return;		
	}
	//@	
	
	
	//
	//Lấy stores tager

	let stores_tager;
	try {
		stores_tager = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id,token);

		if(stores_tager.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, stores_tager.error, "Lỗi lấy dữ liệu stores_tager" );
			res.send({ "error" : "33.router_bussiness(app)->stores/show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấy dữ liệu stores_tager" );
			res.send({ "error" : "34.router_bussiness(app)->stores/show", "message": error_send } ); 
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
			res.send({ "error" : "41.router_bussiness(app)->show-all->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_bussiness(app)->name", "message": error_send } ); 
		return;			
	}	
		

	//@
	//@
	//@get json local 
	let local_json = await ojs_shares.get_data_no_token_get(ojs_configs.domain + '/uploads/files/local.json'); 
	

	//@
	try {
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Chỉnh sửa cửa hàng',
			'users_type' : check_datas_result.user_role,
			'user_id'	: user_id,
			'users_full_name' : users_full_name,
			"datas" : stores_tager.datas,
			"service_type_list" : service_type_list.datas,
			'store_id' : store_id,
			'store_name' : store_name.datas[0].stores_name,
			'js_css_version' : check_datas_result.js_css_version,
			'datas_local': local_json
		}
		
		res.render( check_datas_result.view_version + '/bussiness/bussiness-store-show', data_send  );	
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_shares.evn, error, "server đang bận, truy cập lại sau" );
		res.send( { "error": "r_catch_12", "message" : error_send } );			
	}
});
//end of quan ly cua hang













//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//save
router.post('/stores/save', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	let user_id = datas.datas.stores_users_id;
	//res.send( { "error" : "welCom !!!" });
	
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
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->check_datas_result ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->check_datas_result", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_bussiness(app)->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//
	

	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi tạo cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_save ", "message": error_send } ); 
		return;	
	}		
	
});
	
		
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//update
router.post('/stores/update/:store_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	let store_id = req.params.store_id;
	
	
	
	//res.send( { "error" : "welCom !!!" });
	
	//
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
		"token":token,
		"store_id": store_id,
		"user_id" : datas.datas.stores_user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->stores/update ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->stores/update ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_user != "1" ||  check_datas_result.owner_store != "1")  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.router_bussiness(app)->stores/update ", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result );	
	//return;	
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	
	//@
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_update ", "message": error_send } ); 
		return;	
	}		
	
});
		



//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//deleltr
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//
router.get('/stores/delete/:store_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let store_id = req.params.store_id;
	//res.send([store_id]);
	//return;
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
		"store_id": store_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->stores/update ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->stores/update ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1"   && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.router_bussiness(app)->stores/update ", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	
	//@
	//
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_delete ", "message": error_send } ); 
		return;	
	}		
});

//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//	
	
//
//
//
//danh sách cửa hàng
//bussiness/store/show-all/:userID
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
router.get('/stores/show-all-order/:user_id', async  function(req, res, next) {
	
	//
	//let session_token = req.session;
	let token = req.session.token;	
	let user_id = req.params.user_id;
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->show-all-order ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->show-all-order", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_bussiness(app)->show-all-order", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//@	
	//@

	
	
	var orders_list;
	try {
		var date_star = "2021/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number = [0,1,2,3,4,5,6,7,8,9];
		
		
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_sale_bussiness(user_id,date_star,date_end,sattus_number),
			token
		);
		
		
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "399.router->bussiness-orders->show-all-order", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders->show-all-order", "message": error_send } ); 
			return;		
	}
	//		
	
	
	
	//@
	try {
		let user_id_send = user_id;
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Sản phẩm đã bán',
			'sidebar_type' : 2,
			'users_type' : check_datas_result.user_role,
			'user_id'	: user_id,
			'user_role' : check_datas_result.user_role,
			'orders_detail' : orders_list.datas,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_san_pham_da_ban'
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/bussiness/order-show', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3.3.router_bussiness(app)->ajax-report-order-store", "message": error_send } ); 
		return;					
	}
});
//end of quan ly cua hang

	
	

//get
//ajax payment
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-report-order-store/:user_id', async  function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	let user_id = req.params.user_id;
	
	//@
	//@
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->ajax-report-order-store ", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax-report-order-store", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_bussiness(app)->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	
	
	//return;
	var sattus_number = "1";
	
	//	
	var order_list;
	try {
		//res.send( [user_id,datas.date_star,datas.date_end,sattus_number] );
		//return;
		//
		order_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality-detail/search', 
			ojs_datas_orders.get_order_list_datas(user_id,datas.date_star,datas.date_end,sattus_number), 
			token
		);
	
		if(order_list.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu order", "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "31.router_bussiness(app)->ajax-report-order-store->order_list", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3.2.router_bussiness(app)->ajax-report-order-store", "message": error_send } ); 
		return;		
	}		

	//send web
	data_send = {
		'order_list' : order_list.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render( check_datas_result.view_version + '/masterpage/widget-bussiness-report-stores', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





//
//products
router.get('/products/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controller_bussiness->profucts->get/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.profucts->->check_datas_result", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.profucts->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	//Lấy danh sách product
	var products_list;
	//@
	let data_products_list;
	//@
	if(check_datas_result.user_role == "admin"){
		data_products_list = ojs_datas_products.get_data_products_list_admin();
	}else{
		data_products_list = ojs_datas_products.get_data_products_list_bussiness(user_id);
	}		

	//@
	try {
		//@
		//@
		products_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/search', 
				data_products_list, 
				token
			);		
			
		if(products_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, products_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "44.bussiness->products", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "45.bussiness->products", "message": error_send } ); 
		return;	
	}	
	
	

	//@
	//@
	//@
	//@
	//@lấy category_link
	var category_link_list;
	var category_link_datas = ojs_datas_products.get_category_link_datas();		
	try {
		category_link_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality-link/search', 
				category_link_datas, 
				token
			);		

		
		if(category_link_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_link_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "48.bussiness->products", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "49.bussiness->products(app)->get", "message": error_send } ); 
			return;		
	}		
	
	//@
	//
	//send web
	try {	
		let users_type = check_datas_result.user_role;	
		let users_full_name = ojs_shares.get_users_full_name(token);
		
		data_send = {
			'title' : 'Danh sách sản phẩm',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			"products_list" : products_list.datas,
			"category_link_datas" : category_link_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/products',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router_bussiness(app)->profucts->send", "message": error_send } ); 
			return;		
	}	
});
//@
//@
//@

//
//category
router.get('/categorys/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controller_bussiness->categorys->get/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.categorys->->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	let category_general_list_datas;
	//@
	//@
	//neu admin thi lay datas kieu admin ko thì lấy datas kiểu bussiness
	//admin thì status = 0, show = 0, status store = 1	
	if(check_datas_result.user_role == "admin"){
		category_general_list_datas = ojs_datas_category.get_data_category_list_admin();
	}else{
		category_general_list_datas = ojs_datas_category.get_data_category_list_bussiness();
	}
	//res.send(category_general_list_datas);
	//return;
	let category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				category_general_list_datas, 
				token
			);

		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_general_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "41.category_general_speciality(app)->get", "message": error_send } ); 
			return;				
		}
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "42.router_app->category_general_speciality->get", "message": error_send } ); 
		return;	
	}	
	
	//@
	//
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'users_type' : check_datas_result.user_role,
			'user_role'  : check_datas_result.user_role,
			"service_type_name" : "speciality",
			'store_name' : "dsadasdas",	
			'title' : 'Quản lý danh mục',
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'datas_category_general' : category_general_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/categorys',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router_bussiness(app)->categorys->send", "message": error_send } ); 
			return;		
	}	
});
//@
//@
//@
//
//options
router.get('/options/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controller_bussiness->options->get/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.options->->check_datas_result", "message": error_send } ); 
		return;			
	}
	

	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	
	
	let options_list_datas;
	//@
	//@
	//neu admin thi lay datas kieu admin ko thì lấy datas kiểu bussiness
	//admin thì status = 0, show = 0, status store = 1	
	if(check_datas_result.user_role == "admin"){
		options_list_datas = ojs_datas_option.get_data_option_list_admin();
	}else{
		options_list_datas = ojs_datas_option.get_data_option_list_bussiness();
	}	
	
	
	//
	//Lấy danh sách các options
	var options_list;
	try {

		
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			options_list_datas, 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "33.router_options_speciality(app)->get", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "34.router_options_speciality(app)->get", "message": error_send } ); 
			return;		
	}
	//
	//@
	//@
	//@
	//
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý option',
			'users_type' : check_datas_result.user_role,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'options_list' : options_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/options',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router_bussiness(app)->options->send", "message": error_send } ); 
			return;		
	}	
});
//@
//@
//@
//@
//@
//
//options
router.get('/brands/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router->bussiness-barnds/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router->bussiness-barnds", "message": error_send } ); 
		return;			
	}
	

	//=======================
	//=======================
	//=====/header check ====
	//
	
	

	var brands_list;
	try {

		
		brands_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/brands/search', 
			data_brand_list = ojs_datas_brands.get_data_brands_list_bussiness(user_id), 
			token
		);	
		
		if(brands_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,brands_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-barnds", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-barnds", "message": error_send } ); 
			return;		
	}
	//		
	
	
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý thương hiệu',
			'users_type' : check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'list_datas' : brands_list.datas,
			'js_css_version' : check_datas_result.js_css_version
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/brands',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router->bussiness-barnds", "message": error_send } ); 
			return;		
	}	
});
//@
//@
//@
//@
//@
//@
//@
//@
//
//options
router.get('/orders/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router->bussiness-orders/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router->bussiness-orders", "message": error_send } ); 
		return;			
	}
	

	//=======================
	//=======================
	//=====/header check ====
	//

	
	

	var orders_list;
	try {
		var date_star = "2021/01/01 00:00:";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number = [0,1,2,3,4,5,6,7,8,9];
		
		
		orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_bussiness_load(user_id,date_star,date_end,sattus_number),
			token
		);
		
		//res.send(orders_list);
		//return;
		
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders", "message": error_send } ); 
			return;		
	}
	//		
	
	
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý đơn hàng',
			'users_type' : check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'orders_list' : orders_list.datas,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_don_hang'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/orders',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router->bussiness-orderss", "message": error_send } ); 
			return;		
	}	
});
//@
//@
//@
//@
//@
//@
//@
//
//doanh thu theo cua hang
router.get('/sale_by_store/:user_id', async  function(req, res, next) {
	//
	//let session_token = req.session;
	let user_id = req.params.user_id;
	
		
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
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router->bussiness-orders->sale_by_store/", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router->bussiness-orders->sale_by_store", "message": error_send } ); 
		return;			
	}
	
	
	

	//return;
	//lấy dữ liệu orders
	var date_star = "2020/01/01 00:00:00";
	//var date_star = ojs_shares.get_current_date_star();
	var date_end = ojs_shares.get_current_date_end();
	var sattus_number = [0,1,2,3,4,5,6,7,8,9];
	//	
	var order_list;
	try {
		//res.send( order_list_datas );
		//return;
		//
		order_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search', 
			ojs_datas_orders.get_order_list_datas(user_id,date_star,date_end,sattus_number), 
			token
		);
		//res.send(order_list);
		//return;
	
		if(order_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, order_list.error, "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "31.router_bussiness(app)->sale_by_store", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu order", "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "32.router_bussiness(app)->sale_by_store", "message": error_send } ); 
			return;	
	}		
	//res.send(order_list);
	//return;

	
	
	
	
	

	//=======================
	//=======================
	//=====/header check ====
	//
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Doanh thu theo cửa hàng',
			'users_type' : check_datas_result.user_role,
			'user_id' : user_id,
			'order_list' : order_list.datas,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_doanh_thu_theo_cua_hang'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/sale_by_store',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router->bussiness-orderss->sale_by_store", "message": error_send } ); 
			return;		
	}	
});
//@
//@





//@
//@
//@
//
//doanh thu theo cua hang
router.post('/ajax-sale-by-store', async  function(req, res, next) {
	let token = req.session.token;	
	let datas  = req.body.datas;
	let user_id = datas.user_id;
	//@
	//@
	//res.send( datas );	
	//return;		
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
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router->bussiness-orders->ajax-sale_by_store", "message": error_send } ); 
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
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router->bussiness-orders->ajax-sale_by_store", "message": error_send } ); 
		return;			
	}
	

	
	var order_list;
	try {
		//res.send( order_list_datas );
		//return;
		//
		order_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search', 
			ojs_datas_orders.get_order_list_datas(datas.user_id,datas.date_star,datas.date_end,JSON.parse(datas.status_send)), 
			token
		);
		//res.send(order_list);
		//return;
	
		if(order_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, order_list.error, "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "31.router_bussiness(app)->ajax-sale_by_store", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu order", "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "32.router_bussiness(app)->ajax-sale_by_store", "message": error_send } ); 
			return;	
	}		
	//res.send(order_list);
	//return;

	
	
	
	
	

	//=======================
	//=======================
	//=====/header check ====
	//
	//send web
	try {	
		let users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'order_list' : order_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-bussiness-report-stores',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi lấu dữ liệu product_order_list" );
			res.send({ "error" : "61.router->bussiness-orderss->ajax-sale_by_store", "message": error_send } ); 
			return;		
	}	
});
//@
//@



















module.exports = router;