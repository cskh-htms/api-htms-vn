/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_products_spaciality = require('../models/models-products-spaciality');

const default_field = require('../const-tables/const-tables-products-spaciality');

const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');

const jwt = require('jsonwebtoken');



const models_category_general_speciality_link = require('../models/models-category-gemeral-speciality-link');

const models_option_speciality_link = require('../models/models-option-speciality-link');

const models_reviews_spaciality = require('../models/models-reviews-spaciality');

const models_comments_spaciality = require('../models/models-comments-spaciality');

const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');

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
async function get_all_products_spaciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_products_spaciality.get_all_products_spaciality().then( results => {
			
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
async function search(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_products_spaciality.search(datas).then( results => {
			if(results.hasOwnProperty("error")){
				res.send( { "error" : "1_md_api", "datas" : results } );
			}else{
				res.send( { "error" : "", "datas" : results } );
			}
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
async function get_one_products_spaciality(req, res, next) {
	let product_id = req.params.product_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_products_spaciality.get_one_products_spaciality(product_id).then( results => {
			
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
async function update_products_spaciality(req, res, next) {
	let datas = req.body.datas;
	let cat_string = req.body.cat_string;
	let option_string = req.body.option_string;
	let product_id = req.params.product_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	


	//@
	//@neu co status_admin thi` set status admin = 0;
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		if((typeof datas.products_speciality_status_admin == 'number' || typeof datas.products_speciality_status_admin == 'string') && datas.products_speciality_status_admin ){ 
			datas.products_speciality_status_admin = 0;
		}
	}

	//res.send({"error":"1","datas":datas.products_speciality_status_admin});
	//return;	

	//@
	//@
	//check chu so huu san pham
	var data_check;
	try {	
		data_check = {
			"datas" :   {
				"select_field" :
				[
					"products_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"products_speciality_ID",
							"value"     : product_id,
							"compare" 	: "="
						},  
						{   "field"     :"users_ID",
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
		res.send( { "error": "1_data_check_chu_so_huu", "message" : error_send  } );
	}		
	
	//res.send( data_check );
	//return;
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_products_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "2_data_check_chu_so_huu", "message" : error_send  } );
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

	


	//@
	try {
		models_products_spaciality.update_products_spaciality(datas,product_id,cat_string, option_string).then( results => {
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
async function insert_products_spaciality(req, res, next) {
	let datas = req.body.datas;
	let cat_string = req.body.cat_string;
	let option_string = req.body.option_string;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	

	
	//@
	//@neu co status_admin thi` set status admin = 0;
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		if((typeof datas.products_speciality_status_admin == 'number' || typeof datas.products_speciality_status_admin == 'string') && datas.products_speciality_status_admin ){ 
			datas.products_speciality_status_admin = 0;
		}
	}

	//@
	//@
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) == true 
		|| ojs_functions_shares.check_role_bussiness(token_decode.users_type_infomation) == true  ){ 
		//gogo
	}else{
		res.send( { "error": "1_check_role", "message" : "Bạn không có quyền thao tác"  } ); 
		return;
	}		
	
	
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
		models_products_spaciality.insert_products_spaciality(datas_assign,cat_string,option_string).then( results => {
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
async function delete_products_spaciality(req, res, next) {
	let product_id = req.params.product_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([product_id]);
	//return;

	//@
	//@
	//check chu so huu san pham
	var data_check;
	try {	
		data_check = {
			"datas" :   {
				"select_field" :
				[
					"products_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"products_speciality_ID",
							"value"     : product_id,
							"compare" 	: "="
						},  
						{   "field"     :"users_ID",
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
		res.send( { "error": "1_data_check_chu_so_huu", "message" : error_send  } );
	}		
	
	//res.send( data_check );
	//return;
	//@@
	let check_chu_so_huu;
	try {
		check_chu_so_huu = await models_products_spaciality.search( data_check.datas );
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "2_data_check_chu_so_huu", "message" : error_send  } );
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




	/*
	//@
	//@
	//check xem sản phẩm đã có danh mục chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_category_link;
	try {
		//
		check_category_link = await models_category_general_speciality_link.check_category_link( product_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_category_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_category_link","message":" Sản phẩm đã có danh mục, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_category_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_category_link.error.length > 0) { res.send(check_category_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_store_link", "message" : error_send  } );
	}	
		
	

	
	//@
	//@
	//check xem sản phẩm đã có option chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_option_link;
	try {
		//
		check_option_link = await models_option_speciality_link.check_option_link( product_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_category_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_category_link","message":" Sản phẩm đã có option, không thể xoá"} 
					}else{
						return {"error":"","message":"ok 2"} 
					}
				}
			}, error => {
				return {"error":"3_check_category_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_option_link.error.length > 0) { res.send(check_option_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_store_link", "message" : error_send  } );
	}	
			
	//	res.send(check_option_link);
	//return;			
			
	*/		
			
	
	//@
	//@
	//check xem sản phẩm đã có đánh giá chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_review_link;
	try {
		//
		check_review_link = await models_reviews_spaciality.check_review_link( product_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_review_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_review_link","message":" Sản phẩm đã có đánh giá, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_review_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_review_link.error.length > 0) { res.send(check_review_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_review_link", "message" : error_send  } );
	}	
					
			
	

	
	
	
	
	//@
	//@
	//check xem sản phẩm đã bình luận  chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_comment_link;
	try {
		//
		check_comment_link = await models_comments_spaciality.check_comment_link( product_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_comment_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_comment_link","message":" Sản phẩm đã có bình luận, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_comment_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_comment_link.error.length > 0) { res.send(check_comment_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_comment_link", "message" : error_send  } );
	}	
				
	

	
	//@
	//@
	//check xem sản phẩm đã bình luận  chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	var check_order_link;
	try {
		//
		check_order_link = await models_orders_spaciality_detail.check_order_link( product_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_order_link", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_order_link","message":" Sản phẩm đã có đơn hàng, không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_order_link","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_order_link.error.length > 0) { res.send(check_order_link); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_comment_link", "message" : error_send  } );
	}	

	
	//@
	//@
	try {
		models_products_spaciality.delete_products_spaciality(product_id).then( results => {
			//res.send( {"error" : "", "datas" : results} );
			
			models_category_general_speciality_link.delete_category_general_speciality_link_product(product_id).then( results => {
				//res.send( {"error" : "", "datas" : results} );
				models_option_speciality_link.delete_option_speciality_link_product(product_id).then( results => {
					res.send( {"error" : "", "datas" : results} );
				}, error => {
					let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
					res.send( { "error": "1_delete_option_speciality_link_product", "message" : error_send  } );	
				});
			}, error => {
				let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
				res.send( { "error": "1_delete_category_general_speciality_link_product", "message" : error_send  } );	
			});
		
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
	get_all_products_spaciality,
	get_one_products_spaciality,
	update_products_spaciality,
	insert_products_spaciality,
	delete_products_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























