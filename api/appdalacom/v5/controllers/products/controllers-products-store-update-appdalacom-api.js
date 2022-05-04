const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const product_update_store = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-update-store.js');
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');

const ojs_get_email_content_create_product = require('../../../../../models/get-content-email-create-product.js');
const ojs_shares_send_email = require('../../../../../models/ojs-shares-send-email');

//@
async  function controllers_product_store_update(req, res, next) {
	//@ lấy req data
	try {
		var datas = req.body.datas;
		var cat_string = req.body.cat_string;
		var option_string = req.body.option_string;
		var  product_id= req.params.product_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	

	//res.send([datas,cat_string,option_string]);
	//return;

	// check role;
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bussiness" 
	|| check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;			
	}
	
	
	//@ check_owner_product
	try{		
		//@ check_owner_product
		var check_owner_product_resuilt = await check_owner_product(token,product_id,res);
	
		if(	
		check_owner_product_resuilt == "1" 
		|| check_role_result == "admin" 
		){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "333",
				"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "150", 
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	


	//res.send(["okok"]);
	//return;	


	//@ condition
	var condition_data = [];
	
	//@ store
	condition_data.push(
		{   
			"field"     :"products_speciality_ID",
			"value"     : product_id,
			"compare" : "="
		}
	)	
	//@ product taget
	try {
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_featured_image",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",	
				"products_speciality_status_store",
				"products_speciality_status_admin",				
				"stores_name",
				"products_speciality_status_update",
				"stores_ID",
				"users_email"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :condition_data				
				}         
			]		
		}
	
		//@ get datas
		var data_product = await product_search(data_get,res);
		//res.send(data_product);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "154", 
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}



	//nếu là admin thì update status update = 1
	try{
		if(check_role_result == "admin"){
			Object.assign(datas,  { 'products_speciality_status_update' : 1 } );
		}
		
		if(check_role_result != "admin"){
			delete datas.products_speciality_status_update;
			delete datas.products_speciality_status_admin;
		}		
		
		//@
		//@
		if(check_role_result != "admin" && data_product[0].products_speciality_status_update == "1"){
			Object.assign(datas,  { 'products_speciality_status_admin' : 2 } );
		}
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check data, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1544", 
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	



	//res.send([datas,product_id]);
	//return;

	//@ update go
	try{		
		//@  update_product_resuilt
		var update_product_resuilt = await product_update_store(datas,product_id,cat_string, option_string,res);
		var email_title = '';
		
		if(check_role_result == "admin" ){
			var email_to4 = data_product[0].users_email;
			if(datas.products_speciality_status_admin  == 3){
				email_title = 'DALA - Sản Phẩm  [ ' + product_id + ' ] bị từ chối';
				var email_content4 = 'DALA - Sản Phẩm  [ ' + product_id + ' ] bị từ chối';
				
			}else if(datas.products_speciality_status_admin  == 1){		
				email_title = 'DALA - Sản Phẩm  [ ' + product_id + ' ] đã phê duyệt';			
				var email_content4 = 'DALA - Sản Phẩm  [ ' + product_id + ' ] đã phê duyệt';				
			}else{
				email_title = 'DALA - Sản Phẩm  [ ' + product_id + ' ] vừa update bởi DALA';	
				var email_content4 = 'DALA - Sản Phẩm  [ ' + product_id + ' ] vừa update bởi DALA';
			}
			
			//@ send email
			if(ojs_configs.domain == "http://localhost:2021"){	
				//ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);
				ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_04,email_title,email_content4);
			}else{
				ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);
			}				
			
		}else{		
			
			if(
			datas.products_speciality_status_store  == "1"  
			){
				
				if(ojs_configs.domain == "http://localhost:2021"){	
				
					email_title = 'DALA - Sản Phẩm  [ ' + product_id + ' ]  cần phê duyệt';
					var email_content4 = 'DALA - Sản Phẩm  [ ' + product_id + ' ] cần phê duyệt';	
					ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_04,email_title,email_content4);					
				}else{
					
					email_title = 'DALA - Sản Phẩm  [ ' + product_id + ' ]  cần phê duyệt';
					var email_content4 = 'DALA - Sản Phẩm  [ ' + product_id + ' ] cần phê duyệt';	
					
					
					var email_to1 = ojs_configs.email_admin_01;
					ojs_shares_send_email.send_email_to_admin(res,email_to1,email_title,email_content4);		


					var email_to2 = ojs_configs.email_admin_02;
					ojs_shares_send_email.send_email_to_admin(res,email_to2,email_title,email_content4);		
					
					
					var email_to3 = ojs_configs.email_admin_03;	
					ojs_shares_send_email.send_email_to_admin(res,email_to3,email_title,email_content4);			
					
					var email_to4 = ojs_configs.email_admin_04;	
					ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);
				}				
			}		
		}
		res.send(update_product_resuilt);
		return;	
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "155", 
			"position" : "ctroller->api-appdalacom->controllers-products-store-update-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}
}

module.exports = controllers_product_store_update;