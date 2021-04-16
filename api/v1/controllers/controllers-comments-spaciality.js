/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_comments_spaciality = require('../models/models-comments-spaciality');

const default_field = require('../const-tables/const-tables-comments-spaciality');

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
async  function get_all_comments_spaciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_comments_spaciality.get_all_comments_spaciality().then( results => {
			
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
		models_comments_spaciality.search(datas).then( results => {
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
async  function get_one_comments_spaciality(req, res, next) {
	let comment_id = req.params.comment_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_comments_spaciality.get_one_comments_spaciality(comment_id).then( results => {
			
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
//update
async function update_comments_spaciality(req, res, next) {
	let datas = req.body.datas;
	let comment_id = req.params.comment_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//res.send([datas,comment_id,cat_string]);
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
					"comments_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"comments_speciality_ID",
							"value"     : comment_id,
							"compare" 	: "="
						},  
						{   "field"     :"comments_speciality_user_id",
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
	let check_chu_so_huu_comment;
	try {
		check_chu_so_huu_comment = await models_comments_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_12", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu_comment );
	//return;
	
	
	if (check_chu_so_huu_comment.hasOwnProperty("error")) {
		res.send(check_chu_so_huu_comment); 
		return;	
	}else{
		if(check_chu_so_huu_comment.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền update"  } ); 
				return;
			}
		}
	}
	//#end of check chủ sỡ hữu commnet

	//@
	try {
		models_comments_spaciality.update_comments_spaciality(datas,comment_id).then( results => {
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
async  function insert_comments_spaciality(req, res, next) {
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
		models_comments_spaciality.insert_comments_spaciality(datas_assign).then( results => {
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
async  function delete_comments_spaciality(req, res, next) {
	let comment_id = req.params.comment_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//res.send([comment_id]);
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
					"comments_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"comments_speciality_ID",
							"value"     : comment_id,
							"compare" 	: "="
						},  
						{   "field"     :"comments_speciality_user_id",
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
	let check_chu_so_huu_comment;
	try {
		check_chu_so_huu_comment = await models_comments_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_12", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu_comment );
	//return;
	
	
	if (check_chu_so_huu_comment.hasOwnProperty("error")) {
		res.send(check_chu_so_huu_comment); 
		return;	
	}else{
		if(check_chu_so_huu_comment.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền update"  } ); 
				return;
			}
		}
	}
	//#end of check chủ sỡ hữu commnet

	//@
	try {
		models_comments_spaciality.delete_comments_spaciality(comment_id).then( results => {
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
	get_all_comments_spaciality,
	get_one_comments_spaciality,
	update_comments_spaciality,
	insert_comments_spaciality,
	delete_comments_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























