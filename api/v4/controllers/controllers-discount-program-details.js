
/*

* 1. [insert_discount_program_details]

* 2. [get_all_discount_program_details]

* 3. [get_one_discount_program_details]

* 4. [update_discount_program_details]

* 5. [delete_discount_program_details]

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
const default_field = require('../const-tables/const-tables-discount-program-details');


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
const models_discount_program_details = require('../models/models-discount-program-details');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_discount_program_details]
async function insert_discount_program_details(req, res, next) {
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
		//* nếu chưa có mã chương trình thì out
		if(!datas.discount_program_details_discount_program_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập id mã chương trình (discount_program_details_discount_program_id) " });
			return;
		}
		//@
		//@
		//* nếu chưa có mã cửa hàng thì oụt
		if(!datas.discount_program_details_store_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập id mã cửa hàng (discount_program_details_store_id) " });
			return;
		}		
		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-discount_program_details->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.discount_program_details_store_id
		}		
		
		
		//res.send(datas_check );	
		//return;		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-discount_program_details->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//res.send( check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin" || check_datas_result.owner_store == "1"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-discount_program_details->insert-> check owner->number_error : 2 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program_details->insert->check data->number_error : 2 ", "message": error_send } ); 
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_discount_program_details.insert_discount_program_details(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controllers-discount_program_details->insert->model-run->number_error : 1 ", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program_details , Liên hệ admin" );
		res.send({ "error" : "controllers-discount_program_details->insert->model-run->number_error : 2 ", "message": error_send } ); 
		return;
	}		
}


//@ end of 1. [insert_discount_program_details]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_discount_program_details_store]
async  function get_all_discount_program_details(req, res, next) {
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
		models_discount_program_details.get_all_discount_program_details().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program_details" );
			res.send( { "error": "controllers-store->get_all-> check owner->number_error : 2", "message" : error_send  } );	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program_details" );
		res.send( { "error": "controllers-store->get_all-> check owner->number_error : 3", "message" : error_send  } );
	}	
}

//@ end of * 2. [get_all_discount_program_details_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_discount_program_details]
async  function get_one_discount_program_details(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var discount_program_details_id = req.params.discount_program_details_id;
		
		//res.send(discount_program_details_id);
		//return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_details_id":discount_program_details_id
		}		
		
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		//res.send(check_datas_result);
		//return;		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_discount_program_details == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default"	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program_details->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_discount_program_details.get_one_discount_program_details(discount_program_details_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-discount_program_details->get_one->model-run -> error_number : 1", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-discount_program_details->get_one->model-run -> error_number : 2", "message": error_send } ); 
			return;	
	}	
}

//@ end of * 3. [get_one_discount_program_details]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_discount_program_details]
async  function update_discount_program_details(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var discount_program_details_id = req.params.discount_program_details_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	//res.send([datas,discount_program_details_id]);
	//return;	
	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_details_id":discount_program_details_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_discount_program_details == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program_details->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var discount_program_details_check = await models_discount_program_details.get_one_discount_program_details(discount_program_details_id);
		//res.send([discount_program_details_check]);
		//return;	
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(discount_program_details_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, discount_program_details_check.error, "lỗi truy xuất database discount_program_details, liên hệ admin dala" );
			res.send( { "error": "controllers-discount_program_details->check-pushplic -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(discount_program_details_check.length <= 0 ){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( 
			evn,"Không có cửa hàng", 
			"Không có cửa hàng" 
			);
			res.send( { "error": "controllers-discount_program_details>check-pushplic -> error_number : 1", "message" : error_send  } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database discount_program_details" );
		res.send( { "error": "controllers-discount_program_details->check-pushplic ->  error_number : 2", "message" : error_send  } );
		return;
	}			
	
	
	
	//@
	//@
	// nếu không pahỉ admin - và cửa hàng đã pushlic thì ko  cho xoa
	if(check_datas_result.user_role != "admin"){
		if(discount_program_details_check[0].discount_program_details_status_admin == "4"){
			var evn = ojs_configs.evn;
			//evn = "dev";		
			var error_send = ojs_shares_show_errors.show_error( evn, " Cửa hàng đã pushlist khong thể update", "Cửa hàng đã pushlist khong thể update" );
			res.send( { "error": "controllers-discount_program_details->delete->check-pushplic -> model-run -> error_number : 5", "message" : error_send  } );
			return;
		}
	}		
	
	
	
	
	
	//res.send(discount_program_details_check);
	//return;



	//@
	try {
		models_discount_program_details.update_discount_program_details(datas,discount_program_details_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controller_store->models_discount_program_details.update_discount_program_details->error_number : 1", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "controller_store->models_discount_program_details.update_discount_program_details->error_number : 2", "message": error_send } ); 
			return;
	}	
}

//@@ * end of  4. [update_discount_program_details]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_discount_program_details]
async  function delete_discount_program_details(req, res, next) {
	//@
	//@
	//@	get datas req
	try {
		var discount_program_details_id = req.params.discount_program_details_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_details_id":discount_program_details_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_discount_program_details == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program_details->delete->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var discount_program_details_check = await models_discount_program_details.get_one_discount_program_details(discount_program_details_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(discount_program_details_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, discount_program_details_check.error, "lỗi truy xuất database discount_program_details, liên hệ admin dala" );
			res.send( { "error": "controllers-discount_program_details->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(discount_program_details_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( 
			evn,"Không có cửa hàng", 
			"Không có cửa hàng" 
			);
			res.send( { "error": "controllers-discount_program_details>check-pushplic -> error_number : 2", "message" : error_send  } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database discount_program_details" );
		res.send( { "error": "controllers-discount_program_details->check-pushplic -> model-run -> error_number : 3", "message" : error_send  } );
		return;
	}			
	
	
	//res.send(discount_program_details_check);
	//res.send(discount_program_details_check);
	//return;



	//@
	//@
	// nếu không pahỉ admin - và cửa hàng đã pushlic thì ko  cho xoa
	if(check_datas_result.user_role != "admin"){
		if(discount_program_details_check[0].discount_program_details_status == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";		
			var error_send = ojs_shares_show_errors.show_error( evn, " nội dung đã pushlist khong thể xoá", "nội dung đã pushlist khong thể xoá" );
			res.send( { "error": "controllers-discount_program_details->delete->check-pushplic -> model-run -> error_number : 5", "message" : error_send  } );
			return;
		}
	}		
	

	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_discount_program_details.delete_discount_program_details(discount_program_details_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-discount_program_details->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "2.6.model_sotres->discount_program_details/delete ", "message": error_send } ); 
			return;	
	}	
}
//@* end of  5. [delete_discount_program_details]






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
		res.send({ "error" : "controller_discount_program_details>search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search store theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var discount_program_details_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "discount_program_details_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							discount_program_details_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controller_discount_program_details>search->check_condition_id -> error_number : 2", "message": error_send } ); 
		return;			
	}		
	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_details_id":discount_program_details_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-discount_program_details->search->check-role -> error_number : 2", "message": error_send } ); 
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
		if( check_datas_result.owner_discount_program_details == "1" 
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "default"  	
		|| check_datas_result.user_role == "bussiness" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-discount_program_details->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_discount_program_details.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : error, "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "2_controller_store->search", "message": error_send } ); 
			return;	
	}

}

//end of 6. [search] 









module.exports = { 
		search,
		insert_discount_program_details,
		get_one_discount_program_details,
		update_discount_program_details,
		delete_discount_program_details,
		get_all_discount_program_details
};

























