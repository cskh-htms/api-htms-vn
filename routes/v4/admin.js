// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');


const controller_coupon_show_admin = require(
	'../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-show-admin.js'
);




//@
//@
//@
//@ loader extends module
const md5 = require('md5');


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

const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');



const ojs_datas_orders = require('../../models/ojs-datas-orders');
const ojs_datas_coupon = require('../../models/ojs-datas-coupon');
const ojs_datas_products = require('../../models/ojs-datas-products');

const ojs_datas_discount_program_store_add = require('../../models/ojs-datas-discount-program-store-add');




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

* 1. [/]

* 2. [/category/show/:cat_id/:store_id]

* 3. [/option/show/:option_id/:store_id]

* 4. [/brand/show/:brand_id/:store_id]

* 5. [/discount/show/:discount_program_id/:store_id]

* 6. [/discount-details/show/:discount_program_details_id/:store_id/:discount_program_id]

* 7. [/discount-details/show-admin/:discount_program_details_id]

* 8. [/coupon/show/:coupon_id/:store_id]

* 9.[/product/show/:product_id/:store_id/]


--------------------------------------------------------------
*/


router.get('/coupon/show/:coupon_id/:store_id', controller_coupon_show_admin);








//@
//@
//@
//@
//@ 9. [/product/show/:product_id/:store_id/]
router.get('/product/show/:product_id/:store_id/', async function(req, res, next) {
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
	//               datas count
	// -------------------------------------------------



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
			'news_admin_menu' 		: get_datas_news_admin_menu,
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
			'sidebar_type'			: 3,
			'menu_taget'			:'sidebar_product',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 		: get_datas_news_admin_menu,
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
		
		
		res.render( ojs_configs.view_version + '/products/speciality/show-admin', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "43.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}
});






//@
//@
//@
//@
//@
//@
//@ 8. [/coupon/show/:coupon_id/:store_id]
router.get('ASDASDASD/coupon/show/:coupon_id/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var coupon_id = req.params.coupon_id;
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
		res.send({ "error" : "router_coupon_speciality web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	
	//res.send( [coupon_id] );	
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
	
	var user_id = get_all_list_datas_store[2].datas[0].stores_user_id;


	//res.send( [user_id] );	
	//return;		
	
	
	//--------------------------------------------------
	//              news menu
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
		res.send({ "error" : "routers coupon web -> get_all_list_datas -> 1", "message": error_send } ); 
		return;			
	}
	
	//res.send(get_all_list_datas);
	//return;



	
	//Lấy option tager
	var coupon_taget;
	try {
		coupon_taget = await ojs_shares_fetch_data.get_data_send_token_post( 
					ojs_configs.domain + '/api/' + ojs_configs.api_version + '/coupon/speciality/search',
					ojs_datas_coupon.get_coupon_taget(coupon_id),ojs_configs.token_supper_job
				);		
		
		
		//res.send( coupon_taget );	
		//return;
		
		
		if(coupon_taget.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,coupon_taget.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_coupon_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,coupon_taget.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_coupon_speciality(app)->show", "message": error_send } ); 
			return;		
	}


	//res.send( coupon_taget );	
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
			'menu_taget'			:'sidebar_coupon',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 		: get_datas_news_admin_menu,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'coupon_id':coupon_id,
			'datas' : coupon_taget.datas,
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
			'menu_taget'			:'sidebar_coupon',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 		: get_datas_news_admin_menu,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'coupon_id':coupon_id,
			'datas' : coupon_taget.datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version +  '/coupon/speciality/show-admin', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,coupon_taget.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "37.router_coupon_speciality(app)->show", "message": error_send } ); 
		return;		
	}	
});


//@ 
//@
//@
//@
//@
//@ 7. [/discount-details/show-admin/:discount_program_details_id]
router.get('/discount-details/show-admin/:discount_program_id/:discount_program_details_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
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




	// ------------------------------------------
			//discount_program_tager
	//-------------------------------------------

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










	// ------------------------------------------
			//discount_program_details_tager
	//-------------------------------------------

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
			res.send({ "error" : "35.router_discount_program_speciality(web)->show-admin", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_discount_program_speciality(web)->show-admin", "message": error_send } ); 
			return;		
	}


	//res.send( discount_program_details_tager );	
	//return;	





	datas_info = {
		'title' 			: 'Quản lý chương trình khuyến mãi',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_discount_program',
		'sidebar_type'		:  "",
		
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'discount_program_id' : discount_program_id,
		'discount_program_details_id' : discount_program_details_id,
		'datas' : discount_program_details_tager.datas,
		'discount_program_tager' : discount_program_tager.datas,
	}


	data_send = {
		'title' 			: 'Quản lý chương trình khuyến mãi',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_discount_program',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'discount_program_id' : discount_program_id,
		'discount_program_details_id' : discount_program_details_id,		
		'datas' : discount_program_details_tager.datas,
		'discount_program_tager' : discount_program_tager.datas,		
		'datas_info':datas_info
	}
	
	//res.send(data_send);
	//return;
	res.render( ojs_configs.view_version + '/discount-program/speciality/details-show-admin', data_send );	

	
	
});




//@ 
//@
//@
//@
//@
//@ 6. [/discount-details/show/:discount_program_details_id/:store_id/:discount_program_id]
router.get('/discount-details/show/:discount_program_details_id/:store_id/:discount_program_id', async function(req, res, next) {
try {
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
		res.send({ "error" : "1","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
		return;			
	}
	
	
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
		res.send({ "error" : "2","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
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
		res.send({ "error" : "3","posittion":"r-w-admin->/discount-details/show/", "message": error_send } );  
		return;			
	}
	
	//res.send(get_datas_news_admin_menu);
	//return;
	


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
		res.send({ "error" : "4","posittion":"r-w-admin->/discount-details/show/", "message": error_send } );  
		return;			
	}
	
	//res.send(get_all_list_datas);
	//return;



	//--------------------------------------------------
	//             list-datas-all
	// -------------------------------------------------
	
	
	
	//Lấy discount_program_tager
	var discount_program_tager;
	try {
		discount_program_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/' + discount_program_id,token);
		//res.send( discount_program_tager );	
		//return;
		if(discount_program_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy discount_program_tager" );
			res.send({ "error" : "5","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_tager.error, "Lỗi lấy discount_program_tager - catch" );
			res.send({ "error" : "6","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
			return;		
	}

	//res.send( discount_program_tager );	
	//return;	
	
	
	

	
	
	//Lấy discount_program_details_tager
	var discount_program_details_tager;
	try {
		var datas = {
			'id':discount_program_details_id
		}
		
		//res.send( ojs_datas_discount_program_store_add.get_discount_details_data_taget(datas) );	
		//return;			
		
		discount_program_details_tager = await ojs_shares_fetch_data.get_data_send_token_post( 
					ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/search',
					ojs_datas_discount_program_store_add.get_discount_details_data_taget(datas),
					ojs_configs.token_supper_job
				);		
		if(discount_program_details_tager.error != ""){
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager, "Lỗi lấy discount_program_details_tager" );
			res.send({ "error" : "7","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,discount_program_details_tager.error, "Lỗi lấy discount_program_details_tager - catch" );
			res.send({ "error" : "8","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
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
			'news_admin_menu' 		: get_datas_news_admin_menu,
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
			'news_admin_menu' 		: get_datas_news_admin_menu,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,
			'discount_program_tager': discount_program_tager.datas,	
			'datas'					: discount_program_details_tager.datas,			
			
			'datas_info':datas_info
		}
		
		
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version + '/discount-program/speciality/admin-details-show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi không xác định, vui lòng liên hệ admin DALA" );
		res.send({ "error" : "9","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi không xác định, vui lòng liên hệ admin DALA" );
	res.send({ "error" : "113","posittion":"r-w-admin->/discount-details/show/", "message": error_send } ); 
	return;	
}		
	
});

//@
//@
//@
//@
//@
//@
//@ 5. [/discount/show/:discount_program_id/:store_id]
router.get('/discount/show/:discount_program_id/:store_id', async function(req, res, next) {
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
			'news_admin_menu' 		: get_datas_news_admin_menu,
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
			'news_admin_menu' 		: get_datas_news_admin_menu,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'discount_program_id':discount_program_id,
			'datas' : discount_program_tager.datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		//của bảo admin-show
		res.render( ojs_configs.view_version +  '/discount-program/speciality/show-admin', data_send );	
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
//@ 4. [/brand/show/:brand_id/:store_id]

router.get('/brand/show/:brand_id/:store_id', async function(req, res, next) {
	
	
	//@
	//@
	//@
	//lấy token
	try {
		var token = req.session.token;	
		var brand_id = req.params.brand_id;
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
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	var user_id = ojs_shares_others.get_users_id(token);	
	
	//res.send( [brand_id,store_id] );	
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




	
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	
	
	

	
	//--------------------------------------------------
	//              list datas
	// -------------------------------------------------	


	var datas_get_all_list_datas = {
		'token':token,
		'token_job':ojs_configs.token_supper_job,
		'user_id' : user_id,
		'store_id' : store_id,
		'datas_store':ojs_configs.datas_all,
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
	//@	
	//@ Lấy option tager
	var brand_tager;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		brand_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/brands/' + brand_id,token);
		
		//res.send(brand_tager);
		//return;
	
		if(brand_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, brand_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(brand_tager.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}

	
	//res.send(brand_tager);
	//return;
	
	
		
	//@
	//@
	//@
	//@
	//@
	//@
	//@
	try {	
		data_send = {
			
			'title' 				: 'Chỉnh sửa thương hiệu',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_thuong_hieu',	
			'brand_id' 				: brand_id,			
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 	: get_datas_news_admin_menu,		
			
			'list_datas' 			: brand_tager.datas,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		
		
		res.render( ojs_configs.view_version +  '/brands/show-admin', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "38.router_app->barnd->show", "message": error_send } ); 
		return;	
	}	
});







//@
//@
//@
//@
//@
//@
//@ 3. [/option/show/:option_id/:store_id]
router.get('/option/show/:option_id/:store_id', async function(req, res, next) {
	//@
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var option_id = req.params.option_id;
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
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
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
	
	//res.send(get_all_list_datas_all);
	//return;
	
	
	
	
	
	
	
	
	
	//Lấy option tager
	var options_tager;
	try {
		options_tager = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/options/speciality/' + option_id,token);
		//res.send( options_tager );	
		//return;
		if(options_tager.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,options_tager.error, "Lỗi lấy option taget" );
			res.send({ "error" : "35.router_options_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,options_tager.error, "Lỗi lấy option taget - catch" );
			res.send({ "error" : "36.router_options_speciality(app)->show", "message": error_send } ); 
			return;		
	}


	//res.send( options_tager );	
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
			'menu_taget'			:'sidebar_tao_option',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'option_id':option_id,
			'datas' : options_tager.datas,
			'options_list' : get_all_list_datas_all[5].datas,
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
			'menu_taget'			:'sidebar_tao_option',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 	: get_datas_news_admin_menu,
			'service_type_name' : get_all_list_datas[2].datas[0].service_type_name,
			'store_name' : get_all_list_datas[2].datas[0].stores_name,			
			
			'option_id':option_id,
			'datas' : options_tager.datas,
			'options_list' : get_all_list_datas_all[5].datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version +  '/options/speciality/show-admin', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,options_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "37.router_options_speciality(app)->show", "message": error_send } ); 
		return;		
	}	
});




//@
//@
//@
//@
//@
//@
//@ 2. [/category/show/:cat_id/:store_id]
router.get('/category/show/:cat_id/:store_id', async function(req, res, next) {
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
		res.send({ "error" : "routers brands web -> show all -> get req -> 1", "message": error_send } ); 
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
			'sidebar_type'			: 3,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 	: get_datas_news_admin_menu,
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
			'sidebar_type'			: 3,
			'menu_taget'			:'sidebar_tao_danh_muc',			
			'store_list' 			: get_all_list_datas[2].datas,
			'news_admin_menu' 		: get_datas_news_admin_menu,
			'service_type_name' 	: get_all_list_datas[2].datas[0].service_type_name,
			'store_name' 			: get_all_list_datas[2].datas[0].stores_name,			
			
			
			'datas_category_general' : get_all_list_datas_all[4].datas,
			'datas' : category_datas.datas,	
			'datas_info':datas_info			
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version +  '/categorys/general/speciality/show-admin', data_send );	
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
//@ 1. [/]
router.get('/', async  function(req, res, next) {
try {	
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
		res.send({ "error" : "1", "message": error_send } ); 
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




	//--------------------------------------------------
	//             datas
	// -------------------------------------------------
	
	//store arr
	var datas_send = ojs_datas_orders.get_stores_arr_admin();
	var fn_store_arr = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	promise_all.push(fn_store_arr);
	
	
	//@ order arr
	var datas_send = ojs_datas_orders.get_orders_arr_admin();
	var fn_orders_arr = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});		
	promise_all.push(fn_orders_arr);
	
	
	//@orders_details
	var datas_send = ojs_datas_orders.get_stores_details_admin();
	var fn_orders_details = new Promise((resolve, reject) => {
		var result = ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user/',
			datas_send,
			ojs_configs.token_supper_job);
			
			resolve(result);
	});	
	
	promise_all.push(fn_orders_details);	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	//@
	//@ promise all
	var promise_result = await Promise.all(promise_all);
	if(	promise_result[2].error != "" 
	|| 	promise_result[3].error != "" 
	|| 	promise_result[4].error != ""
	){
		res.send('<h1 style="width:100%; text-align:center; padding-top:40px;">Lỗi lấy data, vui lòng liên hệ CSKH dala</h1>');			
		return;		
	}


	datas_info = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: promise_result[1],
		'store_arr'			: promise_result[2].datas,
		"orders_arr"		: promise_result[3].datas,
		'orders_details'	: promise_result[4].datas
	}


	data_send = {
		'title' 			: 'Admin quản lý dala',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_tong_quan',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: promise_result[1],
		'store_arr'			: promise_result[2].datas,
		"orders_arr"		: promise_result[3].datas,
		'orders_details'	: promise_result[4].datas,
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	
	
	res.render( ojs_configs.view_version + '/users/admin', data_send );	


}
catch(error){
	if(orders_list.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "113.router_app->admins", "message": error_send } ); 
		return;				
	}
}	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





















//get
//appdala.com/admin
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-report-all', async  function(req, res, next) {
	//
	//@
	//@
	//get data req
	var datas  = req.body.datas;
	
	
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
		"token":token
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}

	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	//@
	//@
	//@	thong ke ban hang all
	var orders_report_all
	try {
		//var date_star = ojs_shares.get_current_month_now();
		//var date_end = ojs_shares.get_current_date_end();
		
		orders_report_all = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_data_report_all(datas.date_star,datas.date_end),
			token
		);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_app_router_admin->orders_report_all", "message": error_send } ); 
			return;	
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	
	//send web
	data_send = {
		'orders_report_all' : orders_report_all.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render(  check_datas_result.view_version + '/masterpage/widget-admin-report-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



//get
//ajax payment
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-payment', async  function(req, res, next) {
	var datas  = req.body.datas;


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
		"token":token
	}
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	//=======================
	//=======================
	//=====/header check ====
	//@

	//
	//@
	//@
	//@
	//@	bao` cao doanh thu theo cua hang
	try {
		var orders_report_store_view = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(datas.date_star,datas.date_end),
			token
		);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_admin->ajax-payment", "message": error_send } ); 
		return;	
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	
	
	//send web
	data_send = {
		'orders_report_store_view' : orders_report_store_view.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render(  check_datas_result.view_version + '/masterpage/widget-admin-payment-store-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





//get
//ajax payment
//@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@
router.post('/ajax-payment-checkout', async  function(req, res, next) {
	//
	var datas  = req.body.datas;
	

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
		"token":token
	}
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.error != "" || check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	//=======================
	//=======================
	//=====/header check ====
	//@

	//@
	//@
	//@
	//@	bao` cao doanh thu theo cua hang
	var orders_report_store;
	try {
		//var date_star = ojs_shares.get_current_month_prev_star();
		//var date_end = ojs_shares.get_current_month_prev_end();
		//res.send( { "error" : "" , "message" : [date_star,date_end] } );
		//return;		
		
		orders_report_store = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search_view',
			ojs_datas_orders.orders_report_store_datas(datas.date_star,datas.date_end),
			token
		);
		//res.send( orders_report_store );
		//return;
	}
	catch(error){
		res.send( { "error" : "01_orders_check" , "message" : error } );
	}	
	//@
	//@	end of admin menu order check	
	
	
	//@
	//@
	//@
	//@ lay danh sach stores theo payment ( lấy limit pay ment )
	var stores_payment_list ;
	try {
		stores_payment_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search-payment',
			ojs_datas_stores.stores_payment_list_datas(),
			token
		);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_admin->ajax-payment-checkout", "message": error_send } ); 
		return;	
	}	
	//@
	//@	end of admin menu order check	
		
	
		
	
	
	//send web
	data_send = {
		'orders_report_store' : orders_report_store.datas,
		'stores_payment_list' : stores_payment_list.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render( check_datas_result.view_version + '/masterpage/widget-admin-payment-show-table', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@












module.exports = router;