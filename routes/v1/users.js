var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');




//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//danh sách
router.get('/', async function(req, res, next) {
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	


	//res.send({ "error" : "2.router_app->users->users_list", "message": check_datas_result} ); 
	//return;	



	//@
	//@
	//@
	//kiem tra role
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
	//Lấy danh sách các danh mục chung
	let users_list;
	try {
		users_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/',token);
		if(users_list.error != "") { res.redirect("/login") }
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "2.router_app->users->users_list", "message": error_send } ); 
		return;		
	}





	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let user_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Danh sách tài khoản',
			'sidebar_type' : 1,
			'users_type' : check_datas_result.user_role,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'users_list' : users_list.datas,
			'js_css_version' : check_datas_result.js_css_version
		}
		//res.send(data_send);
		//return;
		res.render( check_datas_result.view_version + '/users/show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "5.router_app->users->send data->catch", "message": error_send } ); 
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
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
	//Lấy danh sách các options
	let options_list;
	try {
		options_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/options/speciality',token);
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}
	//

	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		let users_id = ojs_shares.get_users_id(token);	
		let users_full_name = ojs_shares.get_users_full_name(token);
		//
		//@
		data_send = {
			'title' : 'Tạo tài khoản',
			'sidebar_type' : 1,
			'users_type' : check_datas_result.user_role,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'options_list' : options_list.datas
		}
		//res.send(data_send);
		res.render( check_datas_result.view_version + '/options/speciality/add', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "7.router_app->users->add->send data->catch", "message": error_send } ); 
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
router.get('/show/:user_id', async function(req, res, next) {
	//
	//@
	//@
	//get parmar req
	var user_id = req.params.user_id;
	
	//
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
		"token":token,
		"user_id":user_id
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//kiem token có phải là chủ tài khoản
	if(check_datas_result.owner != "1" &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}	
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//
	
	
	
	//
	//Lấy danh sách các options
	let users_type_list;
	try {
		users_type_list = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users-type',token);
		if(users_type_list.error != "") res.redirect("/login");	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, " Không có users", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_admin_app->show->users_type_list", "message": error_send } ); 
		return;	
	}
	//

	//
	//Lấy option tager
	let user_tager;
	try {
		user_tager = await ojs_shares.get_data_send_token_get(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/' + user_id,token);
		if(user_tager.error != "") res.redirect("/login");	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, " Không có users", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_admin_app->show->user_tager", "message": error_send } ); 
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
			'title' : 'Chỉnh sửa tài khoản',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'user_role':users_type,
			'user_id' : user_id,
			'users_full_name' : users_full_name,
			'users_type_list' : users_type_list.datas,
			'datas' : user_tager.datas,
			'js_css_version' : check_datas_result.js_css_version
		}
		res.render( check_datas_result.view_version + '/users/show', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Server đang bận" );
		res.send({ "error" : "7.router_app->users->show->send data->catch", "message": error_send } ); 
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
router.post('/update/:user_id', async function(req, res, next) {
	//@
	//@
	//get parmar req
	var user_id = req.params.user_id;
	var datas  = req.body;
	//
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
		"token":token,
		"user_id":user_id
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//kiem token có phải là chủ tài khoản
	if(check_datas_result.owner != "1" &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}	
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	
	
	

	
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/' + user_id,datas, token);
		res.send(active_update);	
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_users_app->/update/:user_id'", "message": error_send } ); 
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
	let datas  = req.body;
	//
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	//kiem token có phải là chủ tài khoản
	if(check_datas_result.owner != "1" &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}	
		
	
	
	//@
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
		let active_save = await ojs_shares.get_data_send_token_post(ojs_configs.domain + '/api/' + check_datas_result.check_datas_result.check_datas_result.api_version + '/options/speciality/',datas, token);
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10_router_admin_app->/save/:user_id'", "message": error_send } ); 
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
router.post('/register', async function(req, res, next) {
	let datas  = req.body;
	var view_version = ojs_configs.view_version;
	//
	//@insert users
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/register',datas);
		//if(activeUpdate.error != "") res.redirect("/login");	
		
		res.send(active_save);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_users->/register->active_save", "message": error_send } ); 
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
router.get('/delete/:user_id', async function(req, res, next) {
	//
	let user_id = req.params.user_id;

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
		"token":token,
		"user_id":user_id
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
		res.send({ "error" : "2.ajax-report-all->datas_check", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != "" ){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3.ajax-report-all->check_datas_result", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@
	//kiem token có phải là chủ tài khoản
	if(check_datas_result.owner != "1" &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4.router_users-app->delete->check_datas_result", "message": error_send } ); 
		return;			
	}	
	
	
	//res.send({ "error" : "2.ajax-report-all->datas_check", "message": "check" } ); 
	//return;		
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete(ojs_configs.domain + '/api/' + check_datas_result.api_version + '/users/' + user_id, token);
		res.send(active_delete);	
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_users->delete", "message": error_send } ); 
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
	
	
	

	