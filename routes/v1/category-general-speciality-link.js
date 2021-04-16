var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//
router.get('/', async function(req, res, next) {
	//
	let token = req.session.token;	
	res.send("welCom !!!");
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	

	//
	//Lấy danh sách các danh mục chung
	let category_general_link_list;
	try {
		category_general_link_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/general/speciality/link',token);
		//if(category_general_link_list.error != "") res.redirect("/login");	
		//res.send(category_general_link_list);
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}

	//
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
			'title' : 'Danh sách danh mục chung',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_link_list.datas
		}
		//res.send(data_send);
		res.render( 'categorys/general/speciality/link/show-all', data_send );	
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
router.get('/add', async function(req, res, next) {
	//
	let token = req.session.token;	
	res.send("welCom !!!");
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//Lấy danh sách các danh mục chung
	let category_general_link_list;
	try {
		category_general_link_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/general/speciality/link',token);
		//if(category_general_link_list.error != "") res.redirect("/login");	
		//res.send(category_general_link_list);
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}
	//
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
			'title' : 'Tạo danh mục chung',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_link_list.datas
		}
		//res.send(data_send);
		res.render( 'categorys/general/speciality/link/add', data_send );	
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
router.post('/save', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	res.send(datas);
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_save = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/categorys/general/speciality/link/',datas, token);
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
router.get('/show/:cat_link_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_link_id = req.params.cat_link_id;
	res.send("welCom !!!");
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//Lấy danh sách các danh mục chung
	let category_general_link_list;
	try {
		category_general_link_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/general/speciality/link',token);
		//if(category_general_link_list.error != "") res.redirect("/login");	
		//res.send(category_general_link_list);
	}
	catch(error){
		res.send( { "error" : "c_r_10" , "message" : error } );
	}
	//
	
	//
	//Lấy danh sách các danh mục chung
	let category_datas;
	try {
		category_datas = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/general/speciality/link/' + cat_link_id,token);
		if(category_datas.error != "") res.redirect("/login");	
		//res.send(category_general_link_list);
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
			'title' : 'Tạo danh mục chung',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'cat_link_id' : cat_link_id,
			'users_full_name' : users_full_name,
			'datas_category_general' : category_general_link_list.datas,
			'datas' : category_datas.datas
		}
		//res.send(data_send);
		res.render( 'categorys/general/speciality/link/show', data_send );	
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
router.post('/update/:cat_link_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_link_id = req.params.cat_link_id;
	let datas  = req.body;
	res.send("welCom !!!");
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/categorys/general/speciality/link/' + cat_link_id,datas, token);
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
router.get('/delete/:cat_link_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let cat_link_id = req.params.cat_link_id;
	res.send([cat_link_id]);
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_delete = await ojs_shares.get_data_send_token_delete('https://appdala.com/api/v1/categorys/general/speciality/link/' + cat_link_id, token);
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
//
router.post('/search', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body;
	res.send("welCom !!!");
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
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//Lấy danh sách loại danh mục
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/categorys/general/speciality/link/' + cat_link_id,datas, token);
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



//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	