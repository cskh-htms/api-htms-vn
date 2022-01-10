


/*




* 1. [insert_reviews_speciality]

* 1.1 [insert_reviews_speciality_app]

* 2. [get_all_reviews_speciality]

* 3. [get_one_reviews_speciality]

* 4. [update_reviews_speciality]

* 5. [delete_reviews_speciality]

* 5. [search]




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
const default_field = require('../const-tables/const-tables-reviews-spaciality');


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
const models_reviews_spaciality = require('../models/models-reviews-spaciality');





/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////








//@
//@
//@
//@
//@
//@
//@ 1. [insert_reviews_spaciality]
async  function insert_reviews_spaciality(req, res, next) {
	
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
		if(!datas.reviews_speciality_user_id){
			res.send({ "error" : "1" , "position" : "ctl-review->insert","message" : " Chưa nhập mã khách hàng (user_id) " });
			return;
		}
		if(!datas.reviews_speciality_product_id){
			res.send({ "error" : "2" , "position" : "ctl-review->insert","message" : " Chưa nhập mã sản phẩm (user_id) " });
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position" : "ctl-review->insert","message": error_send } ); 
		return;	
	}	



	//res.send( [datas,token] );	
	//return;	 
	
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"user_id" : datas.reviews_speciality_user_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4","position" : "ctl-review->insert", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.owner_user == "1" 
	||  check_datas_result.user_role == "admin" 
	||  check_datas_result.user_role == "customer"
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5", "position" : "ctl-review->insert","message": error_send } ); 
		return;			
	}		
		
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@  check xem bạn đã đánh giá sản phẩm này chưa
	//@ nếu đã đánh giá rồi thì không cho đánh giá nữa
	try {
		//@
		//@
		//@
		var datas_check_reviews = {
			"datas" : {
				"user_id" 	: datas.reviews_speciality_user_id,
				"product_id" : datas.reviews_speciality_product_id
			}
		}
		//res.send(datas_check_reviews);
		//return;
		//@
		//@
		//@
		//@
		var push_check = await models_reviews_spaciality.get_check_reviews_insert(datas_check_reviews);
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "6", "position" : "ctl-review->insert","message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bạn đã đánh giá sản phẩm này " ," Bạn đã đánh giá sản phẩm này " );
			res.send( { "error": "7", "position" : "ctl-review->insert","message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "8", "position" : "ctl-review->insert","message" : error_send  } );
		return;
	}		
	//res.send(push_check);
	//return;	
	
	
	
	
	//@
	//@
	//@
	//@  check xem người đánh giá đã mua sản phẩm chưa
	//@ nếu chưa mua sản phẩm thì không được đánh giá
	try {
		//@
		//@
		//@
		var datas_check_reviews_buy = {
			"datas" : {
				"user_id" 	: datas.reviews_speciality_user_id,
				"product_id" : datas.reviews_speciality_product_id
			}
		}
		//res.send(datas_check_reviews);
		//return;
		//@
		//@
		//@
		//@
		var push_check_buy = await models_reviews_spaciality.get_check_reviews_buy(datas_check_reviews_buy);
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check_buy.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check_buy.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "9", "position" : "ctl-review->insert","message" : error_send  } );
			return;			
		}
		
		//res.send(push_check_buy);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check_buy.length > 0){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bạn chưa mua sản phẩm, không thể đánh giá " ," Bạn chưa mua sản phẩm, không thể đánh giá " );
			res.send( { "error": "10", "position" : "ctl-review->insert","message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "11", "position" : "ctl-review->insert","message" : error_send  } );
		return;
	}		
	
	//res.send(push_check_buy);
	//return;		
	
	

	
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	



	//@
	//@
	//@
	//@
	//@ check data
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "12", "position" : "ctl-review->insert","message" : data_check } );
			return;
		}
	}
	catch(error){
		var error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, " lỗi check data " );
		res.send( { " error": "13","position" : "ctl-review->insert", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_reviews_spaciality.insert_reviews_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "14","position" : "ctl-review->insert", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert stores , Liên hệ admin" );
		res.send({ "error" : "15", "position" : "ctl-review->insert","message": error_send } ); 
		return;
	}	
}

//@ end of 
//@ 1. [insert_reviews_spaciality]





//@
//@
//@
//@
//@
//@
//@ 1.1 [insert_reviews_spaciality_app]
async  function insert_reviews_spaciality_app(req, res, next) {
	
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
		if(!datas.reviews_speciality_user_id){
			res.send({ "error" : "1" , "position" : "ctl-review->insert","message" : " Chưa nhập mã khách hàng (user_id) " });
			return;
		}
		if(!datas.reviews_speciality_product_id){
			res.send({ "error" : "2" , "position" : "ctl-review->insert","message" : " Chưa nhập mã sản phẩm (user_id) " });
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position" : "ctl-review->insert","message": error_send } ); 
		return;	
	}	



	//res.send( [datas,token] );	
	//return;	 
	
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"user_id" : datas.reviews_speciality_user_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4","position" : "ctl-review->insert", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.owner_user == "1" 
	||  check_datas_result.user_role == "admin" 
	||  check_datas_result.user_role == "customer"
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "5", "position" : "ctl-review->insert","message": error_send } ); 
		return;			
	}		
		
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@  check xem bạn đã đánh giá sản phẩm này chưa
	//@ nếu đã đánh giá rồi thì không cho đánh giá nữa
	try {
		//@
		//@
		//@
		var datas_check_reviews = {
			"datas" : {
				"user_id" 	: datas.reviews_speciality_user_id,
				"product_id" : datas.reviews_speciality_product_id
			}
		}
		//res.send(datas_check_reviews);
		//return;
		//@
		//@
		//@
		//@
		var push_check = await models_reviews_spaciality.get_check_reviews_insert(datas_check_reviews);
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "6", "position" : "ctl-review->insert","message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bạn đã đánh giá sản phẩm này " ," Bạn đã đánh giá sản phẩm này " );
			res.send( { "error": "7", "position" : "ctl-review->insert","message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "8", "position" : "ctl-review->insert","message" : error_send  } );
		return;
	}		
	//res.send(push_check);
	//return;	
	
	
	
	
	//@
	//@
	//@
	//@  check xem người đánh giá đã mua sản phẩm chưa
	//@ nếu chưa mua sản phẩm thì không được đánh giá
	try {
		//@
		//@
		//@
		var datas_check_reviews_buy = {
			"datas" : {
				"user_id" 	: datas.reviews_speciality_user_id,
				"product_id" : datas.reviews_speciality_product_id
			}
		}
		//res.send(datas_check_reviews);
		//return;
		//@
		//@
		//@
		//@
		var push_check_buy = await models_reviews_spaciality.get_check_reviews_buy(datas_check_reviews_buy);
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check_buy.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check_buy.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "9", "position" : "ctl-review->insert","message" : error_send  } );
			return;			
		}
		
		//res.send(push_check_buy);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check_buy.length > 0){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bạn chưa mua sản phẩm, không thể đánh giá " ," Bạn chưa mua sản phẩm, không thể đánh giá " );
			res.send( { "error": "10", "position" : "ctl-review->insert","message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "11", "position" : "ctl-review->insert","message" : error_send  } );
		return;
	}		
	
	//res.send(push_check_buy);
	//return;		
	
	

	
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	



	//@
	//@
	//@
	//@
	//@ check data
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "12", "position" : "ctl-review->insert","message" : data_check } );
			return;
		}
	}
	catch(error){
		var error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, " lỗi check data " );
		res.send( { " error": "13","position" : "ctl-review->insert", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_reviews_spaciality.insert_reviews_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "14","position" : "ctl-review->insert", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert stores , Liên hệ admin" );
		res.send({ "error" : "15", "position" : "ctl-review->insert","message": error_send } ); 
		return;
	}	
}

//@ end of 
//@ 1. [insert_reviews_spaciality]







//@
//@
//@
//@
//@
//@
//@ 2. [getall_reviews_spaciality]
async  function get_all_reviews_spaciality(req, res, next) {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1",  "position" : "ctl-review->get-all","message": error_send } ); 
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
		res.send({ "error" : "2", "position" : "ctl-review->get-all","message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin"
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position" : "ctl-review->get-all","message": error_send } ); 
		return;			
	}		
	
	
	
	
	
	//res.send({ "title" : "welcome" });
	//return;
	//@
	//@
	//@
	//@	
	//@
	try {
		models_reviews_spaciality.get_all_reviews_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data reviews" );
			res.send({ "error" : "4","position" : "ctl-review->get-all", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data reviews" );
		res.send({ "error" : "5", "position" : "ctl-review->get-all","message": error_send } ); 
		return;	
	}	
}
//@ end of
//@ 2. [getall_reviews_spaciality]




//@
//@
//@
//@
//@
//@
//@ 3. [get_one_reviews_spaciality]
async  function get_one_reviews_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var review_id = req.params.review_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1",  "position" : "ctl-review->get-one", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"review_id":review_id
		}		
		
		var check_datas_result;		
		
		//res.send(datas_check);
		//return;			
		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		//res.send(check_datas_result);
		//return;			
		
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2",  "position" : "ctl-review->get-one", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;	
	
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_review == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3",  "position" : "ctl-review->get-one", "message": error_send } ); 
		return;			
	}	
	
	

	//res.send({ "title" : "welcome" });
	//return;
	//@
	//@
	//@
	//@
	//@	
	try {
		models_reviews_spaciality.get_one_reviews_spaciality(review_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "4", "position" : "ctl-review->get-one",  "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "5",  "position" : "ctl-review->get-one", "message": error_send } ); 
			return;	
	}	
}
//@ end of 
//@ 3. [get_one_reviews_spaciality]






//@
//@
//@
//@
//@
//@
//@ 4. [update_reviews_spaciality]
async function update_reviews_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var review_id = req.params.review_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1",  "position" : "ctl-review->update", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"review_id":review_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2",  "position" : "ctl-review->update",  "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		//@
		//@
		var push_check = await models_reviews_spaciality.get_one_reviews_spaciality(review_id);
		//res.send(push_check);
		//return;	
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "3",   "position" : "ctl-review->update", "message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0  && push_check[0].reviews_speciality_status_admin  == "1"  && check_datas_result.user_role != "admin"){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Đánh giá đã push không chỉnh sữa " ," Đánh giá đã push không chỉnh sữa " );
			res.send( { "error": "4",   "position" : "ctl-review->update", "message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "5",   "position" : "ctl-review->update", "message" : error_send  } );
		return;
	}	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@	
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_review == "1" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "6",   "position" : "ctl-review->update", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	

	
	//@
	//@
	//@
	//@
	//@ run model
	try {
		models_reviews_spaciality.update_reviews_spaciality(datas,review_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "7",   "position" : "ctl-review->update", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "8",   "position" : "ctl-review->update", "message": error_send } ); 
		return;	
	}	
}
//@ end of 
//@ 4. [update_reviews_spaciality]



//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 5. [delete_reviews_spaciality]
async  function delete_reviews_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var review_id = req.params.review_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1",   "position" : "ctl-review->delete", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"review_id":review_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2",  "position" : "ctl-review->delete", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		//@
		//@
		var push_check = await models_reviews_spaciality.get_one_reviews_spaciality(review_id);
		//res.send(push_check);
		//return;	
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "3",  "position" : "ctl-review->delete", "message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0  && push_check[0].reviews_speciality_status_admin  == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Đánh giá đã push không xoá " ," Đánh giá đã push không xoá " );
			res.send( { "error": "4",  "position" : "ctl-review->delete", "message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "5",  "position" : "ctl-review->delete", "message" : error_send  } );
		return;
	}	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@	
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_review == "1" 	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "6",  "position" : "ctl-review->delete", "message": error_send } ); 
		return;			
	}		
	
	
		
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	

	
	
	
	//@
	//@
	//@
	//@	
	//@ run
	try {
		models_reviews_spaciality.delete_reviews_spaciality(review_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "7 ",  "position" : "ctl-review->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "8",  "position" : "ctl-review->delete", "message": error_send } ); 
		return;	
	}	
}
//@ 
//@ end of
//@ 5. [delete_reviews_spaciality]








//@ 
//@
//@ 
//@
//@ 
//@
//@ 6. [search]
async  function search(req, res, next) {
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
		res.send({ "error" : "1",  "position" : "ctl-review->search", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var review_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "reviews_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							review_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "2",  "position" : "ctl-review->search", "message": error_send } ); 
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
				"review_id":review_id
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
		res.send({ "error" : "3",  "position" : "ctl-review->search", "message": error_send } ); 
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
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4",  "position" : "ctl-review->search", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_review == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5",  "position" : "ctl-review->search", "message": error_send } ); 
			return;			
		}			
	}		
	
	
	
	
	
	///////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////
	
	
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_reviews_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6",  "position" : "ctl-review->search", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "7",  "position" : "ctl-review->search", "message": error_send } ); 
		return;	
	}

}

//@ end of
//@ 6. [search]











/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_reviews_spaciality,
	get_one_reviews_spaciality,
	update_reviews_spaciality,
	insert_reviews_spaciality,
	insert_reviews_spaciality_app,
	delete_reviews_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























