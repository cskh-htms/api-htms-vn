/*




* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

* 6. [search]

* 7. [search_customer]

* 8. [search_user]

* 9. [send_order_sms]

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
const default_field = require('../const-tables/const-tables-orders-spaciality');


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
const models_orders_spaciality = require('../models/models-orders-spaciality');
const ojs_shares_send_code_to_phone = require('../../../models/ojs-shares-send-code-to-phone');




//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@
//@
//@ * 8. [send_order_sms]
async  function send_order_sms(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->send_order_sms", "message":  error_send  } ); 
		return;			
	}	

	/////////////////////////////////////////////////////////////////////////////////////////////////////	


	//res.send([datas.order_id,datas.phone_number]);
	//return;


	//@
	//@
	//@
	//@
	try {
		var send_result = await ojs_shares_send_code_to_phone.send_code_to_phone_order(res,datas.order_id,datas.phone_number);
		res.send(send_result);
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->send_order_sms", "message":  error_send  } );  
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->send_order_sms", "message":  error_send  } );  
	return;	
}
}
//@
//@ * end of 8. [send_order_sms]













//@
//@
//@
//@
//@
//@* 1. [insert_ordres_spaciality]
async  function insert_orders_spaciality(req, res, next) {
try{
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		
		//res.send([datas.orders.orders_speciality_user_id]);
		//return;	
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.orders.orders_speciality_user_id){
			res.send({ "error" : "1", "position":"ctl-orders-spaciality->insert", "message":  " Chưa nhập mã khách hàng "} );
			return;
		}
		if(!datas.orders_detail){
			res.send({ "error" : "1111", "position":"ctl-orders-spaciality->insert", "message":  " Chưa có data order "} );
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->insert", "message":  error_send  } );
		return;	
	}	


	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"user_id": datas.orders.orders_speciality_user_id
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
		return;			
	}
	
	var product_id = 0;
	for(let x  in datas.orders_detail){
		if(datas.orders_detail[x].orders_details_speciality_line_order == "product"){
			product_id = datas.orders_detail[x].orders_details_speciality_product_id
		}		
	}
		
		
	if(product_id == 0){
		res.send({ "error" : "12111", "position":"ctl-orders-spaciality->insert", "message":  " không tìm thấy sản phẩm đã mua "} );
		return;
	}			
		
	//res.send(check_datas_result);
	//return;			
	
	try{
		var get_store_id = await models_orders_spaciality.get_store_id(product_id);
		if(get_store_id.length > 0){
			var store_id = get_store_id[0].products_speciality_store_id;
			var store_name = get_store_id[0].stores_name;
			//res.send([store_name]);
			//return;				
			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không tìm thấy cửa hàng", "Không tìm thấy cửa hàng" );
			res.send({ "error" : "4", "position":"ctl-orders-speciality-insert", "message": error_send } ); 
			return;	
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lổi tìm cửa hàng" );
		res.send({ "error" : "5", "position":"ctl-orders-speciality-insert", "message": error_send } );
		return;				
	}		
	
	datas.orders.orders_speciality_store_id = store_id;
	
	//res.send([datas.orders]);
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_user == "1" 
	||  check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác", 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác" 
		);
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
		return;			
	}		
	
			
	//res.send(check_datas_result);
	//return;	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	
	//@
	//@
	//@
	//@
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas.orders);
		
		//neu data không hợp lệ thì return loi;
		let data_check = await default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->insert","message": data_check } ); 
			return;
		}
	}
	catch(error){
		env = ojs_configs.api_evn;
		//env = "dev";
		var error_send = ojs_shares_show_errors.show_error( env, error, "lỗi truy xuất database" );
		res.send({ "error" : "5", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
		return		
	}	
		
	
	//res.send(datas_assign);
	//return;	
	
	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality(datas_assign,datas.orders_detail).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			//
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "6", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
			return;	
		});
	}
	catch(error){
		env = ojs_configs.api_evn;
		//env = "dev";
		var error_send = ojs_shares_show_errors.show_error( env, error, "lỗi truy xuất database" );
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
		return		
	}	
	
}//error all
catch (error){
	env = ojs_configs.api_evn;
	//env = "dev";
	var error_send = ojs_shares_show_errors.show_error( env, error, "lỗi code, vui lòng liên hệ dala admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->insert","message": error_send } ); 
	return		
}
}
//@
//@* end of 1. [insert_ordres_spaciality]





//@
//@
//@
//@
//@ * 2. [get_all_orders_spaciality]
async  function get_all_orders_spaciality(req, res, next) {
try {
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
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } ); 
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } );  
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
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } ); 
		return;				
	}	


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@
	//@ run model
	try {
		models_orders_spaciality.get_all_orders_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
		res.send({ "error" : "5", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } );  
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->get_all", "message":  error_send  } );  
	return;	
}		
}

//@ * end of  2. [get_all_orders_spaciality]




//@
//@
//@
//@
//@ *3. [get_one_orders_spaciality]
async  function get_one_orders_spaciality(req, res, next) {
try {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var order_id = req.params.order_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"order_id":order_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } );
		return;			
	}
	
	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_order == "1" 
	|| check_datas_result.user_role == "supper-job"
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } );
		return;			
	}	
	
	
	
	
	//return;
	//@
	try {
		models_orders_spaciality.get_one_orders_spaciality(order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data order" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data order"  );
		res.send({ "error" : "5", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } );
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data order"  );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->get_one", "message":  error_send  } );
	return;	
}	
}
//@
//@ *3. end of [get_one_orders_spaciality]





//@
//@
//@
//@ *4. [updat_orders_spaciality]
async function update_orders_spaciality(req, res, next) {
try {
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var order_id = req.params.order_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->update", "message":  error_send  } );
		return;			
	}		
	
	//@
	//@	
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->update", "message":  error_send  } );
		return;			
	}
	
	
	//@
	//@	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->update", "message":  error_send  } );
		return;			
	}		
	
	
	//@
	//@
	//@	
	//@
	try {
		models_orders_spaciality.update_orders_spaciality(datas,order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->update", "message":  error_send  } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-orders-spaciality->update", "message":  error_send  } );
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->update", "message":  error_send  } );
	return;	
}		
}

//@
//@ *4. end of [update_orders_spaciality]




//@
//@
//@
//@
//@ *5. [delete_orders_spaciality]
async  function delete_orders_spaciality(req, res, next) {
try {
	//@
	//@
	//@	get datas req
	try {
		var order_id = req.params.order_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
		return;			
	}		
	
	//@
	//@	
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
		return;			
	}
	
	
	//@
	//@	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
		return;			
	}		
	
	//@
	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality.delete_orders_spaciality(order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi xoá order, liên hệ admin" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->delete", "message":  error_send  } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi xoá order, liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi xoá order, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
	return;	
}		
}
//@
//@ end of * 5. [delete_orders_spaciality]



//@
//@
//@
//@
//@
//@
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

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "6", "position":"ctl-orders-spaciality->delete", "message":  error_send  } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var order_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "orders_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							order_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
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
				"order_id":order_id
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "8", "position":"ctl-orders-spaciality->delete", "message":  error_send  } ); 
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
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "9", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_order == "1" 
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
			res.send({ "error" : "10", "position":"ctl-orders-spaciality->delete", "message":  error_send  } ); 
			return;			
		}			
	}	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////	

	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search, liên hệ admin" );
			res.send({ "error" : "11", "position":"ctl-orders-spaciality->delete", "message":  error_send  } ); 
			return;				
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
		res.send({ "error" : "12", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->delete", "message":  error_send  } );
	return;	
}
}
//@
//@ * end of 6. [search]





//@
//@
//@
//@
//@
//@
//@ * 7. [search_customer]
async  function search_customer(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var order_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "orders_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							order_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->search", "message":  error_send  } ); 
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
				"order_id":order_id
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
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
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_order == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
			return;			
		}			
	}	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////	

	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality.search_customer(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
			return;				
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->search", "message":  error_send  } );
	return;	
}

}
//@
//@ * end of 7. [search_customer]






//@
//@
//@
//@
//@
//@
//@ * 8. [search_user]
async  function search_user(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } );
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var order_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "orders_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							order_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } );
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
				"order_id":order_id
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } );
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
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_order == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user",
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } );
			return;			
		}			
	}	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////	

	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality.search_user(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } ); 
			return;				
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->search_user", "message":  error_send  } ); 
	return;	
}
}
//@
//@ * end of 7. [search_customer]







//@
//@
//@
//@
//@
//@
//@ * 8. [search_count_order_by_user]
async  function search_count_order_by_user(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var order_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "orders_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							order_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "2", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } ); 
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
				"order_id":order_id
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
		res.send({ "error" : "3", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } ); 
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
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } );  
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_order == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } ); 
			return;			
		}			
	}	
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////	

	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality.search_count_order_by_user(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } ); 
			return;				
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } );  
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search data, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-orders-spaciality->search_count_order_by_user", "message":  error_send  } );  
	return;	
}
}
//@
//@ * end of 8. [search_count_order_by_user]









/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_orders_spaciality,
	get_one_orders_spaciality,
	update_orders_spaciality,
	insert_orders_spaciality,
	delete_orders_spaciality,
	search,
	search_customer,
	search_user,
	search_count_order_by_user,
	send_order_sms
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























