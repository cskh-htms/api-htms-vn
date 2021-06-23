
/*




* 1. [insert_products]

* 2. [get_all_products]

* 3. [get_one_products]

* 4. [update_products]

* 5. [delete_products]

* 6. [search]

* 7. [search_all]

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
const default_field = require('../const-tables/const-tables-products-spaciality');


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
const models_products_spaciality = require('../models/models-products-spaciality');





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



//@
//@
//@
//@
//@
//@ * 1. [insert_products]
async function insert_products_spaciality(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var cat_string = req.body.cat_string;
		var option_string = req.body.option_string;
		var token = req.headers['token'];
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.products_speciality_store_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã cửa hàng (store_id) " });
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-products-spaciality->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}		
	
	
	//res.send([datas,cat_string,option_string]);
	//return;
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.products_speciality_store_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-product-speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-product-speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
			
			
	//res.send([check_datas_result]);
	//return;			
			
	//@
	//@
	//@
	//@
	//@
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-product-speciality->insert-> check data->number_error : 1", "message": error_send } ); 
		return;	
	}	


	//res.send([datas_assign]);
	//return;	
	
	//@	
	//@	
	//@	
	//@ run model
	try {
		models_products_spaciality.insert_products_spaciality(datas_assign,cat_string,option_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controllers-product-speciality->insert-> run model->number_error : 2", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-product-speciality->insert-> run model->number_error : 3", "message": error_send } ); 
		return;	
	}	
}


//@ * end of 1. [insert_products]












//@
//@
//@
//@
//@ * 2. [get_all_products]
async function get_all_products_spaciality(req, res, next) {
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
		res.send({ "error" : "controllers-product-speciality->get_all->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-product-speciality->check-role->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job"  || check_datas_result.user_role == "default"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-product-speciality->get_all->check-role -> error_number : 3", "message": error_send } ); 
		return;				
	}
	
	
	//@
	//@
	//@
	//@ run model
	try {
		models_products_spaciality.get_all_products_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
			res.send({ "error" : "controllers-product-speciality->get_all->run -> error_number : 1", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "controllers-product-speciality->get_all->run -> error_number : 2", "message": error_send } ); 
		return;		
	}	
}
//@
//@ * end of 2. [get_all_products]









//@
//@
//@
//@
//@
//@ * 3. [get_one_products]
async function get_one_products_spaciality(req, res, next) {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var product_id = req.params.product_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
	
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_product == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-products-speciality->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	

	
	//@
	//@
	//@
	//@ run 
	try {
		models_products_spaciality.get_one_products_spaciality(product_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get products");
			res.send({ "error" : "controllers-products-speciality->get_one->run -> error_number : 1", "message": error_send } ); 
		return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get products" );
		res.send({ "error" : "controllers-products-speciality->get_one->run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@
//@ * end of 3. [get_one_products]







//@
//@
//@
//@
//@
//@ * 4. [update_products]
async function update_products_spaciality(req, res, next) {
	
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var cat_string = req.body.cat_string;
		var option_string = req.body.option_string;
		var product_id = req.params.product_id;
		var token = req.headers['token'];		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_product == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-products-speciality->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_products_spaciality.get_one_products_spaciality(product_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 3", "message" : error_send  } );
		return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas,  { 'products_speciality_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-products-speciality->update->xac minh update -> error_number : 1", "message": error_send } ); 
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
			delete datas.products_speciality_status_store;
			delete datas.products_speciality_status_admin;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].products_speciality_status_update == "1"){
			Object.assign(datas,  { 'products_speciality_status_admin' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'products_speciality_status_update' : 1 });
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-products-speciality->update->xac minh update -> error_number : 2", "message": error_send } ); 
		return;
	}		
	
		
	//@
	//@
	//@
	//@ check data
	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi check datas" );
		res.send({ "error" : "controllers-products-speciality->update->check datas -> error_number : 1", "message": error_send } ); 
		return;
	}			

	
	//@
	//@
	//@
	try {
		models_products_spaciality.update_products_spaciality(datas,product_id,cat_string, option_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-products-speciality->update->model-run -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-products-speciality->update->model-run -> error_number : 2", "message": error_send } ); 
		return;		
	}	
}
//@
//@ * end of  4. [update_products]





//@
//@
//@
//@
//@ * 5. [delete_products]
async function delete_products_spaciality(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var product_id = req.params.product_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_products_spaciality.get_one_products_spaciality(product_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-products-speciality->check-pushplic -> model-run -> error_number : 3", "message" : error_send  } );
		return;
	}		
	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữu và option chưa pusplish
	if(check_datas_result.user_role == "admin"  
	|| (check_datas_result.owner_product == "1" 
	&&  push_check[0].brands_status_admin == 0 ) 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, hoặc products đã puplish", 
			"Bạn không đủ quyền thao tác,hoặc option đã puplish" );
			
		res.send({ 
			"error" : "controllers-products-speciality-speciality->delete->get req -> error_number : 3", 
			"message": error_send 
			}); 
		return;			
	}		
			
	

	//@
	//@
	//@
	//@run model
	try {
		models_products_spaciality.delete_products_spaciality(product_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-products-speciality-speciality->delete->run -> error_number : 1 ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-products-speciality-speciality->delete->run -> error_number : 12", "message": error_send } ); 
		return;		
	}	

}
//@
//@ * end of  5. [delete_products]


















//@
//@
//@
//@
//@ * 6. [search]search
async function search(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-products-speciality>search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var product_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "products_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							product_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controllers-products-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
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
				"product_id":product_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" || check_datas_result.user_role == "default"){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "controllers-products-speciality->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_product == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job"
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-products-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	
		
	

	//@
	//@
	//@
	// run model
	try {
		models_products_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
				res.send({ "error" : "controllers-products-speciality->search->run model -> error_number : 1", "message": error_send } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-products-speciality->search->run model -> error_number : 2", "message": error_send } ); 
		return;	
	}

}
//@
//@ * end of 6. [search]







//@
//@
//@
//@
//@ * 7. [search_all]
async function search_all(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		if(!datas.select_field || datas.select_field.length <= 0){
			res.send({ "error" : "controllers-products-speciality>search_all->get req -> error_number : 1", "message": "Vui lòng chọn fields" } ); 
			return;			
		}
		
		
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-products-speciality>search_all->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search_all option theo id
	//@ nếu search_all theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search_all theo id thì phải là admin mới dc search_all
	try{
		var check_condition_id = 0;
		var product_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "products_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							product_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controllers-products-speciality->search_all->check_condition_id -> error_number : 2", "message": error_send } ); 
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
				"product_id":product_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-products-speciality->search_all->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" || check_datas_result.user_role == "default"){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search_all all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search_all all" );
			res.send({ "error" : "controllers-products-speciality->search_all->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_product == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job"
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-products-speciality->search_all->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	
		
	

	//@
	//@
	//@
	// run model
	try {
		models_products_spaciality.search_all(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
				res.send({ "error" : "controllers-products-speciality->search_all->run model -> error_number : 1", "message": error_send } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-products-speciality->search_all->run model -> error_number : 2", "message": error_send } ); 
		return;	
	}

}
//@
//@ * end of 7. [search_all]










/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_products_spaciality,
	get_one_products_spaciality,
	update_products_spaciality,
	insert_products_spaciality,
	delete_products_spaciality,
	search,
	search_all
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

























