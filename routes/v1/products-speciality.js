var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');

const ojs_datas_orders = require('../../models/ojs-datas-orders.js');
const ojs_datas_products = require('../../models/ojs-datas-products.js');
const ojs_datas_brands = require('../../models/ojs-datas-brands.js');
const ojs_datas_category = require('../../models/ojs-datas-category.js');
const ojs_datas_option = require('../../models/ojs-datas-option.js');
const ojs_datas_stores = require('../../models/ojs-datas-stores.js');

//
router.get('/', async function(req, res, next) {
	//
	res.send("welcom !!");
	return;
});


//lay danh sach danh muc
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
		res.send({ "error" : "20.router_product_speciality(app)->get", "message": error_send } ); 
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
		res.send({ "error" : "21.router_product_speciality(app)->get", "message": error_send } ); 
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
			res.send({ "error" : "31.router_product_speciality(app)->get", "message": error_send } ); 
			return;				
		}
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
		service_type_name = service_type_id_result.datas[0].service_type_name;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "3232.router_product_speciality(app)->get", "message": error_send } ); 
		return;	
	}	
	//	
	//
	
	
	
	

	
	
	
	//Lấy danh sách product
	var products_list;
	//@
	let data_products_list;
	//@
	if(check_datas_result.user_role == "admin"){
		data_products_list = ojs_datas_products.get_data_products_list_admin();
	}else{
		data_products_list = ojs_datas_products.get_data_products_list(store_id);
	}		
	
	
	//@
	try {
		
		products_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/search', 
				data_products_list, 
				token
			);		
			
		if(products_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, products_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "44.category_general_speciality(app)->get", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "45.category_general_speciality(app)->get", "message": error_send } ); 
		return;	
	}	
	
	
	//get_data_orders_report_product_sale : function(user_id,date_star,date_end,status_number){	
	
	
	
	
	
	
	//@
		//Lấy danh sách product
	try {

		var products_count;
		//@
		let data_products_count;
		//@
		if(check_datas_result.user_role == "admin"){
			data_products_count = ojs_datas_orders.get_data_products_count_admin();
		}else{
			data_products_count = ojs_datas_orders.get_data_products_count(store_id);
		}		
		//@
		//@
		//@
		products_count = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/orders/speciality/search', 
				data_products_count, 
				token
			);		
			
		if(products_count.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, products_count.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "55.products_speciality(app)->get", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "66.products_speciality(app)->get", "message": error_send } ); 
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
			res.send({ "error" : "41.reouters_products_speciality->app->get", "message": error_send } ); 
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
	//@
	try {	
		let users_type = check_datas_result.user_role;	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Danh sách sản phẩm',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			"products_list" : products_list.datas,
			"category_link_datas" : category_link_list.datas,	
			'store_name' : store_name.datas[0].stores_name,
			'menu_taget':'sidebar_san_pham',
			"products_count"	: products_count.datas		
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/products/speciality/show-all', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_product_speciality(app)->get", "message": error_send } ); 
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
router.delete('/delete/:product_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let product_id = req.params.product_id;
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		'product_id':product_id
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
		res.send({ "error" : "1.router_app->product_speciality>delete", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_app->product_speciality>delete", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_product != "1" && check_datas_result.user_role != "admin" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_app->product_speciality>delete", "message": error_send } ); 
		return;			
	}
	
	
	//=======================
	//=======================
	//=====/header check ====
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/' + product_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.5.router_app->product_speciality>delete", "message": error_send } ); 
		return;		
	}		
});
	

//danh sách sản phẩm
router.get('/:stores_id/:users_id', async function(req, res, next) {
	//
	//
	let stores_id = req.params.stores_id;//id cửa hàng
	let users_id = req.params.users_id;//id cửa hàng
	let token = req.session.token;
	//
	//
	
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
	let send_datas_token = { 
		"datas" : {
			"token" : token
		}
	}
	//call api check token  
	//check token
	try {
		let check_user = await ojs_shares.get_data_no_token_post('https://appdala.com/api/v1/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}	
	//	

	//@lấy id nghành nghề cửa hàng
	var service_type_id;
	try {
		let send_datas_token = { 
			"datas" : 
			{
				"select_field" :
				[ 
					"stores_service_type_id"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"stores_ID",
							"value" 	: stores_id,
							"compare" : "="
						}						
						]	
					}				
				],
				"order" :[]
			}//data
		}//token	
		//
		let service_type_id_result = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/stores/search', send_datas_token, token);
		//res.send( service_type_id_result );
		service_type_id = service_type_id_result.datas[0].stores_service_type_id;
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_shares.evn, error, "server đang bận, truy cập lại sau" );
		res.send( { "error": "r_catch_11", "message" : error_send } );	
	}	
	

	//
	//Lấy danh sách product
	let products_list;
	let send_datas_search_stores;	
	try {		
		send_datas_search_stores = { 
			"datas" :   {
				"select_type" : "DISTINCT",
				"select_field" :
				[
					"products_speciality_ID",
					"stores_ID",
					"stores_name",
					"products_speciality_name",
					"products_speciality_price",
					"products_speciality_sale_of_price",
					"products_speciality_sale_of_price_time_check",
					"products_speciality_discount",
					"products_speciality_unit_discount",
					"products_speciality_status_store",
					"products_speciality_status_admin"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"    :"stores_ID",
							"value"    : stores_id,
							"compare"  : "="
						}           
						]    
					}         
				],
				"order" :
				[
					{   "field"  :"products_speciality_name",
						"compare" : "ASC"
					}   
				]
			}
		}
	}
	catch(error){
		res.send( { "error" : "c_r_12" , "message" : error } );
	}	
	try {
		products_list = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/products/speciality/search', send_datas_search_stores, token);
		//if(category_general_list.error != "") res.redirect("/login");	
		//res.send(products_list);
	}
	catch(error){
		res.send( { "error" : "c_r_12" , "message" : error } );
	}
	//@
	
	//@
	//@lấy category_link
	var category_link_datas;
	try {
		let send_datas_link = { 
			"datas" : 
			{
				"select_field" :
				[
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_ID",
					"category_general_speciality_name"
				],
				"condition" : 
				[
									
				],
				"order" :[]
			}//data
		}//token	
		//
		
		category_link_datas = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/categorys/general/speciality-link/search', send_datas_link, token);
		//res.send( category_link_datas );
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_shares.evn, error, "server đang bận, truy cập lại sau" );
		res.send( { "error": "r_catch_12", "message" : error_send } );	
	}	
	
	
	
	//@
	try {	
		let users_type = ojs_shares.get_users_type(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//@
		/*
		let service_type_name = "";
		let service_type_arr = ojs_shares.service_type;
		for(let x = 0; x < service_type_arr.length; x ++){
			if(service_type_id == x){
				service_type_name = service_type_arr[x];
			}
		}
		*/
		let service_type_name = ojs_shares.get_service_type_name(service_type_id);
		//@
		data_send = {
			'title' : 'Danh sách sản phẩm',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'stores_id' : stores_id,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			"service_type_name" : service_type_name,
			"products_list" : products_list.datas,
			"category_link_datas" : category_link_datas.datas
		}
		//res.send(data_send);
		res.render( 'products/speciality/show-all', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}


});

	
	
//@
//@
//@
//@	
//tạo sản phẩm
router.get('/add/:store_id/:user_id', async function(req, res, next) {
	//
	//
	let store_id = req.params.store_id;//id cửa hàng
	let user_id = req.params.user_id;//id cửa hàng	
	let token = req.session.token;
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
	let datas_check = {
		"token":token,
		"user_id": user_id,
		"store_id":store_id
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
		res.send({ "error" : "2.1.router_product_speciality(app)->add ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.router_product_speciality(app)->add", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.owner_store != "1"  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_product_speciality(app)->add", "message": error_send } ); 
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
	//Lấy danh sách các options
	var brands_list;
	try {

		
		brands_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/brands/search', 
			ojs_datas_brands.get_data_brands_list_add_product(), 
			token
		);	
		
		if(brands_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,brands_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_product_speciality(app)->addt", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}
	//

	
	
	
	//
	//Lấy danh sách các options
	var options_list;
	try {

		
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_add_product(), 
			token
		);	
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "40.router_product_speciality(app)->add", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "41.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}
	//
	//@	
	//@
	//@
	//@
	let category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_add_product(), 
				token
			);

		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_general_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "41.router_app->product_speciality->add", "message": error_send } ); 
			return;				
		}
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "42.router_app->product_speciality->add", "message": error_send } ); 
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

	//@
	//@
	//@	
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
			'title' : 'Tạo sản phẩm',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'store_id':store_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			"brands_list" : brands_list.datas,
			"datas_category_general" : category_general_list.datas,
			'options_list' : options_list.datas	,
			'store_name' : store_name.datas[0].stores_name,
			'menu_taget':'sidebar_tao_san_pham'
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/products/speciality/add', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "43.router_product_speciality(app)->add", "message": error_send } ); 
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
	//return;
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
		"store_id" : datas.datas.products_speciality_store_id
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
		res.send({ "error" : "2.1.router_product_speciality(app)->save", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_product_speciality(app)->save", "message": error_send } ); 
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
		res.send({ "error" : "2.3.router_product_speciality(app)->save", "message": error_send } ); 
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
	//@
	try {	
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.router_product_speciality(app)->save", "message": error_send } ); 
		return;		
	}			
});
	
		
	
	
	
	
//@
//@
//@@@@@@@@@@
//@@@@@@@@@@
//@
//@	
//show sàn phẩm update
router.get('/show/:product_id/:store_id/', async function(req, res, next) {
	//
	//
	let product_id = req.params.product_id;//id cửa hàng
	let store_id = req.params.store_id;//id cửa hàng
	let token = req.session.token;
	//
	//@@
	
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//	
	
	
	//@@lấy version
	let datas_check = {
		"token":token,
		"cat_id":product_id,
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
		res.send({ "error" : "1.router_app->product_speciality->show", "message": error_send } ); 
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
		res.send({ "error" : "2.2.router_app->product_speciality->show", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_store != "1" || check_datas_result.owner_product != "1")  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_app->product_speciality->show", "message": error_send } ); 
		return;			
	}
	
	
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
	
	//@
	//@
	//@
	//@
	//@lấy category_link
	var category_link_list;
	var category_link_datass = ojs_datas_products.get_category_link_datas_show_update(product_id);		
	try {
		category_link_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality-link/search', 
				category_link_datass, 
				token
			);		

		
		if(category_link_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_link_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "48.product_speciality(app)->show", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "49.product_speciality(app)->show", "message": error_send } ); 
			return;		
	}		
	
		

	//@
	//@
	//@
	//@
	//@lấy option link
	var options_link_datas;
	
	var option_link_datass = ojs_datas_products.get_options_link_datas_show_update(product_id);		
	try {
		options_link_datas = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality-link/search', 
				option_link_datass, 
				token
			);		

		
		if(options_link_datas.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, options_link_datas.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "50.product_speciality(app)->show", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "51.product_speciality(app)->show", "message": error_send } ); 
			return;		
	}		
	
			
	
	
	
	//
	//Lấy danh sách các options
	var brands_list;
	try {

		
		brands_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/brands/search', 
			ojs_datas_brands.get_data_brands_list_add_product(), 
			token
		);	
		
		
		
		if(brands_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,brands_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "39.router_product_speciality(app)->addt", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "38.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}
	//

	
	
	
	//
	//Lấy danh sách các options
	var options_list;
	try {

		
		options_list = await ojs_shares.get_data_send_token_post(
			ojs_configs.domain + '/api/' + check_datas_result.api_version  + '/options/speciality/search', 
			ojs_datas_option.get_data_option_list_add_product(), 
			token
		);	
		
		
		if(options_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,options_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "40.router_product_speciality(app)->add", "message": error_send } ); 
			return;				
		}	
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "41.router_product_speciality(app)->add", "message": error_send } ); 
			return;		
	}
	//
	//@	
	//@
	//@
	//@
	let category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/general/speciality/search', 
				ojs_datas_category.get_data_category_list_add_product(), 
				token
			);


		if(category_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_general_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "41.router_app->product_speciality->add", "message": error_send } ); 
			return;				
		}
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "42.router_product_speciality(app)", "message": error_send } ); 
		return;	
	}

	//@
	
	
	//
	//Lấy product taget update
	let products_taget;
	try {
		products_taget = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/' + product_id,token);
		if(products_taget.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, products_taget.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "66.router_product_speciality(app)", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "67.router_product_speciality(app)->ajax-report-order-store->order_list", "message": error_send } ); 
		return;		
	}
	//@
	
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
		
		data_send = {
			
			
			'title' : 'Chỉnh sữa sản phẩm',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'store_id':store_id,
			'product_id':product_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			"service_type_name" : service_type_name,
			"brands_list" : brands_list.datas,
			"category_link_datas" : category_link_list.datas,
			"datas_category_general" : category_general_list.datas,	
			"datas" : products_taget.datas,
			'options_list' : options_list.datas	,
			"options_link_datas" : options_link_datas.datas,
			'store_name' : store_name.datas[0].stores_name
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/products/speciality/show', data_send );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "69.router_product_speciality(app)->ajax-report-order-store->order_list", "message": error_send } ); 
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
router.post('/update/:product_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	let product_id = req.params.product_id;
	//
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"product_id":product_id
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
	if(check_datas_result.owner_product != "1"   && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.router_category_speciality(app)->show", "message": error_send } ); 
		return;			
	}	
	
	
	

	//=======================
	//=======================
	//=====/header check ====
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/' + product_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "100.models-product_speciality->update", "message": error_send } ); 
		return;		
	}			
});
	
		




//lay danh sach danh muc
router.post('/ajax-products-list/', async function(req, res, next) {
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
		res.send({ "error" : "20.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
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
		res.send({ "error" : "21.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
		return;			
	}	
	//@
	//@	
	//@	
	
	//Lấy danh sách product
	var products_list;
	//@
	let data_products_list;
	//@
	if(check_datas_result.user_role == "admin"){
		data_products_list = ojs_datas_products.get_data_products_list_admin_ajax(datas);
	}else{
		data_products_list = ojs_datas_products.get_data_products_list_ajax(datas);
	}		
	
	//res.send(data_products_list);
	//return;
	
	
	
	//@
	try {
		
		products_list = await ojs_shares.get_data_send_token_post(
				ojs_configs.domain + '/api/' + check_datas_result.api_version + '/products/speciality/search', 
				data_products_list, 
				token
			);		
			
		if(products_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, products_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "44.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "45.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
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
			res.send({ "error" : "48.router_product_speciality(app)->ajax-product-listt", "message": error_send } ); 
			return;				
		}		
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error , "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
			res.send({ "error" : "49.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
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
		data_send = {
			"products_list" : products_list.datas,
			"category_link_datas" : category_link_list.datas		
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/masterpage/widget-product-speciality-show-tables', data_send );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy dữ liệu service_type_id_result", "Lỗi lấy dữ liệu service_type_id_result" );
		res.send({ "error" : "32.router_product_speciality(app)->ajax-product-list", "message": error_send } ); 
		return;	
	}

});

//
//@@








	
module.exports = router;
	
	
	

	