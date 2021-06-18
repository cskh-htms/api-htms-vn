/*




* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

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





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



//@
//@
//@
//@
//@
//@* 1. [insert_ordres_spaciality]
async  function insert_orders_spaciality(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;;
		var token = req.headers['token'];
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.orders_speciality_user_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã khách hàng " });
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	


	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"user_id": datas.orders_speciality_user_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		res.send([check_datas_result]);
		return;		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers_orders_speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	res.send([datas.orders_speciality_user_id]);
	return;

	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_user == "1" ||  check_datas_result.user_role == "admin" || check_datas_result.user_role == "default"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác", 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác" 
		);
		res.send({ "error" : "controllers_orders_speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
			
	

	
	
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
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		env = ojs_configs.api_evn;
		//env = "dev";
		var error_send = ojs_shares.show_error( env, error, "lỗi truy xuất database" );
		res.send( { "error": "controllers_orders_speciality->insert-> check-data ->number_error : 1", "message" : error_send  } );	
	}	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality_app(datas_assign,datas.orders_detail).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			//
		}, error => {
			env = ojs_configs.api_evn;
			//env = "dev";
			var error_send = ojs_shares.show_error( env, error, "lỗi truy xuất database" );
			res.send( { "error": "controllers_orders_speciality->insert-> run ->number_error : 1", "message" : error_send  } );	
		});
	}
	catch(error){
		env = ojs_configs.api_evn;
		//env = "dev";
		var error_send = ojs_shares.show_error( env, error, "lỗi truy xuất database" );
		res.send( { "error": "controllers_orders_speciality->insert-> run ->number_error : 2", "message" : error_send  } );	
	}	
}
//@
//@* end of 1. [insert_ordres_spaciality]


















//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
async  function get_all_orders_spaciality(req, res, next) {
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->get-all", "message": error_send } ); 
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->get-all", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->get-all", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	try {
		models_orders_spaciality.get_all_orders_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
			res.send({ "error" : "2.4.controllers_order_speciality(app)->get-all", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
			res.send({ "error" : "2.5.controllers_order_speciality(app)->get-all", "message": error_send } ); 
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
//search
async  function search(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_orders_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error  } );	
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
async  function search_view(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_orders_spaciality.search_view(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2_search_view", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3_search_view", "message" : error_send  } );
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
async  function get_one_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality.get_one_orders_spaciality(order_id).then( results => {
			
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
//update
async function update_orders_spaciality(req, res, next) {
	let datas = req.body.datas;
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->update", "message": error_send } ); 
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@	
	//@
	try {
		models_orders_spaciality.update_orders_spaciality(datas,order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
			res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
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
/*
async  function insert_orders_spaciality(req, res, next) {
	let datas = req.body.datas;
	//res.send([cat_string,datas]);
	//return;
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "c_data_1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality(datas_assign).then( results => {
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

*/
//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async  function delete_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->delete", "message": error_send } ); 
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	try {
		models_orders_spaciality.delete_orders_spaciality(order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
			res.send({ "error" : "2.33.controllers_order_speciality(app)->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "243.controllers_order_speciality(app)->delete", "message": error_send } ); 
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
	get_all_orders_spaciality,
	get_one_orders_spaciality,
	update_orders_spaciality,
	insert_orders_spaciality,
	delete_orders_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























