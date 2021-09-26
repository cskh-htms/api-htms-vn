
/*

* 1. [insert_shipping_spaciality]

* 2. [get_all_shipping_spaciality]

* 3. [get_one_shipping_spaciality]

* 4. [update_shipping_spaciality]

* 5. [delete_shipping_spaciality]

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
const default_field = require('../const-tables/const-tables-shipping-spaciality');


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
const models_shipping_spaciality = require('../models/models-shipping-spaciality');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_shipping_spaciality]
async function insert_shipping_spaciality(req, res, next) {
	
	
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
		if(!datas.shipping_speciality_code){
			res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->insert", "message" : " Chưa nhập mã vùng " });
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->insert", "message" : error_send });
		return;	
	}	



	//@
	//@ 
	//@
	// get onwer
	try{
		var datas_check = {
			"token"				:	token
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get onwer" );
		res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->insert", "message" : error_send });
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
		res.send({ "error" : "4" ,"position":"ctl-shipping_spaciality->insert", "message" : error_send });
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
		
		
		var data_check = default_field.check_datas(datas_assign);
		if(data_check != 0){
			res.send({ "error" : "5" ,"position":"ctl-shipping_spaciality->insert->data_check", "message" : data_check });
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "6" ,"position":"ctl-shipping_spaciality->insert->data_check", "message" : error_send });
		return;	
	}			
	

	//res.send({ "error" : "asdasd" ,"position":"ctl-shipping_spaciality->insert->data_check", "message" : datas_assign });
	//return;	


	//@
	//@
	//@
	//@
	//@
	try {
		models_shipping_spaciality.insert_shipping_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			try{
				var message_error = default_field.get_message_error(error);
			}
			catch(error){
				res.send({ "error" : "77" ,"position":"ctl-shipping_spaciality->insert->run", "message" : "lỗi get_message_error, lỗi này do code function, vui lòng liên hệ ADMIN " });
				return;				
			}
			

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7" ,"position":"ctl-shipping_spaciality->insert->run", "message" : error_send });
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_spaciality , Liên hệ admin" );
			res.send({ "error" : "8" ,"position":"ctl-shipping_spaciality->insert->run->catch", "message" : error_send });
			return;
	}		
}


//@ end of 1. [insert_shipping_spaciality]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_shipping_spaciality_store]
async  function get_all_shipping_spaciality(req, res, next) {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->get all", "message" : error_send });
		return;	
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_shipping_spaciality.get_all_shipping_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list shipping_spaciality" );
			res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->get all", "message" : error_send });
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list shipping_spaciality" );
		res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->get all", "message" : error_send });
		return;	
	}	
}

//@ end of * 2. [get_all_shipping_spaciality_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_shipping_spaciality]
async  function get_one_shipping_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var shipping_speciality_id = req.params.shipping_speciality_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->get one", "message" : error_send });
		return;			
	}	
	//@

	
	//@
	//@
	//@
	//@
	try {
		models_shipping_spaciality.get_one_shipping_spaciality(shipping_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get one shipping, liên hệ admin" );
			res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->get one", "message" : error_send });
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get one shipping, liên hệ admin" );
			res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->get one", "message" : error_send });
			return;	
	}	
}

//@ end of * 3. [get_one_shipping_spaciality]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_shipping_spaciality]
async  function update_shipping_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var shipping_speciality_id = req.params.shipping_speciality_id;
		var token = req.headers['token'];
		
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->update", "message" : error_send });
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
		res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->update", "message" : error_send }); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
		
	
	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->update", "message" : "Lỗi phẩn quyền user, bạn không đủ quyền thao tác"});
		return;				
	}		
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {
		models_shipping_spaciality.update_shipping_spaciality(datas,shipping_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			try{
				var message_error = default_field.get_message_error(error);
			}
			catch(error){
				res.send({ "error" : "4" ,"position":"ctl-shipping_spaciality->update->run->message_error", "message" : "Lỗi het message_error"});
				return;	
			}
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "5" ,"position":"ctl-shipping_spaciality->update->run->message_error", "message" : error_send});
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "6" ,"position":"ctl-shipping_spaciality->update->run", "message" : error_send});
			return;	
	}	
}

//@@ * end of  4. [update_shipping_spaciality]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_shipping_spaciality]
async  function delete_shipping_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var shipping_speciality_id = req.params.shipping_speciality_id;
		var token = req.headers['token'];
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->delete", "message" : error_send});
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->delete", "message" : error_send}); 
		return;			
	}
	
	
	

	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
			"Bạn không đủ quyền thao tác" 
		);
		res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->delete", "message" : error_send}); 
		return;		
	}		
	
	
	//@
	//@ 
	//@
	//@ 
	//@	
	try {
		models_shipping_spaciality.delete_shipping_spaciality(shipping_speciality_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			
			try{
				var message_error = default_field.get_message_error(error);
			}
			catch(error){
				res.send({ "error" : "44" ,"position":"ctl-shipping_spaciality->delette->run->message_error", "message" : "Lỗi het message_error"});
				return;	
			}	
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "4" ,"position":"ctl-shipping_spaciality->delete->run", "message" : error_send}); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "5" ,"position":"ctl-shipping_spaciality->delete->run", "message" : error_send}); 
			return;	
	}	
}
//@* end of  5. [delete_shipping_spaciality]






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
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->search", "message" : error_send}); 
		return;			
	}	



	//@
	//@
	//@
	//@ run
	try {
		models_shipping_spaciality.search(datas).then( results => {
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
		insert_shipping_spaciality,
		get_one_shipping_spaciality,
		update_shipping_spaciality,
		delete_shipping_spaciality,
		get_all_shipping_spaciality
};

























