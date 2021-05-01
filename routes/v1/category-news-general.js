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
			'users_type' : check_datas_result.user_role,
			'user_role'  : check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_danh_muc_tin_tuc',
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
		res.send({ "error" : "1.router_app->category-news-general->add", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-general->add", "message": error_send } ); 
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
			res.send({ "error" : "66.router_app->category-news-general->add", "message": error_send } ); 
			return;		
		}

	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi không xác định, vui lòng liên hệ admin", "Lỗi không xác định, vui lòng liên hệ admin" );
			res.send({ "error" : "21.router_app->category-news-general->add", "message": error_send } ); 
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
		res.send({ "error" : "2.24.router_app->category-news-general->add", "message": error_send } ); 
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
		res.send({ "error" : "1.router_app->category-news-general->save", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-general->save", "message": error_send } ); 
		return;			
	}	
	
	//
	try {	
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->category-news-general->save", "message": error_send } ); 
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
router.get('/show/:cat_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_id = req.params.cat_id;
	
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
		res.send({ "error" : "1.router_app->category-news-general->show", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-general->show", "message": error_send } ); 
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
			var error_send = ojs_shares.show_error( evn, category_news_general_list.error, "Lỗi lấy danh sách categorys" );
			res.send({ "error" : "22.router_app->category-news-general->show", "message": error_send } ); 
			return;		
		}			

	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy danh sách categorys" );
			res.send({ "error" : "32.router_app->category-news-general->show", "message": error_send } ); 
			return;	
	}
	//
	
	//
	//Lấy danh muc hien tai
	let category_datas_taget;
	try {
		category_datas_taget = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id,token);
		if(category_datas_taget.error != "") {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_datas_taget.error, "Lỗi lấy danh sách categorys taget" );
			res.send({ "error" : "222.router_app->category-news-general->show", "message": error_send } ); 
			return;	
		}			
		//return;
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_datas_taget.error, "Lỗi lấy danh sách categorys taget" );
			res.send({ "error" : "322.router_app->category-news-general->show", "message": error_send } ); 
			return;	
	}
	//	
	//res.send(category_datas);
	
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
			'users_type' : users_type,
			'user_role'  : users_type,
			'user_id' : user_id,
			'cat_id' : cat_id,
			'users_full_name' : users_full_name,
			"js_css_version" : check_datas_result.js_css_version,
			'menu_taget':'sidebar_danh_muc_tin_tuc',
			'datas_category_news_general' : category_news_general_list.datas,
			'datas' : category_datas_taget.datas
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/categorys/news/show', data_send );	
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, category_datas_taget.error, "Lỗi send datas" );
			res.send({ "error" : "422.router_app->category-news-general->show", "message": error_send } ); 
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
		res.send({ "error" : "1.router_app->category-news-general->update", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-general->update", "message": error_send } ); 
		return;			
	}	
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id,datas, token);
		res.send(active_update);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn,error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.router_app->category-news-general->update", "message": error_send } ); 
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
	//res.send(datas);
	//
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
		res.send({ "error" : "1.router_app->category-news-general->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.router_app->category-news-general->delete", "message": error_send } ); 
		return;			
	}


	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "44.router_app->category-news-general->delete", "message": error_send } ); 
		return;			
	}	


	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/categorys/news/general/' + cat_id, token);
		res.send(active_delete);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi delete datas" );
		res.send({ "error" : "222.router_app->category-news-general->delete", "message": error_send } ); 
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
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	