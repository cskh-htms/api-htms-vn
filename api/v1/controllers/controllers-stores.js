
var express = require('express');
var router = express.Router();

// get test valiable
const models_stores = require('../models/models-stores');
const default_field = require('../const-tables/const-tables-stores');

const jwt = require('jsonwebtoken');
const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');

const models_products_spaciality = require('../models/models-products-spaciality');

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
		models_stores.search(datas).then( results => {
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
//search
async  function search_payment(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;


	try {
		models_stores.search_payment(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2_search_payment", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3_search_payment", "message" : error_send  } );
	}

}



//insert_stores
async function insert_stores(req, res, next) {
	
	let datas = req.body.datas;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin bussiness moi nhap lieu dc
	if(
		ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) == true  
		|| ojs_functions_shares.check_role_bussiness(token_decode.users_type_infomation) == true  )	
	{ 
		//next()
	}else{
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
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
		return;
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_stores.insert_stores(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
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
async  function get_all_stores(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_stores.get_all_stores().then( results => {
			
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
async  function get_one_stores(req, res, next) {
	let stores_id = req.params.stores_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_stores.get_one_stores(stores_id).then( results => {
			
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
async  function update_stores(req, res, next) {
	let datas = req.body.datas;
	let stores_id = req.params.stores_id;
	
	//res.send({"error" : "1", "message" : datas } );
	//return ;
	
	
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//@check chủ sỡ hữu
	//phải là chủ sỡ hữu comment mới update dc	
	
	//res.send({"error" : "1", "message" : stores_id } );
	//return ;	
	
	var data_check;
	try {	
		data_check = {
			"datas" :   
			{
				"select_field" :
				[
					"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"stores_ID",
							"value"     : stores_id,
							"compare" 	: "="
						},  
						{   "field"     :"stores_user_id",
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
		res.send( { "error": "1_c_ctl_api_update_store", "message" : error_send  } );
	}		
	
	///res.send( data_check );
	//return;
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_stores.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "2_c_ctl_api_update_store", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu );
	//return;
	
	
	if (check_chu_so_huu.hasOwnProperty("error")) {
		res.send(check_chu_so_huu); 
		return;	
	}else{
		if(check_chu_so_huu.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền thao tác"  } ); 
				return;
			}
		}
	}
	
	//##
	//##
	//#end of check chủ sỡ hữu 

	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			



	//@
	//@
	//@xoá hạn mức và status
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		delete datas.stores_payment_limit;
		delete datas.stores_status;
	}





	//@
	try {
		models_stores.update_stores(datas,stores_id).then( results => {
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
//delete
async  function delete_stores(req, res, next) {
	let stores_id = req.params.stores_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//@check chủ sỡ hữu
	//phải là chủ sỡ hữu 
	var data_check;
	try {	
		data_check = {
			"datas" :   {
				"select_field" :
				[
					"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"stores_ID",
							"value"     : stores_id,
							"compare" 	: "="
						},  
						{   "field"     :"stores_user_id",
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
		res.send( { "error": "1_c_ctl_api_update_store", "message" : error_send  } );
	}		
	
	//res.send( data_check );
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_stores.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "2_c_ctl_api_update_store", "message" : error_send  } );
	}	
	//res.send( check_chu_so_huu_comment );
	//return;
	
	
	if (check_chu_so_huu.hasOwnProperty("error")) {
		res.send(check_chu_so_huu); 
		return;	
	}else{
		if(check_chu_so_huu.length <= 0 ){
			if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
				res.send( { "error": "c_ctl_api_15", "message" : "Bạn không có quyền thao tác"  } ); 
				return;
			}
		}
	}
	
	
	
	
	//@
	//@
	//check xem cua hang da co san pham chua
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_store_link;
	try {
		//
		check_store_link = await models_products_spaciality.check_store_link( stores_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_store_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_store_link","message":" Cửa hàng đã có sản phẩm, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_store_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_store_link.error.length > 0) { res.send(check_store_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_store_link", "message" : error_send  } );
	}	
	
	
	//res.send( { "error": "5_check_store_link", "message" : "hehe" } );
	//return;
	
	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_stores.delete_stores(stores_id).then( results => {
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




module.exports = { 
		search,
		search_payment,
		insert_stores,
		get_one_stores,
		update_stores,
		delete_stores,
		get_all_stores
};

























