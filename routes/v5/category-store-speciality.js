var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');








//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//

//
router.get('/:stores_id', async function(req, res, next) {
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
	//Lấy danh sách các danh mục chung
	let category_general_list;
	try {
		category_general_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/general/speciality',token);
		//if(category_general_list.error != "") res.redirect("/login");	
		//res.send(category_general_list);
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
			'datas_category_general' : category_general_list.datas
		}
		//res.send(data_send);
		res.render( 'categorys/general/speciality/show-all', data_send );	
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
router.get('/add/:stores_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let stores_id = req.params.stores_id;
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
	//Lấy danh sách các danh mục chung
	let category_store_list;
	try {
		category_store_list = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/categorys/stores/speciality/',token);
		//if(category_general_list.error != "") res.redirect("/login");	
		//res.send(category_store_list);
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
			'title' : 'Tạo danh mục cửa hàng',
			'sidebar_type' : 4,
			'users_type' : users_type,
			'users_id' : users_id,
			"stores_id" : stores_id,
			'users_full_name' : users_full_name,
			'datas_category_store' : category_store_list.datas
		}
		//res.send(data_send);
		res.render( 'categorys/stores/speciality/add', data_send );	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}	
});


//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@



	
module.exports = router;
	
	
	

	