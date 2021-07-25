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

1 [/:store_id]


4 [/add/:store_id/:user_id]

5 [/save]

6 [/show/:discount_program_id/:store_id]

7 [/update/:discount_program_id]

8. [/ajax-load-discount-program/]

2 [/details/add/:discount_program_id/:store_id/:user_id]

3 [/details-save]


9 [/product/add/:discount_program_details_id/:store_id/:user_id]


10. [/product-show/:discount_program_product_link_id/:store_id/:discount_program_details_id/]


11. [/product-update/:discount_program_product_link_id/]

12 [/product-delete/:discount_program_product_link_id/]

13. [/details/show/:discount_program_details_id/:store_id/:discount_program_id]

--------------------------------------------------------------
*/



//@
//@
//@
//@
//@
//@
//@ 14. [/product-update/:discount_program_details_id/]
router.post('/details-update/:discount_program_details_id/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_details_id = req.params.discount_program_details_id;
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
		res.send({ "error" : "router_discount_program_speciality web -> details update -> get req -> 1", "message": error_send } ); 
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
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/' + discount_program_details_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_options_speciality(web)->update details", "message": error_send } ); 
		return;	
	}		
});





//@ 
//@
//@
//@
//@
//@ 13. [/details/show/:discount_program_details_id/:store_id/:discount_program_id]
router.get('/details/show/:discount_program_details_id/:store_id/:discount_program_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		var discount_program_id = req.params.discount_program_id;
		var discount_program_details_id = req.params.discount_program_details_id;
		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//@
	//@
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
	
	user_id = get_all_list_datas_store[2].datas[0].stores_user_id;


	//res.send( [user_id] );	
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
	
	
	
	//Lấy option tager
	var discount_program_tager;
	try {
		discount_program_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/' + discount_program_id,token);
		//res.send( discount_program_tager );	
		//return;
		if(discount_program_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;		
	}

	//res.send( discount_program_tager );	
	//return;	
	
	
	
	
	
	//Lấy option tager
	var discount_program_details_tager;
	try {
		var datas = {
			'id':discount_program_details_id
		}
		discount_program_details_tager = await ojs_shares_fetch_data.get_data_send_token_post( 
					ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/search',
					ojs_datas_discount_program_store_add.get_discount_details_data_taget(datas),
					ojs_configs.token_supper_job
				);		
		
		
		
		//res.send( discount_program_details_tager );	
		//return;
		if(discount_program_details_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_details_tager );	
	//return;	
	

	try {

		datas_info = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_details_id'	: discount_program_details_id,
			'discount_program_id'	: discount_program_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_tager': discount_program_tager.datas,
			'datas'					: discount_program_details_tager.datas,
		}
		
		data_send = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_details_id'	: discount_program_details_id,
			'discount_program_id'	: discount_program_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_tager': discount_program_tager.datas,	
			'datas'					: discount_program_details_tager.datas,			
			
			'datas_info':datas_info
		}
		
		
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version + '/discount-program/speciality/details-show', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}	
	
	
});

//@
//@
//@
//@
//@ 12 [/product-delete/:discount_program_product_link_id/]
router.get('/product-delete/:discount_program_product_link_id/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers discount-program web -> delete product -> get req -> 1", "message": error_send } ); 
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
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-product-link/' + discount_program_product_link_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.5.router_app->router_options_speciality(app)->devare", "message": error_send } ); 
		return;	
	}		
});








//@
//@
//@
//@
//@
//@
//@ 11. [/product-update/:discount_program_product_link_id/]
router.post('/product-update/:discount_program_product_link_id/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
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
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
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
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-product-link/' + discount_program_product_link_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_options_speciality(app)->update", "message": error_send } ); 
		return;	
	}		
});

//@
//@
//@
//@
//@
//@
//@ 10. [/product-show/:discount_program_product_link_id/:store_id/:discount_program_details_id/]
router.get('/product-show/:discount_program_product_link_id/:store_id/:discount_program_details_id/', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
		var store_id = req.params.store_id;
		var discount_program_details_id = req.params.discount_program_details_id;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send( [discount_program_product_link_id,store_id,discount_program_details_id] );	
	//return;		
	
	//@
	//@
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
	
	user_id = get_all_list_datas_store[2].datas[0].stores_user_id;


	//res.send( [user_id] );	
	//return;		
	//@
	//@
	//@
	//@
	
	
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
	//@ data_product
	var data_product_order = [{'field':'products_speciality_name','compare':'ASC'}];
	var data_product_order_edit = {'order':data_product_order};
	var data_product_order_copy = {...ojs_configs.datas_all};	
	var data_product_order_assign = Object.assign(data_product_order_copy,data_product_order_edit);
	//@
	var data_product_data_edit = {
			'user_compare':'='
		};
	var data_product_ok = Object.assign(data_product_order_assign,data_product_data_edit);

	
	
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
		'datas_product':data_product_ok
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



	
	//Lấy option tager
	var discount_program_product_link_target;
	try {
		discount_program_product_link_target = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-product-link/' + discount_program_product_link_id,token);
		//res.send( discount_program_product_link_target );	
		//return;
		if(discount_program_product_link_target.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_product_link_target.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(web)->show->link", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_product_link_target.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(web)->show->link", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_product_link_target );	
	//return;



	//Lấy option tager
	var discount_program_details_tager;
	try {
		var datas = {
			'id':discount_program_details_id
		}
		discount_program_details_tager = await ojs_shares_fetch_data.get_data_send_token_post( 
					ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/search',
					ojs_datas_discount_program_store_add.get_discount_details_data_taget(datas),
					ojs_configs.token_supper_job
				);		
		
		
		
		//res.send( discount_program_details_tager );	
		//return;
		if(discount_program_details_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_details_tager );	
	//return;	







	//@
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 				: 'Chỉnh sửa option',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,		
			'products_list'			: get_all_list_datas[7].datas,
			'discount_program_details_id':discount_program_details_id,
			
			'discount_program_product_link_id':discount_program_product_link_id,
			'discount_program_details_tager': discount_program_details_tager.datas,
			'datas' : discount_program_product_link_target.datas,
		}	
	
		data_send = {
			'title' 				: 'Chỉnh sửa option',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,		
			'products_list'			: get_all_list_datas[7].datas,	
			'discount_program_details_id':discount_program_details_id,
			
			'discount_program_product_link_id':discount_program_product_link_id,
			'discount_program_details_tager': discount_program_details_tager.datas,
			'datas' : discount_program_product_link_target.datas,
			'datas_info':datas_info
		}
		
		
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version +  '/discount-program/speciality/product-show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,discount_program_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "37.router_discount_program_speciality(web)->show-prduct-link", "message": error_send } ); 
		return;		
	}	
});











//@
//@
//@
//@
//@
//@
//@ 3 [/product-save]
router.post('/product-save/', async function(req, res, next) {
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
		res.send({ "error" : "router_discount_program_speciality web -> product-save -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [datas] );	
	//return;		
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		//Lấy danh sách loại danh mục
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-product-link/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_discount_program_speciality(app)->product-save->", "message": error_send } ); 
		return;		
	}			
});








//@ 
//@
//@
//@
//@
//@ 2 [/product/add/:discount_program_details_id/:store_id/:user_id]
router.get('/product/add/:discount_program_details_id/:store_id/:user_id', async function(req, res, next) {
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
		var discount_program_details_id = req.params.discount_program_details_id;
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	
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
	//@
	//@ data_product
	var data_product_order = [{'field':'products_speciality_name','compare':'ASC'}];
	var data_product_order_edit = {'order':data_product_order};
	var data_product_order_copy = {...ojs_configs.datas_all};	
	var data_product_order_assign = Object.assign(data_product_order_copy,data_product_order_edit);
	//@
	var data_product_data_edit = {
			'user_compare':'='
		};
	var data_product_ok = Object.assign(data_product_order_assign,data_product_data_edit);

	
	
	
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':datas_store_send_s,
		'datas_product':data_product_ok
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
	
	//res.send(get_all_list_datas[7]);
	//return;



	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
	
	
	//Lấy option tager
	var discount_program_details_tager;
	try {
		var datas = {
			'id':discount_program_details_id
		}
		discount_program_details_tager = await ojs_shares_fetch_data.get_data_send_token_post( 
					ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/search',
					ojs_datas_discount_program_store_add.get_discount_details_data_taget(datas),
					ojs_configs.token_supper_job
				);		
		
		
		
		//res.send( discount_program_details_tager );	
		//return;
		if(discount_program_details_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(web)->show", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_details_tager );	
	//return;	
	

	

	try {

		datas_info = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_details_id'	: discount_program_details_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_details_tager': discount_program_details_tager.datas,
			'products_list'			: get_all_list_datas[7].datas
		}
		
		data_send = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_details_id'	: discount_program_details_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_details_tager': discount_program_details_tager.datas,	
			'products_list'			: get_all_list_datas[7].datas,			
			
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/discount-program/speciality/product-add', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}	
	
	
});











//@
//@
//@
//@
//@
//@
//@ 3 [/details-save]
router.post('/details-save/', async function(req, res, next) {
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
		res.send({ "error" : "router_discount_program_speciality web -> details-save -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [datas] );	
	//return;		
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		//Lấy danh sách loại danh mục
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_discount_program_speciality(app)->details-save->", "message": error_send } ); 
		return;		
	}			
});

//@ 
//@
//@
//@
//@
//@ 2 [/details/add/:discount_program_id/:store_id/:user_id]
router.get('/details/add/:discount_program_id/:store_id/:user_id', async function(req, res, next) {
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
		var discount_program_id = req.params.discount_program_id;
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	
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
	
	
	
	//Lấy option tager
	var discount_program_tager;
	try {
		discount_program_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/' + discount_program_id,token);
		//res.send( discount_program_tager );	
		//return;
		if(discount_program_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_tager );	
	//return;	
	

	

	try {

		datas_info = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_id'	: discount_program_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_tager': discount_program_tager.datas
		}
		
		data_send = {
			'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'discount_program_id'	: discount_program_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_tager': discount_program_tager.datas,			
			
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/discount-program/speciality/details-add', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}	
	
	
});









//@ 
//@
//@
//@
//@
//@ 8. [/ajax-load-discount-program/]
router.post('/ajax-load-discount-program/', async function(req, res, next) {
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
	
	//res.send( [token,store_id] );	
	//return;	

	
	

	//--------------------------------------------------
	//             list-datas-bussiness
	// -------------------------------------------------
	
		
	//@
	//@
	//@ data_discount
	var data_discount_order = [{'field':'discount_program_date_created','compare':'DESC'}];
	var data_discount_order_edit = {'order':data_discount_order};
	var data_discount_order_copy = {...ojs_configs.datas_all};	
	var data_discount_order_assign = Object.assign(data_discount_order_copy,data_discount_order_edit);
	//@
	var data_discount_data_edit = {
			'status_admin_compare':'in',
			'status_admin_value':datas.status_admin,
			'store_compare':'=',
			'discount_program_check_expired_compare':'in',
			'discount_program_check_expired_value': [0,1],
		};
	var data_discount_ok = Object.assign(data_discount_order_assign,data_discount_data_edit);	
	
	
	//@
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' :0,
		'store_id' : store_id,
		'datas_discount': data_discount_ok
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
	//@
	//@
	try {	
		data_send = {
			'discount_program_list' : get_all_list_datas[8].datas,
			'store_id':  store_id,
			'user_id':user_id,
			'user_role' : ojs_shares_others.get_users_type(token)
		}
		res.render( ojs_configs.view_version + '/masterpage/widget-discount-program-show', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_option_speciality(app)->ajax-option-list-no", "message": error_send } ); 
		return;	
	}

});





//@
//@
//@
//@
//@
//@
//@ 7 [/update/:discount_program_id]
router.post('/update/:discount_program_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_id = req.params.discount_program_id;
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
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
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
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/' + discount_program_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_options_speciality(app)->update", "message": error_send } ); 
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
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
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
		var active_save = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_discount_program_speciality(app)->save->save", "message": error_send } ); 
		return;		
	}			
});




//@
//@
//@
//@
//@
//@
//@ 6 [/show/:discount_program_id/:store_id]
router.get('/show/:discount_program_id/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var discount_program_id = req.params.discount_program_id;
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
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
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



	
	//Lấy option tager
	var discount_program_tager;
	try {
		discount_program_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/' + discount_program_id,token);
		//res.send( discount_program_tager );	
		//return;
		if(discount_program_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(app)->show", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_tager );	
	//return;


	//@
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 				: 'Chỉnh sửa option',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'discount_program_id':discount_program_id,
			'datas' : discount_program_tager.datas,
		}	
	
		data_send = {
			'title' 				: 'Chỉnh sửa option',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'discount_program_id':discount_program_id,
			'datas' : discount_program_tager.datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version +  '/discount-program/speciality/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,discount_program_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "37.router_discount_program_speciality(app)->show", "message": error_send } ); 
		return;		
	}	
});









//@
//@
//@
//@
//@
//@
//@ 4 [/add/:store_id/:user_id]
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
		res.send({ "error" : "router_discount_program_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	
	
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
	
	

	

	try {

		datas_info = {
			'title' 				: 'Tạo chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,	
		}
		
		data_send = {
			'title' 				: 'Tạo chương trình khuyến mãi',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/discount-program/speciality/add', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}	
	
	
});

//@
//@
//@
//@
//@
//@
//@ 1[/:store_id]
router.get('/:store_id', async function(req, res, next) {
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
		res.send({ "error" : "routers option web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//@
	var  user_id = 0;	
	
	
	
	//res.send( [store_id] );	
	//return;		
	
	
	
	
	
	
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
	//@
	//@ data_discount
	var data_discount_order = [{'field':'discount_program_date_created','compare':'DESC'}];
	var data_discount_order_edit = {'order':data_discount_order};
	var data_discount_order_copy = {...ojs_configs.datas_all};	
	var data_discount_order_assign = Object.assign(data_discount_order_copy,data_discount_order_edit);
	//@
	var data_discount_data_edit = {
		'store_compare': 'in',

		'status_admin_compare':'=',
		'status_admin_value': '4',
		
		'discount_program_check_expired_compare':'=',
		'discount_program_check_expired_value': '1',		
		 
		
		};
	var data_discount_ok = Object.assign(data_discount_order_assign,data_discount_data_edit);	
	
	

	//@
	//@
	//@ datas_discount_store_add
	var datas_discount_store_add_order = [{'field':'discount_program_details_date_created','compare':'DESC'}];
	var datas_discount_store_add_order_edit = {'order':datas_discount_store_add_order};
	var datas_discount_store_add_order_copy = {...ojs_configs.datas_all};	
	var datas_discount_store_add_order_assign = Object.assign(datas_discount_store_add_order_copy,datas_discount_store_add_order_edit);
	//@
	var datas_discount_store_add_data_edit = {
		'store_compare': '=',

		'status_admin_compare':'=',
		'status_admin_value': '4',		 
		
		};
	var datas_discount_store_add_ok = Object.assign(datas_discount_store_add_order_assign,datas_discount_store_add_data_edit);	
	

	
	//@
	//@
	//@ datas_discount_product_add
	var datas_discount_product_add_order = [{'field':'discount_program_product_link_date_created','compare':'DESC'}];
	var datas_discount_product_add_order_edit = {'order':datas_discount_product_add_order};
	var datas_discount_product_add_order_copy = {...ojs_configs.datas_all};	
	var datas_discount_product_add_order_assign = Object.assign(datas_discount_product_add_order_copy,datas_discount_product_add_order_edit);
	//@
	var datas_discount_product_add_data_edit = {
		'store_compare': '=',

		'status_admin_compare':'<>',
		'status_admin_value': '100',		 
		
		};
	var datas_discount_product_add_ok = Object.assign(datas_discount_product_add_order_assign,datas_discount_product_add_data_edit);	
		
	
	
	
	//@
	//@ datas brand
	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':datas_store_send_s,
		'datas_discount':data_discount_ok,
		'datas_discount_store_add':datas_discount_store_add_ok,
		'datas_discount_product_add':datas_discount_product_add_ok,		
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
	
	//res.send(get_all_list_datas[10]);
	//return;




	

	
	//@
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 				: 'Danh sách tùy chọn',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',		
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			'discount_program_list' : get_all_list_datas[8].datas,
			'discount_program_details_list' : get_all_list_datas[9].datas,
			'discount_program_product_list' : get_all_list_datas[10].datas,
		}	
	
		data_send = {
			'title' 				: 'Danh sách tùy chọn',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',		
			'store_list' 			: get_all_list_datas[2].datas,
			'news_bussiness_menu' 	: get_datas_news_bussiness_menu,
			'list_data_count' 		: get_all_list_datas_count,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			'discount_program_list' : get_all_list_datas[8].datas,
			'discount_program_details_list' : get_all_list_datas[9].datas,
			'discount_program_product_list' : get_all_list_datas[10].datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/discount-program/speciality/show-all', data_send );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "100.1.router_discount_program_speciality(app)->ge", "message": error_send } ); 
		return;	
	}	
});
//@
//@ end of
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@	
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@

//


//@@
//@@
//@@@@@@@@@
//@@@@@@@@@		
		
	
	
module.exports = router;
	
	
	

	