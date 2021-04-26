var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');
const ojs_datas = require('../../models/ojs-datas.js');



const ojs_datas_orders = require('../../models/ojs-datas-orders.js');
const ojs_datas_stores = require('../../models/ojs-datas-stores.js');
const ojs_datas_category = require('../../models/ojs-datas-category.js');
//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@

//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//danh sách
router.get('/', async function(req, res, next) {
	//
	let token = req.session.token;	
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}


	//
	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}		
	//@
	//@	
	//@	



	//@
	//@
	//@
	//@	admin menu order check
	try {
		var date_star = "2020/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number = "0";
		
		var orders_check = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search',
			ojs_datas_orders.orders_check_menu_data(date_star,date_end,sattus_number),
			token
		);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_app->router_app->orders-speciality->get", "message": error_send } ); 
		return;		
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	//@
	//@
	//@
	//@
	

	let orders_list;
	
	try {
		orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_admin(),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_app->router_app->orders-speciality->get", "message": error_send } ); 
			return;				
		}			
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_app->router_app->orders-speciality->get", "message": error_send } ); 
			return;		
	}

	//res.send(orders_list);
	//return;


	//
	//lay tong so luong don hang chưa sử lý
	var order_sum;
	var x;
	var i = 0;
	for( x in orders_list.datas){
		if(orders_list.datas[x].orders_speciality_status_orders == 0 
			|| orders_list.datas[x].orders_speciality_status_payment == 0){
			i = i + 1
		}
	}
	order_sum = i;
	
	
	

	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = ojs_shares.get_users_type(token);	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Danh sách đơn hàng',
			'users_type' : check_datas_result.user_role,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'datas' : orders_list.datas,
			'order_sum' : order_sum,
			'orders_check' : orders_check.datas,
			'menu_taget':'sidebar_don_hang_dac_san',
			'js_css_version' : check_datas_result.js_css_version
		}
		//res.send(data_send);
		//return;
		res.render( ojs_configs.view_version + '/orders/speciality/show-all', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "98.router_app->router_app->orders-speciality->get", "message": error_send } ); 
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
router.get('/show/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
	//res.send("welCom !!!");
	//return;
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}

	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->router_app->orders-speciality->show", "message": error_send } ); 
		return;			
	}		
	//@
	//@	


	//
	//Lấy option tager
	let orders_tager;
	try {
		orders_tager = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/' + order_id,token);
		if(orders_tager.error != "" ){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
			res.send({ "error" : "3.router_app->router_app->orders-speciality->show", "message": error_send } ); 
			return;			
		}		
	//@
	//@	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,  "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
		res.send({ "error" : "5.router_app->router_app->orders-speciality->show", "message": error_send } ); 
		return;		
	}
	//
	
	//
	//Lấy danh sách các danh mục chung
	let orders_detail;
	try {
		orders_detail = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search',
			ojs_datas_category.get_data_category_list_update_order(order_id),
			token
		);		
		
		if(orders_detail.error != "" ){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
			res.send({ "error" : "33.router_app->router_app->orders-speciality->show", "message": error_send } ); 
			return;			
		}	

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,  "Lỗi lấy data order taget", "Lỗi lấy data order taget" );
		res.send({ "error" : "55.router_app->router_app->orders-speciality->show", "message": error_send } ); 
		return;		
	}
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = ojs_shares.get_users_type(token);	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Chỉnh sửa đơn hàng',
			'users_type' :check_datas_result.user_role,
			'user_role' :check_datas_result.user_role,
			'user_id' : user_id,
			'order_id' : order_id,
			'users_full_name' : users_full_name,
			'datas' : orders_tager.datas,
			'orders_detail' : orders_detail.datas,
			'js_css_version' : check_datas_result.js_css_version,
			'menu_taget':'sidebar_doanh_thu_theo_cua_hang'			
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/orders/speciality/show', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_12" , "message" : error } );
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
//update
router.post('/update/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
	let datas  = req.body;

	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->update", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->update", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->router_app->orders-speciality->update", "message": error_send } ); 
		return;			
	}		
	//@
	
	//@	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/' + order_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi update, vui lòng liên hệ admin", "Lỗi update, vui lòng liên hệ admin" );
		res.send({ "error" : "333.router_app->router_app->orders-speciality->update", "message": error_send } ); 
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
//update
router.post('/detail/update/:detail_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let detail_id = req.params.detail_id;
	let datas  = req.body;

	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->detail/update", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->detail/update", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->router_app->orders-speciality->detail/update", "message": error_send } ); 
		return;			
	}		
	//@
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality-detail/' + detail_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi update, vui lòng liên hệ admin", "Lỗi update, vui lòng liên hệ admin" );
		res.send({ "error" : "33.router_app->router_app->orders-speciality->detail/update", "message": error_send } ); 
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
router.get('/detail/delete/:detail_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let detail_id = req.params.detail_id;
	//res.send([detail_id]);
	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->detail->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->detail->delete", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->orders-speciality->detail->delete", "message": error_send } ); 
		return;			
	}		
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality-detail/' + detail_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi xoá datas, liên hệ admin", "Lỗi xoá datas, liên hệ admin" );
		res.send({ "error" : "22.router_app->orders-speciality->detail->delete", "message": error_send } ); 
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
router.get('/delete/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
	//res.send([order_id]);
	//
	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->->delete", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->orders-speciality->->delete", "message": error_send } ); 
		return;			
	}		
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/' + order_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi xóa dữ liệu , vui lòng liên hệ admin", "Lỗi xóa dữ liệu , vui lòng liên hệ admin" );
		res.send({ "error" : "33.router_app->orders-speciality->->delete", "message": error_send } ); 
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//
router.post('/save_fee', async function(req, res, next) {
	//
	
	let datas  = req.body;
	//return;
	let token = req.session.token;	
	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->detail->save_fee", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->detail->save_fee", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->orders-speciality->detail->save_fee", "message": error_send } ); 
		return;			
	}		
	//@
	//
	try {	

		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality-detail/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "lỗi save data, liên hệ admin", "lỗi save data, liên hệ admin" );
		res.send({ "error" : "33.router_app->orders-speciality->detail->save_fee", "message": error_send } ); 
		return;	
	}			
});
	
//@
//@
//@			
// * ajax-order-detail-bussiness	
// * khi bussiness click order id 
// * thì hiện ajax detail oeder
router.post('/ajax-order-detail-bussiness/', async  function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	let order_id = datas.order_id;
	
	
	//@
	//@
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_bussiness(app)->ajax-order-detail-bussiness ", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_bussiness(app)->ajax-order-detail-bussiness", "message": error_send } ); 
		return;			
	}
	
	
	
	var orders_list;
	try {
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality-detail/search', 
			ojs_datas_orders.get_data_orders_detail_bussiness(order_id),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders->ajax-order-detail-bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders->ajax-order-detail-bussiness", "message": error_send } ); 
			return;		
	}
	//			
	
	//send web
	data_send = {
		'orders_detail' : orders_list.datas
	}
	
	//res.send(data_send);
	//return;	
	res.render( check_datas_result.view_version + '/masterpage/widget-order-show-table-detail-bussiness', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//@
//@
//@
//* ajax_load_order_bussiness
//* load don hang tren trang bussiness ajax
router.post('/ajax_load_order_bussiness/', async  function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	//@
	//@
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
		return;			
	}
	
	
	
	var orders_list;
	try {
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_detail_bussiness_ajax(datas.user_id,datas.date_star, datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;		
	}
	//			
	
	//send web
	data_send = {
		'orders_list' : orders_list.datas
	}
	
	//res.send(data_send);
	//return;	
	
	
	res.render( check_datas_result.view_version + '/masterpage/widget-order-show-table-bussiness', data_send );	

});
//end of get admin
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	
//@
//@
//@
//* ajax_load_order_bussiness
//* load don hang tren trang bussiness ajax
router.post('/ajax_load_order_sale_bussiness/', async  function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	//@
	//@
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_bussiness(app)->ajax_load_order_bussiness", "message": error_send } ); 
		return;			
	}
	
	
	
	var orders_list;
	try {
		var orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_sale_bussiness(datas.user_id,datas.date_star, datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router->bussiness-orders->ajax_load_order_bussiness", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
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
router.post('/load/', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	//res.send(datas);
	//return;
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}


	//
	//@@
	//@@lấy version
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
		res.send({ "error" : "1.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.router_app->router_app->orders-speciality->get", "message": error_send } ); 
		return;			
	}		
	//@
	//@	
	//@	
	//get_data_orders_list_ajax : function(date_star,date_end,status_number)
	let orders_list;
	try {
		orders_list = await ojs_shares.get_data_send_token_post( 
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/orders/speciality/search', 
			ojs_datas_orders.get_data_orders_list_ajax(datas.date_star,datas.date_end,JSON.parse(datas.status_send)),
			token
		);
		
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_app->router_app->orders-speciality->get", "message": error_send } ); 
			return;				
		}			
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_app->router_app->orders-speciality->get", "message": error_send } ); 
			return;		
	}

	data_send = {
		'datas' : orders_list.datas
	}
	res.render( check_datas_result.view_version + '/masterpage/widget-orders-show-tables', data_send );	
});

		
	
	
module.exports = router;
	
	
	

	