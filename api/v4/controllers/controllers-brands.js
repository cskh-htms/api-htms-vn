/*




* 1. [insert_brands]

* 2. [get_all_brands]

* 3. [get_one_brands]

* 4. [update_brands]

* 5. [delete_brands]

* 6. [search]



*/

//@
//@
//@
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
const default_field = require('../const-tables/const-tables-brands');


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
const models_brands = require('../models/models-brands');





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//@@
//@@
//@@
//@@
//@@
//@@
//@ * 1. [insert_brands]
async function insert_brands(req, res, next) {
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
		if(!datas.brands_stores_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã cửa hàng (store_id) " });
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-brands->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	


	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.brands_stores_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-brands->insert-> check owner->number_error : 1 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-brands->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
		
	
	//@
	//@
	//@
	//@
	
	try {
		var datas_assign;
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi Check data, vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-brands->check-data->insert-> error_number : 1 ", "message": error_send } ); 
		return;		
	}			
	
	
	//@
	//@
	//@
	//@ run model
	try {
		models_brands.insert_brands(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-brands->run model->insert-> error_number : 1  ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-brands->run model->insert-> error_number : 2", "message": error_send } ); 
		return;		
	}	
}


//@ end of * 1. [insert_brands]




//@
//@
//@
//@
//@
//@ end of * 2. [get_all_brands]
async function get_all_brands(req, res, next) {
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
		res.send({ "error" : "controllers-brands->get_all->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-brands->check-role->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-brands->get_all->check-role -> error_number : 3", "message": error_send } ); 
		return;				
	}
	
	//@
	//@
	//@
	//@ run model
	try {
		models_brands.get_all_brands().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Bạn không đủ quyền thao tác" );
			res.send({ "error" : "controllers-brands->get_all->run-model -> error_number : 3", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Bạn không đủ quyền thao tác" );
			res.send({ "error" : "controllers-brands->get_all->run-model -> error_number : 4", "message": error_send } ); 
			return;	
	}	
}
//@ end of * 2. [get_all_brands]



//@
//@
//@
//@
//@
//@ * 3. end of [get_one_brands]
async function get_one_brands(req, res, next) {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var brand_id = req.params.brand_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-brands->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"brand_id":brand_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-brands->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_brand == "1" || check_datas_result.user_role == "supper-job"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-brands->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
		
	
	//@
	//@
	//@
	//@ run model
	try {
		models_brands.get_one_brands(brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data brands" );
			res.send({ "error" : "controllers-brands->get_one->run-model -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data brands" );
		res.send({ "error" : "controllers-brands->get_one->run-model -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}

//@ * 3. end of [get_one_brands]







//@
//@
//@
//@
//@
//@ * 4. [update_brands]
async function update_brands(req, res, next) {
	
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var brand_id = req.params.brand_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-brands->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"brand_id":brand_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-brands->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_brand == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-brands->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_brands.get_one_brands(brand_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-brands->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-brands->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-brands->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );
		return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas,  { 'brands_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-brands->update->xac minh update -> error_number : 1", "message": error_send } ); 
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
			delete datas.brands_status_stores;
			delete datas.brands_status_admin;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].brands_status_update == "1"){
			Object.assign(datas,  { 'brands_status_admin' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'brands_status_update' : 1 });
		}		
	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-brands->update->xac minh update -> error_number : 2", "message": error_send } ); 
			return;
	}		
	
	
	
	
	
	
	//@
	//@
	//@
	//@	
	//@ run model
	try {
		models_brands.update_brands(datas,brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "6.4.controller_brands>updatee ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.5_controller_brands>update", "message": error_send } ); 
			return;
	}	
}
//@
//@ * 4. end of [update_brands]






//@
//@
//@
//@
//@
//@ * 5. [delete_brands]
async function delete_brands(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var brand_id = req.params.brand_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-brands->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"brand_id":brand_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-brands->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_brands.get_one_brands(brand_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-brands->check-pushplic-delete -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-brands->check-pushplic -delete--> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-brands->check-pushplic -delete -> model-run -> error_number : 2", "message" : error_send  } );
		return;
	}	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữu và option chưa pusplish
	if(check_datas_result.user_role == "admin"  
	|| (check_datas_result.owner_brand == "1" 
	&&  push_check[0].brands_status_admin == 0 ) 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, hoặc option đã puplish", 
			"Bạn không đủ quyền thao tác,hoặc option đã puplish" );
			
		res.send({ 
			"error" : "controllers-brands-speciality->delete->get req -> error_number : 3", 
			"message": error_send 
			}); 
		return;			
	}		
		
	

	//@
	//@
	//@
	//@run model
	try {
		models_brands.delete_brands(brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-brands->delete->run model -> error_number : 1", "message": error_send } ); 
			return;	
		});			
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-brands->delete->run model -> error_number : 2", "message": error_send } ); 
			return;		
	}	
}

//@
//@ * end of  5. [delete_brands]











//@
//@
//@
//@
//@
// * 6. [search]
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
		res.send({ "error" : "controller_brands>search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var brand_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "brands_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							brand_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controller_brands->search->check_condition_id -> error_number : 2", "message": error_send } ); 
		return;			
	}		
	

	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	
	try{
		
		if(check_condition_id == 1){
			var datas_check = {
				"token":token,
				"brand_id":brand_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-brand->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}


	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job"){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "controllers-brands->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_brand == "1" ||  check_datas_result.user_role == "admin"){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-brands->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@
	//@ run model
	try {
		models_brands.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-brands->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
		res.send({ "error" : "controllers-brands->search->check_condition_id -> error_number : 2", "message": error_send } ); 
		return;	
	}
}


// * end of 6. [search]




/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_brands,
	get_one_brands,
	update_brands,
	insert_brands,
	delete_brands,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























