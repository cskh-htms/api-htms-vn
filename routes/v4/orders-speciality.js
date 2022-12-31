

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');




//@
//@
//@
//@ controller
const controller_admin_orders_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-show-all.js'
);

const controller_admin_orders_ajax_load_order = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-ajax-load.js'
);

const controller_admin_orders_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-delete.js'
);


const controller_admin_orders_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-show.js'
);


const controller_admin_orders_detail_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-detail-update.js'
);

const controller_admin_orders_detail_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-detail-delete.js'
);

const controller_admin_orders_push_dala = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-push-dala.js'
);


const controller_admin_orders_push_ghtk = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-push-ghtk.js'
);

const controller_admin_orders_save_fee = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-save-fee.js'
);


const controller_admin_orders_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-update.js'
);


//@
//@
//@
//@ router
router.get('/', controller_admin_orders_show_all);
router.get('/delete/:order_id', controller_admin_orders_delete);
router.get('/show/:order_id', controller_admin_orders_show);

router.post('/ajax-load', controller_admin_orders_ajax_load_order);
router.post('/push-data', controller_admin_orders_push_dala);
router.post('/push-ghtk', controller_admin_orders_push_ghtk);
router.post('/save_fee', controller_admin_orders_save_fee);

router.put('/update/:order_id', controller_admin_orders_update);
router.put('/detail/update/:detail_id', controller_admin_orders_detail_update);

router.delete('/detail/delete/:detail_id', controller_admin_orders_detail_delete);






//@
//@
//@
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

const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');



const ojs_datas_category = require('../../models/ojs-datas-category');

const ojs_datas_orders = require('../../models/ojs-datas-orders');
const ojs_datas_users = require('../../models/ojs-datas-users');
const ojs_datas_shipping_tracking = require('../../models/ojs-datas-shipping-tracking');

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////







//@
//@
//@
//@
//@
//@ 13. [/yeu_cau_rut_tien/:order_id]
router.post('/yeu-cau-rut-tien/:order_id', async function(req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		var order_id = req.params.order_id;
		var datas = req.body;
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "orders-speciality -> yeu-cau-rut-tien-> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//@
	//res.send( datas  ); 
	//return;	
	
	try {	
		var active_update = await ojs_shares_fetch_data.get_data_send_token_put(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/yeu-cau-rut-tien/' + order_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update cửa hàng. vui lòng liên hệ admin" );
		res.send({ "error" : "5.1.router_bussiness(app)->yeu-cau - rut -tien_update ", "message": error_send } ); 
		return;	
	}		
});















	



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
		res.send({ "error" : "orders-speciality -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//var  user_id = ojs_shares_others.get_users_id(token);	
	var users_type 	=  ojs_shares_others.get_users_type(token);
	
	//res.send( [order_id] );	
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
		res.send({ "error" : "orders-speciality -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}	
	
	//res.send(order_id);
	//return;

	
	var orders_list;
	//res.send(ojs_datas_orders.get_data_orders_detail_bussiness(order_id));
	//return;
	try {
			orders_list = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search_user', 
			ojs_datas_orders.get_data_orders_detail_bussiness(order_id),
			ojs_configs.token_supper_job
		);
		
		//res.send(orders_list);
		//return;	
		
		
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
	


	var coupon_list;
	//res.send(ojs_datas_orders.get_data_orders_detail_bussiness(order_id));
	//return;
	try {
			coupon_list = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search_order_by_coupon/', 
			ojs_datas_orders.get_data_coupon_list_view_orders(order_id),
			ojs_configs.token_supper_job
		);
		
		//res.send(coupon_list);
		//return;	
		
		
		if(coupon_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,coupon_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->orders->web->ajax-order-detail-bussiness->coupon_list", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->-orders->web->ajax-order-detail-bussiness->coupon_list", "message": error_send } ); 
			return;		
	}


	//res.send( coupon_list );
	//return;		
	
	
	
	var orders_list_taget;
	try {
			orders_list_taget = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/orders/speciality/search_customer/', 
			ojs_datas_orders.get_data_orders_detail_bussiness_taget(order_id),
			ojs_configs.token_supper_job
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
	
	var order_tracking_result;
	try {
			order_tracking_result = await ojs_shares_fetch_data.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + ojs_configs.api_version  + '/shipping-tracking/search/', 
			ojs_datas_shipping_tracking.get_shipping_tracking_by_order(order_id),
			ojs_configs.token_supper_job
		);
		
		//res.send( order_tracking_result );
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
	
	
	
	//send web
	data_send = {
		'orders_detail' : orders_list.datas,
		'coupon_list' 	: coupon_list.datas,
		'order_taget' 	: orders_list_taget.datas,
		'order_tracking' : order_tracking_result.datas
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
		res.send({ "error" : "orders-speciality -> show all -> get req -> 1", "message": error_send } ); 
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
	
	
	

	