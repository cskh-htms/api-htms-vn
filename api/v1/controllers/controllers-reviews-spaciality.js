/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_reviews_spaciality = require('../models/models-reviews-spaciality');

const default_field = require('../const-tables/const-tables-reviews-spaciality');

const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');


const jwt    = require('jsonwebtoken');
/*
@@@@
@@@@@
@@@@@
@@@@@
*/


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
async  function get_all_reviews_spaciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_reviews_spaciality.get_all_reviews_spaciality().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2_api", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3_api", "message" : error_send  } );
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
		models_reviews_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
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
//get all category chung
async  function get_one_reviews_spaciality(req, res, next) {
	let review_id = req.params.review_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_reviews_spaciality.get_one_reviews_spaciality(review_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}	
}
























//
//**
//**
//*********
//*********
//**
//**
//update
async function update_reviews_spaciality(req, res, next) {
	let datas = req.body.datas;
	let review_id = req.params.review_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//res.send([datas,review_id,cat_string]);
	//@

	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			

	//@check chủ sỡ hữu
	//phải là chủ sỡ hữu comment mới update dc	
	var data_check;
	try {	
		data_check = {
			"datas" :   {
				"select_field" :
				[
					"reviews_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"reviews_speciality_ID",
							"value"     : review_id,
							"compare" 	: "="
						},  
						{   "field"     :"reviews_speciality_user_id",
							"value"     : token_decode.users_ID,
							"compare" 	: "="
						}					
						]    
					}         
				],
				"order" :
				 [

				 ]
			}
		}	
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_14", "message" : error_send  } );
	}		
	
	//res.send( data_check.datas );
	//return;
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_reviews_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_12", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu );
	//return;
	
	
	if (check_chu_so_huu.hasOwnProperty("error")) {
		res.send(check_chu_so_huu); 
		return;	
	}else{
		if(check_chu_so_huu.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền update"  } ); 
				return;
			}
		}
	}
	//##
	//##
	//#end of check chủ sỡ hữu commnet

	//@
	try {
		models_reviews_spaciality.update_reviews_spaciality(datas,review_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
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
async  function insert_reviews_spaciality(req, res, next) {
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
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_reviews_spaciality.insert_reviews_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
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
//insert
async  function delete_reviews_spaciality(req, res, next) {
	let review_id = req.params.review_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//res.send([review_id]);
	//return;
	//@
	
	

	//@check chủ sỡ hữu
	//phải là chủ sỡ hữu comment mới update dc	
	var data_check;
	try {	
		data_check = {
			"datas" :   {
				"select_field" :
				[
					"reviews_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"reviews_speciality_ID",
							"value"     : review_id,
							"compare" 	: "="
						},  
						{   "field"     :"reviews_speciality_user_id",
							"value"     : token_decode.users_ID,
							"compare" 	: "="
						}					
						]    
					}         
				],
				"order" :
				 [

				 ]
			}
		}	
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_14", "message" : error_send  } );
	}		
	
	//res.send( data_check );
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_reviews_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_12", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu );
	//return;
	
	
	if (check_chu_so_huu.hasOwnProperty("error")) {
		res.send(check_chu_so_huu); 
		return;	
	}else{
		if(check_chu_so_huu.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền update"  } ); 
				return;
			}
		}
	}
	//#end of check chủ sỡ hữu commnet

	//@
	try {
		models_reviews_spaciality.delete_reviews_spaciality(review_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}	
}




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
	delete_reviews_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























