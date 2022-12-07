

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');

const controller_store_order_get_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/stores/controllers-stores-order-get-all-web-appdalacom.js'
);

const controller_store_manage = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/stores/controllers-stores-manage.js'
);



//end of v5





//@
//@
//@
//@ loader function shares
const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_all = require('../../models/ojs-shares-get-all-list-datas-all');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');


const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_datas_stores = require('../../models/ojs-datas-stores');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
-------------------------------------------------------------------

1. [/manage/:store_id/:user_id]

2. [/manage/orders/:store_id/:status_int]

3. [/]

4. [/ajax-orders-list/]


--------------------------------------------------------------------
*/
//router.get('/manage/orders/:store_id/:status_int', controller_store_order_get_all);


router.get('/manage/:store_id/:user_id', controller_store_manage);


//@
//@
//@
//@
//@
//@ 1. [/manage/:store_id/:user_id]
router.get('asdasdasdasd/manage/:store_id/:user_id', async  function(req, res, next) {

	
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
		res.send({ "error" : "routers store web -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	/////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);	
	
	
	
	//--------------------------------------------------
	//              news menu
	// -------------------------------------------------	

	//@
	//@ check new bussiness
	var datas_order_send = {
		'status_admin_compare':'<>'
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);		
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
		'compare':ojs_configs.datas_news_bussiness,
		'news_user':'news_user',
		'news_order': datas_order_send_s,
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_note':datas_note_send_s,
		'datas_discount':ojs_configs.datas_all	

	}
	var fn_get_datas_news_bussiness_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_bussiness_menu);
	//[1]

	//--------------------------------------------------
	//               datas count
	// -------------------------------------------------

	//@
	//@ datas_get_all_list_datas
	var datas_order_send = {
		'date_star':ojs_shares_date.get_current_month_now()
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);	
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
		'news_note':datas_note_send_s,
		'datas_discount':ojs_configs.datas_all
	}
	var fn_get_all_list_datas_count = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_count);		
	//[2]
	

	//--------------------------------------------------
	//              list datas
	// -------------------------------------------------

	//@
	//@
	//@ datas_orders
	var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
	var data_order_order_edit = {'order':data_order_order};
	var data_order_order_copy = {...ojs_configs.orders_all};	
	var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
	//@
	var data_order_data_edit = {'store_compare':'=','status_admin_compare': '<>','status_admin_value': '100'};
	//@
	var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);	

	//@
	//@
	//@ datas_note
	var data_note_order = [{'field':'notes_date_created','compare':'DESC'}];
	var data_note_order_edit = {'order':data_note_order};
	var data_note_order_copy = {...ojs_configs.datas_all};	
	var data_note_order_assign = Object.assign(data_note_order_copy,data_note_order_edit);
	//@
	var data_note_data_edit = {'status_admin_compare': '<>','status_admin_value': '100'};
	//@
	var data_note_ok = Object.assign(data_note_order_assign,data_note_data_edit);	
	
	
	//@
	//@
	//@ datas_note
	var data_discount_order = [{'field':'discount_program_date_created','compare':'DESC'}];
	var data_discount_order_edit = {'order':data_discount_order};
	var data_discount_order_copy = {...ojs_configs.datas_all};	
	var data_discount_order_assign = Object.assign(data_discount_order_copy,data_discount_order_edit);
	//@
	var data_discount_data_edit = {
		'user_compare':'<>',
		'status_store_compare': '<',
		'status_store_value': ojs_shares_date.get_current_date_now()
		};
	//@
	var data_discount_ok = Object.assign(data_discount_order_assign,data_discount_data_edit);		
	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':ojs_configs.datas_all,
		'datas_order': data_order_ok,
		'datas_note': data_note_ok,
		'datas_discount': data_discount_ok
	}
	//@ get_all_list_datas
	var fn_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas);		
	//[3]



	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	var datas_orders_edit = {
		'date_star':"2021/01/01 00:00:00",
		'date_end':ojs_shares_date.get_current_date_end(),
		'status_admin_compare': 'in',
		'status_admin_value':[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,123,127,128,45,49,410,101,102],
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
		'order_list_by_user' : datas_orders_edit_s
	}
	//@ get_all_list_datas
	var fn_get_orders_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_orders_datas.get_orders_datas(datas_get_orders_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_orders_datas);		
	//[4]
	
	

	//@
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//var store_id = promise_result[3][2].datas[0].stores_ID;
	//res.send([promise_result[3][2].datas[0].stores_ID]);
	//return;
	
	
	//@
	//@
	//@
	//@
	//@ send
	try {	
	
		datas_info = {
			'title' 				: 'Quản lý doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,			
			'store_id'				: promise_result[3][2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_quan_ly',
			
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'store_list' 			: promise_result[3][2].datas,
			'order_list' 			: promise_result[3][3].datas,
			'order_list_count' 		: promise_result[4][3].datas,
			'notes_list' 			: promise_result[3][15].datas,
			
			
		}	
	
	
		data_send = {
			'title' 				: 'Quản lý doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,			
			'store_id'				: promise_result[3][2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_quan_ly',
			
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'store_list' 			: promise_result[3][2].datas,
			'order_list' 			: promise_result[3][3].datas,
			'order_list_count' 		: promise_result[4][3].datas,
			'notes_list' 			: promise_result[3][15].datas,
			'datas_info':datas_info
			
		}
		
		
		//res.send(data_send);
		//return;
		
		
		
		res.render( ojs_configs.view_version + '/stores/manage', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Cửa hàng đã ngưng hoạt động", "Cửa hàng đã ngưng hoạt động" );
		res.send({ "error" : "100", "position":"routers->v4->store->[/manage/:store_id/:user_id]","message": error_send } ); 
		return;	
	}	
});
//@
//@
//@
//@
//@ end of 
//@ 1. [/manage/:store_id/:user_id]










//@
//@
//@
//@
//@
//@ 4. [/ajax-orders-list/]
router.post('/ajax-orders-list/', async  function(req, res, next) {
	
	
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
	
	res.send( [datas] );	
	return;		
	

	
	
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
		'datas_order': data_order_ok,
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




	//@
	//@
	//@
	//@
	//@
	try {	
		data_send = {
			'orders_list' : get_all_list_datas_all[3].datas
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/masterpage/widget-order-show-table-stores', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router->stores->ajax-orders-list", "message": error_send } ); 
		return;	
	}	
});









//@
//@
//@
//@
//@ 3. [/]
router.get('/', async  function(req, res, next) {
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
		
	
	
	
	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
	
	//@
	var store_order = 
	[               
		{
			"field"  :"stores_date_created",
			"compare" : "DESC"
		}
	] 
	//@
	//@		
	
	var data_store_edit = {
		'order':	store_order,
		'status_admin_compare':'<>',
		'status_admin_value':'100'		
	}	
	var data_store_edit_x = {...ojs_configs.datas_all};
	var data_store_edit_s = Object.assign(data_store_edit_x,data_store_edit);		
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : 0,
		'store_id' : 0,
		'datas_store': data_store_edit_s,
	}
	
	//res.send( datas_get_all_list_datas );	
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
	
	//res.send(get_all_list_datas_all[2]);
	//return;	
	
	
	
	
	
	//@
	//@
	//@
	//@
	try {
		
		datas_info = {
			'title' 			: 'Danh sách cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			
			'store_list' : get_all_list_datas_all[2].datas,
			
		}		
		
		
		data_send = {
			'title' 			: 'Danh sách cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			
			'store_list' : get_all_list_datas_all[2].datas,
			'datas_info' : datas_info
			
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/stores/admin', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi send data, liên hệ admin");
		res.send({ "error" : "3.3.router_storess(app)->show-all", "message": error_send } ); 
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
//@ 2. [/manage/orders/:store_id/:status_int]
router.get('/manage/orders/:store_id/:status_int', async  function(req, res, next) {
try {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		var status_int = req.params.status_int;
		
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
	/////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);		
	
	
	
	//@
	//store_info
	var datas_send = ojs_datas_stores.get_store_info(store_id);
	var store_info = await ojs_shares_fetch_data.get_data_send_token_post(
		ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/search/',
		datas_send,
		ojs_configs.token_supper_job);
		
	if(store_info.error == ""){
		var user_id = store_info.datas[0].stores_user_id;	
	}else{
		res.send("Lỗi không xác định, vui lòng liên hệ CSKH dala");
		return;		
	}


	//res.send( [user_id] );	
	//return;		
	
	
	//--------------------------------------------------
	//              news menu
	// -------------------------------------------------	

	
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
	
	
	//res.send( datas_order_send_s );	
	//return;	
	

	
	
	var datas_check_news_bussiness_menu = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id':user_id,
		'store_id':store_id,
		'compare':ojs_configs.datas_news_bussiness,
		'news_user':'news_user',
		'news_order': datas_order_send_s,
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_note':datas_note_send_s,
		'datas_discount':ojs_configs.datas_all	

	}
	var fn_get_datas_news_bussiness_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_bussiness_menu);
	//[1]

	//--------------------------------------------------
	//               datas count
	// -------------------------------------------------



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
	var fn_get_all_list_datas_count = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_count);		
	//[2]
	


	//--------------------------------------------------
	//             list-datas-bussiness
	// -------------------------------------------------
	
	//@
	//@
	//@
	//@
	//@
	var datas_store_send = {
		'store_compare':'='
	}	
	var datas_store_send_x = {...ojs_configs.datas_all};
	var datas_store_send_s = Object.assign(datas_store_send_x,datas_store_send);
	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':datas_store_send_s
	}
	//@ get_all_list_datas
	var fn_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas);		
	//[3]


	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	//@
	//@
	//@
	//@ get_orders_datas
	

	
	if(status_int == 'all'){
		var status_admin = [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,123,127,128,45,49,410,100,101,102];
	}else{
		var status_admin_string = "[" + status_int + "]";
		var status_admin = JSON.parse(status_admin_string);		
	}
	
	var datas_orders_edit = {
		'date_star':"2021/01/01 00:00:00",
		'date_end':ojs_shares_date.get_current_date_end(),
		'store_compare' : '=',
		'status_admin_compare': 'in',
		'status_admin_value':status_admin,
	}	
	var datas_orders_edit_x = {...ojs_configs.orders_all};
	var datas_orders_edit_s = Object.assign(datas_orders_edit_x,datas_orders_edit);	
	
	var datas_orders_edit2 = {
		'store_compare' : '='
	}	
	var datas_orders_edit2_x = {...ojs_configs.orders_all};
	var datas_orders_edit2_s = Object.assign(datas_orders_edit2_x,datas_orders_edit2);	
	var datas_get_orders_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,		
		'order_sum_count' : datas_orders_edit_s,
		'order_list_by_user' : datas_orders_edit2_s
	}

	
	//@ get_all_list_datas
	var fn_get_orders_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_orders_datas.get_orders_datas(datas_get_orders_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_orders_datas);		
	//[4]



	//@
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result);
	//return;





	//@
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			
			'title' 				: 'Quản lý đơn hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_don_hang',			
			'store_list' 			: promise_result[3][2].datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: store_info.datas[0].service_type_name,
			'store_name' 			: store_info.datas[0].stores_name,			
			
			
			"status_int"			:status_int,
			
			'orders_list' : promise_result[4][4].datas,
			'order_list_all' : promise_result[4][3].datas,			
		}	
	
		data_send = {
			
			'title' 				: 'Quản lý đơn hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_don_hang',			
			'store_list' 			: promise_result[3][2].datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: store_info.datas[0].service_type_name,
			'store_name' 			: store_info.datas[0].stores_name,			
			
			
			"status_int"			:status_int,
			
			'orders_list' : promise_result[4][4].datas,
			'order_list_all' : promise_result[4][3].datas,
			'datas_info' : datas_info
		}
		
		
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/stores/orders', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "33.router->stores->manage_orders", "message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	////evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi send view", "Lỗi lấy dữ liệu service_type_id_result" );
	res.send({ "error" : "113.router->stores->manage_orders", "message": error_send } ); 
	return;	
}	
	
});












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
		res.send({ "error" : "routers store web -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	/////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);	
	
	
	
	//--------------------------------------------------
	//              news menu
	// -------------------------------------------------	

	//@
	//@ check new bussiness
	var datas_order_send = {
		'status_admin_compare':'<>'
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);		
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
		'compare':ojs_configs.datas_news_bussiness,
		'news_user':'news_user',
		'news_order': datas_order_send_s,
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_note':datas_note_send_s,
		'datas_discount':ojs_configs.datas_all	

	}
	var fn_get_datas_news_bussiness_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_bussiness_menu);
	//[1]

	//--------------------------------------------------
	//               datas count
	// -------------------------------------------------

	//@
	//@ datas_get_all_list_datas
	var datas_order_send = {
		'date_star':ojs_shares_date.get_current_month_now()
	}
	var datas_order_send_x = {...ojs_configs.orders_all};
	var datas_order_send_s = Object.assign(datas_order_send_x,datas_order_send);	
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
		'news_note':datas_note_send_s,
		'datas_discount':ojs_configs.datas_all
	}
	var fn_get_all_list_datas_count = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_count);		
	//[2]
	

	//--------------------------------------------------
	//              list datas
	// -------------------------------------------------

	//@
	//@
	//@ datas_orders
	var data_order_order = [{'field':'orders_speciality_date_orders','compare':'DESC'}];
	var data_order_order_edit = {'order':data_order_order};
	var data_order_order_copy = {...ojs_configs.orders_all};	
	var data_order_order_assign = Object.assign(data_order_order_copy,data_order_order_edit);
	//@
	var data_order_data_edit = {'store_compare':'=','status_admin_compare': '<>','status_admin_value': '100'};
	//@
	var data_order_ok = Object.assign(data_order_order_assign,data_order_data_edit);	

	//@
	//@
	//@ datas_note
	var data_note_order = [{'field':'notes_date_created','compare':'DESC'}];
	var data_note_order_edit = {'order':data_note_order};
	var data_note_order_copy = {...ojs_configs.datas_all};	
	var data_note_order_assign = Object.assign(data_note_order_copy,data_note_order_edit);
	//@
	var data_note_data_edit = {'status_admin_compare': '<>','status_admin_value': '100'};
	//@
	var data_note_ok = Object.assign(data_note_order_assign,data_note_data_edit);	
	
	
	//@
	//@
	//@ datas_note
	var data_discount_order = [{'field':'discount_program_date_created','compare':'DESC'}];
	var data_discount_order_edit = {'order':data_discount_order};
	var data_discount_order_copy = {...ojs_configs.datas_all};	
	var data_discount_order_assign = Object.assign(data_discount_order_copy,data_discount_order_edit);
	//@
	var data_discount_data_edit = {
		'user_compare':'<>',
		'status_store_compare': '<',
		'status_store_value': ojs_shares_date.get_current_date_now()
		};
	//@
	var data_discount_ok = Object.assign(data_discount_order_assign,data_discount_data_edit);		
	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':ojs_configs.datas_all,
		'datas_order': data_order_ok,
		'datas_note': data_note_ok,
		'datas_discount': data_discount_ok
	}
	//@ get_all_list_datas
	var fn_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas);		
	//[3]



	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	var datas_orders_edit = {
		'date_star':"2021/01/01 00:00:00",
		'date_end':ojs_shares_date.get_current_date_end(),
		'status_admin_compare': 'in',
		'status_admin_value':[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,123,127,128,45,49,410,101,102],
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
		'order_list_by_user' : datas_orders_edit_s
	}
	//@ get_all_list_datas
	var fn_get_orders_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_orders_datas.get_orders_datas(datas_get_orders_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_orders_datas);		
	//[4]
	
	

	//@
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//var store_id = promise_result[3][2].datas[0].stores_ID;
	//res.send([promise_result[3][2].datas[0].stores_ID]);
	//return;
	
	
	//@
	//@
	//@
	//@
	//@ send
	try {	
	
		datas_info = {
			'title' 				: 'Quản lý doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,			
			'store_id'				: promise_result[3][2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_quan_ly',
			
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'store_list' 			: promise_result[3][2].datas,
			'order_list' 			: promise_result[3][3].datas,
			'order_list_count' 		: promise_result[4][3].datas,
			'notes_list' 			: promise_result[3][15].datas,
			
			
		}	
	
	
		data_send = {
			'title' 				: 'Quản lý doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,			
			'store_id'				: promise_result[3][2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_quan_ly',
			
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'store_list' 			: promise_result[3][2].datas,
			'order_list' 			: promise_result[3][3].datas,
			'order_list_count' 		: promise_result[4][3].datas,
			'notes_list' 			: promise_result[3][15].datas,
			'datas_info':datas_info
			
		}
		
		
		//res.send(data_send);
		//return;
		
		
		
		res.render( ojs_configs.view_version + '/stores/manage', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Cửa hàng đã ngưng hoạt động", "Cửa hàng đã ngưng hoạt động" );
		res.send({ "error" : "100", "position":"routers->v4->store->[/manage/:store_id/:user_id]","message": error_send } ); 
		return;	
	}	
});
//@
//@
//@
//@
//@ end of 
//@ 1. [/manage/:store_id/:user_id]












module.exports = router;