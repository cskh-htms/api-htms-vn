var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');
const ojs_datas = require('../../models/ojs-datas.js');
const ojs_datas_orders = require('../../models/ojs-datas-orders.js');


//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//load widget 
router.post('/load/', async function(req, res, next) {
	//
	let token = req.session.token;	
	let datas  = req.body.datas;
	//res.send(datas.status_send);
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

	//return;
	var sattus_number = "0";
	if(datas.status_send == "da_hoan_thanh"){
		sattus_number = "1";
	}
	//
	

	
	//
	let orders_list;
	let datas_search = 	
	{
		"datas" :   {
			"select_field" :
			[
            "orders_speciality_ID",
            "orders_speciality_date_orders",
            "orders_speciality_user_id",
			"users_first_name",
			"users_last_name",
			"orders_speciality_phone",
            "orders_speciality_status_orders",
            "orders_speciality_status_payment",
            "orders_speciality_adress",
            "orders_speciality_notes",
            "orders_speciality_email"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[  
						{
							"field" : "orders_speciality_date_orders" ,
							"value" : datas.date_star,
							"compare" : ">="
						},
						{
							"field" : "orders_speciality_date_orders" ,
							"value" : datas.date_end,
							"compare" : "<="
						},
						{
							"field" : "orders_speciality_status_orders" ,
							"value" : sattus_number,
							"compare" : "="
						}							
					]    
				}         
			],
			"order" :
			 [
					{    "field"  :"orders_speciality_date_orders",
						"compare" : "ASC"
					}   
			 ]
		}
	}	
	
	
	try {
		orders_list = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/orders/speciality/search',datas_search,token);
		//if(category_general_list.error != "") res.redirect("/login");	
		//res.send(orders_list);
		//return;
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}
	
	data_send = {
		'datas' : orders_list.datas
	}
	res.render( 'masterpage/widget-orders-show-tables', data_send );	
	return;

});


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
	



	//@
	//@
	//@
	//@	admin menu order check
	try {
		var date_star = "2020/01/01 00:00:00";
		var date_end = ojs_shares.get_current_date_end();
		var sattus_number = "0";
		
		var orders_check = await ojs_shares.get_data_send_token_post( 
			'https://appdala.com/api/v1/orders/speciality/search',
			ojs_datas_orders.orders_check_menu_data(date_star,date_end,sattus_number),
			token
		);
	}
	catch(error){
		res.send( { "error" : "01_orders_check" , "message" : error } );
	}	
	//@
	//@	end of admin menu order check	
	
	
	
	
	



	//
	//Lấy danh sách các danh mục chung
	
	var current_time_string = ojs_shares.get_current_date_star();
	//res.send([current_time_string])
	//return;
	let orders_list;
	let datas_search = 	
	{
		"datas" :   {
			"select_field" :
			[
            "orders_speciality_ID",
            "orders_speciality_date_orders",
            "orders_speciality_user_id",
			"users_first_name",
			"users_last_name",
			"orders_speciality_phone",
            "orders_speciality_status_orders",
            "orders_speciality_status_payment",
            "orders_speciality_adress",
            "orders_speciality_notes",
            "orders_speciality_email"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[  
						{
							"field" : "orders_speciality_status_orders" ,
							"value" : "0",
							"compare" : "="
						}					
					]    
				}         
			],
			"order" :
			 [
					{    "field"  :"orders_speciality_date_orders",
						"compare" : "DESC"
					}   
			 ]
		}
	}	
	
	
	try {
		orders_list = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/orders/speciality/search',datas_search,token);
		//if(category_general_list.error != "") res.redirect("/login");	
		//res.send(orders_list);
	}
	catch(error){
		res.send( { "error" : "r_10" , "message" : error } );
	}

	//
	//lay tong so luong don hang chưa sử lý
	var order_sum;
	var x;
	var i = 0;
	for( x in orders_list.datas){
		if(orders_list.datas[x].orders_speciality_status_orders == 0 
			|| orders_list.datas[x].orders_speciality_status_payment == 0){
			i = i + 1
		}
	}
	order_sum = i;
	
	
	
	
	
	//res.send([order_sum]);
	//return;
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
			'title' : 'Danh sách đơn hàng',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'users_full_name' : users_full_name,
			'datas' : orders_list.datas,
			'order_sum' : order_sum,
			'orders_check' : orders_check.datas
		}
		//res.send(data_send);
		res.render( 'orders/speciality/show-all', data_send );	
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
router.get('/show/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
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





	//@	admin menu order check
	var date_star = "2020/01/01 00:00:00";
	var date_end = ojs_shares.get_current_date_end();
	var sattus_number = "0";
	orders_check = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/orders/speciality/search',ojs_datas.orders_check_menu_data(date_star,date_end,sattus_number),token);









	//
	//Lấy option tager
	let orders_tager;
	try {
		orders_tager = await ojs_shares.get_data_send_token_get('https://appdala.com/api/v1/orders/speciality/' + order_id,token);
		if(orders_tager.error != "") res.redirect("/login");	
		//res.send(orders_tager);
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}
	//
	
	//
	//Lấy danh sách các danh mục chung
	let orders_detail;
	let datas_search_detail = 	
	{
		"datas" :   {
			"select_field" :
			[
				"orders_speciality_user_id",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_adress",
				"orders_speciality_notes",
				"orders_speciality_phone",
				"orders_speciality_email",
				"orders_details_speciality_line_order",
				"orders_details_speciality_product_id",
				"orders_details_speciality_qty",
				"orders_details_speciality_price",
				"orders_details_speciality_discount",
				"orders_details_speciality_unit_discount",
				"products_speciality_name",
                "orders_speciality_ID",
				"orders_details_medium_text",
				"orders_details_speciality_ID"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[        
						{   "field"     :"orders_details_speciality_order_id",
							"value"     : order_id,
							"compare" 	: "="
						} 					
					]    
				}         
			],
			"order" :
			 [
					{    "field"  :"orders_details_speciality_line_order",
						"compare" : "ASC"
					}   
			 ]
		}
	}		
	
	
	try {
		orders_detail = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/orders/speciality-detail/search',datas_search_detail,token);
		if(orders_detail.error != "") res.redirect("/login");	
		//res.send(orders_detail);
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
			'title' : 'Chỉnh sửa đơn hàng',
			'sidebar_type' : 1,
			'users_type' : users_type,
			'users_id' : users_id,
			'order_id' : order_id,
			'users_full_name' : users_full_name,
			'datas' : orders_tager.datas,
			'orders_detail' : orders_detail.datas,
			'orders_check' : orders_check.datas
		}
		//res.send(data_send);
		//return;
		res.render( 'orders/speciality/show', data_send );	
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
router.post('/update/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
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
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/orders/speciality/' + order_id,datas, token);
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
		let active_update = await ojs_shares.get_data_send_token_put('https://appdala.com/api/v1/orders/speciality-detail/' + detail_id,datas, token);
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
		let active_delete = await ojs_shares.get_data_send_token_delete('https://appdala.com/api/v1/orders/speciality-detail/' + detail_id, token);
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
router.get('/delete/:order_id', async function(req, res, next) {
	//
	let token = req.session.token;	
	let order_id = req.params.order_id;
	//res.send([order_id]);
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
		let active_delete = await ojs_shares.get_data_send_token_delete('https://appdala.com/api/v1/orders/speciality/' + order_id, token);
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
router.post('/save_fee', async function(req, res, next) {
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
		let active_save = await ojs_shares.get_data_send_token_post('https://appdala.com/api/v1/orders/speciality-detail/',datas, token);
		//if(activeUpdate.error != "") res.redirect("/login");	
		
		res.send(active_save);	
	}
	catch(error){
		res.send( { "error" : "r_11" , "message" : error } );
	}			
});
	
			
	
	
	
	
	
module.exports = router;
	
	
	

	