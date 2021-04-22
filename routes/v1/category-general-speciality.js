var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');

const ojs_datas_stores = require('../../models/ojs-datas-stores.js');
const ojs_datas_category = require('../../models/ojs-datas-category.js');




//
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
router.get('/:store_id', async function(req, res, next) {
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
		res.send({ "error" : "1.router_app->category_general_speciality->check_datas_result", "message": error_send } ); 
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
		res.send({ "error" : "2.router_app->category_general_speciality->check_datas_result", "message": error_send } ); 
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
			res.send({ "error" : "31.category_general_speciality(app)->get", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.category_general_speciality(app)->get", "message": error_send } ); 
		return;	
	}	
	//	
	
	
	
	
	//
	//Lấy danh sách các danh mục chung
	
	
	let category_general_list_datas;
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
	let category_general_list;
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
			'title' : 'Danh sách danh mục chung',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_list.datas,
			"js_css_version" : check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		res.render( check_datas_result.view_version + '/categorys/general/speciality/show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10.router_app->category_general_speciality->category_general_list->catch", "message": error_send } ); 
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
		res.send({ "error" : "2.1.router_category_speciality(app)->add ", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_category_speciality(app)->add", "message": error_send } ); 
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
		res.send({ "error" : "2.3.router_category_speciality(app)->add", "message": error_send } ); 
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
			res.send({ "error" : "31.router_category_general_speciality(app)->add", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.category_general_speciality(app)->add", "message": error_send } ); 
		return;	
	}	
	//	
	
	
	
	
	
	//
	//Lấy danh sách các danh mục chung
	var category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_select(), 
				token
			);

		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu order", "Lỗi lấy dữ liệu order" );
			res.send({ "error" : "2.4.router_category_speciality(app)->add", "message": error_send } ); 
			return;				
		}

	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu category, vui lòng thao tác lại", "Lỗi lấy dữ liệu category, vui lòng thao tác lại" );
			res.send({ "error" : "2.5.router_category_speciality(app)->add", "message": error_send } ); 
			return;	
	}
	
	
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
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Tạo danh mục chung',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_list.datas,
			'js_css_version':check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/categorys/general/speciality/add', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi send data, vui lòng thao tác lại", "Lỗi send data, vui lòng thao tác lại" );
			res.send({ "error" : "2.6.router_category_speciality(app)", "message": error_send } ); 
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
router.post('/save', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	//res.send(datas);
	//@

	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id" : datas.datas.category_general_speciality_stores_id
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
		res.send({ "error" : "2.1.router_category_speciality(app)->save", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_category_speciality(app)->save", "message": error_send } ); 
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
		res.send({ "error" : "2.3.router_category_speciality(app)->save", "message": error_send } ); 
		return;			
	}
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lưu data. liên hệ admin" );
		res.send({ "error" : "2.4.router_category_speciality(app)->save", "message": error_send } ); 
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
router.get('/show/:cat_id/:store_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	let store_id = req.params.store_id;
	//
	//@@
	
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}	
	
	//@@lấy version
	let datas_check = {
		"token":token,
		"cat_id":cat_id,
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
		res.send({ "error" : "1.router_app->category_general_speciality->check_datas_result", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_category_speciality(app)->show", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_store != "1" || check_datas_result.owner_cat != "1")  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_category_speciality(app)->show", "message": error_send } ); 
		return;			
	}
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//	
	//@@
	//@@
	//header end
	//@
	//
	//Lấy danh sách các danh mục chung
	let category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_select(), 
				token
			);
		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu category, liên hệ admin", "Lỗi lấy dữ liệu category, liên hệ admin" );
			res.send({ "error" : "31.router_category_speciality(app)->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category, liên hệ admin" );
			res.send({ "error" : "32.router_category_speciality(app)->show", "message": error_send } ); 
			return;				
		}
	}
	//
	
	
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
			res.send({ "error" : "51.router_category_general_speciality(app)->show", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "52.category_general_speciality(app)->show", "message": error_send } ); 
		return;	
	}	
	//		
	
	
	
	
	//
	//Lấy danh muc hien tai
	let category_datas;
	try {
		category_datas = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/' + cat_id,token);
		if(category_datas.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";;
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
	//	
	//res.send(category_datas);
	
	
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
			'title' : 'Chỉnh sửa danh mục',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role':check_datas_result.user_role,
			'user_id' : user_id,
			'cat_id' : cat_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_list.datas,
			'datas' : category_datas.datas,
			'js_css_version' : check_datas_result.js_css_version,
			'service_type_name':service_type_name,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version +  '/categorys/general/speciality/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category, liên hệ admin" );
		res.send({ "error" : "35.router_category_speciality(app)->show", "message": error_send } ); 
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
router.post('/update/:cat_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	let datas  = req.body;
	//

	
	//@@lấy version
	let datas_check = {
		"token":token,
		"cat_id":cat_id
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
		res.send({ "error" : "1.router_app->category_general_speciality->update", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_category_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"  ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_category_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_cat != "1"   && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_category_speciality(app)->show", "message": error_send } ); 
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
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/' + cat_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.router_category_speciality(app)->update", "message": error_send } ); 
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
router.get('/delete/:cat_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	//
	//@@
	//@
	
	//@@lấy version
	let datas_check = {
		"token":token,
		'cat_id':cat_id
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
		res.send({ "error" : "1.router_app->category_general_speciality->delete", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_category_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_cat != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_category_speciality(app)->dlete", "message": error_send } ); 
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
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/' + cat_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.1.router_category_speciality(app)->delete", "message": error_send } ); 
		return;	
	}		
});

//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@

//lay danh sach danh muc
router.post('/ajax-category-list/', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	let store_id = datas.store_id

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
	let category_general_list_datas;
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
	let category_general_list;
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
		let user_id = ojs_shares.get_users_id(token);	
		data_send = {
			'datas_category_general' : category_general_list.datas,
			'user_role': check_datas_result.user_role,
			'store_id':store_id
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-category-general-show-tables', data_send );		
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
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@

//lay danh sach danh muc
router.post('/ajax-category-list-bussiness/', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	

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
	let category_general_list_datas;
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
	let category_general_list;
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
		let user_id = ojs_shares.get_users_id(token);	
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
router.post('/ajax-category-list-no/', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	

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
	let category_general_list_datas;
	//@
	//@
	//neu admin thi lay datas kieu admin ko thì lấy datas kiểu bussiness
	//admin thì status = 0, show = 0, status store = 1	
	if(check_datas_result.user_role == "admin"){
		category_general_list_datas = ojs_datas_category.get_data_category_list_admin_ajax(datas);
	}else{
		category_general_list_datas = ojs_datas_category.get_data_category_list_bussiness_ajax(datas);
	}
	//res.send(category_general_list_datas);
	//return;
	let category_general_list;
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
		let user_id = ojs_shares.get_users_id(token);	
		data_send = {
			'datas_category_general' : category_general_list.datas,
			'user_id':user_id,
			'user_role': check_datas_result.user_role
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-category-general-show-tables-no', data_send );		
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
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	