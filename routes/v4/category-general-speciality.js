


/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');


const controller_store_category = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controllers-category-store.js'
);

const controller_store_category_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controllers-category-store-product.js'
);

const controller_category_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-show-all.js'
);
const controller_category_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-add.js'
);

const controller_category_ajax_list = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-ajax-list.js'
);


const controller_category_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-save.js'
);



const controller_category_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-show.js'
);





//@
//@
//@
//@ router
router.get('/', controller_category_show_all);
router.post('/ajax-list/', controller_category_ajax_list);
router.get('/add/:store_id', controller_category_add);
router.post('/save/', controller_category_save);
router.get('/show/:category_id', controller_category_show);





router.get('/:store_id', controller_store_category);
router.get('/product/:category_id/:store_id', controller_store_category_product);

//end of v5








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

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////









/* 
---------------------------------------------------------------

1. [/]

2. [/:store_id]

3. [ajax-category-list-no]

4. [/add/:store_id/:user_id]

5. [/save]

6. [/show/:cat_id/:store_id]

7. [/update/:cat_id]

8. /ajax-category-list/

9. [/delete/:cat_id]

10. [ajax-category-list-world]

11. [/products/:category_id/:store_id/]

12. [/admin/products/:category_id/]
--------------------------------------------------------------
*/



//@
//@
//@
//@
//@ 2. [/:store_id]
router.get('asdasdasd/:store_id', async function(req, res, next) {
try {
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
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	
	//@ /////////////////////////////////////////////////
	//@ /////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);	
	
	
	
	
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
		'news_note':datas_note_send_s		

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
		'datas_note' : datas_note_send_s
	}
	
	var fn_get_all_list_datas_count = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_count);		
	//[2]
	
	//--------------------------------------------------
	//             datas
	// -------------------------------------------------
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
	}
	//@ get_all_list_datas
	var fn_get_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_get_all_list_datas);		
	//[3]


	//--------------------------------------------------
	//             datas order
	// -------------------------------------------------	
	//@
	//@
	//@ datas_brand
	var data_cat_order = [{'field':'category_general_speciality_date_created','compare':'DESC'}];
	var data_cat_order_edit = {'order':data_cat_order};
	var data_cat_order_copy = {...ojs_configs.datas_all};	
	var data_cat_order_assign = Object.assign(data_cat_order_copy,data_cat_order_edit);

	//@
	var data_cat_order_data_edit = {
		'user_compare':'=',
		'status_admin_compare': '<>',
		'status_admin_value': '1000',
		'status_store_compare': '<>',
		'status_store_value': '1000'		
		};
	var data_cat_order_ok = Object.assign(data_cat_order_assign,data_cat_order_data_edit);	
	//@
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_cat': data_cat_order_ok,
	}
	
	//@ get_all_list_datas_all
	var fn_get_get_all_list_datas_all = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas_all);
		resolve(result);
	});	
	promise_all.push(fn_get_get_all_list_datas_all);		
	//[4]
	
	
	
	
	//product count
	var datas_send = ojs_datas_category.get_data_category_product_count(store_id);
	var fn_get_data_category_product_count = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search_count_product_by_category/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_data_category_product_count);
	//[5]
	
	
	
	
	
	
	
	
	//@
	//@ ///////////////////////////////////////////////
	//@ ///////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result);
	//return;
	//@
	try {	
		datas_info = {
			'title' 				: 'Danh sách danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_danh_muc',		
			'store_list' 			: promise_result[3][2].datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: promise_result[3][2].datas[0].service_type_name,
			'store_name' 			: promise_result[3][2].datas[0].stores_name,			
			
			
			'datas_category_general' : promise_result[4][4].datas,
			'product_count' 		 : promise_result[5].datas,
		}	
	
	
		data_send = {
			'title' 				: 'Danh sách danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_danh_muc',		
			'store_list' 			: promise_result[3][2].datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: promise_result[3][2].datas[0].service_type_name,
			'store_name' 			: promise_result[3][2].datas[0].stores_name,			
			
			
			'datas_category_general' : promise_result[4][4].datas,
			'product_count' 		 : promise_result[5].datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/categorys/general/speciality/show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10.router_app->category_general_speciality->category_general_list->catch", "message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
	res.send({ "error" : "113.router_app->category_general_speciality->category_general_list->catch", "message": error_send } ); 
	return;	
}		
});














//@
//@
//@
//@
//@ 12. [/admin/products/:category_id/]
router.get('/admin/products/:category_id', async function(req, res, next) {
try {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var category_id = req.params.category_id;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers categorys web -> products ->admin -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@ /////////////////////////////////////////////////
	//@ /////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);		
	

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
	var fn_get_datas_news_admin_menu = new Promise((resolve, reject) => {
		var result = ojs_shares_news_admin_menu.get_news_admin_menu(datas_check_news_admin_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_news_admin_menu);
	//[1]	
	
	
	
	//@
	//product count
	var datas_send = ojs_datas_category.get_data_category_product_view_admin(category_id);
	var fn_get_data_category_product_view_admin = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_data_category_product_view_admin);
	//[2]
	
	
	
	
	//@
	//category list
	var datas_send = ojs_datas_category.get_category_link_datas_admin();	
	var fn_get_category_link_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_category_link_datas);
	//[3]	


	//@
	//category_taget
	var datas_send = ojs_datas_category.get_category_info(category_id);	
	var fn_get_category_info = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_category_info);
	//[4]	


	//@
	//@ ///////////////////////////////////////////////
	//@ ///////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result[2]);
	//return;
	
	
	
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
			'menu_taget'		:'sidebar_category',
			'news_admin_menu' 	: promise_result[1],
			'sidebar_type'		: "",
			

			"products_list" 		: promise_result[2].datas,
			'category_info'			: promise_result[4].datas,
		}	
	

	
		data_send = {
			'title' 			: 'Danh sách sản phẩm',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_role' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: 0,
			'store_id'			: 0,
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		:'sidebar_category',
			'news_admin_menu' 	: promise_result[1],
			'sidebar_type'		: "",
			

			"products_list" 		: promise_result[2].datas,
			'category_info'			: promise_result[4].datas,
			'datas_info':datas_info
		}
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/categorys/general/speciality/show-product-admin', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10.router_app->category_general_speciality->product->admin->catch", "message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
	res.send({ "error" : "113.router_app->category_general_speciality->product->admin->catch", "message": error_send } ); 
	return;	
}		
});

//@
//@
//@
//@
//@ 11. [/products/:category_id/:store_id/]
router.get('/products/:category_id/:store_id', async function(req, res, next) {
try {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;	
		var category_id = req.params.category_id;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers categorys web -> products -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	
	//@ /////////////////////////////////////////////////
	//@ /////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);	
	
	
	//@
	//store_info
	var datas_send = ojs_datas_category.get_store_info(store_id);
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
	
	
	
	
	
	//@
	//@
	//@
	//@news menu
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
		'news_note':datas_note_send_s		

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
		'datas_note' : datas_note_send_s
	}
	
	var fn_get_all_list_datas_count = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_count.get_all_list_datas_count(datas_get_all_list_datas_count);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas_count);		
	//[2]
	
	//--------------------------------------------------
	//             datas
	// -------------------------------------------------
	//@
	//product count
	var datas_send = ojs_datas_category.get_data_category_product_view(category_id,store_id);
	var fn_get_data_category_product_view = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_data_category_product_view);
	//[3]
	
	//@
	//category list
	var datas_send = ojs_datas_category.get_category_link_datas(store_id);	
	var fn_get_category_link_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_category_link_datas);
	//[4]	

	
	//@
	//product_sale
	var datas_send = ojs_datas_category.get_product_by_user_id(user_id);	
	var fn_get_product_by_user_id = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search-order-product-count/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_product_by_user_id);
	//[5]	
		
	
	//@
	//category_taget
	var datas_send = ojs_datas_category.get_category_info(category_id);	
	var fn_get_category_info = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_category_info);
	//[6]		
	
	


	//@
	//@ ///////////////////////////////////////////////
	//@ ///////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result[5]);
	//return;
	
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
			'menu_taget'			:'sidebar_danh_muc',			
			'store_list' 			: store_info.datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: store_info.datas[0].service_type_name,
			'store_name' 			: store_info.datas[0].stores_name,
			'products_list'			: promise_result[3].datas,	
			'category_link_datas'	: promise_result[4].datas,	
			'product_sale'			: promise_result[5].datas,
			'category_info'			: promise_result[6].datas,
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
			'menu_taget'			:'sidebar_danh_muc',			
			'store_list' 			: store_info.datas,
			'news_bussiness_menu' 	: promise_result[1],
			'list_data_count' 		: promise_result[2],
			'service_type_name' 	: store_info.datas[0].service_type_name,
			'store_name' 			: store_info.datas[0].stores_name,	
			'products_list'			: promise_result[3].datas,	
			'category_link_datas'	: promise_result[4].datas,	
			'product_sale'			: promise_result[5].datas,
			'category_info'			: promise_result[6].datas,
			'datas_info':datas_info
		}
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/categorys/general/speciality/show-product', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10.router_app->category_general_speciality->product->catch", "message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
	res.send({ "error" : "113.router_app->category_general_speciality->product->catch", "message": error_send } ); 
	return;	
}		
});
//@
//@
//@
//@
//@
//@
//@ 10. [ajax-category-list-world]
router.post('/ajax-category-list-world/', async function(req, res, next) {
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
		var store_id  = datas.store_id;

		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@ /////////////////////////////////////////////////
	//@ /////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);	
	

	//@
	//@
	//@ datas_brand
	var data_cat_order = [{'field':'category_general_speciality_date_created','compare':'DESC'}];
	var data_cat_order_edit = {'order':data_cat_order};
	var data_cat_order_copy = {...ojs_configs.datas_all};	
	var data_cat_order_assign = Object.assign(data_cat_order_copy,data_cat_order_edit);

	//@
	var data_cat_data_edit = {
		'status_admin_compare':'in',
		'status_admin_value':datas.status_admin,
		'store_compare': '<>',
		'status_store_compare':'in',
		'status_store_value':[0,1],	
		};
	var data_cat_ok = Object.assign(data_cat_order_assign,data_cat_data_edit);


	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : 0,
		'datas_cat': data_cat_ok
	}

	var fn_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas_all.get_all_list_datas_all(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas);
	//[1]	


	//product count
	var datas_send = ojs_datas_category.get_data_category_product_count_admin();
	var fn_get_data_category_product_count = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search_count_product_by_category/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_data_category_product_count);
	//[2]


	//@ ///////////////////////////////////////////////
	//@ ///////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//res.send(promise_result[1]);
	//return;	
	//@
	//@
	//@
	//@
	try {	
		data_send = {
			'datas_category_general' : promise_result[1][4].datas,
			'user_id':user_id,
			'user_role' : ojs_shares_others.get_users_type(token),
			'store_id' : store_id,
			'product_count' 		 : promise_result[2].datas,
		}
		//res.send(data_send);
		//return;
		res.render(ojs_configs.view_version + '/masterpage/widget-category-general-show-tables-world', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_category_speciality(app)->ajax-category-list", "message": error_send } ); 
		return;	
	}

});













//@
//@
//@
//@
//@
//@ 9. [/delete/:cat_id]
router.get('/delete/:cat_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var cat_id = req.params.cat_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,store_id] );	
	//return;	
		
	
	try {	
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/' + cat_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.1.router_category_speciality(app)->devare", "message": error_send } ); 
		return;	
	}		
});






//@
//@
//@
//@
//@
//@
//@ 7. [/update/:cat_id]
router.post('/update/:cat_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var cat_id = req.params.cat_id;
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
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
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
		//Lấy danh sách loại danh mục
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/' + cat_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.router_category_speciality(app)->update", "message": error_send } ); 
		return;
	}		
});











//@
//@
//@
//@
//@
//@
//@ 6. [/show/:cat_id/:store_id]
router.get('/show/:cat_id/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var cat_id = req.params.cat_id;
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
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
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
	//             list-datas-all
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
		'datas_cat': ojs_configs.datas_all,
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





	
	
	//@
	//@
	//@
	//@
	//@ category taget
	var category_datas;
	try {
		category_datas = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/' + cat_id,token);
		if(category_datas.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu category_datas, liên hệ admin", "Lỗi lấy dữ liệu category_datas, liên hệ admin" );
			res.send({ "error" : "33.router_category_speciality(app)->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category, liên hệ admin" );
			res.send({ "error" : "34.router_category_speciality(app)->show", "message": error_send } ); 
			return;	
	}
	
	//res.send(category_datas);
	//return;
	
	
	
	
	

	try {	
	
	
		datas_info = {
			'title' 				: 'Chỉnh sửa danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'cat_id' 				: cat_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			
			'datas_category_general' : get_all_list_datas_all[4].datas,
			'datas' : category_datas.datas,			
		}	
	
		data_send = {
			'title' 				: 'Chỉnh sửa danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'cat_id' 				: cat_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			
			'datas_category_general' : get_all_list_datas_all[4].datas,
			'datas' : category_datas.datas,	
			'datas_info':datas_info			
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version +  '/categorys/general/speciality/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category, liên hệ admin" );
		res.send({ "error" : "35.router_category_speciality(app)->show", "message": error_send } ); 
		return;	
	}	
});




//@
//@
//@
//@
//@
//@
//@ 5. [/save]
router.post('dsdasdasd/save', async function(req, res, next) {
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
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
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
		//Lấy danh sách loại danh mục
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lưu data. liên hệ admin" );
		res.send({ "error" : "2.4.router_category_speciality(app)->save", "message": error_send } ); 
		return;	
	}	
});









//@
//@
//@
//@
//@
//@
//@ 4. [/add/:store_id/:user_id]
router.get('/add/:store_id/:user_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
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
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	
	//res.send([store_id,user_id]);
	//return;		
	
	
	
	//@
	//@
	//@
	//@

	
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
	//             list-datas-all
	// -------------------------------------------------
	
	

	//@
	//@
	//@
	//@ datas cat
	var datas_get_all_list_datas_all = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_cat': ojs_configs.datas_all,
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


	try {	
	
		datas_info = {
			'title' 				: 'Tạo danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'datas_category_general' : get_all_list_datas_all[4].datas,

		}	
	
		data_send = {
			'title' 				: 'Tạo danh mục',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'datas_category_general' : get_all_list_datas_all[4].datas,
			'datas_info':datas_info
		}
		
		
		
		
		
		
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/categorys/general/speciality/add', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "Lỗi send data, vui lòng thao tác lại", "Lỗi send data, vui lòng thao tác lại" );
			res.send({ "error" : "2.6.router_category_speciality(app)", "message": error_send } ); 
			return;	
	}	

});


//@
//@
//@
//@
//@
//@
//@ 3. [ajax-category-list-no]
router.post('/ajax-category-list-no/', async function(req, res, next) {
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
		var store_id  = datas.store_id;

		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers categorys web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [token,store_id] );	
	//return;	


	
	//@ /////////////////////////////////////////////////
	//@ /////////////////////////////////////////////////
	var promise_all = [];
	promise_all.push(0);		

	//--------------------------------------------------
	//             list-datas-bussiness
	// -------------------------------------------------
	
	

	//@
	//@
	//@ datas_brand
	var data_cat_order = [{'field':'category_general_speciality_date_created','compare':'DESC'}];
	var data_cat_order_edit = {'order':data_cat_order};
	var data_cat_order_copy = {...ojs_configs.datas_all};	
	var data_cat_order_assign = Object.assign(data_cat_order_copy,data_cat_order_edit);

	//@
	var data_cat_data_edit = {
		'status_admin_compare':'in',
		'status_admin_value':datas.status_admin,
		'store_compare': '=',
		'status_store_compare':'in',
		'status_store_value':[0,1],	
		};
	var data_cat_ok = Object.assign(data_cat_order_assign,data_cat_data_edit);


	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_cat': data_cat_ok
	}
	var fn_get_all_list_datas = new Promise((resolve, reject) => {
		var result = ojs_shares_get_all_list_datas.get_all_list_datas(datas_get_all_list_datas);
		resolve(result);
	});	
	promise_all.push(fn_get_all_list_datas);	
	//[1]
	
	//@
	//@ product count
	var datas_send = ojs_datas_category.get_data_category_product_count(store_id);
	var fn_get_data_category_product_count = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search_count_product_by_category/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_get_data_category_product_count);
	//[2]



	//@
	//@ ///////////////////////////////////////////////
	//@ ///////////////////////////////////////////////
	var promise_result = await Promise.all(promise_all);
	//@
	//@
	//@
	//@
	try {	
		data_send = {
			'datas_category_general' : promise_result[1][4].datas,
			'user_id':user_id,
			'user_role' : ojs_shares_others.get_users_type(token),
			'product_count' 		 : promise_result[2].datas,
		}
		//res.send(data_send);
		//return;
		res.render(ojs_configs.view_version + '/masterpage/widget-category-general-show-tables-no', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_category_speciality(app)->ajax-category-list", "message": error_send } ); 
		return;	
	}

});











//@
//@
//@
//@
//@
//@
//@ 1 [/]
router.get('/', async function(req, res, next) {
	//
	res.send("welcom !!");
	return;
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


//@@
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@

//lay danh sach danh muc
router.post('/ajax-category-list-bussiness/', async function(req, res, next) {
	//
	var token = req.session.token;	
	var datas  = req.body.datas;
	

	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}


	//
	//@@
	//@@lấy version
	var datas_check = {
		"token":token
	}
	//@
	//@
	var check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "20.router_category_speciality(app)->ajax-category-list", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error == ""){
	}else{
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "21.router_category_speciality(app)->ajax-category-list", "message": error_send } ); 
		return;			
	}	
	//@
	//@	
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
	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	//@
	try {	
		//
		//@
		var user_id = ojs_shares.get_users_id(token);	
		data_send = {
			'datas_category_general' : category_general_list.datas,
			'user_id':user_id,
			'user_role': check_datas_result.user_role
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-category-general-show-tables-bussiness', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_category_speciality(app)->ajax-category-list", "message": error_send } ); 
		return;	
	}

});

//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@

//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@





//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	