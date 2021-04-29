var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//
router.get('/', async function(req, res, next) {
	//
	let token = req.session.token;	
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
		res.send({ "error" : "1.router_app->category-news-grneral->get", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-grneral->get", "message": error_send } ); 
		return;			
	}	
	

	//
	//Lấy danh sách các danh mục chung
	let category_news_general_list;
	try {
		category_news_general_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/',token);
		if(category_news_general_list.error != ""){

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "category_news_general_list", "Lỗi không xác định,Liên hệ cskh DALA" );
			res.send({ "error" : "1.3.router_app->category-news-grneral->get", "message": error_send } ); 
			return;	
		
		}			

	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "category_news_general_list", "Lỗi không xác định,Liên hệ cskh DALA" );
			res.send({ "error" : "1.4.router_app->category-news-grneral->get", "message": error_send } ); 
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
			'title' : 'Danh sách danh mục tin tuc',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_danh_muc__tin_tic',
			'datas_category_news_general' : category_news_general_list.datas				
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/categorys/news/show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "category_news_general_list", "Lỗi không xác định,Liên hệ cskh DALA" );
		res.send({ "error" : "2.4.router_app->category-news-grneral->get", "message": error_send } ); 
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
	//neu chua co token thì trỏ ra login page
	//@
	//@
	//@
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
		res.send({ "error" : "1.router_app->category-news-grneral->add", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-grneral->add", "message": error_send } ); 
		return;			
	}	
	//
	//Lấy danh sách các danh mục chung
	let category_news_general_list;
	try {
		category_news_general_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/',token);
		if(category_news_general_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_news_general_list.error, "Lỗi không xác định,Liên hệ cskh DALA" );
			res.send({ "error" : "11.router_app->category-news-grneral->add", "message": error_send } ); 
			return;	
		}	
		//res.send(category_news_general_list);
		//return;
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi không xác định,Liên hệ cskh DALA" , "Lỗi không xác định,Liên hệ cskh DALA" );
			res.send({ "error" : "111.router_app->category-news-grneral->add", "message": error_send } ); 
			return;	
	}
	//
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
			'title' : 'Tạo danh mục tin tức',
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_tao_danh_muc_tin_tuc',
			'datas_category_news_general' : category_news_general_list.datas				
		}
		//res.send(data_send);
		res.render( check_datas_result.view_version + '/categorys/news/add', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "category_news_general_list", "Lỗi không xác định,Liên hệ cskh DALA" );
		res.send({ "error" : "2.24.router_app->category-news-grneral->get", "message": error_send } ); 
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
		let check_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/',datas, token);
		//if(activeUpdate.error != "") res.redirect("/login");	
		
		res.send(active_save);	
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
router.get('/show/:cat_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	//res.send("welCom !!!");
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
		let check_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//Lấy danh sách các danh mục chung
	let category_news_general_list;
	try {
		category_news_general_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/',token);
		if(category_news_general_list.error != "") res.redirect("/login");	
		//res.send(category_news_general_list);
		//return;
	}
	catch(error){
		res.send( { "error" : "c_r_10" , "message" : error } );
	}
	//
	
	//
	//Lấy danh muc hien tai
	let category_datas_taget;
	try {
		category_datas_taget = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id,token);
		if(category_datas_taget.error != "") res.redirect("/login");	
		//res.send(category_datas_taget);
		//return;
	}
	catch(error){
		res.send( { "error" : "c_r_11" , "message" : error } );
	}
	//	
	//res.send(category_datas);
	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_type = ojs_shares.get_users_type(token);	
		let users_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Chỉnh sửa danh mục',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'cat_id' : cat_id,
			'users_full_name' : users_full_name,
			'datas_category_news_general' : category_news_general_list.datas,
			'datas' : category_datas_taget.datas
		}
		//res.send(data_send);
		//return;
		res.render( 'categorys/news/show', data_send );	
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
	//res.send("welCom !!!");
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
		let check_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id,datas, token);
		res.send(active_update);	
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
router.get('/delete/:cat_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	//res.send([cat_id]);
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
		let check_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id, token);
		res.send(active_delete);	
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	