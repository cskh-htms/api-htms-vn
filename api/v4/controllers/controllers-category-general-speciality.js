/*

* -1. [insert_category_general_speciality] ( tạo category)

* -2. [get_all_category_general_speciality]

* -3. [get_one_category_general_speciality]

* -4. [update_category_general_speciality]

* -5. [delete_category_general_speciality]

* -6. [search]
* 9. [search_count_product_by_category]
* 10. [search_count_product_sale_by_category]	



*/


//@ app express
var express = require('express');
var router = express.Router();

//@
//@
//@
//npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database fileds
const default_field = require('../const-tables/const-tables-category-general-speciality');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');



//@
//@
//function share
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_owner = require('../function-shares/ojs-shares-owner');



//@
//@
//model
const models_category_gemeral_speciality = require('../models/models-category-gemeral-speciality');



//@@
//@@
//@@
//@@
//@@
//@@ tạo danh mục
// 1. [insert_category_general_speciality]
async function insert_category_general_speciality(req, res, next) {
try {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.category_general_speciality_stores_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã cửa hàng (store_id) " });
			return;
		}
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->insert", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.category_general_speciality_stores_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->insert", "message": error_send } );  
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store == "1" ||  check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-category_general_speciality->insert", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@
	//@ check data type
	try {
		var datas_assign;
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		

		
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->insert", "message": data_check } ); 
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi data assign, liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-category_general_speciality->insert", "message": error_send } );  
		return;	
	}		
	
	
	//res.send({"fsdf":data_check});
	//return;
	//@
	//@
	//@
	//@ nhập database
	try {
		models_category_gemeral_speciality.insert_category_general_speciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results } );
			return;
		}, error => {
			
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "6", "position":"ctl-category_general_speciality->insert", "message": error_send } );  
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data category, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-category_general_speciality->insert", "message": error_send } );  
		return;	
	}
	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data category, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-category_general_speciality->insert", "message": error_send } );  
	return;	
}	
}
//end of  1. [insert_category_general_speciality]




//@
//@
//@
//@
//@ * 2. [get_all_category_general_speciality]
async function get_all_category_general_speciality(req, res, next) {
	//@
	//@
	//@
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
		return;			
	}	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job"   
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
		return;				
	}
		
		
	//res.send(check_datas_result);
	//return;
	//@
	//@
	//@
	try {
		models_category_gemeral_speciality.get_all_category_general_speciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "5", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
		res.send({ "error" : "113", "position":"ctl-category_general_speciality->get all", "message": error_send } );  
		return;	
}	
}
//
//@ * end of 2. [get_all_category_general_speciality]


//@@
//@@
//@@
//@@
//@ * -4. [get_one_category_general_speciality]
async function get_one_category_general_speciality(req, res, next) {
	
try {	
	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var cat_id = req.params.cat_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"cat_id":cat_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_cat == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "customer" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
		return;			
	}	
	
	
	//@
	try {
		models_category_gemeral_speciality.get_one_category_general_speciality(cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;			
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;		
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send({ "error" : "5", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;		
	let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
	res.send({ "error" : "113", "position":"ctl-category_general_speciality->get one", "message": error_send } );  
	return;
}	
	
}




//@ * end of  -3. [get_one_category_general_speciality]




//@@
//@@
//@@
//@@
//@@
//@@
//@* 4. [update_category_general_speciality]
async function update_category_general_speciality(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var cat_id = req.params.cat_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->update", "message": error_send } );   
		return;			
	}	
	
	
	//res.send([cat_id,datas,token]);
	//return;
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"cat_id":cat_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->update", "message": error_send } );
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_cat == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-category_general_speciality->update", "message": error_send } );
		return;			
	}		
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin danh mục
	try {
		var push_check = await models_category_gemeral_speciality.get_one_category_general_speciality(cat_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->update", "message": error_send } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có danh mục " ,"Không có danh mục" );
			res.send({ "error" : "5", "position":"ctl-category_general_speciality->update", "message": error_send } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "6", "position":"ctl-category_general_speciality->update", "message": error_send } );
		return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas,  { 'category_general_speciality_update_status' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "7", "position":"ctl-category_general_speciality->update", "message": error_send } );
			return;
	}		
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		//@
		//@
		if(check_datas_result.user_role != "admin"){
			delete datas.category_general_speciality_admin_status;
			delete datas.category_general_speciality_update_status;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].category_general_speciality_update_status == "1"){
			Object.assign(datas,  { 'category_general_speciality_admin_status' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'category_general_speciality_update_status' : 1 });
		}		
	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "8", "position":"ctl-category_general_speciality->update", "message": error_send } );
			return;
	}		
	

	
	
	//@
	try {
		models_category_gemeral_speciality.update_category_general_speciality(datas,cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "9", "position":"ctl-category_general_speciality->update", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data, vui lòng thao tác lại. hoặc liên hệ bộ phận cskh " );
			res.send({ "error" : "10", "position":"ctl-category_general_speciality->update", "message": error_send } );
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data, vui lòng thao tác lại. hoặc liên hệ bộ phận cskh " );
		res.send({ "error" : "113", "position":"ctl-category_general_speciality->update", "message": error_send } );
		return;	
}	
	
}
//@* end of 4. [update_category_general_speciality]






//@@
//@@
//@@
//@@
//@ * -5. [delete_category_general_speciality]
async function delete_category_general_speciality(req, res, next) {
try {

	//@
	//@	get datas req
	try {
		var cat_id = req.params.cat_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->delete", "message": error_send } );
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"cat_id":cat_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->delete", "message": error_send } );
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin danh mục
	try {
		var push_check = await models_category_gemeral_speciality.get_one_category_general_speciality(cat_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "3", "position":"ctl-category_general_speciality->delete", "message": error_send } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có danh mục " ,"Không có danh mục" );
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->delete", "message": error_send } );
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "5", "position":"ctl-category_general_speciality->delete", "message": error_send } );
		return;
	}	
	
	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| (check_datas_result.owner_cat == "1" &&  push_check[0].category_general_speciality_admin_status == 0 ) ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "6", "position":"ctl-category_general_speciality->delete", "message": error_send } );
		return;			
	}		
	
	
	
	//@
	//@xoa'
	try {
		models_category_gemeral_speciality.delete_category_general_speciality(cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "7", "position":"ctl-category_general_speciality->delete", "message": error_send } );
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "8", "position":"ctl-category_general_speciality->delete", "message": error_send } );
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//////evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
	res.send({ "error" : "113", "position":"ctl-category_general_speciality->delete", "message": error_send } );
	return;	
}	
	
}
//@ * end of -5. [delete_category_general_speciality]





//@@
//@@
//@@
//@@
//@ * 6. [search]
async  function search(req, res, next) {
try {	
	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
		//@
		//@
		//res.send({ datas } ); 
		//return;	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->search", "message": error_send } );
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search cat theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var cat_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "category_general_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							cat_id = datas.condition[x].where[z].value;
						}
					}	
				}
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-category_general_speciality->search", "message": error_send } );
		return;			
	}		
	

	//res.send({ "error" : "controller_category-general-speciality->search->check_condition_id -> error_number : 2", "message": check_condition_id } ); 
	//return;	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"cat_id":cat_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-category_general_speciality->search", "message": error_send } );
		return;			
	}



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		|| check_datas_result.user_role == "customer" 
		
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-category_general_speciality->search", "message": error_send } );
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_cat == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job"   
		|| check_datas_result.user_role == "customer" 	
		
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-category_general_speciality->search", "message": error_send } );
			return;			
		}			
	}


	//@
	//@
	//@ run
	try {
		models_category_gemeral_speciality.search(datas).then( results => {
			
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search datas" );
			res.send({ "error" : "6", "position":"ctl-category_general_speciality->search", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev"
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "7", "position":"ctl-category_general_speciality->search", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev"
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
		res.send({ "error" : "113", "position":"ctl-category_general_speciality->search", "message": error_send } );
		return;	
}	
	
}
//@ * end of -6. [search]


//@@
//@@
//@@
//@@
//@ * 9. [search_count_product_by_category]
async  function search_count_product_by_category(req, res, next) {
try {	
	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
		//@
		//@
		//res.send({ datas } ); 
		//return;	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->search_count_product_by_category", "message": error_send } );
		return;			
	}	


	//@
	//@
	//@ run
	try {
		models_category_gemeral_speciality.search_count_product_by_category(datas).then( results => {
			
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search datas" );
			res.send({ "error" : "6", "position":"ctl-category_general_speciality->search_count_product_by_category", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev"
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "7", "position":"ctl-category_general_speciality->search_count_product_by_category", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev"
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
		res.send({ "error" : "113", "position":"ctl-category_general_speciality->search_count_product_by_category", "message": error_send } );
		return;	
}	
}




//@@
//@@
//@@
//@@
//@ * 10. [search_count_product_sale_by_category]
async  function search_count_product_sale_by_category(req, res, next) {
try {	
	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
		//@
		//@
		//res.send({ datas } ); 
		//return;	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-category_general_speciality->search_count_product_sale_by_category", "message": error_send } );
		return;			
	}	


	//@
	//@
	//@ run
	try {
		models_category_gemeral_speciality.search_count_product_sale_by_category(datas).then( results => {
			
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search datas" );
			res.send({ "error" : "6", "position":"ctl-category_general_speciality->search_count_product_sale_by_category", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev"
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "7", "position":"ctl-category_general_speciality->search_count_product_sale_by_category", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev"
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
		res.send({ "error" : "113", "position":"ctl-category_general_speciality->search_count_product_sale_by_category", "message": error_send } );
		return;	
}	
}


/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_category_general_speciality,
	insert_category_general_speciality,
	update_category_general_speciality,
	delete_category_general_speciality,
	get_one_category_general_speciality,
	search,
	search_count_product_by_category,
	search_count_product_sale_by_category
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























