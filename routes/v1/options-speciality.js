var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');

const ojs_datas_stores = require('../../models/ojs-datas-stores.js');
const ojs_datas_option = require('../../models/ojs-datas-option.js');


//@@
//@
//danh sách
router.get('/', async function(req, res, next) {
	//
	res.send("welcom !!");
	return;

});


//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//danh sách
router.get('/:store_id', async function(req, res, next) {
	//
	//
	let token = req.session.token;	
	let store_id = req.params.store_id;
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
		res.send({ "error" : "1.router_app->options_speciality->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error == "" && ( check_datas_result.user_role == "admin" || check_datas_result.user_role == "bussiness" )){
	}else{
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->options_speciality->get", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@	
	//@	
	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_app->options_speciality->get", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "3.2router_app->options_speciality->get", "message": error_send } ); 
		return;	
	}	
	//	
	
	
	
	
	
	let options_list_datas;
	//@
	//@
	//neu admin thi lay datas kieu admin ko thì lấy datas kiểu bussiness
	//admin thì status = 0, show = 0, status store = 1	
	if(check_datas_result.user_role == "admin"){
		options_list_datas = ojs_datas_option.get_data_option_list_admin();
	}else{
		options_list_datas = ojs_datas_option.get_data_option_list_bussiness();
	}	
	
	
	//res.send({ "error" : "", "message": options_list_datas } ); 
	//return;		
	
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
	//@
	//lấy tên cửa ah2ng
	var store_name;
	try {
		store_name = await ojs_shares.get_data_send_token_get(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id , token
		);	
		
		if(store_name.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->name", "message": error_send } ); 
		return;			
	}	
			
	
	

	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = check_datas_result.user_role;	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		
		data_send = {
			'title' : 'Danh sách tùy chọn',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			'options_list' : options_list.datas,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/options/speciality/show-all', data_send );
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "100.1.router_options_speciality(app)->ge", "message": error_send } ); 
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
router.get('/add/:store_id/:user_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let store_id = req.params.store_id;
	let user_id = req.params.user_id;
	
		
	

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
		"token":token,
		"user_id": user_id,
		"store_id" : store_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_options_speciality(app)->add ", "message": error_send } ); 
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
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_options_speciality(app)->add", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_user != "1" ||  check_datas_result.owner_store != "1" ) && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_options_speciality(app)->add", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	//@
	//@	
	//@	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_options_speciality(app)->add", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_options_speciality(app)->add", "message": error_send } ); 
		return;	
	}	
	//	
	
	//
	//Lấy danh sách các options
	let options_list;
	try {
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_select(), 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "33.router_options_speciality(app)->add", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "34.router_options_speciality(app)->add", "message": error_send } ); 
			return;		
	}
	//

	//@
	//@
	//@
	//@
	//lấy tên cửa ah2ng
	var store_name;
	try {
		store_name = await ojs_shares.get_data_send_token_get(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id , token
		);	
		
		if(store_name.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->name", "message": error_send } ); 
		return;			
	}	
			
	
	


	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = check_datas_result.user_role;	
		let users_full_name = ojs_shares.get_users_full_name(token);

		//
		//@
		//@
		//send the web
		data_send = {
			'title' : 'Tạo optios',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			'options_list' : options_list.datas,
			'js_css_version':check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/options/speciality/add', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
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
router.get('/show/:option_id/:store_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let option_id = req.params.option_id;
	let store_id = req.params.store_id;
	
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"option_id":option_id,
		"store_id":store_id
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
		res.send({ "error" : "1.router_app->router_options_speciality(app)->show", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_app->router_options_speciality(app)->show", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_store != "1" || check_datas_result.owner_option != "1")  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_app->router_options_speciality(app)->show", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@	
	//@	
	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	var service_type_name;
	try {
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/search', 
				ojs_datas_stores.get_sevice_type(store_id), 
				token
			);
		if(service_type_id_result.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
			res.send({ "error" : "31.router_options_speciality(app)->show", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_options_speciality(app)->show", "message": error_send } ); 
		return;	
	}	
	//		
	
	
	
	
	
	//
	//Lấy danh sách các options
	let options_list;
	try {
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_select(), 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "33.router_options_speciality(app)->show", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "34.router_options_speciality(app)->show", "message": error_send } ); 
			return;		
	}
	//


	//
	//Lấy option tager
	let options_tager;
	try {
		options_tager = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality/' + option_id,token);
		if(options_tager.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "35.router_options_speciality(app)->show", "message": error_send } ); 
			return;				
		}	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "36.router_options_speciality(app)->show", "message": error_send } ); 
			return;		
	}
	//
	
	
	//@
	//@
	//@
	//@
	//lấy tên cửa ah2ng
	var store_name;
	try {
		store_name = await ojs_shares.get_data_send_token_get(
			ojs_configs.domain + '/api/' + check_datas_result.api_version + '/stores/' + store_id , token
		);	
		
		if(store_name.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, store_name.error, "Lỗi lấu dữ liệu store" );
			res.send({ "error" : "41.router_stores(app)->show-all->store_name", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách cửa hàng, liên hệ admin");
		res.send({ "error" : "2.3.router_storess(app)->name", "message": error_send } ); 
		return;			
	}	
			
	
		
	
	
	
	
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = check_datas_result.user_role;	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Chỉnh sửa option',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'store_id':store_id,
			'option_id':option_id,
			'users_full_name' : users_full_name,
			'js_css_version' : check_datas_result.js_css_version,
			'service_type_name':service_type_name,
			'datas' : options_tager.datas,
			'options_list' : options_list.datas,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version +  '/options/speciality/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,options_tager.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "37.router_options_speciality(app)->show", "message": error_send } ); 
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
router.post('/update/:option_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let option_id = req.params.option_id;
	let datas  = req.body;
	
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"option_id":option_id
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
		res.send({ "error" : "1.router_app->router_options_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_app->router_options_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_option != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_app->router_options_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality/' + option_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_app->router_options_speciality(app)->update", "message": error_send } ); 
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
	//res.send(datas);
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
		"token":token,
		"store_id" : datas.datas.options_product_speciality_stores_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.router_options_speciality(app)->save", "message": error_send } ); 
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_options_speciality(app)->save", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1"  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_options_speciality(app)->save->save", "message": error_send } ); 
		return;			
	}
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_options_speciality(app)->save->save", "message": error_send } ); 
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
router.get('/delete/:option_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let option_id = req.params.option_id;
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"option_id":option_id
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
		res.send({ "error" : "1.router_app->router_options_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_app->router_options_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_option != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_app->router_options_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality/' + option_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.5.router_app->router_options_speciality(app)->delete", "message": error_send } ); 
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
	
	
	
	
	
	
	
	
	
	
module.exports = router;
	
	
	

	