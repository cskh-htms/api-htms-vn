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


const ojs_datas_discount_program_store_add = require('../../models/ojs-datas-discount-program-store-add.js');




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

0 [/]

1. [/add/]


5 [/save]

2. [/show/]

8. [/delete/:news_id]

7 [/update/:news_id]

--------------------------------------------------------------
*/




//@
//@
//@
//@
//@
//@
//@
//@ 8. [/delete/:news_id]
router.get('/delete/:news_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var news_id = req.params.news_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers news web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,store_id] );	
	//return;	
		

	//@
	//@
	//@
	//@
	//@
	try {	
		//Lấy danh sách loại danh mục
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/news/general/' + news_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_news (web)->devare", "message": error_send } ); 
		return;	
	}		
});




//@
//@
//@
//@
//@
//@
//@ 7 [/update/:news_id]
router.post('/update/:news_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var news_id = req.params.news_id;
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
		res.send({ "error" : "router_news web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,store_id] );	
	//return;		
	
	//@
	//@
	//@
	//@
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/news/general/' + news_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_news(app)->update", "message": error_send } ); 
		return;	
	}		
});



//@
//@
//@
//@
//@
//@
//@ 2. [/show/]
router.get('/show/:news_id', async function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var news_id = req.params.news_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "router_news web -> show all -> get req -> 1", "message": error_send } ); 
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


	//
	//
	//Lấy option tager
	var news_tager;
	try {
		news_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/news/general/' + news_id,token);
		if(news_tager.error != "") res.redirect("/login");	
		//res.send(news_tager);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
		res.send({ "error" : "6666.router_app->news-general->show", "message": error_send } ); 
		return;	
	}
	//
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		var datas_info = {
			'title' 			: 'Chỉnh sửa tin tức',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'user_role'  		: ojs_shares_others.get_users_type(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		: 'sidebar_news',
			'sidebar_type'		:  "",
			
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'news_id' : news_id,
			'datas' : news_tager.datas
		}	
	
		data_send = {
			'title' 			: 'Chỉnh sửa tin tức',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'user_role'  		: ojs_shares_others.get_users_type(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		: 'sidebar_news',
			'sidebar_type'		:  "",
			
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'news_id' : news_id,
			'datas' : news_tager.datas,
			'datas_info':datas_info
		}
		
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/news/general/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
		res.send({ "error" : "67.router_app->news-general->show", "message": error_send } ); 
		return;	
	}	
});






//@
//@
//@
//@
//@
//@
//@ 5 [/save]
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
		res.send({ "error" : "router_news-general->save-> web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,datas] );	
	//return;		
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		//Lấy danh sách loại danh mục
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/news/general/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_news-general->save->save", "message": error_send } ); 
		return;		
	}			
});






//@
//@
//@
//@
//@
//@
//@ 1. [/add/]
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



	datas_info = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'user_role'  			: ojs_shares_others.get_users_type(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
	}


	data_send = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_role'  			: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		
		
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	
	
	res.render( ojs_configs.view_version + '/news/general/add', data_send );	

});


//@
//@
//@
//@
//@
//@
//@ 0. [/]
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
	//@
	//@ datas_new
	var datas_new_order = [{'field':'news_date_created','compare':'DESC'}];
	var datas_new_order_edit = {'order':datas_new_order};
	var datas_new_order_copy = {...ojs_configs.datas_all_admin};	
	var datas_new_order_assign = Object.assign(datas_new_order_copy,datas_new_order_edit);
	//@
	var datas_new_data_edit = {'status_admin_value':'100','status_admin_compare':'<>','status_store_compare':'<>'};
	//@
	var datas_new_ok = Object.assign(datas_new_order_assign,datas_new_data_edit);	
	
	
	//res.send(datas_new_ok);	
	//return;	
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : 0,
		'datas_new': datas_new_ok,
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
	
	//res.send(get_all_list_datas_all[17]);
	//return;










	datas_info = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'news_list'  		: get_all_list_datas_all[17].datas,
	}


	data_send = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'news_list' 	: get_all_list_datas_all[17].datas,
		
		
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	
	
	res.render( ojs_configs.view_version + '/news/general/admin-show-all', data_send );	

});







	
	
	
	
	
	
	
	
module.exports = router;
	
	
	

	