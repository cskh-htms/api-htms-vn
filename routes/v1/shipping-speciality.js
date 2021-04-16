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
	//
	let token = req.session.token;	
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
		let check_user = await ojs_shares.get_data_no_token_post('https://appdala.com/api/v1/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	
	//
	//@
	//get shipping list
	try {
		shipping_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/shipping/speciality',token);
		if(shipping_list.error != "") res.redirect("/login");	
		//res.send(shipping_list);
		//return;
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
			'title' : 'Danh sách khu vực',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'datas' : shipping_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( 'shipping/speciality/show-all', data_send );	
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
		let check_user = await ojs_shares.get_data_no_token_post('https://appdala.com/api/v1/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	//
	//@
	//get shipping list
	try {
		shipping_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/shipping/speciality',token);
		if(shipping_list.error != "") res.redirect("/login");	
		//res.send(shipping_list);
		//return;
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}
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
			'title' : 'Tạo khu vực',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'shipping_list' : shipping_list.datas
		}
		//res.send(data_send);
		res.render( 'shipping/speciality/add', data_send );	
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
router.get('/show/:shipping_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let shipping_id = req.params.shipping_id;
	//res.send("welCom !!!");
	//return;
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
	//@
	//get shipping list
	var shipping_list;
	try {
		shipping_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/shipping/speciality',token);
		if(shipping_list.error != "") res.redirect("/login");	
		//res.send(shipping_list);
		//return;
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}




	//
	//Lấy shipping tager
	let shipping_tager;
	try {
		shipping_tager = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/shipping/speciality/' + shipping_id,token);
		if(shipping_tager.error != "") res.redirect("/login");	
		//res.send(shipping_tager);
		//return;
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
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
			'title' : 'Chỉnh sửa khu vực',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'shipping_id' : shipping_id,
			'users_full_name' : users_full_name,
			'datas' : shipping_tager.datas,
			'shipping_list' : shipping_list.datas
		}
		//res.send(data_send);
		//return;
		res.render( 'shipping/speciality/show', data_send );	
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
router.post('/update/:shipping_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let shipping_id = req.params.shipping_id;
	let datas  = req.body;
	//res.send(datas);
	//return;
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
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/shipping/speciality/' + shipping_id,datas, token);
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
//update
router.post('/detail/update/:detail_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let detail_id = req.params.detail_id;
	let datas  = req.body;
	//res.send(datas);
	//return;
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
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/shipping/speciality-detail/' + detail_id,datas, token);
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
router.get('/detail/delete/:detail_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let detail_id = req.params.detail_id;
	//res.send([detail_id]);
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
		let active_delete = await ojs_shares.get_data_send_token_delete('https://appdala.com/api/v1/shipping/speciality-detail/' + detail_id, token);
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
router.get('/delete/:shipping_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let shipping_id = req.params.shipping_id;
	//res.send([shipping_id]);
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
		let active_delete = await ojs_shares.get_data_send_token_delete('https://appdala.com/api/v1/shipping/speciality/' + shipping_id, token);
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
		let active_save = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/shipping/speciality/',datas, token);
		//if(activeUpdate.error != "") res.redirect("/login");	
		
		res.send(active_save);	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}			
});
	
		
	
	
		
	
	
	
	
	
	
module.exports = router;
	
	
	

	