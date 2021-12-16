
/*

* 1. [insert_store]

* 2. [get_all_stores]

* 3. [get_one_stores]

* 4. [update_stores]

* 5. [delete_stores]

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
const default_field = require('../const-tables/const-tables-stores');


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
const models_stores = require('../models/models-stores');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_stores]
async function insert_stores(req, res, next) {
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
		if(!datas.stores_user_id){
			res.send({ "error" : "1", "position":"ctl-stores->insert", "message": " Chưa nhập id uders bussiness (stores_user_id) " } );
			return;
		}
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-stores->insert", "message": error_send } );
		return;	
	}	


	//res.send(datas_check );	
	//return;	 
	
	try{
		var datas_check = {
			"token":token,
			"user_id": datas.stores_user_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3", "position":"ctl-stores->insert", "message": error_send } );
		return;			
	}
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4", "position":"ctl-stores->insert", "message": error_send } ); 
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
			res.send({ "error" : "5", "position":"ctl-stores->insert", "message": data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "6", "position":"ctl-stores->insert", "message": error_send } ); 
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_stores.insert_stores(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-stores->insert", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert stores , Liên hệ admin" );
		res.send({ "error" : "8", "position":"ctl-stores->insert", "message": error_send } ); 
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	////evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert stores , Liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-stores->insert", "message": error_send } ); 
	return;
}		
}


//@ end of 1. [insert_stores]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_stores_store]
async  function get_all_stores(req, res, next) {
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-stores->get all", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-stores->get all", "message": error_send } );
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-stores->get all", "message": error_send } );
		return;			
	}			
	
	
	//@
	//@
	//@
	//@

	try {
		var store_data = await models_stores.get_all_stores();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list stores" );
		res.send({ "error" : "5", "position":"ctl-stores->get all", "message": error_send } );
		return;
	}
	
	
	//res.send({ "error" : "", "datas": store_data } );
	//return;	
	
	
	
	//@
	//@ get product sale
	try {
		var store_data_sale = await models_stores.get_all_sale();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list stores sale" );
		res.send({ "error" : "6", "position":"ctl-stores->get-all->get_all_sale", "message": error_send } );
		return;
	}	
	
	
	//res.send({ "error" : "", "datas": store_data_sale } );
	//return;	
	
	//@
	//@
	//@
	//@ gôm data return	
	var add_data = [];
	for(x in store_data){
		for(y in store_data_sale){
			if(store_data[x].stores_ID == store_data_sale[y].stores_ID){
				add_data = [{ "so_luong_ban":store_data_sale[y].qty}, {"tong_tien_ban":store_data_sale[y].price }];
			}							
		}
		store_data[x].da_ban = add_data;
	}	
	
	res.send({ "error" : "", "datas": store_data } );
	return;		
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list stores" );
	res.send({ "error" : "113", "position":"ctl-stores->get all", "message": error_send } );
	return;
}		
}

//@ end of * 2. [get_all_stores_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_stores]
async  function get_one_stores(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var store_id = req.params.store_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-stores->get one", "message": error_send } );
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"store_id":store_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-stores->get one", "message": error_send } );
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_store == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-stores->get one", "message": error_send } );
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		var store_data = await models_stores.get_one_stores(store_id);
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-stores->get one", "message": error_send } );
			return;	
	}
	
	
	//res.send({ "error" : "", "datas": store_data } );
	//return;		
	
	
	//@
	//@ get product sale
	try {
		var store_data_sale = await models_stores.get_all_sale_by_id(store_id);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list stores sale" );
		res.send({ "error" : "6", "position":"ctl-stores->get-all->get_one_sale_by id", "message": error_send } );
		return;
	}	
	
	
	store_data[0].so_luong_ban = store_data_sale;
	
	
	
	
	res.send({ "error" : "", "datas": store_data } );
	return;	
	
	//@
	//@
	//@
	//@ gôm data return	
	var add_data = [];
	for(x in store_data){
		for(y in store_data_sale){
			if(store_data[x].stores_ID == store_data_sale[y].stores_ID){
				add_data = [{ "so_luong_ban":store_data_sale[y].qty}, {"tong_tien_ban":store_data_sale[y].price }];
			}							
		}
		store_data[x].da_ban = add_data;
	}	
	
	res.send({ "error" : "", "datas": store_data } );
	return;		
	
	
	
	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-stores->get one", "message": error_send } );
		return;	
}		
}

//@ end of * 3. [get_one_stores]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_stores]
async  function update_stores(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var store_id = req.params.store_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-stores->delete", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"store_id":store_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-stores->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_store == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-stores->delete", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var stores_check = await models_stores.get_one_stores(store_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(stores_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, stores_check.error, "lỗi truy xuất database stores, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-stores->delete", "message": error_send } ); 
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(stores_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-stores->delete", "message": error_send } ); 
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database stores" );
		res.send({ "error" : "6", "position":"ctl-stores->delete", "message": error_send } ); 
		return;
	}			
	
	
	
	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		//neu khong phai admin thi remove admin status
		//remove status update
		if(check_datas_result.user_role != "admin"){
			delete datas.stores_status_admin;
			delete datas.stores_status_update;
		}		
		
		
		
		if(check_datas_result.user_role != "admin" && stores_check[0].stores_status_update == "1"){
			Object.assign(datas, { 'stores_status_admin' : 2 });
		}
		
		
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'stores_status_update' : 1 });
		}
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi xoá status, liên hệ admin","Lỗi xoá status, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-stores->delete", "message": error_send } ); 
		return;
	}



	//@
	try {
		models_stores.update_stores(datas,store_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "8", "position":"ctl-stores->delete", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "9", "position":"ctl-stores->delete", "message": error_send } ); 		
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-stores->delete", "message": error_send } ); 
		return;
}	
	
}

//@@ * end of  4. [update_stores]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_stores]
async  function delete_stores(req, res, next) {
try {
	//@
	//@
	//@	get datas req
	try {
		var store_id = req.params.store_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-stores->delete", "message": error_send } );  
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"store_id":store_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-stores->delete", "message": error_send } );  
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_store == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-stores->delete", "message": error_send } );  
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var stores_check = await models_stores.get_one_stores(store_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(stores_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn, stores_check.error, "lỗi truy xuất database stores, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-stores->delete", "message": error_send } );  
			return;
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(stores_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có cửa hàng", "Không có cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-stores->delete", "message": error_send } );  
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database stores" );
		res.send({ "error" : "6", "position":"ctl-stores->delete", "message": error_send } );  
		return;
	}			
	



	//@
	//@
	// nếu không pahỉ admin - và cửa hàng đã pushlic thì ko  cho xoa
	if(check_datas_result.user_role != "admin"){
		if(stores_check[0].stores_status_update == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";		
			var error_send = ojs_shares_show_errors.show_error( evn, " Cửa hàng đã pushlist khong thể xoá", "Cửa hàng đã pushlist khong thể xoá" );
			res.send({ "error" : "7", "position":"ctl-stores->delete", "message": error_send } );  
			return;
		}
	}		
	

	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_stores.delete_stores(store_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "8", "position":"ctl-stores->delete", "message": error_send } );  
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "9", "position":"ctl-stores->delete", "message": error_send } );  
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-stores->delete", "message": error_send } );  
		return;	
}		
}
//@* end of  5. [delete_stores]






//@@
//@@
//@@
//6. [search] 
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

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-stores->search", "message": error_send } );  
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search store theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var store_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "stores_ID"  
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
		res.send({ "error" : "2", "position":"ctl-stores->search", "message": error_send } );  
		return;			
	}		
	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"store_id":store_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-stores->search", "message": error_send } );  
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
		
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all",
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
			res.send({ "error" : "4", "position":"ctl-stores->search", "message": error_send } );  
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_store == "1" 
		||  check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user",
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-stores->search", "message": error_send } );  
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		var store_data = await models_stores.search(datas);
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "7", "position":"ctl-stores->search", "message": error_send } );  
			return;	
	}
	
	
	//res.send({ "error" : "", "datas": store_data} );
	//return;		
	
	
	
	
	
	//@
	//@ get product sale
	try {
		var store_data_sale = await models_stores.get_all_sale();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list stores sale" );
		res.send({ "error" : "6", "position":"ctl-stores->get-all->get_all_sale", "message": error_send } );
		return;
	}	
	
	
	//res.send({ "error" : "", "datas": store_data_sale } );
	//return;	
	
	//@
	//@
	//@
	//@ gôm data return	
	var add_data = [];
	for(x in store_data){
		for(y in store_data_sale){
			if(store_data[x].stores_ID == store_data_sale[y].stores_ID){
				add_data = [{ "so_luong_ban":store_data_sale[y].qty}, {"tong_tien_ban":store_data_sale[y].price }];
			}							
		}
		store_data[x].da_ban = add_data;
	}	
	
	res.send({ "error" : "", "datas": store_data } );
	return;			
	
	
	
	
	
	
	
	
	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-stores->search", "message": error_send } );  
		return;	
}	

}

//end of 6. [search] 









module.exports = { 
		search,
		insert_stores,
		get_one_stores,
		update_stores,
		delete_stores,
		get_all_stores
};

























