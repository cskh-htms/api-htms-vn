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

0 [/]


--------------------------------------------------------------
*/

//@
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
		res.send({ "error" : "routers option web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	
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



	datas_info = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu
	}


	data_send = {
		'title' 			: 'Quản lý tin tức',
		'users_type' 		: ojs_shares_others.get_users_type(token),
		'user_id' 			: ojs_shares_others.get_users_id(token),
		'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
		'js_css_version'	: ojs_configs.js_css_version,
		'menu_taget'		: 'sidebar_news',
		'sidebar_type'		:  "",
		
		'news_admin_menu' 	: get_datas_news_admin_menu,
		'datas_info':datas_info
	}


	
	//res.send(data_send);
	//return;	
	
	
	res.render( ojs_configs.view_version + '/coupon/speciality/admin-show-all', data_send );	

});


//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//danh sách
router.get('/dasdasd', async function(req, res, next) {
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
		res.send({ "error" : "1.router_app->news-general->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->get", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->news-general->add", "message": error_send } ); 
		return;			
	}	

	//
	//Lấy danh sách các danh mục chung
	let news_list;
	try {
		news_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/news/general',token);
		if(news_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi lấy datas new list", "Lỗi lấy datas new list" );
			res.send({ "error" : "33.router_app->news-general->get", "message": error_send } ); 
			return;			
		}		

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy datas new list", "Lỗi lấy datas new list" );
		res.send({ "error" : "5.router_app->news-general->get", "message": error_send } ); 
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
			'title' : 'Danh sách tin tức',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_tin_tuc',
			'news_list' : news_list.datas			
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/news/general/show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy datas new list", "Lỗi lấy datas new list" );
		res.send({ "error" : "6.router_app->news-general->get", "message": error_send } ); 
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
router.get('/add', async function(req, res, next) {
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
		res.send({ "error" : "1.router_app->news-general->add", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->add", "message": error_send } ); 
		return;			
	}	
	

	//
	//Lấy danh sách các danh mục chung
	let category_news_general_list;
	try {
		category_news_general_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general',token);
		if(category_news_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
			res.send({ "error" : "66.router_app->news-general->add", "message": error_send } ); 
			return;		
		}
		//res.send(category_news_general_list);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
			res.send({ "error" : "21.router_app->news-general->show", "message": error_send } ); 
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
			'title' : 'tạo tin tức',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_tao_tin_tuc',
			'datas_category_news_general' : category_news_general_list.datas				
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/news/general/add', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy datas new list", "Lỗi lấy datas new list" );
		res.send({ "error" : "6.router_app->news-general->add", "message": error_send } ); 
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
router.get('/show/:news_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let news_id = req.params.news_id;
	//res.send("welCom !!!");
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
		res.send({ "error" : "1.router_app->brands->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->get", "message": error_send } ); 
		return;			
	}	
	

	//Lấy danh sách các danh mục chung
	let category_news_general_list;
	try {
		category_news_general_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general',token);
		if(category_news_general_list.error != "") res.redirect("/login");	
		//res.send(category_news_general_list);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
		res.send({ "error" : "66.router_app->news-general->show", "message": error_send } ); 
		return;	
	}

	//
	//
	//Lấy option tager
	let news_tager;
	try {
		news_tager = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/news/general/' + news_id,token);
		if(news_tager.error != "") res.redirect("/login");	
		//res.send(news_tager);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
		res.send({ "error" : "6666.router_app->news-general->show", "message": error_send } ); 
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
			'title' : 'Chỉnh sửa tin tức',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'news_id' : news_id,
			'datas_category_news_general' : category_news_general_list.datas,
			'datas' : news_tager.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/news/general/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
		res.send({ "error" : "67.router_app->news-general->show", "message": error_send } ); 
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
router.post('/update/:news_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let news_id = req.params.news_id;
	let datas  = req.body;
	//res.send("welCom !!!");
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
		res.send({ "error" : "1.router_app->news-general->update", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->update", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->news-general->update", "message": error_send } ); 
		return;			
	}	

	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/news/general/' + news_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi update ", "Lỗi update t" );
		res.send({ "error" : "6.router_app->news-general->update", "message": error_send } ); 
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
	//res.send("welCom !!!");
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
		res.send({ "error" : "1.router_app->news-general->save", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->save", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->news-general->save", "message": error_send } ); 
		return;			
	}	
	
	try {	
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/news/general',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi save datas" );
		res.send({ "error" : "223.router_app->news-general->save", "message": error_send } ); 
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
router.get('/delete/:news_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let news_id = req.params.news_id;
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
		res.send({ "error" : "1.router_app->news-general->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->news-general->delete", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->news-general->delete", "message": error_send } ); 
		return;			
	}	

	//
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/news/general/' + news_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi xoá datas" );
		res.send({ "error" : "422.router_app->news-general->delete", "message": error_send } ); 
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
	
	
	

	