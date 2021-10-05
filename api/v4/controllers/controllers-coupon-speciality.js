
/*

* 1. [insert_coupon_speciality]

* 2. [get_all_coupon_speciality]

* 3. [get_one_coupon_speciality]

* 4. [update_coupon_speciality]

* 5. [delete_coupon_speciality]

* 6. [search]

* 7. [search_all]

 9. [checked_coupon]

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

const models_products_spaciality = require('../models/models-products-spaciality');

const ojs_share_coupon = require('../function-shares/ojs-shares-coupon');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@@
//@@
//@@
//@@
//@@
//@@
//@* 9. [checked_coupon]
async  function checked_coupon(req, res, next) {
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
		return;			
	}			
	
	
	
	//@
	//@ 
	//@ nếu có data
	if(datas.length > 0){
		//res.send("ok");
		//return;
		
		var product_id = datas[0].orders_details_speciality_product_id;
		//res.send([product_id]);
		//return;		
		
		//@
		//@
		//@ lấy id cửa ah2ng của đơn hàng
		try{
			var get_store_id = await models_coupon_speciality.get_store_id(product_id);
			if(get_store_id.length > 0){
				var store_id = get_store_id[0].dala_products_speciality_store_id;
				//res.send([store_id]);
				//return;				
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, "Không tìm thấy cửa hàng", "Không tìm thấy cửa hàng" );
				res.send({ "error" : "4", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } ); 
				return;	
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lổi tìm cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
			return;				
		}
		
		
		//@
		//@
		//@
		//@
		//@ lấy danh sách coupon còn hạng theo cửa hàng
		try{
			var get_all_coupon = await models_coupon_speciality.get_all_coupon(store_id);
			if(get_all_coupon.length > 0){
				
				var coupon_list = get_all_coupon;
				//res.send(coupon_list);
				//return;				
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, "Không có coupon", "Không có coupon" );
				res.send({ "error" : "6", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
				return;	
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Không có coupon" );
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } ); 
			return;				
		}		
		
		
		//res.send([get_all_coupon]);
		//return;	
		
		
		//@
		//@
		//@
		//@
		//@ check điều kiện áp dụng
		var coupon_ok = [];
		for( var  x in coupon_list ) { 
		
			var datas_check = {
				datas : datas,
				condition : coupon_list[x].coupon_speciality_condition,
				value : coupon_list[x].coupon_speciality_condition_value,
				user_limit : coupon_list[x].coupon_speciality_limit_user,
				user_id : user_id,
				formula : coupon_list[x].coupon_speciality_formula_price,
				price : coupon_list[x].coupon_speciality_formula_price_value,
				price_max : coupon_list[x].coupon_speciality_price_max				
			}

			var check_condition = await ojs_share_coupon.check_coupon_condition(datas_check);
	
			//coupon_ok.push(check_condition);
			
			//@ tính tiền giảm giá
			if(check_condition > 0){
				var caution_price = await ojs_share_coupon.caution_price(datas_check);
				
				let line_data = {
					"coupon_speciality_ID": coupon_list[x].coupon_speciality_ID,
					"coupon_speciality_code": coupon_list[x].coupon_speciality_code,
					"coupon_price_caution": caution_price,
					"store_id":store_id,
					"coupon_speciality_multiple":coupon_list[x].coupon_speciality_multiple,
					"coupon_speciality_limit_number":coupon_list[x].coupon_speciality_limit_number,
					"coupon_speciality_limit_user":coupon_list[x].coupon_speciality_limit_user
				}
				coupon_ok.push(line_data);
			}

		}
		
		res.send(coupon_ok);
		return;			
	}else{
		res.send({ "error" : "8", "position":"ctl-coupon-speciality->check_coupon", "message": "không có coupon" } );
		return;		
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi code, vui lòng liên hệ admin " );
	res.send({ "error" : "113", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } ); 
	return;				
}	
}

//@* 9. [checked_coupon]


//@@
//@@
//@@
//@@
//@@
//@@
//@* 99. [checked_coupon_dala]
async  function checked_coupon_dala(req, res, next) {
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;
		var store_id = 17;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
		return;			
	}			
	
	
	
	//@
	//@ 
	//@ nếu có data
	if(datas.length > 0){
		//res.send("ok");
		//return;
		

		//@
		//@
		//@
		//@
		//@ lấy danh sách coupon còn hạng theo cửa hàng
		try{
			var get_all_coupon = await models_coupon_speciality.get_all_coupon(store_id);
			if(get_all_coupon.length > 0){
				
				var coupon_list = get_all_coupon;
				//res.send(coupon_list);
				//return;				
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, "Không có coupon", "Không có coupon" );
				res.send({ "error" : "6", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } );
				return;	
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Không có coupon" );
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } ); 
			return;				
		}		
		
		
		//res.send([get_all_coupon]);
		//return;	
		
		
		//@
		//@
		//@
		//@
		//@ check điều kiện áp dụng
		var coupon_ok = [];
		for( var  x in coupon_list ) { 
		
			var datas_check = {
				datas : datas,
				condition : coupon_list[x].coupon_speciality_condition,
				value : coupon_list[x].coupon_speciality_condition_value,
				user_limit : coupon_list[x].coupon_speciality_limit_user,
				user_id : user_id,
				formula : coupon_list[x].coupon_speciality_formula_price,
				price : coupon_list[x].coupon_speciality_formula_price_value,
				price_max : coupon_list[x].coupon_speciality_price_max				
			}

			var check_condition = await ojs_share_coupon.check_coupon_condition(datas_check);
	
			//coupon_ok.push(check_condition);
			
			//@ tính tiền giảm giá
			if(check_condition > 0){
				var caution_price = await ojs_share_coupon.caution_price(datas_check);
				
				let line_data = {
					"coupon_speciality_ID": coupon_list[x].coupon_speciality_ID,
					"coupon_speciality_code": coupon_list[x].coupon_speciality_code,
					"coupon_price_caution": caution_price,
					"store_id":store_id,
					"coupon_speciality_multiple":coupon_list[x].coupon_speciality_multiple,
					"coupon_speciality_limit_number":coupon_list[x].coupon_speciality_limit_number,
					"coupon_speciality_limit_user":coupon_list[x].coupon_speciality_limit_user
				}
				coupon_ok.push(line_data);
			}

		}
		
		res.send(coupon_ok);
		return;			
	}else{
		res.send({ "error" : "8", "position":"ctl-coupon-speciality->check_coupon", "message": "không có coupon" } );
		return;		
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi code, vui lòng liên hệ admin " );
	res.send({ "error" : "113", "position":"ctl-coupon-speciality->check_coupon", "message": error_send } ); 
	return;				
}	
}
// @ 99. [checked_coupon_dala]
//@
//@
//@
//@









//@
//@
//@
//@
//@ 1. [insert_coupon_speciality]
async function insert_coupon_speciality(req, res, next) {
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
		if(!datas.coupon_speciality_stores_id_created){
			res.send({ 
			"error" : "1", 
			"position":"ctl-coupon-speciality->insert", 
			"message": " Chưa nhập id cửa hàng ( coupon_speciality_stores_id_created ) "
			});
			return;
		}
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->insert", "message": error_send } ); 
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->insert", "message": error_send } ); 
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
		res.send({ "error" : "4", "position":"ctl-coupon-speciality->insert", "message": error_send } );  
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
			res.send({"error" : "5", "position":"ctl-coupon-speciality->insert", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "6", "position":"ctl-coupon-speciality->insert", "message": error_send } ); 
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
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->insert", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert coupon_speciality , Liên hệ admin" );
		res.send({ "error" : "8", "position":"ctl-coupon-speciality->insert", "message": error_send } );  
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert coupon_speciality , Liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-coupon-speciality->insert", "message": error_send } );  
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
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->get all", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->get all", "message": error_send } ); 
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->get all", "message": error_send } ); 
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
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->get all", "message": error_send } );
			return;			
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list coupon_speciality" );
		res.send({ "error" : "5", "position":"ctl-coupon-speciality->get all", "message": error_send } ); 
		return;
	}	
	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list coupon_speciality" );
	res.send({ "error" : "113", "position":"ctl-coupon-speciality->get all", "message": error_send } ); 
	return;
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
try {
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
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->get one", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->get one", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_coupon_speciality == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default"	
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->get one", "message": error_send } );
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
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->get one", "message": error_send } );
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->get one", "message": error_send } );
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-coupon-speciality->get one", "message": error_send } );
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->update", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->update", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->update", "message": error_send } ); 
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
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			coupon_speciality_check.error, 
			"lỗi truy xuất database coupon_speciality, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->update", "message": error_send } );
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(coupon_speciality_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->update", "message": error_send } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database coupon_speciality" );
		res.send({ "error" : "6", "position":"ctl-coupon-speciality->update", "message": error_send } );
		return;
	}			
	
	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		
		if(check_datas_result.user_role != "admin" && coupon_speciality_check[0].coupon_speciality_status_admin == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";		
			var error_send = ojs_shares_show_errors.show_error( evn, error, "coupon đã chạy không update" );
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->update", "message": error_send } );
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
		res.send({ "error" : "8", "position":"ctl-coupon-speciality->update", "message": error_send } );
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
			evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "9", "position":"ctl-coupon-speciality->update", "message": error_send } );
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "10", "position":"ctl-coupon-speciality->update", "message": error_send } );
			return;
	}
}
catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi code, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-coupon-speciality->update", "message": error_send } );
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->delete", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->delete", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_coupon_speciality == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->delete", "message": error_send } ); 
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
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			coupon_speciality_check.error, 
			"lỗi truy xuất database coupon_speciality, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->delete", "message": error_send } );	
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(coupon_speciality_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có cửa hàng", "Không có cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->delete", "message": error_send } );	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database coupon_speciality" );
		res.send({ "error" : "6", "position":"ctl-coupon-speciality->delete", "message": error_send } );
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
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->delete", "message": error_send } );
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
			res.send({ "error" : "8", "position":"ctl-coupon-speciality->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "9", "position":"ctl-coupon-speciality->delete", "message": error_send } );
			return;	
	}	
	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-coupon-speciality->delete", "message": error_send } );
		return;	
}		
	
}
//@* end of  5. [delete_coupon_speciality]






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
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->search", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->search", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->search", "message": error_send } );
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
		|| check_datas_result.user_role == "customer"  
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all" 
			);
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->search", "message": error_send } );
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_coupon_speciality == "1" 
		||  check_datas_result.user_role == "admin" 
		||  check_datas_result.user_role == "supper-job"
		|| check_datas_result.user_role == "default"	
		|| check_datas_result.user_role == "customer" 	

		
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->search", "message": error_send } ); 
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
			res.send({ "error" : "6", "position":"ctl-coupon-speciality->search", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->search", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-coupon-speciality->search", "message": error_send } );
		return;	
}	
}

//end of 6. [search] 




//@@
//@@
//@@
//6. [search] 
async  function search_all(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-coupon-speciality->search_all", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-coupon-speciality->search_all", "message": error_send } );  
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
		res.send({ "error" : "3", "position":"ctl-coupon-speciality->search_all", "message": error_send } ); 
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
		|| check_datas_result.user_role == "customer"  
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, chỉ có admin mới search all",
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all"
			);
			res.send({ "error" : "4", "position":"ctl-coupon-speciality->search_all", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_coupon_speciality == "1" 
		||  check_datas_result.user_role == "admin" 
		||  check_datas_result.user_role == "supper-job"
		|| check_datas_result.user_role == "default"	
		|| check_datas_result.user_role == "customer" 	

		
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error(
			evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-coupon-speciality->search_all", "message": error_send } );  
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_coupon_speciality.search_all(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-coupon-speciality->search_all", "message": error_send } );  
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "7", "position":"ctl-coupon-speciality->search_all", "message": error_send } );  
			return;	
	}

}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-coupon-speciality->search_all", "message": error_send } );  
		return;	
}
}

//end of 6. [search_all] 




module.exports = { 
		search,
		search_all,
		insert_coupon_speciality,
		get_one_coupon_speciality,
		update_coupon_speciality,
		delete_coupon_speciality,
		get_all_coupon_speciality,
		checked_coupon,
		checked_coupon_dala
};

























