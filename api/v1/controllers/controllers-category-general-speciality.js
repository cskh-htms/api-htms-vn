/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_category_gemeral_speciality = require('../models/models-category-gemeral-speciality');
const models_category_general_speciality_link = require('../models/models-category-gemeral-speciality-link');


const default_field = require('../const-tables/const-tables-category-general-speciality');

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
//insert
async function insert_category_general_speciality(req, res, next) {

	let datas = req.body.datas;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không có quyền nhập liệu"  } ); return;
	}	
	
	
	
	
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1_ctrl_api_insert_category", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
		return;
	}			
	//res.send(datas);
	

	//@
	//@
	//kiem tra quyen insert- neu admin thi cho inser con khong thi kocho insert
	//let check_role = ojs_functions_shares.check_admin(token_decode.users_users_type_id);
	//if(check_role != "admin-ne"){}
	//@
	try {
		models_category_gemeral_speciality.insert_category_general_speciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
			return;
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
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
async function update_category_general_speciality(req, res, next) {
	let datas = req.body.datas;
	let cat_id = req.params.cat_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//@@	
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không có quyền nhập liệu"  } ); return;
	}
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
		return;
	}			
	
	//@
	try {
		models_category_gemeral_speciality.update_category_general_speciality(datas,cat_id).then( results => {
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
async function delete_category_general_speciality(req, res, next) {
	let cat_id = req.params.cat_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send({ "error": "dfsdfdf"}); 
	//return;
	
	
	//@@
	//@
	//chi co admin moi xoá
	//check 1
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không có quyền nhập liệu"  } ); return;
	}	
	

	//@@
	//check 2
	//kiem tra neu co category con thi` ko cho xoa
	var check_datas = 
	{
    "datas" :   {
			"select_field" :
			[ 
			"category_general_speciality_ID",
		   "category_general_speciality_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{    "field"    :"category_general_speciality_category_parent_id",
						"value"     : cat_id,
						"compare" 	: "="
					}               
					]    
				}     
			],
			"order" :[
					{    "field"        :"category_general_speciality_ID",
						"compare" : "ASC"
					}      
			]
		}
	}
	//@
	//@
	try {
		var check_category_child = await models_category_gemeral_speciality.search(check_datas).then( results => {
				if( typeof results.error == 'string' && results.error  ){ 
					return {"error":"1_check_category_child","message":results} 
				}else{
					if(results.length > 0){
						return {"error":"11_check_category_child","message":"Danh mục đã có danh mục con, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"2","message":"Lỗi máy chủ"} 
			}
		);	
		//
		if(check_category_child.error.length > 0) { res.send(check_category_child); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_14", "message" : error_send  } );
	}		
	//@@



	//@@
	//check 3
	//kiem tra neu da co san pham trong category thi ko cho xoa
	var check_datas = 
	{
		"datas" :   {
			"select_field" :
			[ 
				"category_general_speciality_link_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[             
						{
							"field" : "category_general_speciality_link_category_general_id" ,
							"value" : cat_id,
							"compare" : "="
						}
					]    
				}          
			],
			"order" :[        
			]
		}
	}
	//@
	//@
	try {
		var check_category_link = await models_category_general_speciality_link.search(check_datas.datas).then( results => {
				if( typeof results.error == 'string' && results.error  ){ 
					return {"error":"1_check_category_link","message":results} 
				}else{
					if(results.length > 0){
						return {"error":"11_check_category_link","message":"Danh mục đã có sản phẩm, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"2_check_category_link","message":"Lỗi máy chủ"} 
			}
		);	
		//
		if(check_category_link.error.length > 0) { res.send(check_category_link ); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "3_c_check_category_link", "message" : error_send  } );
	}		
	//res.send( { "error": "3_c_check_category_link", "message" : check_category_link } );
	//return;

	
	//@
	//@xoa'
	try {
		models_category_gemeral_speciality.delete_category_general_speciality(cat_id).then( results => {
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
//get all category chung
async function get_all_category_general_speciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_category_gemeral_speciality.get_all_category_general_speciality().then( results => {
			
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
//get all category chung
async function get_one_category_general_speciality(req, res, next) {
	let cat_id = req.params.cat_id;
	//res.send({ "title" : "welcomesdasd" });
	//return;
	//@
	try {
		models_category_gemeral_speciality.get_one_category_general_speciality(cat_id).then( results => {
			
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
//search
async  function search(req, res, next) {
	let datas = req.body;
	
	//res.send(datas);
	//return;

	try {
		models_category_gemeral_speciality.search(datas).then( results => {
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


/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_category_general_speciality,
	insert_category_general_speciality,
	update_category_general_speciality,
	delete_category_general_speciality,
	get_one_category_general_speciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























