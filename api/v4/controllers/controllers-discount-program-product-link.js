
/*

* 1. [insert_discount_program_product_link]

* 2. [get_all_discount_program_product_link]

* 3. [get_one_discount_program_product_link]

* 4. [update_discount_program_product_link]

* 5. [delete_discount_program_product_link]

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
const default_field = require('../const-tables/const-tables-discount-program-product-link');


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
const models_discount_program_product_link = require('../models/models-discount-program-product-link');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_discount_program_product_link]
async function insert_discount_program_product_link(req, res, next) {
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
		if(!datas.discount_program_product_link_discount_program_details_id){
			res.send({ 
			"error" : "1", 
			"position":"ctl-discount-program-product-link->insert", 
			"message": " Chưa nhập id chương trình (discount_program_product_link_discount_program_details_id) " } );
			return;
		}
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.discount_program_product_link_product_speciality_id){
			res.send({ 
			"error" : "2", 
			"position":"ctl-adress-meta->insert", 
			"message": " Chưa nhập id sản phẩm (discount_program_product_link_product_speciality_id) " } );
			return;
		}		
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position":"ctl-discount-program-product-link->insert", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token":token,
			"discount_program_details_id": datas.discount_program_product_link_discount_program_details_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4", "position":"ctl-discount-program-product-link->insert", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin" 
	|| check_datas_result.owner_discount_program_details == "1" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5", "position":"ctl-discount-program-product-link->insert", "message": error_send } );  
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
			res.send({ "error" : "6", "position":"ctl-discount-program-product-link->insert", "message": data_check } ); 
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "7", "position":"ctl-discount-program-product-link>insert", "message": error_send } );
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_discount_program_product_link.insert_discount_program_product_link(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "8", "position":"ctl-discount-program-product-link>insert", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program_product_link , Liên hệ admin" );
		res.send({ "error" : "9", "position":"ctl-discount-program-product-link>insert", "message": error_send } );
		return;
	}

}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program_product_link , Liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-discount-program-product-link>insert", "message": error_send } );
	return;
}		
}


//@ end of 1. [insert_discount_program_product_link]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_discount_program_product_link_store]
async  function get_all_discount_program_product_link(req, res, next) {
try {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-discount-program-product-link>get all", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-discount-program-product-link>get all", "message": error_send } ); 
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
		res.send({ "error" : "3", "position":"ctl-discount-program-product-link>get all", "message": error_send } );  
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	try {
		models_discount_program_product_link.get_all_discount_program_product_link().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program_product_link" );
			res.send({ "error" : "4", "position":"ctl-discount-program-product-link>get all", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program_product_link" );
		res.send({ "error" : "5", "position":"ctl-discount-program-product-link>get all", "message": error_send } ); 
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program_product_link" );
	res.send({ "error" : "113", "position":"ctl-discount-program-product-link>get all", "message": error_send } ); 
	return;
}		
}

//@ end of * 2. [get_all_discount_program_product_link_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_discount_program_product_link]
async  function get_one_discount_program_product_link(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-discount-program-product-link>get one", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_product_link_id":discount_program_product_link_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		es.send({ "error" : "2", "position":"ctl-discount-program-product-link>get one", "message": error_send } ); 
		return;			
	}
	
	
	
	//res.send(check_datas_result);
	//return;
	
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_discount_program_product_link == "1" 
	|| check_datas_result.user_role == "supper-job"
	|| check_datas_result.user_role == "default"	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		es.send({ "error" : "3", "position":"ctl-discount-program-product-link>get one", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_discount_program_product_link.get_one_discount_program_product_link(discount_program_product_link_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			es.send({ "error" : "4", "position":"ctl-discount-program-product-link>get one", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			es.send({ "error" : "5", "position":"ctl-discount-program-product-link>get one", "message": error_send } );  
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		es.send({ "error" : "113", "position":"ctl-discount-program-product-link>get one", "message": error_send } );  
		return;	
}	
}

//@ end of * 3. [get_one_discount_program_product_link]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_discount_program_product_link]
async  function update_discount_program_product_link(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_product_link_id":discount_program_product_link_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-discount-program-product-link>update", "message": error_send } );  
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_discount_program_product_link == "1" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin cua hàng 
	try {
		var discount_program_product_link_check = await models_discount_program_product_link.get_one_discount_program_product_link(discount_program_product_link_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(discount_program_product_link_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";				
			var error_send = ojs_shares_show_errors.show_error( evn, discount_program_product_link_check.error, "lỗi truy xuất database discount_program_product_link, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
			return;			
		}
		//@
		//@
		//@ nếu không có cửa hàng thì báo lỗi
		if(discount_program_product_link_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";			
			var error_send = ojs_shares_show_errors.show_error( evn,"Không có cửa hàng", "Không có cửa hàng" );
			res.send({ "error" : "5", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 	
			return;			
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database discount_program_product_link" );
		res.send({ "error" : "6", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
		return;
	}			
	
	
	
	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		//neu khong phai admin thi remove admin status
		//remove status update
		if(check_datas_result.user_role != "admin" && discount_program_product_link_check[0].discount_program_product_link_status == "1"){
			res.send({ 
			"error" : "7",
			"position":"ctl-discount-program-product-link>update", 
			"message":"Sản phẩm đã chạy không update" } ); 
			return;			
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi xoá status, liên hệ admin","Lỗi xoá status, liên hệ admin" );
		res.send({ "error" : "8", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
		return;
	}


	//@
	//@
	//@
	//@	
	//@
	try {
		models_discount_program_product_link.update_discount_program_product_link(datas,discount_program_product_link_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "9", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "10", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program-product-link>update", "message": error_send } ); 
		return;
}		
}

//@@ * end of  4. [update_discount_program_product_link]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_discount_program_product_link]
async  function delete_discount_program_product_link(req, res, next) {
try {
	//@
	//@
	//@	get datas req
	try {
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-discount-program-product-link>delete", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_product_link_id":discount_program_product_link_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-discount-program-product-link>delete", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_discount_program_product_link == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-discount-program-product-link>delete", "message": error_send } ); 
		return;			
	}		
	
	

	//@
	//@
	//@
	//@	
	//@
	try {
		models_discount_program_product_link.delete_discount_program_product_link(discount_program_product_link_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "4", "position":"ctl-discount-program-product-link>delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-discount-program-product-link>delete", "message": error_send } );  
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program-product-link>delete", "message": error_send } );  
		return;	
}		
}
//@* end of  5. [delete_discount_program_product_link]






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
		res.send({ "error" : "1", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search store theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var discount_program_product_link_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "discount_program_product_link_ID"  
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
		res.send({ "error" : "2", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
		return;			
	}		
	


	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_product_link_id":discount_program_product_link_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-discount-program-product-link>search", "message": error_send } );  
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
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
			res.send({ "error" : "4", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_discount_program_product_link == "1" 
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
			res.send({ "error" : "5", "position":"ctl-discount-program-product-link>search", "message": error_send } );  
			return;			
		}			
	}	
	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_discount_program_product_link.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "6", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "7", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program-product-link>search", "message": error_send } ); 
		return;	
}

}

//end of 6. [search] 









module.exports = { 
		search,
		insert_discount_program_product_link,
		get_one_discount_program_product_link,
		update_discount_program_product_link,
		delete_discount_program_product_link,
		get_all_discount_program_product_link
};

























