/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_category_gemeral_speciality = require('../models/models-category-gemeral-speciality');
const models_category_general_speciality_link = require('../models/models-category-gemeral-speciality-link');


const default_field = require('../const-tables/const-tables-category-general-speciality');



const ojs_datas_category = require('../../../models/ojs-datas-category.js');





//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');


const jwt    = require('jsonwebtoken');
/*
@@@@
@@@@@
@@@@@
@@@@@
*/



//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async function insert_category_general_speciality(req, res, next) {

	let datas = req.body.datas;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id": datas.category_general_speciality_stores_id
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.1.controllers-category-general-speciality->insert ", "message": error_send } ); 
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controllers-category-general-speciality->insert ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-general-speciality->insert ", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1.4.controllers-category-general-speciality->insert->check", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi data assign, liên hệ admin" );
		res.send({ "error" : "1.5.controllers-category-general-speciality->insert ", "message": error_send } ); 
		return;	
	}			
	//res.send(datas);
	

	//@
	//@
	//kiem tra quyen insert- neu admin thi cho inser con khong thi kocho insert
	//let check_role = ojs_shares.check_admin(token_decode.users_users_type_id);
	//if(check_role != "admin-ne"){}
	//@
	try {
		models_category_gemeral_speciality.insert_category_general_speciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-category-general-speciality->insert ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lưu data, liên hệ admin" );
		res.send({ "error" : "1.7.controllers-category-general-speciality->insert ", "message": error_send } ); 
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
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
			var error_send = ojs_shares.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
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
			var error_send = ojs_shares.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
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
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-category-general-speciality->update ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lưu data, vui lòng thao tác lại. hoặc liên hệ bộ phận cskh " );
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
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
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
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
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
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
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
			var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "55->controllers-category-general-speciality->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
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
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-category-general-speciality->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại");
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
//get all category chung
async function get_all_category_general_speciality(req, res, next) {
	//@
	//@
	//@
	//@
	try {
		models_category_gemeral_speciality.get_all_category_general_speciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "1.1->controllers-category-general-speciality->get all", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "1.2->controllers-category-general-speciality->get all", "message": error_send } ); 
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
//get all category chung
async function get_one_category_general_speciality(req, res, next) {
	let cat_id = req.params.cat_id;
	//res.send({ "title" : "welcomesdasd" });
	//return;
	//@
	try {
		models_category_gemeral_speciality.get_one_category_general_speciality(cat_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}	
}
//
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
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category" );
			res.send({ "error" : "51->controllers-category-general-speciality->search", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy dữ liệu category" );
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























