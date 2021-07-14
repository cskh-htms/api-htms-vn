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
const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_all = require('../../models/ojs-shares-get-all-list-datas-all');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');



const ojs_datas_category = require('../../models/ojs-datas-category');

const ojs_datas_orders = require('../../models/ojs-datas-orders');



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

1. [ajax_load_order_bussiness_store]
	- lộc đơn hàng

2. [ajax-order-detail-bussiness]
	- xem chi tiết order


3. [/]
	- orders 


4. [/load/]


5. [/show/]






10. [/update/:order_id]









--------------------------------------------------------------
*/

//@
//@
//@
//@
//@
//@ 10. [/update/:order_id]
router.post('/update/:order_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var order_id = req.params.order_id;
		var datas  = req.body;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,store_id] );	
	//return;	
	
	
	//@
	//@
	//@
	//@
	//@
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/' + order_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi update, vui lòng liên hệ admin", "Lỗi update, vui lòng liên hệ admin" );
		res.send({ "error" : "333.router_app->router_app->orders-speciality->update", "message": error_send } ); 
		return;		
	}		
});
	
	
	
	
	
	
	
	
	
//@
//@
//@
//@
//@
//@ 9. [/detail/update/:detail_id]
router.post('/detail/update/:detail_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var detail_id = req.params.detail_id;
		var datas  = req.body;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,store_id] );	
	//return;	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	try {	
		//Lấy danh sách loại danh mục
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality-detail/' + detail_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi update, vui lòng liên hệ admin", "Lỗi update, vui lòng liên hệ admin" );
		res.send({ "error" : "33.router_app->router_app->orders-speciality->detail/update", "message": error_send } ); 
		return;	
	}		
});









	
//@
//@
//@
//@
//@
//@ 8. [/detail/delete/:detail_id]
router.get('/detail/delete/:detail_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var detail_id = req.params.detail_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	
	
	//res.send( [token,store_id] );	
	//return;	

	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality-detail/' + detail_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi xoá datas, liên hệ admin", "Lỗi xoá datas, liên hệ admin" );
		res.send({ "error" : "22.router_app->orders-speciality->detail->devare", "message": error_send } ); 
		return;		
	}		
});
	






	
	
//@
//@
//@
//@
//@
//@ 7. [/delete/:order_id]
router.get('/delete/:order_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var order_id = req.params.order_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,store_id] );	
	//return;	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/' + order_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi xóa dữ liệu , vui lòng liên hệ admin", "Lỗi xóa dữ liệu , vui lòng liên hệ admin" );
		res.send({ "error" : "33.router_app->orders-speciality->delete", "message": error_send } ); 
		return;		
	}		
});


	
	
	
	
//@
//@
//@
//@
//@
//@ 6. [/save_fee/]
router.post('/save_fee', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var datas  = req.body;
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
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,store_id] );	
	//return;	
	
	
	//@
	//@
	//@
	//@
	//@
	//@	
	try {	

		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' +ojs_configs.api_version + '/orders/speciality-detail/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "lỗi save data, liên hệ admin", "lỗi save data, liên hệ admin" );
		res.send({ "error" : "33.router->orders-speciality->web->detail->save_fee", "message": error_send } ); 
		return;	
	}			
});












//@
//@
//@
//@
//@
//@ 5. [/show/]
router.get('/show/:order_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var order_id = req.params.order_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,order_id] );	
	//return;	
	

	//--------------------------------------------------
	//             news-admin
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
	//         order taget
	// -------------------------------------------------
	
	

	var orders_tager;
	try {
		orders_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/' + order_id,token);
		if(orders_tager.error != "" ){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
			res.send({ "error" : "3.router_app->router_app->orders-speciality->show", "message": error_send } ); 
			return;			
		}		
	//@
	//@	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,  "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
		res.send({ "error" : "5.router_app->router_app->orders-speciality->show", "message": error_send } ); 
		return;		
	}
	
	
	
	
	//res.send(orders_tager);
	//return;
	
	
	
	
	//Lấy danh sách các danh mục chung
	var orders_detail;
	try {
		orders_detail = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
			ojs_datas_orders.get_data_orders_detail_bussiness(order_id),
			token
		);		
		
		if(orders_detail.error != "" ){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
			res.send({ "error" : "33.router_app->router_app->orders-speciality->show", "message": error_send } ); 
			return;			
		}	

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,  "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
		res.send({ "error" : "55.router_app->router_app->orders-speciality->show", "message": error_send } ); 
		return;		
	}
	
	
	//res.send(orders_detail);
	//return;
	
	
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {

		var datas_info  = {
			'title' 			: 'Chỉnh sửa đơn hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'order_id'			: order_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_don_hang_dac_san',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			'datas' : orders_tager.datas,
			'orders_detail' : orders_detail.datas,					
		}
		

		//res.send(datas_info);
		//return;		
		
		
		var data_send = {
			'title' 			: 'Chỉnh sửa đơn hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'order_id'			: order_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_don_hang_dac_san',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			'datas' : orders_tager.datas,
			'orders_detail' : orders_detail.datas,	
			'datas_info'	: datas_info			
		}
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/orders/speciality/show', data_send );	
	}
	catch(error){
		res.send( { "error" : "router-order-spesciality -> show->catch" , "message" : error } );
	}	
});



//@
//@
//@
//@
//@
//@ 4. [/load/]
router.post('/load/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body.datas;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [datas] );	
	//return;		
	

	
	
	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
	
	
	
	//@
	//@
	//@ datas_orders_all
	var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
	var data_order_order_edit = {'order':data_order_order};
	var data_order_order_copy = {...ojs_configs.orders_all};	
	var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
	//@
	var data_order_data_edit = {
		'store_compare':'<>',
		'user_compare': '<>',
		
		'status_payment_compare':'<>',
		'status_payment_value':'100',	
		
		'date_star':datas.date_star,
		'date_end':datas.date_end,
		
		'status_admin_compare': 'in',
		'status_admin_value':JSON.parse(datas.status_send),

		};
	//@
	var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);		
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : 0,
		'store_id' : 0,
		'datas_order_customer': data_order_ok,
	}
	 
	//res.send( datas_get_all_list_datas_all );	
	//return;		
	
	
	
	var get_all_list_datas_all;
	try{
		get_all_list_datas_all = await ojs_shares_get_all_list_datas_all.get_all_list_datas_all(datas_get_all_list_datas_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "router orders web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send( get_all_list_datas_all );
	//return;	
	
	
	
	
	
	data_send = {
		'datas' : get_all_list_datas_all[16].datas
	}
	res.render( ojs_configs.view_version + '/masterpage/widget-orders-show-tables', data_send );	
});









//@
//@
//@
//@
//@ 3. [/]
router.get('/', async function(req, res, next) {
	//@
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
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if(users_type != "admin"){
		res.redirect("/login");
		return;
	}
	
	//res.send( [token,users_type] );	
	//return;		
	
	

	//--------------------------------------------------
	//             news-admin
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
	//@ datas_orders_all
	var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
	var data_order_order_edit = {'order':data_order_order};
	var data_order_order_copy = {...ojs_configs.orders_all};	
	var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
	//@
	var data_order_data_edit = {
		'store_compare':'<>',
		'user_compare': '<>',
		'status_admin_compare':'<>',
		'status_admin_value':'100',
		'status_payment_compare':'<>',
		'status_payment_value':'100',		
		};
	//@
	var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);		
	
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : 0,
		'store_id' : 0,
		'datas_order_customer': data_order_ok,
	}
	 
	//res.send( datas_get_all_list_datas_all );	
	//return;		
	
	
	
	var get_all_list_datas_all;
	try{
		get_all_list_datas_all = await ojs_shares_get_all_list_datas_all.get_all_list_datas_all(datas_get_all_list_datas_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "router orders web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send( get_all_list_datas_all[16].datas );
	//return;



	
	
	//@
	//@	
	//@
	//@
	//@
	//@
	try {	
		var datas_info = {
			'title' 			: 'Danh sách đơn hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_don_hang_dac_san',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			
			
			'datas' 			: get_all_list_datas_all[16].datas,
			
		}	

		var data_send = {
			'title' 			: 'Danh sách đơn hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_don_hang_dac_san',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			
			
			'datas' 			: get_all_list_datas_all[16].datas,
			'datas_info'		: datas_info
			
		}
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/orders/speciality/admin-show-all', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "98.router_app->router_app->orders-speciality->get", "message": error_send } ); 
			return;		
	}	
});



//@
//@
//@
//@
//@ 2. [ajax-order-detail-bussiness]
router.post('/ajax-order-detail-bussiness/', async  function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body.datas;
		var order_id = datas.order_id;		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	//res.send("dasdasdasd");
	//return;

	
	var orders_list;
	//res.send(ojs_datas_orders.get_data_orders_detail_bussiness(order_id));
	//return;
	try {
			orders_list = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search_user', 
			ojs_datas_orders.get_data_orders_detail_bussiness(order_id),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->orders->web->ajax-order-detail-bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->-orders->web->ajax-order-detail-bussiness", "message": error_send } ); 
			return;		
	}
	
	
	//res.send(orders_list);
	//return;		
	
	
	
	
	
	var orders_list_taget;
	
	//res.send( ojs_datas_orders.get_data_orders_detail_bussiness_taget(order_id) );
	//return;		
	
	try {
			orders_list_taget = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_detail_bussiness_taget(order_id),
			token
		);
		
		//res.send( orders_list_taget );
		//return;				
		
		
		
		if(orders_list_taget.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list_taget.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "40.router->orders->  web->  ajax-order-detail-bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "41.router->orders-> web-> ajax-order-detail-bussiness", "message": error_send } ); 
			return;		
	}
	//			
	
	//res.send( orders_list_taget );
	//return;		
	
	
	
	
	
	//send web
	data_send = {
		'orders_detail' : orders_list.datas,
		'order_taget' : orders_list_taget.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render( ojs_configs.view_version + '/masterpage/widget-order-show-table-detail-bussiness', data_send );	

});







//@
//@
//@
//@
//@ 1. [ajax_load_order_bussiness_store]
router.post('/ajax_load_order_bussiness_store/', async  function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body.datas;	
		var store_id = datas.store_id;		
		var user_id = datas.user_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,store_id,user_id] );	
	//return;		
	
	

	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	//@
	//@
	//@
	//@ get_orders_datas
	

	
	
	var datas_orders_edit = {
		'date_star':datas.date_star,
		'date_end':datas.date_end,
		'store_compare' : '=',
		'status_admin_compare': 'in',
		'status_admin_value':JSON.parse(datas.status_send),
	}	
	var datas_orders_edit_x = {...ojs_configs.orders_all};
	var datas_orders_edit_s = Object.assign(datas_orders_edit_x,datas_orders_edit);	
	
	
	//res.send( datas_orders_edit2_s );	
	//return;
	
	var datas_get_orders_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,		
		'order_sum_count' : datas_orders_edit_s,
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
		res.send({ "error" : "routers store web -> get_orders_datas -> 1", "message": error_send } ); 
		return;			
	}	
	
	
	//res.send(get_orders_datas);
	//return;	
	
	
	
	//send web
	data_send = {
		'orders_list' : get_orders_datas[4].datas
	}
	
	res.render( ojs_configs.view_version + '/masterpage/widget-order-show-table-stores', data_send );	

});










//@
//@
//* ajax_load_order_bussiness
//* load don hang tren trang bussiness ajax
router.post('/ajax_load_order_bussiness/', async  function(req, res, next) {
	//
	var token = req.session.token;	
	var datas  = req.body.datas;
	//@
	//@
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
		//////evn = "dev";;;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
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
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
		return;			
	}
	
	
	
	var orders_list;
	try {
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_detail_bussiness_ajax(datas.user_id,datas.date_star, datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;		
	}
	//			
	
	//send web
	data_send = {
		'orders_list' : orders_list.datas
	}
	
	res.render( check_datas_result.view_version + '/masterpage/widget-order-show-table-bussiness', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	

//@
//@
//@
//* ajax_load_order_bussiness
//* load don hang tren trang bussiness ajax

//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		
//@
//@
//@
//* ajax_load_order_bussiness
//* load don hang tren trang bussiness ajax
router.post('/ajax_load_order_sale_bussiness/', async  function(req, res, next) {
	//
	var token = req.session.token;	
	var datas  = req.body.datas;
	//@
	//@
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
		//////evn = "dev";;;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
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
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
		return;			
	}
	
	
	
	var orders_list;
	try {
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_sale_bussiness(datas.user_id,datas.date_star, datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;		
	}
	//			
	
	//send web
	data_send = {
		'orders_detail' : orders_list.datas
	}
	
	//res.send(data_send);
	//return;	
	
	
	res.render( check_datas_result.view_version + '/masterpage/widget-bussiness-order-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
//@@
//@
//load widget 

		
	
	
module.exports = router;
	
	
	

	