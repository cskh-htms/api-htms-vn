/*

* -1. [insert_category_general_speciality] ( tạo category)

* -2. [get_all_category_general_speciality]

* -3. [get_one_category_general_speciality]

* -4. [update_category_general_speciality]

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
		res.send({ "error" : "controllers-category-general-speciality->insert_category_general_speciality->request->error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-general-speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-general-speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
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
			res.send({"error" : "controllers-category-general-speciality->insert-> check datas->number_error : 1 ", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi data assign, liên hệ admin" );
		res.send({ "error" : "controllers-category-general-speciality->insert-> check datas->number_error : 2", "message": error_send } ); 
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
			res.send({ "error" : "controllers-category-general-speciality->models_insert-> number_error : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data category, liên hệ admin" );
		res.send({ "error" : "controllers-category-general-speciality->models_insert-> number_error : 2", "message": error_send } ); 
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
	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-general-speciality->get_all->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-general-speciality->check-role->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-general-speciality->get_all->check-role -> error_number : 3", "message": error_send } ); 
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
			res.send({ "error" : "controllers-category-general-speciality->get_all->run-model -> error_number : 3", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "controllers-category-general-speciality->get_all->run-model -> error_number : 3", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-general-speciality->get_one_category_general_speciality->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-general-speciality->get_one_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_cat == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-general-speciality->get_one_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	try {
		models_category_gemeral_speciality.get_one_category_general_speciality(cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "controllers-category-general-speciality->model-run -> error_number : 1", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "controllers-category-general-speciality->model-run -> error_number : 2", "message" : error_send  } );
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






//@* end of 4. [update_category_general_speciality]












//
//@@
//@@
//@@
//@@
//@@
//@@
//insert
async function update_category_general_speciality(req, res, next) {
	let datas = req.body.datas;
	let cat_id = req.params.cat_id;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"cat_id":cat_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.1.controllers-category-general-speciality->update ", "message": error_send } ); 
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
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controllers-category-general-speciality->update ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if((check_datas_result.owner_cat != "1" )  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-general-speciality->update ", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin" && datas.category_general_speciality_admin_status == 1){
			Object.assign(datas,  { 'category_general_speciality_update_status' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.3_controller_brands>update", "message": error_send } ); 
			return;
	}		
	
		
		
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		if(check_datas_result.user_role != "admin" && datas.category_general_speciality_admin_status == 3){
			Object.assign(datas,  { 'category_general_speciality_admin_status' : 2 } );
		} else if(check_datas_result.user_role != "admin" && datas.category_general_speciality_admin_status != 3){
			delete datas.category_general_speciality_admin_status;
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.4_controller_brands>update", "message": error_send } ); 
			return;
	}		
	
			
	
	
	
	//@
	try {
		models_category_gemeral_speciality.update_category_general_speciality(datas,cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-category-general-speciality->update ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data, vui lòng thao tác lại. hoặc liên hệ bộ phận cskh " );
			res.send({ "error" : "1.5.controllers-category-general-speciality->update ", "message": error_send } ); 
			return;	
	}	
}
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async function delete_category_general_speciality(req, res, next) {
	let cat_id = req.params.cat_id;
	let token = req.headers['token'];

	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		'cat_id':cat_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "1.1.controllers-category-general-speciality->delete ", "message": error_send } ); 
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
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, check_datas_result.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "1.2.controllers-category-general-speciality->delete ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_cat != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-general-speciality->delete ", "message": error_send } ); 
		return;			
	}	




	//@
	//@
	//@
	//kiem tra nếu có danh mục con thì không xoá
	let check_child_cat;
	try {
		let data_check_child = ojs_datas_category.get_data_check_child(cat_id); 
		//@
		//@
		check_child_cat = await  models_category_gemeral_speciality.search(data_check_child).then( results => {
			if(typeof results.error == 'string' && results.error ){ 
				return  { "error" : "1_store_check", "message" : results } ;
			}else{
				if(Object.entries(results).length  > 0){
					return {"error":"2_store_check","message":" danh mục đã có danh mục con không thể xoá"} 
				}else{
					return {"error":"","message":"ok"} 
				}
			}
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "55->controllers-category-general-speciality->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "56->controllers-category-general-speciality->delete", "message": error_send } ); 
			return;	
	}	

	if(check_child_cat.error.length > 0) { res.send(check_child_cat); return ;}


	//@
	//@xoa'
	try {
		models_category_gemeral_speciality.delete_category_general_speciality(cat_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-category-general-speciality->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
		res.send({ "error" : "1.5.controllers-category-general-speciality->delete ", "message": error_send } ); 
		return;	
	}	
}

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
async  function search(req, res, next) {
	let datas = req.body;
	
	//res.send( { "error" : datas, "datas" :datas } );
	//return;

	try {
		models_category_gemeral_speciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "51->controllers-category-general-speciality->search", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			evn = "dev"
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "52->controllers-category-general-speciality->search", "message": error_send } ); 
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
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























