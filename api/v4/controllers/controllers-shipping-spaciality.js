
/*

* 1. [insert_shipping_spaciality]

* 2. [get_all_shipping_spaciality]

* 3. [get_one_shipping_spaciality]

* 4. [update_shipping_spaciality]

* 5. [delete_shipping_spaciality]

* 6. [search]

* 7. [caution]

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
const ojs_shares_fetch_data = require('../../../models/ojs-shares-fetch-data');



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
		if(!datas.shipping_speciality_code){
			res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->insert", "message" : " Chưa nhập mã vùng " });
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
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
				res.send({ 
				"error" : "77" ,
				"position":"ctl-shipping_spaciality->insert->run", 
				"message" : "lỗi get_message_error, lỗi này do code function, vui lòng liên hệ ADMIN " });
				return;				
			}
			

			var evn = ojs_configs.evn;
			evn = "dev";
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
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert shipping_spaciality , Liên hệ admin" );
		res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->insert->run->catch", "message" : error_send });
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
try {	
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
try {	
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
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get one shipping, liên hệ admin" );
		res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->get one", "message" : error_send });
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
try {	
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
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->update->run", "message" : error_send});
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
try {	
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
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->delete->run", "message" : error_send}); 
		return;	
}		
}
//@* end of  5. [delete_shipping_spaciality]






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
			res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->search", "message" : error_send}); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->search", "message" : error_send}); 
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->search", "message" : error_send}); 
		return;	
}		
}

//end of 6. [search] 





//@@
//@@
//@@
//@@ 7. [caution] 
async  function caution(req, res, next) {
try{	
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
		res.send({ "error" : "1" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
		return;			
	}	


	//@
	//@
	//@ kiểm tra data gữi lên đúng chuẩn hay chưa
	//@ nếu không đúng thì return
	if(!datas.adress || !datas.orders_details || !datas.type){
		res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->caution", "message" : "đata gữi lên bị thiếu, vui lòng xem hướng dẫn api"}); 
		return;			
	}


	//@
	//@
	//@ kiểm tra type 
	//@ nếu type = dala thì tính giá theo shipping speciality
	// @ nếu type = ghtk thì tính giá = giao hàng tiết kiệm
	if(datas.type == "dala"){
		//@
		//@ nếu có phường thì tính giá theo phường
		if(datas.adress.Wards && datas.adress.Wards.length > 0){
			try{
				var price_caution = await models_shipping_spaciality.caution(datas.adress.Wards);
				//res.send(price_caution); 
				//return;					
				
				if( Array.isArray(price_caution)){
					
					if(price_caution.length > 0){
						res.send({ "error" : "" , "datas" : price_caution[0].shipping_speciality_price}); 
						return;	
					}else{
						res.send({ "error" : "3" ,"position":"ctl-shipping_spaciality->caution", "message" : "không tìm thấy khu vực"}); 
						return;	
					}
				}else{
					var evn = ojs_configs.evn;
					evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, price_caution, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
					res.send({ "error" : "4" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
					return;							
				}
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
				res.send({ "error" : "5" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
				return;					
			}
		}
		
		//@
		//@ nếu có quận thì tính giá theo quận
		if(datas.adress.Districts && datas.adress.Districts.length > 0){
			try{
				var price_caution = await models_shipping_spaciality.caution(datas.adress.Districts);
				//res.send(price_caution); 
				//return;					
				
				if( Array.isArray(price_caution)){
					
					if(price_caution.length > 0){
						res.send({ "error" : "" , "datas" : price_caution[0].shipping_speciality_price}); 
						return;	
					}else{
						res.send({ "error" : "6" ,"position":"ctl-shipping_spaciality->caution", "message" : "không tìm thấy khu vực"}); 
						return;	
					}
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, price_caution, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
					res.send({ "error" : "7" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
					return;							
				}
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
				res.send({ "error" : "8" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
				return;					
			}			
		}		
		
		
		//@
		//@ nếu có tỉnh thì tính giá theo tỉnh
		if(datas.adress.province && datas.adress.province.length > 0){
			try{
				var price_caution = await models_shipping_spaciality.caution(datas.adress.province);
				//res.send(price_caution); 
				//return;					
				
				if( Array.isArray(price_caution)){
					
					if(price_caution.length > 0){
						res.send({ "error" : "" , "datas" : price_caution[0].shipping_speciality_price}); 
						return;	
					}else{
						res.send({ "error" : "9" ,"position":"ctl-shipping_spaciality->caution", "message" : "không tìm thấy khu vực"}); 
						return;	
					}
				}else{
					var evn = ojs_configs.evn;
					evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, price_caution, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
					res.send({ "error" : "10" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
					return;							
				}
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
				res.send({ "error" : "11" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
				return;					
			}				
		}		

		res.send({ "error" : "12" ,"position":"ctl-shipping_spaciality->caution", "message" : "dữ liệu gữi lên không hợp lệ"}); 
		return;			
		
	}else if(datas.type == "ghtk"){
		//@
		//@
		//@ 
		//@ lấy id sản phẩm lưu vào mảng arr_id
		//@ lấy giá sản phẩm theo id arr_id (select in (arr_id)) -> price_list
		//@ loop qua price_list cộng tổng ía sản phẩm đưa vào weight_sum
		//@ xong xui gữi lên ghtk lấy giá vận chuyển
		let arr_id = [];
		let weight_sum = 0;
		
		for(let x in datas.orders_details){
			arr_id.push(datas.orders_details[x].orders_details_speciality_product_id);
		}
		//@
		//@		
		try{
			var price_list = await models_shipping_spaciality.caution_get_price_list(arr_id);
			if( Array.isArray(price_list) ){
				if(price_list.length > 0){
					
					for(let x in price_list){
						for(let y in datas.orders_details){
							if(price_list[x].products_speciality_ID == datas.orders_details[y].orders_details_speciality_product_id){
								weight_sum = weight_sum + ( price_list[x].products_speciality_weight * datas.orders_details[y].orders_details_speciality_qty)
							}
						}
						
					}
					
					//res.send({ "error" : "" , "datas" : price_list}); 
					//return;	

					//@
					//@
					//@ lấy thông tin cửa hàng
					try{
						var stores_info = await models_shipping_spaciality.get_stores(price_list);
						//res.send([stores_info]); 
						//return;					
						
						if( Array.isArray(stores_info)){
						}else{
							var evn = ojs_configs.evn;
							evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, stores_info, "Lỗi code get chi tiết cửa hàng , vui lòng liên hệ admin" );					
							res.send({ "error" : "122" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
							return;							
						}
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get chi tiết cửa hàng , vui lòng liên hệ admin" );					
						res.send({ "error" : "133" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
						return;					
					}

					//res.send({ "error" : "asdasd" , "datas" : stores_info}); 
					//return;
					
					//@
					//@	
					try {	
						//Lấy danh sách loại danh mục
						let url = ojs_configs.domain_ghtk + 
						"pick_province=" + stores_info[0].stores_province + "&" + 
						"pick_district=" + stores_info[0].stores_district + "&" +  
						"province=" + datas.adress.province + "&" + 
						"district=" + datas.adress.Districts + "&" + 
						"weight=" + weight_sum + "&" + 
						"deliver_option=none";							
						
						let token = ojs_configs.token_ghtk;
						//res.send({ "error" : "" , "datas" : [url,token]}); 
						//return;							
						
						
						var result = await ojs_shares_fetch_data.get_data_send_token_get_ghtk(url,token);
						if(result.fee.fee){
							res.send({ "error" : "" , "datas" : result.fee.fee}); 	
							return;
						}else{
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares.show_error( evn, "Không tìm thấy giá của khu vực này", "Không tìm thấy giá của khu vực này" );
							res.send({ "error" : "13" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send }); 
							return;								
						}

					}
					catch(error){
						var evn = ojs_configs.evn;
						evn = "dev";
						var error_send = ojs_shares.show_error( evn, error, "Lỗi lưu data. liên hệ admin" );
						res.send({ "error" : "14" ,"position":"ctl-shipping_spaciality->caution", "message" : "không tìm thấy giá ghtk"}); 
						return;	
					}	


	
					res.send({ "error" : "" , "datas" : weight_sum}); 
					return;	
				}else{
					res.send({ "error" : "15" ,"position":"ctl-shipping_spaciality->caution", "message" : "không tìm thấy giá sản phẩm"}); 
					return;	
				}				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice caution list , vui lòng liên hệ admin" );					
				res.send({ "error" : "16" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
				return;					
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Không tìm thấy giá của khu vực này , vui lòng liên hệ admin" );					
			res.send({ "error" : "17" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
			return;			
		}
	}else{
		res.send({ "error" : "18" ,"position":"ctl-shipping_spaciality->caution", "message" : "Chưa có type này, chỉ có dala và ghtk"}); 
		return;			
	}

}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi code get pfice caution , vui lòng liên hệ admin" );					
	res.send({ "error" : "113" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
	return;		
}




}

//end of 7. [search] 








module.exports = { 
		search,
		insert_shipping_spaciality,
		get_one_shipping_spaciality,
		update_shipping_spaciality,
		delete_shipping_spaciality,
		get_all_shipping_spaciality,
		caution
};

























