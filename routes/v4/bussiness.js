
/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');

const controller_bussiness_by_user_id = require('../../controllers/' + ojs_configs.controller_version + '/bussiness/controllers-bussiness-by-user-id.js');
//const controller_store_add = require('../../controllers/' + ojs_configs.controller_version + '/admin/stores/controllers-stores-add.js');

//end of v5


const ojs_shares_get_all_list_datas_count = require('../../models/ojs-shares-get-all-list-datas-count');
const ojs_shares_get_all_list_datas = require('../../models/ojs-shares-get-all-list-datas');
const ojs_shares_get_all_list_datas_all = require('../../models/ojs-shares-get-all-list-datas-all');
const ojs_shares_get_orders_datas = require('../../models/ojs-shares-get-orders-datas');
const ojs_shares_news_admin_menu = require('../../models/ojs-shares-news-admin-menu');
const ojs_shares_news_bussiness_menu = require('../../models/ojs-shares-news-bussiness-menu');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');

const ojs_shares_others = require('../../models/ojs-shares-others');

const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_datas_users = require('../../models/ojs-datas-users');
const ojs_datas_bussiness = require('../../models/ojs-datas-bussiness');
const ojs_datas_orders = require('../../models/ojs-datas-orders');






///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/* 
---------------------------------------------------------------

1. [bussiness]/user_id

2. [/stores/show/:store_id/:user_id]

3. [/stores/update/:store_id]

4. [/stores/add/]

5. [/stores/save]

6. [/stores/delete/:store_id]

7. [/ajax-change-pass/]





--------------------------------------------------------------
*/



router.get('/:user_id', controller_bussiness_by_user_id);
//router.get('/stores/add/', controller_store_add);


//@
//@
//@
//@
//@
//@ 4. [/stores/add/]
router.get('sdasd/stores/add/', async  function(req, res, next) {
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
	//          service_type_list
	// -------------------------------------------------





	//Lấy danh sách service
	var service_type_list;
	try {
		service_type_list = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/service-type',token);
		if(service_type_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy dữ liệu service_type_list", "Lỗi lấy dữ liệu service_type_list" );
			res.send({ "error" : "1.1.router_bussiness(app)->store/add->sevice_type", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu service_type_list, liên hệ admin" );
		res.send({ "error" : "1.2.router_bussiness(app)->store/add->service_type-catch ", "message": error_send } ); 
		return;	
	}
	//@	
	
	

	//
	//Lấy danh sách users
	var users_list;
	try {
		users_list = await ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/search-bussiness',
							ojs_datas_users.get_data_user_list_add_store(),
							token
						);
		
		//res.send(users_list);
		//return;
		
		if(users_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy dữ liệu users_list", "Lỗi lấy dữ liệu users_list" );
			res.send({ "error" : "2.1.router_bussiness(app)->store/add", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu service_type_list, liên hệ admin" );
		res.send({ "error" : "2.2.router_bussiness(app)->store/add ", "message": error_send } ); 
		return;	
	}


	
	//res.send(users_list);
	//return;
	
	//@
	//@
	//@get json local 
	var local_json = await ojs_shares_fetch_data.get_data_no_token_get(ojs_configs.domain + '/uploads/files/local.json'); 	
	
	
	//@	
	//@
	//@	
	//@
	//@	
	//@	
	try {
		
		var datas_info = {
			'title' 			: 'Tạo cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			"users_list" 		: users_list.datas,
			"service_type_list" : service_type_list.datas,	
			"local_json"		: local_json
		}
		
		
		
		data_send = {
			'title' 			: 'Tạo cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			"users_list" 		: users_list.datas,
			"service_type_list" : service_type_list.datas,
			'datas_info'		: datas_info,
			"local_json"		: local_json
		}
		
		
		
		
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version + '/bussiness/admin-bussiness-store-add', data_send  );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi send data , liên hệ admin" );
		res.send({ "error" : "3.1.router_bussiness(app)->store/add->send ", "message": error_send } ); 
		return;			
	}
});












//@
//@
//@
//@
//@
//@
//@ 7. [/ajax-change-pass/]
router.post('/ajax-change-pass/', async function(req, res, next) {
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send( datas );	
	//return;		
	
	
	
	
	//@
	//@
	//@
	//@
	//@	
	var datas_send = {
		"datas" : {
			"users_password" : datas.user_pass
		}
	}
	
	try {	
		//Lấy danh sách loại danh mục
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/' + datas.user_id,datas_send, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->ajax-change-pass ", "message": error_send } ); 
		return;	
	}		
});







//@
//@
//@
//@
//@
//@ 6. [/stores/delete/:store_id]
router.get('/stores/delete/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		
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
		//Lấy danh sách loại danh mục
		var active_devare = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/' + store_id, token);
		res.send(active_devare);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_devare ", "message": error_send } ); 
		return;	
	}		
});






//@
//@
//@
//@
//@
//@ 5. [/stores/save]
router.post('/stores/save', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body;
		var user_id = datas.datas.stores_users_id;
		
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
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tạo cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_save ", "message": error_send } ); 
		return;	
	}		
	
});









//@
//@
//@
//@
//@
//@ 3. [/stores/update/:store_id]
router.post('/stores/update/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body;
		var store_id = req.params.store_id;
		
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
	//@
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/' + store_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->stores_update ", "message": error_send } ); 
		return;	
	}		
});





//@
//@
//@
//@
//@
//@
//@ 2. [/stores/show/:store_id/:user_id]
router.get('/stores/show/:store_id/:user_id', async  function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;
		var store_id = req.params.store_id;
		
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
	



	//--------------------------------------------------
	//             datas taget
	// -------------------------------------------------

	
	
	
	//
	//Lấy stores tager

	var stores_tager;
	try {
		stores_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/' + store_id,token);

		if(stores_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, stores_tager.error, "Lỗi lấy dữ liệu stores_tager" );
			res.send({ "error" : "33.router_bussiness(app)->stores/show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi lấy dữ liệu stores_tager" );
			res.send({ "error" : "34.router_bussiness(app)->stores/show", "message": error_send } ); 
			return;		
	}
		

	//@
	//@
	//@get json local 
	var local_json = await ojs_shares_fetch_data.get_data_no_token_get(ojs_configs.domain + '/uploads/files/local.json'); 
	
	
	
	
	//--------------------------------------------------
	//              list datas
	// -------------------------------------------------

	var data_store_copy = {...ojs_configs.datas_all};	
	var data_store_data_edit = {'status_admin_compare':'<>','status_admin_value':'100'};
	var data_store_ok = Object.assign(data_store_copy,data_store_data_edit);

	
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':data_store_ok,
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
		res.send({ "error" : "routers stores web -> get_all_list_datas -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas);
	//return;	
	
	
	
	//--------------------------------------------------
	//             service_type_list
	// -------------------------------------------------	
	
	
	var service_type_list;
	try {
		service_type_list = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/service-type',token);
		if(service_type_list.error != ""){
			var evn = ojs_configs.evn;
			//////evn = "dev";;;
			var error_send = ojs_shares_show_errors.show_error( evn, service_type_list.error, "Lỗi lấy dữ liệu service type" );
			res.send({ "error" : "31.router_bussiness(app)->stores/show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi lấy dữ liệu service type, liên hệ admin" );
		res.send({ "error" : "32.router_bussiness(app)->stores/show", "message": error_send } ); 
		return;		
	}	
	
	
	
	

	//@
	try {
		
		var datas_info = {
			'title' 			: 'Chỉnh sửa cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: user_id,
			'store_id' 			: store_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			'datas_local'		: local_json,
			"datas" 			: stores_tager.datas,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 		: get_all_list_datas[2].datas[0].stores_name,			
			"service_type_list" : service_type_list.datas,			
		}
		
		
		
		data_send = {
			'title' 			: 'Chỉnh sửa cửa hàng',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: user_id,
			'store_id' 			: store_id,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_danh_sach_cua_hang',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",			
			'datas_local'		: local_json,
			"datas" 			: stores_tager.datas,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 		: get_all_list_datas[2].datas[0].stores_name,			
			"service_type_list" : service_type_list.datas,
			'datas_info'		: datas_info
		}
		
		
		
		
		//res.send(data_send);
		//return;
		
		
		
		res.render( ojs_configs.view_version + '/stores/admin-show', data_send  );	
	}
	catch(error){
		var error_send = ojs_shares_show_errors.show_error( ojs_shares.evn, error, "server đang bận, truy cập lại sau" );
		res.send( { "error": "r_catch_12", "message" : error_send } );			
	}
});





//@
//@
//@
//@
//@ 1. [bussiness]/user_id
router.get('/demo/:user_id', async  function(req, res, next) {
try {	
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
	//@ promise created
	var promise_all = [];
	promise_all.push(0);

	// -----------------------------------------------------------
				//news bussiness
	//------------------------------------------------------------

	//@
	//@
	//@ datas_store
	var data_news_compare_copy = {...ojs_configs.datas_news_bussiness};	
	var data_news_compare_data_edit = {'store_compare':'<>'};
	var data_news_compare_ok = Object.assign(data_news_compare_copy,data_news_compare_data_edit);	


	//@
	//@
	//@[1]
	//@get_datas_news_bussiness_menu
	var datas_check_news_bussiness_menu = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id':user_id,
		'store_id':store_id,
		'compare':data_news_compare_ok,
		'news_user':'news_user',
		'news_store': 'news_store',
		'news_order': 'news_order',
		'news_cat': 'news_cat',
		'news_option': 'news_option',
		'news_brand': 'news_brand',
		'news_product': 'news_product',
		'news_note': 'news_note'		
	}
	
	var fn_get_datas_news_bussiness_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_bussiness_menu);
	
	
	
		
	// -----------------------------------------------------------
				//datas
	//------------------------------------------------------------
	//@
	//@
	//@[2]
	//@stores_tager	
	var data_send = ojs_datas_bussiness.get_store_by_user_id(user_id);
	var fn_stores_tager = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/search/',
			data_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_stores_tager);
	
	

	
	
	//@
	//@
	//@[3]
	//@product_sale	
	var data_send = ojs_datas_bussiness.get_product_by_user_id(user_id);
	var fn_product_sale = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all/',
			data_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_product_sale);		
			
			
			
	//@
	//@
	//@[4]
	//@product_sale_max
	var data_send = ojs_datas_bussiness.get_product_order_by_user_id(user_id);
	var fn_product_sale_max = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search-order-product-count/',
			data_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_product_sale_max);			


	
	
	//@
	//@
	//@[5]
	//@product_max_detail
	var data_send = ojs_datas_bussiness.get_product_by_user_id_max_details(user_id);
	var fn_product_max_detail = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all/',
			data_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_product_max_detail);			



	
	//@
	//@
	//@[6]
	//@fn_orders_list
	var datas_send = ojs_datas_bussiness.get_orders_list_bussiness(user_id);
	var fn_orders_list = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_orders_list);	


	//@
	//@
	//@[6]
	//@fn_coupon_data
	var datas_send = ojs_datas_orders.get_coupon_data(user_id);
	var fn_coupon_data = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_order_by_coupon/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_coupon_data);	



	//@
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	if(	promise_result[2].error != "" 
	|| 	promise_result[3].error != "" 
	|| 	promise_result[4].error != "" 
	|| 	promise_result[5].error != "" 
	|| 	promise_result[6].error != "" 
	|| 	promise_result[7].error != "" 
	){
		res.send('<h1 style="width:100%; text-align:center; padding-top:40px;">Lỗi lấy data, vui lòng liên hệ CSKH dala</h1>');			
		return;		
	}
	// -----------------------------------------------------------
				//send
	//------------------------------------------------------------
	//@
	//@
	//@
	//@
	//@ create data send
	try {

		datas_info = {
			'title' 				: 'Quản lý tài khoản doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: promise_result[2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'news_bussiness_menu' 	: promise_result[1],
			'orders_list' 			: promise_result[6].datas,
			'product_sale'			: promise_result[3].datas,
			'datas'					: promise_result[2].datas,
			'product_sale_max'		: promise_result[4].datas,
			'product_max_detail' 	: promise_result[5].datas,
			'coupon_data' 			: promise_result[7].datas,
			
		}
		data_send = {
			'title' 				: 'Quản lý tài khoản doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: promise_result[2].datas[0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'news_bussiness_menu' 	: promise_result[1],
			'orders_list' 			: promise_result[6].datas,
			'product_sale'			: promise_result[3].datas,
			'datas'					: promise_result[2].datas,
			'product_sale_max'		: promise_result[4].datas,
			'product_max_detail' 	: promise_result[5].datas,
			'coupon_data' 			: promise_result[7].datas,
			'datas_info'			: datas_info			
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
	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi hệ thống , liên hệ cskh dala" );
		res.send({ "error" : "router_bussiness(web)->get bussiness->113", "message": error_send } ); 
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
	var session_token = req.session;
	var token = req.session.token;	
	
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
	var send_datas_token = { 
		"datas" : {
			"token" : token
		}
	}
	//call api check token  
	//check token
	try {
		var check_user = await ojs_shares.call_api_post_datas_no_token(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error == "") { session_token.token = check_user.token; }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	var users_type = ojs_shares.get_users_type(token);
	var user_id = ojs_shares.get_user_id(token);		
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
	//var session_token = req.session;
	var token = req.session.token;	
	var user_id = req.params.user_id;
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
		"token":token,
		"user_id": user_id
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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

//end of quan ly cua hang






//
//
//
//
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
//show

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
//
//danh sách cửa hàng
//bussiness/store/show-all/:userID
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@
router.get('/stores/show-all-order/:user_id', async  function(req, res, next) {
	
	//
	//var session_token = req.session;
	var token = req.session.token;	
	var user_id = req.params.user_id;
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
		"token":token,
		"user_id": user_id
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
		var user_id_send = user_id;
		var users_full_name = ojs_shares.get_users_full_name(token);
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
	var token = req.session.token;	
	var datas  = req.body.datas;
	var user_id = req.params.user_id;
	
	//@
	//@
	//@@
	//@@
	var datas_check = {
		"token":token,
		"user_id": user_id
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
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
	var data_products_list;
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
		var users_type = check_datas_result.user_role;	
		var users_full_name = ojs_shares.get_users_full_name(token);
		
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
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
	
	var category_general_list_datas;
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
	var category_general_list;
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
	
	
	
	
	var options_list_datas;
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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
router.get('/users/:user_id', async  function(req, res, next) {
	//
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
	
	

	var users_list;
	try {

		
		users_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/users/search', 
			data_brand_list = ojs_datas_users.get_data_users_list_bussiness(user_id), 
			token
		);	
		
		if(users_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,users_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
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
		var users_full_name = ojs_shares.get_users_full_name(token);
		data_send = {
			'title' : 'Quản lý thương hiệu',
			'users_type' : check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'list_datas' : users_list.datas,
			'js_css_version' : check_datas_result.js_css_version
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/bussiness/users',  data_send );
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
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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
	//var session_token = req.session;
	var user_id = req.params.user_id;
	
		
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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
	var token = req.session.token;	
	var datas  = req.body.datas;
	var user_id = datas.user_id;
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
	var datas_check = {
		"token":token,
		"user_id": user_id
	}
	
	//res.send(datas_check );	
	//return;		
	var check_datas_result;
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
		var users_full_name = ojs_shares.get_users_full_name(token);
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