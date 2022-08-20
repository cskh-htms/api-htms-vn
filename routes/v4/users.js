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
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');

const ojs_datas_users = require('../../models/ojs-datas-users.js');












///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

1. [/]

2. [/add]

3. [/save]

4. [/show]

5. [/update]

6. [/delete]

7. [/ajax-users-list/]

--------------------------------------------------------------
*/






	//@
//@
//@
//@
//@
//@
//@ 100 [xoa-tai-khoan]
router.post('/xoa-tai-khoan/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var datas  = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers users web -> xoa tai khoan -> 1", "message": error_send } ); 
		return;			
	}
	
	
	 setTimeout(function() { 
		res.send(datas);	
		return;
    }, 3000);
	
});












//@
//@
//@
//@
//@
//@
//@ 7 [/ajax-users-list/]
router.post('/ajax-users-list/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body.datas;
		var user_id = datas.user_id;	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	
	
	
	
	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	//@
	//@
	//@
	//@ datas_user_all
	var data_user_order = [{'field':'users_date_created','compare':'DESC'}];
	var data_user_order_edit = {'order':data_user_order};
	var data_user_order_copy = {...ojs_configs.datas_all_admin};	
	var data_user_order_assign = Object.assign(data_user_order_copy,data_user_order_edit);
	//@
	var data_user_data_edit = {
		'status_admin_compare':'in',
		'status_admin_value':datas.status_admin,
		'status_store_compare':'<>',
		'status_store_value':'1000'
		};
	//@
	var data_user_ok = Object.assign(data_user_order_assign,data_user_data_edit);
	

	
	
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'datas_user': data_user_ok,
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
		res.send({ "error" : "routers bussiness web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	
	
	//res.send( get_all_list_datas_all );	
	//return;	
	
	
	//@
	//@
	//@
	//@
	try {	
		data_send = {
			'users_list' 		: get_all_list_datas_all[1].datas,
			'user_id':user_id,
			'user_role'	: ojs_shares_others.get_users_type(token),
			'users_type' : ojs_shares_others.get_users_type(token)
		}
		res.render( ojs_configs.view_version + '/masterpage/widget-users-show-tables', data_send );	

		//res.send( data_send );	
		//return;	
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu users", "Lỗi lấy dữ liệu users" );
		res.send({ "error" : "32.router_users(app)->ajax-users_list", "message": error_send } ); 
		return;	
	}

});
//@
//@ end of
//@ 3 [/ajax-option-list-no/]


//@
//@
//@
//@
//@ 6. [/delete]
router.get('/delete/:user_id', async function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
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
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/' + user_id, token);
		res.send(active_delete);	
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_users->devare", "message": error_send } ); 
		return;		
	}		
});


//@
//@
//@
//@
//@ 5. [/update]
router.post('/update/:user_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
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
	
	//res.send( [user_id,datas] );	
	//return;	
	
	
	

	//@
	//@
	//@
	//@	
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/' + user_id,datas, token);
		res.send(active_update);	
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_users_app->/update/:user_id'", "message": error_send } ); 
		return;	
	}	

});



//@
//@
//@
//@
//@ 4. [/show]
router.get('/show/:user_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;
		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
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



	var user_tager;
	try {
		user_tager = await ojs_shares_fetch_data.get_data_send_token_post( 
				ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/search',
				ojs_datas_users.get_data_user_taget(user_id),
				token
			);		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, " Không có users", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_user_app->show->user_tager", "message": error_send } ); 
		return;	
	}

	
	//res.send( user_tager);	
	//return;		
	
	

	try {	
	
			datas_info = {
			'title' 			: 'Chỉnh sửa tài khoản',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: user_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: get_datas_news_admin_menu,			
			'datas' 			: user_tager.datas,
			'sidebar_type'		: "",
		}
	
		data_send = {
			'title' 			: 'Chỉnh sửa tài khoản',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: user_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: get_datas_news_admin_menu,			
			'datas' 			: user_tager.datas,
			'sidebar_type'		: "",
			'datas_info' : datas_info
		}
		
		//res.send( data_send );	
		//return;			
		
		res.render( ojs_configs.view_version + '/users/admin-show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "7.router->users ->web->show->send data->catch", "message": error_send } ); 
		return;	
	}	
});



//@
//@
//@
//@
//@ 3. [/save]
router.post('/save', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
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
	try {	
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi insert user" );
		res.send({ "error" : "10_router_admin_app->/save/:user_id'", "message": error_send } ); 
		return;	
	}			
});





//@
//@
//@
//@
//@ 2. [/add]
router.get('/add', async function(req, res, next) {
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	if( users_type != "admin"){
		res.redirect("/login");
		return;
	}	


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
	
	

	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 			: 'Tạo user',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
		}	

		data_send = {
			'title' 			: 'Tạo user',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			'datas_info':datas_info
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/users/admin-add', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi send insert user" );
		res.send({ "error" : "7.router_app->users->add->send data->catch", "message": error_send } ); 
		return;	
	}	
});






//@
//@
//@
//@
//@ 1. [/]
router.get('/', async function(req, res, next) {
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
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
	//[1]
	
	
	//@
	//@
	//@
	//@ datas_user_all
	var data_user_order = [{'field':'users_date_created','compare':'DESC'}];
	var data_user_order_edit = {'order':data_user_order};
	var data_user_order_copy = {...ojs_configs.datas_all_admin};	
	var data_user_order_assign = Object.assign(data_user_order_copy,data_user_order_edit);
	//@
	var data_user_data_edit = {'status_admin_compare':'<>','status_store_compare':'<>'};
	//@
	var data_user_ok = Object.assign(data_user_order_assign,data_user_data_edit);
	

	
	
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'datas_user': data_user_ok,
	}
	//@ get_all_list_datas_all
	var fn_get_all_list_datas_all = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_all.get_all_list_datas_all(datas_get_all_list_datas_all);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_all);		
	//[2]


	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result);
	//return;	





	try {	
		datas_info = {
			'title' 			: 'Admin quản lý dala',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: promise_result[1],	
			'sidebar_type'		: "",
					
			'users_list' 		: promise_result[2][1].datas
		}	
	
	
		data_send = {
			'title' 			: 'Admin quản lý dala',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_tai_khoan',
			'news_admin_menu' 	: promise_result[1],	
			'sidebar_type'		: "",
					
			'users_list' 		: promise_result[2][1].datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/users/admin-show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "5.router_app->users->send data->catch", "message": error_send } ); 
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//

	
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//update

	
	
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//
router.post('/register', async function(req, res, next) {
	var datas  = req.body;
	var view_version = ojs_configs.view_version;
	//
	//@insert users
	try {	
		//Lấy danh sách loại danh mục
		var active_save = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/register',datas);
		//if(activeUpdate.error != "") res.redirect("/login");	
		
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_users->/register->active_save", "message": error_send } ); 
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//	

	
	
	
	
	
	
	
	
	
	
	
module.exports = router;
	
	
	

	