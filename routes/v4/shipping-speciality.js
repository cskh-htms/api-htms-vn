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
const ojs_shares_get_all_list_datas_all = require('../../models/ojs-shares-get-all-list-datas-all');
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');

const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
-------------------------------------------------------------------

1. [/]

2. [/add]


--------------------------------------------------------------------
*/

	
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
		res.send({ "error" : "routers shipping web -> show all -> get req -> 1", "message": error_send } ); 
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
	


	//@
	//@	
	//@ Lấy option tager
	var shipping_list;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		shipping_list = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality',token);
		
		//res.send(shipping_list);
		//return;
	
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, shipping_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: 0,
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			'datas'		: shipping_list.datas
			
		}	
	
		data_send = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",	
			'datas'		: shipping_list.datas,			
			
			'datas_info':datas_info
			
		}

		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/shipping/speciality/show-all', data_send );
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "35.router_app->shipping->get", "message": error_send } ); 
		return;	
	}		
});


	
	
//@
//@
//@
//@
//@ 2. [/add]
router.get('/add/', async function(req, res, next) {
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
		res.send({ "error" : "routers shipping web -> show all -> get req -> 1", "message": error_send } ); 
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
	


	//@
	//@	
	//@ Lấy option tager
	var shipping_list;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		shipping_list = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality',token);
		
		//res.send(shipping_list);
		//return;
	
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, shipping_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: 0,
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			'shipping_list'		: shipping_list.datas
			
		}	
	
		data_send = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",	
			'shipping_list'		: shipping_list.datas,			
			
			'datas_info':datas_info
			
		}

		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/shipping/speciality/add', data_send );
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "35.router_app->shipping->get", "message": error_send } ); 
		return;	
	}		
});	
	
	
	
	
	
//@
//@
//@
//@
//@ 2. [/add]
router.get('/show/:shipping_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	
	try {
		var token = req.session.token;	
		var shipping_id = req.params.shipping_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers shipping web -> show all -> get req -> 1", "message": error_send } ); 
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
	


	//@
	//@	
	//@ Lấy option tager
	var shipping_list;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		shipping_list = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality',token);
		
		//res.send(shipping_list);
		//return;
	
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, shipping_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(shipping_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	//@
	//@
	//@
	
	//@
	//@	
	//@ Lấy option tager
	var shipping_tager;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		shipping_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality/' + shipping_id,token);
		
		//res.send(shipping_tager);
		//return;
	
		if(shipping_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, shipping_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(shipping_tager.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->shipping->show", "message": error_send } ); 
			return;				
		}
	}	
	

	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: 0,
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			'shipping_list'		: shipping_list.datas,
			'datas' : shipping_tager.datas,
			
		}	
	
		data_send = {
			'title' 			: 'Danh sách thương hiệu',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			:0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_shipping',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",	
			'shipping_list'		: shipping_list.datas,	
			'datas' : shipping_tager.datas,			
			
			'datas_info':datas_info
			
		}

		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/shipping/speciality/show', data_send );
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "35.router_app->shipping->get", "message": error_send } ); 
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
router.post('/save', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;

	//@
	//@
	//@
	//@
	//@ go
	try {	
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_shipping(app)->save", "message": error_send } ); 
		return;		
	}	
});
		
	
	
//update
router.post('/update/:shipping_id', async function(req, res, next) {
	//
	var token = req.session.token;	
	var shipping_id = req.params.shipping_id;
	var datas  = req.body;
	//res.send([datas,shipping_id]);
	//return;

	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality/' + shipping_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		res.send( { "error" : "r_12" , "message" : error } );
	}		
});	
	
	
	
	
router.get('/delete/:shipping_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let shipping_id = req.params.shipping_id;

	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping/speciality/' + shipping_id, token);
		res.send(active_delete);	
	}
	catch(error){
		res.send( { "error" : "r_12" , "message" : error } );
	}		
});	
	
	
	
	
module.exports = router;
	
	
	

	