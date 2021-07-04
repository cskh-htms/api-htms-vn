
/*

* 1. [insert_coupon_speciality]

* 2. [get_all_coupon_speciality]

* 3. [get_one_coupon_speciality]

* 4. [update_coupon_speciality]

* 5. [delete_coupon_speciality]

* 6. [search]



*/


//@ app express
const express = require('express');
const router = express.Router();

//@
//@
//@
//npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database model
const default_field = require('../const-tables/const-tables-coupon-speciality');


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
const models_coupon_speciality = require('../models/models-coupon-speciality');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_coupon_speciality]
async function insert_coupon_speciality(req, res, next) {
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
		if(!datas.coupon_speciality_stores_id_created){
			res.send({ "error" : "1" , "message" : " Chưa nhập id cửa hàng ( coupon_speciality_stores_id_created ) " });
			return;
		}
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-coupon_speciality->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.coupon_speciality_stores_id_created
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-coupon_speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	|| check_datas_result.owner_store == "1" 
	
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-coupon_speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
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
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "controllers-coupon_speciality->insert->check data->number_error : 2 ", "message": error_send } ); 
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_coupon_speciality.insert_coupon_speciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controllers-coupon_speciality->insert->model-run->number_error : 1 ", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert coupon_speciality , Liên hệ admin" );
		res.send({ "error" : "controllers-coupon_speciality->insert->model-run->number_error : 2 ", "message": error_send } ); 
		return;
	}		
}


//@ end of 1. [insert_coupon_speciality]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_coupon_speciality_store]
async  function get_all_coupon_speciality(req, res, next) {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-store->get_all->request->error_number : 1", "message": error_send } ); 
		return;	
	}	
	
	//@
	//@
	//@
	//@
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-store->get_all-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-store->get_all-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	try {
		models_coupon_speciality.get_all_coupon_speciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list coupon_speciality" );
			res.send( { "error": "controllers-store->get_all-> check owner->number_error : 2", "message" : error_send  } );	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list coupon_speciality" );
		res.send( { "error": "controllers-store->get_all-> check owner->number_error : 3", "message" : error_send  } );
	}	
}

//@ end of * 2. [get_all_coupon_speciality_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_coupon_speciality]
async  function get_one_coupon_speciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var coupon_speciality_id = req.params.coupon_speciality_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"coupon_speciality_id":coupon_speciality_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send(check_datas_result);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_coupon_speciality == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default"	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-coupon_speciality->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_coupon_speciality.get_one_coupon_speciality(coupon_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-coupon_speciality->get_one->model-run -> error_number : 1", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-coupon_speciality->get_one->model-run -> error_number : 2", "message": error_send } ); 
			return;	
	}	
}

//@ end of * 3. [get_one_coupon_speciality]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_coupon_speciality]
async  function update_coupon_speciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var coupon_speciality_id = req.params.coupon_speciality_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"coupon_speciality_id":coupon_speciality_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_coupon_speciality == "1" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-coupon_speciality->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var coupon_speciality_check = await models_coupon_speciality.get_one_coupon_speciality(coupon_speciality_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(coupon_speciality_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, coupon_speciality_check.error, "lỗi truy xuất database coupon_speciality, liên hệ admin dala" );
			res.send( { "error": "controllers-coupon_speciality->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(coupon_speciality_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có cửa hàng" );
			res.send( { "error": "controllers-coupon_speciality>check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database coupon_speciality" );
		res.send( { "error": "controllers-coupon_speciality->check-pushplic -> model-run -> error_number : 3", "message" : error_send  } );
		return;
	}			
	
	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		
		if(check_datas_result.user_role != "admin" && coupon_speciality_check[0].coupon_speciality_status_admin == "1"){
			res.send({ "error" : "controllers-coupon_speciality->update->loc datas -> error_number : 1", "message": "coupon đã chạy không update" } ); 
			return;			
		}
		
		//neu khong phai admin thi remove admin status
		//remove status update
		if(check_datas_result.user_role != "admin"){
			delete datas.coupon_speciality_status_admin;
			delete datas.coupon_speciality_status_update;
		}		
		
		
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'coupon_speciality_status_update' : 1 });
		}
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi xoá status, liên hệ admin","Lỗi xoá status, liên hệ admin" );
		res.send({ "error" : "controllers-coupon_speciality->update->loc datas -> error_number : 4", "message": error_send } ); 
		return;
	}



	//@
	try {
		models_coupon_speciality.update_coupon_speciality(datas,coupon_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controller_store->models_coupon_speciality.update_coupon_speciality->error_number : 1", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "controller_store->models_coupon_speciality.update_coupon_speciality->error_number : 2", "message": error_send } ); 
			return;
	}	
}

//@@ * end of  4. [update_coupon_speciality]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_coupon_speciality]
async  function delete_coupon_speciality(req, res, next) {
	//@
	//@
	//@	get datas req
	try {
		var coupon_speciality_id = req.params.coupon_speciality_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"coupon_speciality_id":coupon_speciality_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_coupon_speciality == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-coupon_speciality->delete->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var coupon_speciality_check = await models_coupon_speciality.get_one_coupon_speciality(coupon_speciality_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(coupon_speciality_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn, coupon_speciality_check.error, "lỗi truy xuất database coupon_speciality, liên hệ admin dala" );
			res.send( { "error": "controllers-coupon_speciality->delete->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(coupon_speciality_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có cửa hàng", "Không có cửa hàng" );
			res.send( { "error": "controllers-coupon_speciality>delete->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database coupon_speciality" );
		res.send( { "error": "controllers-coupon_speciality->delete->check-pushplic -> model-run -> error_number : 3", "message" : error_send  } );
		return;
	}			
	



	//@
	//@
	// nếu không pahỉ admin - và cửa hàng đã pushlic thì ko  cho xoa
	if(check_datas_result.user_role != "admin"){
		if(coupon_speciality_check[0].coupon_speciality_status_admin == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";		
			var error_send = ojs_shares_show_errors.show_error( evn, " Cửa hàng đã pushlist khong thể xoá", "Cửa hàng đã pushlist khong thể xoá" );
			res.send( { "error": "controllers-coupon_speciality->delete->check-pushplic -> model-run -> error_number : 5", "message" : error_send  } );
			return;
		}
	}		
	

	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_coupon_speciality.delete_coupon_speciality(coupon_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-coupon_speciality->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "2.6.model_sotres->coupon_speciality/delete ", "message": error_send } ); 
			return;	
	}	
}
//@* end of  5. [delete_coupon_speciality]






//@@
//@@
//@@
//6. [search] 
async  function search(req, res, next) {
	
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

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_coupon_speciality>search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search store theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var coupon_speciality_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "coupon_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							coupon_speciality_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controller_coupon_speciality>search->check_condition_id -> error_number : 2", "message": error_send } ); 
		return;			
	}		
	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"coupon_speciality_id":coupon_speciality_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-coupon_speciality->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job"
		|| check_datas_result.user_role == "default"		
		|| check_datas_result.user_role == "bussiness" 
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có admin mới search all", "Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
			res.send({ "error" : "controllers-store->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_coupon_speciality == "1" 
		||  check_datas_result.user_role == "admin" 
		||  check_datas_result.user_role == "supper-job"
		|| check_datas_result.user_role == "default"		
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-coupon_speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_coupon_speciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "2_controller_coupon->search -> 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "2_controller_coupon->search-> 2", "message": error_send } ); 
			return;	
	}

}

//end of 6. [search] 









module.exports = { 
		search,
		insert_coupon_speciality,
		get_one_coupon_speciality,
		update_coupon_speciality,
		delete_coupon_speciality,
		get_all_coupon_speciality
};

























