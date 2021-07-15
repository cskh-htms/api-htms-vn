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


const ojs_datas_products = require('../../models/ojs-datas-products');
const ojs_datas_orders = require('../../models/ojs-datas-orders');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------


0. [/]

1. [/add/:store_id/:user_id]

2. [/show/:product_id/:store_id/]

3. [/update/:product_id]

4. [/:store_id]

5. [/ajax-products-list/]

6. [/devare/:product_id/]

--------------------------------------------------------------
*/



//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 5. [/ajax-products-list-admin/]
router.post('/ajax-products-list-admin/', async function(req, res, next) {
	//@
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
	
	//res.send( [token,store_id] );	
	//return;	
	
	

	


	//--------------------------------------------------
	//             list datas all
	// -------------------------------------------------



	//@
	//@
	//@ datas_brand
	var data_product_order = [{'field':'products_speciality_date_created','compare':'DESC'}];
	var data_product_order_edit = {'order':data_product_order};
	var data_product_order_copy = {...ojs_configs.datas_all_admin};	
	var data_product_order_assign = Object.assign(data_product_order_copy,data_product_order_edit);
	//@
	var data_product_data_edit = {
		'status_admin_compare':'in',
		'status_admin_value':datas.status_admin,
		'status_store_compare':'=',
		'status_store_value':'1',		
		};
	var data_product_ok = Object.assign(data_product_order_assign,data_product_data_edit);





	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : 0,
		'store_id' : 0,
		'datas_product': data_product_ok
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
		res.send({ "error" : "routers product web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	
	
	//res.send(get_all_list_datas_all);
	//return;


	//@ 
	//@ 
	//@ 
	//@ 
	//@ 
	//@ 
	try {	
		data_send = {
			"products_list" 		: get_all_list_datas_all[7].datas,
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/masterpage/widget-product-speciality-show-tables-admin', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
		return;	
	}



});









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
	//             list datas all
	// -------------------------------------------------



	//@
	//@
	//@ datas_brand
	var data_product_order = [{'field':'products_speciality_date_created','compare':'DESC'}];
	var data_product_order_edit = {'order':data_product_order};
	var data_product_order_copy = {...ojs_configs.datas_all_admin};	
	var data_product_order_assign = Object.assign(data_product_order_copy,data_product_order_edit);
	//@
	var data_product_data_edit = {
			'status_admin_compare': '=',
			'status_admin_value': '0',
			'status_store_compare': '=',
			'status_store_value': '1',			
		};
	var data_product_ok = Object.assign(data_product_order_assign,data_product_data_edit);





	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : 0,
		'store_id' : 0,
		'datas_product': data_product_ok
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
		res.send({ "error" : "routers product web -> get_all_list_datas_all -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas_all);
	//return;










	//@ var  user_id = ojs_shares_others.get_users_id(token);
	//@ var users_type 	= ojs_shares_others.get_users_type(token);
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
	
	
		datas_info = {
			'title' 			: 'Danh sách sản phẩm',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: 0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_product',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			

			"products_list" 		: get_all_list_datas_all[7].datas,

			
		}	
	
	
	
		data_send = {
			'title' 			: 'Danh sách sản phẩm',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: 0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_product',
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'sidebar_type'		: "",
			

			"products_list" 	: get_all_list_datas_all[7].datas,
			'datas_info'		: datas_info

			
		}
		
		
		//res.send(data_send);
		//return;
		
		
		
		res.render( ojs_configs.view_version + '/products/speciality/admin-show-all', data_send );
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "35.router_app->brands->get", "message": error_send } ); 
		return;	
	}	



});




//@ 
//@ 
//@ 
//@ 
//@ 6. [/delete/:product_id/]
router.delete('/delete/:product_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var product_id = req.params.product_id;
		
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
	
	//res.send( [token,store_id] );	
	//return;		
	
	//@ 
	//@ 
	//@ 
	//@ 	
	try {	
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/' + product_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.5.router_app->product_speciality>devare", "message": error_send } ); 
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
//@ 5. [/ajax-products-list/]
router.post('/ajax-products-list/', async function(req, res, next) {
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
		var store_id = datas.store_id;
		
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
	
	//res.send( [token,store_id,user_id,datas] );	
	//return;	
		

		
	//--------------------------------------------------
	//             list-datas-bussiness
	// -------------------------------------------------
	
	
	//@
	//@
	//@
	//@ datas_brand
	var data_product_order = [{'field':'products_speciality_date_created','compare':'DESC'}];
	var data_product_order_edit = {'order':data_product_order};
	var data_product_order_copy = {...ojs_configs.datas_all};	
	var data_product_order_assign = Object.assign(data_product_order_copy,data_product_order_edit);
	//@
	var data_product_data_edit = {
		'status_admin_compare':'in',
		'status_admin_value':datas.status_admin,
		'status_store_compare':'in',
		'status_store_value':[0,1],
		};
	var data_product_ok = Object.assign(data_product_order_assign,data_product_data_edit);	
	
	
	
	
	
	
	
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_product' : data_product_ok
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
	//@
	//@lấy category_link
	var category_link_list;
	var category_link_datas = ojs_datas_products.get_category_link_datas();		
	
	//res.send( category_link_datas );
	//return;		
	
	try {
		category_link_list = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality-link/search', 
				category_link_datas, 
				token
			);		

		//res.send(category_link_list);
		//return;
		if(category_link_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, category_link_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "48.reouters_products_speciality->app->get", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "49.reouters_products_speciality->app->get", "message": error_send } ); 
			return;		
	}	
	
	
	
	//res.send( category_link_list );
	//return;			



	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	//@
	//@
	//@
	//@ get_orders_datas
	
	var datas_orders_list_sum = {
		'store_compare':'=',
		'status_admin_compare': '=',
		'status_admin_value':'1',
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
		'datas_orders_product_list':s
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



		
		

	//@ 
	//@ 
	//@ 
	//@ 
	//@ 
	//@ 
	try {	
		data_send = {
			"products_list" 		: get_all_list_datas[7].datas,
			"category_link_datas" 	: category_link_list.datas,	
			"product_list_sale"		: get_orders_datas[2].datas
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/masterpage/widget-product-speciality-show-tables', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
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
//@ 4. [/:store_id]
router.get('/:store_id', async function(req, res, next) {
	
	
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
		res.send({ "error" : "routers products seciality web -> update-product -> get req -> 1", "message": error_send } ); 
		return;			
	}		
	
	
	//@
	//@
	var  user_id = 0;	
	
	//--------------------------------------------------
	//           lấy user_id store
	// -------------------------------------------------
	//@
	//@
	//@
	//@
	//@
	var datas_store_send = {
		'user_compare':'<>'
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
	
	//res.send( datas_get_all_list_datas );	
	//return;		
	var get_all_list_datas_store;
	try{
		get_all_list_datas_store = await ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "routers bussiness web -> get_all_list_datas_store -> 1", "message": error_send } ); 
		return;			
	}
	
	var user_id = get_all_list_datas_store[2].datas[0].stores_user_id;


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
		res.send({ "error" : "routers stores web -> get_news_bussiness_menu -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_datas_news_bussiness_menu);
	//return;	

		
	



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
	
	//res.send( datas_get_all_list_datas_count );	
	//return;		
	
	
	var get_all_list_datas_count;
	try{
		get_all_list_datas_count = await ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas count bussiness" );
		res.send({ "error" : "routers store web -> get_all_list_datas_count -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas_count);
	//return;		
	
	
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	


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
		'datas_store':datas_store_send_s,
		'datas_product' : ojs_configs.datas_all
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



	//--------------------------------------------------
	//             list-datas-admin
	// -------------------------------------------------
	
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id
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
	
	//res.send(get_all_list_datas_all);
	//return;





	//--------------------------------------------------
	//             datas-orders
	// -------------------------------------------------
	
	
	//@
	//@
	//@
	//@ get_orders_datas
	
	var datas_orders_list_sum = {
		'date_star':'2021/01/01 00:00:00',
		'date_end':ojs_shares_date.get_current_date_end()
	}	
	var x = {...ojs_configs.orders_all};
	var s = Object.assign(x,datas_orders_list_sum);	
	
	//res.send( s );	
	//return;
	
	
	var product_list_sale = {
		'store_compare':'=',
		'status_admin_compare': '=',
		'status_admin_value':'1',
	}	
	var product_list_sale_x = {...ojs_configs.orders_all};
	var product_list_sale_s = Object.assign(product_list_sale_x,product_list_sale);		
	
	
	
	var datas_get_orders_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,		
		'datas_orders_list_sum':s,
		'datas_orders_product_list':product_list_sale_s
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
	
	
	//res.send( get_orders_datas );
	//return;	


	//--------------------------------------------------
	//            datas-orders
	// -------------------------------------------------


	//@
	//@
	//@
	//@
	//@lấy category_link
	var category_link_list;
	var category_link_datas = ojs_datas_products.get_category_link_datas();		
	
	//res.send( category_link_datas );
	//return;		
	
	try {
		category_link_list = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality-link/search', 
				category_link_datas, 
				token
			);		

		//res.send(category_link_list);
		//return;
		if(category_link_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, category_link_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "48.reouters_products_speciality->app->get", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "49.reouters_products_speciality->app->get", "message": error_send } ); 
			return;		
	}	
	
	
	
	//res.send( category_link_list );
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
			'title' 				: 'Danh sách sản phẩm',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_san_pham',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			
			"products_list" 		: get_all_list_datas[7].datas,
			"category_link_datas" 	: category_link_list.datas,			
			"products_count"		: get_orders_datas[1].datas,
			"product_list_sale"		: get_orders_datas[2].datas
		}

		data_send = {
			'title' 				: 'Danh sách sản phẩm',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_san_pham',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			
			"products_list" 		: get_all_list_datas[7].datas,
			"category_link_datas" 	: category_link_list.datas,			
			"products_count"		: get_orders_datas[1].datas,
			"product_list_sale"		: get_orders_datas[2].datas,
			'datas_info':datas_info
		}
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/products/speciality/show-all', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_product_speciality(app)->get", "message": error_send } ); 
		return;	
	}

});
//@ 
//@ 
//@ end of
//@ 4. [/:store_id]














//@
//@
//@
//@
//@ 3. [/update/:product_id]
router.post('/update/:product_id', async function(req, res, next) {
	
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var datas  = req.body;
		var product_id = req.params.product_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers products seciality web -> update-product -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/' + product_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi update products" );
		res.send({ "error" : "100.models-product_speciality->update", "message": error_send } ); 
		return;		
	}			
});



//@
//@
//@
//@
//@ 2. [/show/:product_id/:store_id/]
router.get('/show/:product_id/:store_id/', async function(req, res, next) {
	

	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var product_id = req.params.product_id;//id cửa hàng
		var store_id = req.params.store_id;//id cửa hàng
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
	var  user_id = ojs_shares_others.get_users_id(token);

	//res.send([store_id,user_id,token,product_id]);
	//return;
	
	
	
	
	//@
	//@
	var  user_id = 0;	
	
	//--------------------------------------------------
	//           lấy user_id store
	// -------------------------------------------------
	//@
	//@
	//@
	//@
	//@
	var datas_store_send = {
		'user_compare':'<>'
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
	
	//res.send( datas_get_all_list_datas );	
	//return;		
	var get_all_list_datas_store;
	try{
		get_all_list_datas_store = await ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas bussiness" );
		res.send({ "error" : "routers bussiness web -> get_all_list_datas_store -> 1", "message": error_send } ); 
		return;			
	}
	
	var user_id = get_all_list_datas_store[2].datas[0].stores_user_id;


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
		res.send({ "error" : "routers stores web -> get_news_bussiness_menu -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_datas_news_bussiness_menu);
	//return;	

		
	



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
	
	//res.send( datas_get_all_list_datas_count );	
	//return;		
	
	
	var get_all_list_datas_count;
	try{
		get_all_list_datas_count = await ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy list datas count bussiness" );
		res.send({ "error" : "routers store web -> get_all_list_datas_count -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas_count);
	//return;	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	
	
	



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
	
	
	
	//--------------------------------------------------
	//             list-datas-admin
	// -------------------------------------------------
	
	

	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_brand': ojs_configs.datas_all,
		'datas_cat': ojs_configs.datas_all,
		'datas_option': ojs_configs.datas_all,
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
	
	///res.send(get_all_list_datas_all);
	//return;
	

	//@
	//@
	//@
	//@
	//@
	//@
	var products_taget;
	try {
		products_taget = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/' + product_id,token);
		if(products_taget.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, products_taget.error, "Lỗi lấy product list" );
			res.send({ "error" : "66.router_product_speciality(app)", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy product list catch" );
		res.send({ "error" : "67.router_product_speciality(app)->ajax-report-order-store->order_list", "message": error_send } ); 
		return;		
	}



	//res.send( products_taget );
	//return;





	//@
	//@
	//@
	//@
	//@lấy category_link
	var category_link_list;
	var category_link_datass = ojs_datas_products.get_category_link_datas_show_update(product_id);		
	try {
		category_link_list = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality-link/search', 
				category_link_datass, 
				token
			);		

		
		if(category_link_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_link_list.error, " Lỗi lấy link product link ");
			res.send({ "error" : "48.product_speciality(app)->show", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , " Lỗi lấy link product link catch ");
			res.send({ "error" : "49.product_speciality(app)->show", "message": error_send } ); 
			return;		
	}	



	//res.send( category_link_list );
	//return;




	//@
	//@
	//@
	//@
	//@lấy option link
	var options_link_datas;
	
	var option_link_datass = ojs_datas_products.get_options_link_datas_show_update(product_id);		
	try {
		options_link_datas = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/' + ojs_configs.api_version + '/options/speciality-link/search', 
				option_link_datass, 
				token
			);		

		
		if(options_link_datas.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, options_link_datas.error, "Lỗi lấy option link");
			res.send({ "error" : "50.product_speciality(app)->show", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi lấy option link catch");
			res.send({ "error" : "51.product_speciality(app)->show", "message": error_send } ); 
			return;		
	}	


	//res.send( options_link_datas );
	//return;



	
	//@
	//@
	//@	
	//@
	//@
	//@	
	try {	
	

		datas_info = {
			
			'title' 				: 'Chỉnh sữa sản phẩm',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'product_id'			:product_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_thuong_hieu',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			
			"brands_list" : get_all_list_datas_all[6].datas,
			"datas_category_general" : get_all_list_datas_all[4].datas,
			'options_list' : get_all_list_datas_all[5].datas,				

			


			"datas" : products_taget.datas,
			"category_link_datas" : category_link_list.datas,
			"options_link_datas" : options_link_datas.datas,
	
		}

	
		data_send = {
			
			'title' 				: 'Chỉnh sữa sản phẩm',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'product_id'			:product_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_thuong_hieu',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			
			"brands_list" : get_all_list_datas_all[6].datas,
			"datas_category_general" : get_all_list_datas_all[4].datas,
			'options_list' : get_all_list_datas_all[5].datas,				

			


			"datas" : products_taget.datas,
			"category_link_datas" : category_link_list.datas,
			"options_link_datas" : options_link_datas.datas,
			'datas_info':datas_info
	
		}
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version + '/products/speciality/show', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "43.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}


});

//@
//@
//@
//@ end of 
//@ 2. [/show/:product_id/:store_id/]


//@
//@
//@
//@
//@ 1. [/add/:store_id/:user_id]
router.get('/add/:store_id/:user_id', async function(req, res, next) {
	

	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var store_id = req.params.store_id;//id cửa hàng
		var user_id = req.params.user_id;//id cửa hàng	
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
	
	
	//res.send([store_id]);
	//return;		
	
	
	//@
	//@
	//@
	//@
	
	var datas =  {
		
		"datas":{
			"products_speciality_name":"draf",
			"products_speciality_store_id":store_id
		}
	}		
	
	//res.send(datas);
	//return;		
	
	
	try {	
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality',datas, token);
		//res.send(active_save);
		//return;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tạo product draf" );
		res.send({ "error" : "2.4.router_product_speciality(app)->save", "message": error_send } ); 
		return;		
	}		
	
	
	

	res.redirect("/products/speciality/show/" + active_save.datas[1].insertId + "/" + store_id + "/");
	return;

});

//@
//@
//@
//@ end of 
//@ 1. [/add/:store_id/:user_id]






	
	
	
	
	
	
	
//@
//@
//@
//@
//@
//@ end router
module.exports = router;
	
	
	

	