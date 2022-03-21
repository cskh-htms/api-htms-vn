
/*

* 1. [insert_shipping_tracking]

* 2. [get_all_shipping_tracking]

* 3. [get_one_shipping_tracking]

* 4. [update_shipping_tracking]

* 5. [delete_shipping_tracking]

* 6. [search]

* 7. [push_shipping_dala]

* 8. [push_shipping_dala_shipper]

* 9. [push_shipping_ghtk]

* 10. [shipper_cap_nhat_order]

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
const default_field = require('../const-tables/const-tables-shipping-tracking');


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
const ojs_shares_fetch_data = require('../../../models/ojs-shares-fetch-data');



//@
//@
//model
const models_shipping_tracking = require('../models/models-shipping-tracking');
const ojs_shares_send_code_to_phone = require('../../../models/ojs-shares-send-code-to-phone');


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@ 10. [shipper_cap_nhat_order]
async function shipper_cap_nhat_order(req, res, next) {
try {	
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token"				:	token
		}		
		
		
		
		//res.send( datas_check ); 
		//return;
		
		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send({check_datas_result} ); 
		//return;			
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	|| ( check_datas_result.user_role == "shipping" && check_datas_result.owner_order_tracking == "1" && check_datas_result.owner_user == "1") 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5", "position":"ctl-shipping-tracking->insert", "message": error_send } );
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
		res.send({ "error" : "6", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.insert_shipping_tracking(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-shipping-tracking->insert", "message": error_send } );
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_tracking , Liên hệ admin" );
			res.send({ "error" : "8", "position":"ctl-shipping-tracking->insert", "message": error_send } ); 
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_tracking , Liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-shipping-tracking->insert", "message": error_send } ); 
		return;
}	
	
}


//@ end of 1. [insert_shipping_tracking]






//@
//@
//@
//@
//@ 1. [insert_shipping_tracking]
async function insert_shipping_tracking(req, res, next) {
try {	
	
	//res.send(["ok"]);
	//return;
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
		if(!datas.shipping_tracking_users_id){
			res.send({ "error" : "1", "position":"ctl-shipping-tracking->insert", 
			"message": " Chưa nhập id shipping (shipping_tracking_users_id) " } );
			return;
		}
		if(!datas.shipping_tracking_orders_id){
			res.send({ "error" : "2", "position":"ctl-shipping-tracking->insert", 
			"message": " Chưa nhập id đơn hàng (shipping_tracking_orders_id) "} );
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token"				:	token,
			"user_id" 			: 	datas.shipping_tracking_users_id,
			"order_tracking_id"	:   datas.shipping_tracking_orders_id
		}		
		
		
		
		//res.send( datas_check ); 
		//return;
		
		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send({check_datas_result} ); 
		//return;			
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	|| ( check_datas_result.user_role == "shipping" && check_datas_result.owner_order_tracking == "1" && check_datas_result.owner_user == "1") 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5", "position":"ctl-shipping-tracking->insert", "message": error_send } );
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
		res.send({ "error" : "6", "position":"ctl-shipping-tracking->insert", "message": error_send } );
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.insert_shipping_tracking(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-shipping-tracking->insert", "message": error_send } );
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_tracking , Liên hệ admin" );
			res.send({ "error" : "8", "position":"ctl-shipping-tracking->insert", "message": error_send } ); 
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_tracking , Liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-shipping-tracking->insert", "message": error_send } ); 
		return;
}	
	
}


//@ end of 1. [insert_shipping_tracking]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_shipping_tracking_store]
async  function get_all_shipping_tracking(req, res, next) {
try {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-shipping-tracking->get all", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-shipping-tracking->get all", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-shipping-tracking->get all", "message": error_send } );
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.get_all_shipping_tracking().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list shipping_tracking" );
			res.send({ "error" : "4", "position":"ctl-shipping-tracking->get all", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list shipping_tracking" );
		res.send({ "error" : "5", "position":"ctl-shipping-tracking->get all", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list shipping_tracking" );
	res.send({ "error" : "113", "position":"ctl-shipping-tracking->get all", "message": error_send } );
	return;
}	
}

//@ end of * 2. [get_all_shipping_tracking_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_shipping_tracking]
async  function get_one_shipping_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var tracking_id = req.params.tracking_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-shipping-tracking->get one", "message": error_send } );
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"tracking_id":tracking_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-shipping-tracking->get one", "message": error_send } );
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_tracking == "1" 
	|| check_datas_result.user_role == "supper-job"
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-shipping-tracking->get one", "message": error_send } );
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.get_one_shipping_tracking(tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "4", "position":"ctl-shipping-tracking->get one", "message": error_send } );
			return;	

		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-shipping-tracking->get one", "message": error_send } );
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-shipping-tracking->get one", "message": error_send } );
	return;	
}	
}

//@ end of * 3. [get_one_shipping_tracking]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_shipping_tracking]
async  function update_shipping_tracking(req, res, next) {
try {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var tracking_id = req.params.tracking_id;
		var token = req.headers['token'];
		
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-shipping-tracking->update", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"tracking_id":tracking_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-shipping-tracking->update", "message": error_send } ); 
		return;			
	}
	
	
	
	
	
	//res.send(check_datas_result);
	//return;
		
	
	
	
	//@
	//@
	//@
	//@ lấy thông tin đơn hàng xem dơn hàng đã hoàn tất chưa
	//@ nếu đơn hàng đã hoàn thành thì khônc cho update
	try {
		var shipping_tracking_order_check = await models_shipping_tracking.shipping_tracking_order_check(tracking_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(shipping_tracking_order_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			shipping_tracking_order_check.error, 
			"lỗi truy xuất database shipping_tracking, liên hệ admin dala" );
			res.send({ "error" : "3", "position":"ctl-shipping-tracking->update", "message": error_send } ); 
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(shipping_tracking_order_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có đơn hàng này" );
			res.send({ "error" : "4", "position":"ctl-shipping-tracking->update", "message": error_send } ); 	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database shipping_tracking" );
		res.send({ "error" : "5", "position":"ctl-shipping-tracking->update", "message": error_send } ); 
		return;
	}			
	
	
	//res.send([shipping_tracking_order_check[0].orders_speciality_status_orders,check_datas_result]);
	//return;	
	
	
	
	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		if(check_datas_result.owner_tracking == "1" && shipping_tracking_order_check[0].orders_speciality_status_orders == "1") {
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
				"Bạn không đủ quyền thao tác" 
			);
			res.send({ "error" : "6", "position":"ctl-shipping-tracking->update", "message": error_send } ); 
			return;		
		}			
	}		
	
	
	//res.send(["ok"]);
	//return;
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.update_shipping_tracking(datas,tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-shipping-tracking->update", "message": error_send } );  
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "8", "position":"ctl-shipping-tracking->update", "message": error_send } );  
			return;
	}
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-shipping-tracking->update", "message": error_send } );  
		return;
}		
}

//@@ * end of  4. [update_shipping_tracking]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_shipping_tracking]
async  function delete_shipping_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var tracking_id = req.params.tracking_id;
		var token = req.headers['token'];
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"tracking_id":tracking_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
		return;			
	}
	
	
	
	
	
	//res.send(check_datas_result);
	//return;
		
	
	
	
	//@
	//@
	//@
	//@ lấy thông tin đơn hàng xem dơn hàng đã hoàn tất chưa
	//@ nếu đơn hàng đã hoàn thành thì khônc cho update
	try {
		var shipping_tracking_order_check = await models_shipping_tracking.shipping_tracking_order_check(tracking_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(shipping_tracking_order_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			shipping_tracking_order_check.error,
			"lỗi truy xuất database shipping_tracking, liên hệ admin dala" );
			res.send({ "error" : "3", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(shipping_tracking_order_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có đơn hàng này" );
			res.send({ "error" : "5", "position":"ctl-shipping-tracking->delete", "message": error_send } );  	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database shipping_tracking" );
		res.send({ "error" : "6", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
		return;
	}			
	
	
	//res.send([shipping_tracking_order_check[0].orders_speciality_status_orders,check_datas_result]);
	//return;	
	
	
	
	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		if(check_datas_result.owner_tracking == "1" && shipping_tracking_order_check[0].orders_speciality_status_orders == "1") {
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
				"Bạn không đủ quyền thao tác" 
			);
			res.send({ "error" : "7", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
			return;		
		}			
	}		
	
	
	//res.send(["ok"]);
	//return;
	



	//@
	//@
	//@ 
	//@
	//@ 
	//@	
	try {
		models_shipping_tracking.delete_shipping_tracking(tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "8", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "9", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-shipping-tracking->delete", "message": error_send } );  
		return;	
}		
}
//@* end of  5. [delete_shipping_tracking]






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
		res.send({ "error" : "1", "position":"ctl-shipping-tracking->search", "message": error_send } );   
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search store theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var tracking_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "shipping_tracking_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							tracking_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "2", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
		return;			
	}		
	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"tracking_id":tracking_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
		return;			
	}




	//res.send(check_datas_result);
	//return;




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
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all",
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
			res.send({ "error" : "4", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( 
		check_datas_result.owner_tracking == "1" 
		||  check_datas_result.user_role == "admin" 
		||  check_datas_result.user_role == "supper-job" 
		||  check_datas_result.user_role == "default"  
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_shipping_tracking.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "7", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-shipping-tracking->search", "message": error_send } ); 
		return;	
}
}

//end of 6. [search] 





//@
//@
//@
//@
//@ 7. [push_shipping_dala]
async  function push_shipping_dala(req, res, next) {
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
		if(!datas.shipping_tracking_users_id){
			res.send({ "error" : "1" , "position":"ctl-shipping-tracking->push_shipping_dala","message" : " Chưa nhập id shipping (shipping_tracking_users_id) " });
			return;
		}
		if(!datas.shipping_tracking_orders_id){
			res.send({ "error" : "2" ,"position":"ctl-shipping-tracking->push_shipping_dala", "message" : " Chưa nhập id đơn hàng (shipping_tracking_orders_id) " });
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token"				:	token
		}		
		//res.send( datas_check ); 
		//return;

		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);

		//res.send({check_datas_result} ); 
		//return;			

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get role, vui lòng liên hệ admin" );
		res.send({ "error" : "4","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	
	//@
	//@
	//@
	//@
	try {
		var shipper_infor = await models_shipping_tracking.get_shipper(datas.shipping_tracking_users_id);
		//res.send( shipper_infor );
		//return;
		shipper_phone = shipper_infor[0].users_phone;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
		res.send({ "error" : "7", "position":"ctl-shipping_tracking->push_shipping_dala->shipper_infor","message": error_send } ); 
		return;	
	}	
	
	
	//res.send( shipper_phone );
	//return;
	

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
		res.send({ "error" : "6","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } );
		return;	
	}	
	
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.push_shipping_dala(datas_assign).then( results => {
			ojs_shares_send_code_to_phone.send_code_to_phone_shipper(res,datas.shipping_tracking_orders_id,shipper_phone);			
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
			res.send({ "error" : "6", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } );
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
		res.send({ "error" : "7", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
	res.send({ "error" : "113", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } ); 
	return;	
}
}




//@
//@
//@
//@
//@ 8. [push_shipping_dala_shipper]
async  function push_shipping_dala_shipper(req, res, next) {
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
		if(!datas.shipping_tracking_users_id){
			res.send({ "error" : "1" , "position":"ctl-shipping-tracking->push_shipping_dala","message" : " Chưa nhập id shipping (shipping_tracking_users_id) " });
			return;
		}
		if(!datas.shipping_tracking_orders_id){
			res.send({ "error" : "2" ,"position":"ctl-shipping-tracking->push_shipping_dala", "message" : " Chưa nhập id đơn hàng (shipping_tracking_orders_id) " });
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token"				:	token,
			"user_id" 			: 	datas.shipping_tracking_users_id,
			"order_tracking_id"	:   datas.shipping_tracking_orders_id
		}		

		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	|| ( check_datas_result.user_role == "shipping" && check_datas_result.owner_order_tracking == "1" && check_datas_result.owner_user == "1") 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } ); 
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
		res.send({ "error" : "6","position":"ctl-shipping-tracking->push_shipping_dala", "message": error_send } );
		return;	
	}	
	
	//@
	//@
	//@
	//@
	try {
		models_shipping_tracking.push_shipping_dala(datas_assign).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
			res.send({ "error" : "6", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } );
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
		res.send({ "error" : "7", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
	res.send({ "error" : "113", "position":"ctl-shipping_tracking->push_shipping_dala","message": error_send } ); 
	return;	
}
}


//@
//@
//@
//@
//@ 7. [push_shipping_ghtk]
async  function push_shipping_ghtk(req, res, next) {
try {	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//res.send([datas,token]);
		//return;		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.shipping_tracking_users_id){
			res.send({ "error" : "1" , "position":"ctl-shipping-tracking->push_shipping_ghtk","message" : " Chưa nhập id shipping (shipping_tracking_users_id) " });
			return;
		}
		if(!datas.shipping_tracking_orders_id){
			res.send({ "error" : "2" ,"position":"ctl-shipping-tracking->push_shipping_ghtk", "message" : " Chưa nhập id đơn hàng (shipping_tracking_orders_id) " });
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } ); 
		return;	
	}	



	//res.send( datas );	
	//return;	





	
	try{
		var datas_check = {
			"token"				:	token
		}		
		//res.send( datas_check ); 
		//return;

		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);

		//res.send({check_datas_result} ); 
		//return;			

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get role, vui lòng liên hệ admin" );
		res.send({ "error" : "4","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } ); 
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
		res.send({ "error" : "6","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } );
		return;	
	}



	//res.send([datas.shipping_tracking_orders_id]);
	//return;



	//@
	//@
	//@
	//@ lấy chi tiết đơn hàng
	//@ tạo mảng product
	var arr_product = [];
	try{
		var orders_details = await models_shipping_tracking.get_orders_details(datas.shipping_tracking_orders_id);
		//res.send(orders_details); 
		//return;					

		if( Array.isArray(orders_details)){
			
			if(orders_details.length > 0){
				
				for(let x in orders_details){
					if(orders_details[x].orders_details_speciality_line_order == "product"){
						let x_ojb =  {
							"name":orders_details[x].products_speciality_name,
							"weight":orders_details[x].products_speciality_weight/ 1000,
							"quantity":orders_details[x].orders_details_speciality_qty,
							"product_code":orders_details[x].products_speciality_ID
						}
						arr_product.push(x_ojb);
					}
				}
			}else{
				res.send({ "error" : "7" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : "không tìm thấy sản phẩm"}); 
				return;	
			}
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_details, "Lỗi code get chi tiết đơn hàng , vui lòng liên hệ admin" );					
			res.send({ "error" : "8" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
			return;							
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice push_shipping_ghtk , vui lòng liên hệ admin" );					
		res.send({ "error" : "9" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
		return;					
	}

	//res.send({ "error" : "" , "datas" : arr_product}); 
	//return;	



	//@
	//@
	//@
	//@ tính tiền tổng đơn hàng
	var price_sum = 0;
	var add = 0;
	var reduce = 0;
	var shipping = 0;
	var coupon = 0;
	var tax = 0;
	try{
		for(let x in orders_details){
			if(orders_details[x].orders_details_speciality_line_order == "product"){
				let price = orders_details[x].orders_details_speciality_price * orders_details[x].orders_details_speciality_qty;
				price_sum = price_sum + price;
			}else if(orders_details[x].orders_details_speciality_line_order == "shipping"){
				shipping = shipping + orders_details[x].orders_details_speciality_price; 
				
			}else if(orders_details[x].orders_details_speciality_line_order == "coupon"){
				coupon = coupon + orders_details[x].orders_details_speciality_price; 
				
			}else if(orders_details[x].orders_details_speciality_line_order == "add"){
				add = add + orders_details[x].orders_details_speciality_price; 					
				
			}else if(orders_details[x].orders_details_speciality_line_order == "reduce"){
				reduce = reduce + orders_details[x].orders_details_speciality_price; 	

			}else if(orders_details[x].orders_details_speciality_line_order == "tax"){
				tax = tax + orders_details[x].orders_details_speciality_price; 
				
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get chi tiết đơn hàng , vui lòng liên hệ admin" );					
		res.send({ "error" : "11" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
		return;					
	}

	var price_order = (price_sum + add + tax + shipping) - coupon - reduce;

	//res.send({ "error" : "" , "datas" : [price_sum,add,reduce,shipping,coupon,tax ,price_order]}); 
	//return;	





	//@
	//@
	//@
	//@ lấy thông tin đơn hàng đơn hàng
	try{
		var orders_info = await models_shipping_tracking.get_orders(datas.shipping_tracking_orders_id);
		//res.send([orders_info]); 
		//return;					
		
		if( Array.isArray(orders_info)){
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_info, "Lỗi code get chi tiết đơn hàng , vui lòng liên hệ admin" );					
			res.send({ "error" : "10" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
			return;							
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get chi tiết đơn hàng , vui lòng liên hệ admin" );					
		res.send({ "error" : "11" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
		return;					
	}

	//res.send({ "error" : "" , "datas" : orders_info}); 
	//return;	





	//@
	//@
	//@
	//@ lấy thông tin cửa hàng
	try{
		var stores_info = await models_shipping_tracking.get_stores(arr_product);
		//res.send([stores_info]); 
		//return;					
		
		if( Array.isArray(stores_info)){
		}else{
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, stores_info, "Lỗi code get chi tiết cửa hàng , vui lòng liên hệ admin" );					
			res.send({ "error" : "12" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
			return;							
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get chi tiết cửa hàng , vui lòng liên hệ admin" );					
		res.send({ "error" : "13" ,"position":"ctl-shipping_tracking->push_shipping_ghtk", "message" : error_send}); 
		return;					
	}

	//res.send({ "error" : "" , "datas" : stores_info}); 
	//return;

	
	
	
	//@
	//@
	//@
	//@
	//@	push lên GHTK
	try {	
		//Lấy danh sách loại danh mục
		let url = ojs_configs.domain_ghtk_push_order;		
		let token = ojs_configs.token_ghtk;
		let ran = Math.random().toString(36).slice(-10);
		//@
		//@
		//@
		let order = 	    
			{
				"id": ran + "_" + datas.shipping_tracking_orders_id,
				"pick_name": stores_info[0].stores_name,
				"pick_address": stores_info[0].stores_adress,
				"pick_province": stores_info[0].stores_province,
				"pick_district": stores_info[0].stores_district,
				"pick_ward": stores_info[0].stores_wards,
				"pick_tel": stores_info[0].stores_phone,
				"tel": orders_info[0].orders_speciality_phone,
				"name": orders_info[0].orders_speciality_name,
				"address": orders_info[0].orders_speciality_adress,
				"province": orders_info[0].orders_speciality_province,
				"district": orders_info[0].orders_speciality_district,
				"ward": orders_info[0].orders_speciality_wards,
				"hamlet": "Khác",
				"is_freeship": "1",
				"pick_money": price_order,
				"note": orders_info[0].orders_speciality_notes,
				"value": price_order,
				"pick_option":"cod",
				"deliver_option" : "none"
		}		
		
		
		//@
		//@
		//@
		//@
		let datas_send = 
			{
				"products": arr_product,
				"order": order
			}	

		res.send({ "error" : "100" , "datas" : datas_send}); 
		return;							
		
		
		var result_ghtk = await ojs_shares_fetch_data.get_data_send_token_post_ghtk(url,datas_send,token);
		//res.send({ "error" : "111" , "datas" : result_ghtk}); 
		//return;
		
		
		
		
		
		
		/* test tat ghtk
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
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
			res.send({ "error" : "133","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } );
			return;	
		}			
		
		
		//@
		//@
		//@ lưu vào shipping trackking
		//@ update trạng thái đơn hàng
		var tracking = "0";
		try {
			models_shipping_tracking.push_shipping_ghtk(datas_assign,tracking).then( results => {
				res.send( { "error" : "", "datas" : results } );
				return;
			}, error => {
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
				res.send({ "error" : "134", "position":"ctl-shipping_tracking->push_shipping_ghtk","message": error_send } );
				return;	
			});
		}
		catch(error){
			var evn = ojs_configs.evn;
			evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
			res.send({ "error" : "135", "position":"ctl-shipping_tracking->push_shipping_ghtk","message": error_send } ); 
			return;	
		}			
		
		*/
		
		
		//nếu giao hàng tiết kiệm chính thức thì dùng code này
		if(result_ghtk.success){

			//@
			//@
			
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
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
				res.send({ "error" : "133","position":"ctl-shipping-tracking->push_shipping_ghtk", "message": error_send } );
				return;	
			}				
			
			
			//@
			//@
			//@ lưu vào dhipping trackking
			//@ update trạng thái đơn hàng
			var tracking = "0";
			if(result_ghtk.order.tracking_id){ tracking  = result_ghtk.order.tracking_id};
			
			//@
			//@
			try {
				models_shipping_tracking.push_shipping_ghtk(datas_assign,tracking).then( results => {
					res.send( { "error" : "", "datas" : results } );
					return;
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
					res.send({ "error" : "134", "position":"ctl-shipping_tracking->push_shipping_ghtk","message": error_send } );
					return;	
				});
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";;
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
				res.send({ "error" : "135", "position":"ctl-shipping_tracking->push_shipping_ghtk","message": error_send } ); 
				return;	
			}			

		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "push đơn hàng không thành công, vui lòng thao tác lại", "push đơn hàng không thành công, vui lòng thao tác lại" );
			res.send({ "error" : "14" ,"position":"ctl-shipping_tracking->push order ghtk", "message" : error_send }); 
			return;					
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data. liên hệ admin" );
		res.send({ "error" : "15" ,"position":"ctl-shipping_tracking->ghtk", "message" : error_send}); 
		return;	
	}		
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lưu data. liên hệ admin" );
	res.send({ "error" : "113" ,"position":"ctl-shipping_tracking->ghtk", "message" : "không tìm thấy giá ghtk"}); 
	return;	
}	
}










module.exports = { 
		search,
		insert_shipping_tracking,
		get_one_shipping_tracking,
		update_shipping_tracking,
		delete_shipping_tracking,
		get_all_shipping_tracking,
		push_shipping_dala,
		push_shipping_dala_shipper,
		push_shipping_ghtk,
		shipper_cap_nhat_order
};

























