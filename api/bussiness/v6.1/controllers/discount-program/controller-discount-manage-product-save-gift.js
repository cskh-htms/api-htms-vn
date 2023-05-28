const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');

const discount_product_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-insert-gift.js');
const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');

//@
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas = req.body;
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api->controller->discount->manage->product->save-gift",
			"message": error_send 
		}); 
			
	}		
	//return res.send(datas);
	//
	









	//@
	//@
	//@
	//@
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);



	
	
	//@
	//@
	//@ 
	//@ check owner product		
	if(check_role_result == "bussiness"){			
		const check_owner_product_resuilt = await check_owner_product(token,datas.datas.discount_program_product_link_product_speciality_id,res);
		if(	check_owner_product_resuilt == "1" ){
			//go
		}
		else{
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "333",
				"position" : "api->controller->discount->manage->product->save-gift",
				"message": error_send 
			}); 
						
		}				
	}
	//return res.send([check_role_result,"product_ok"]);
	//




	//@
	//@
	//@ 
	//@ check owner product		
	if(check_role_result == "bussiness"){			
		const check_owner_product_gift_resuilt = await check_owner_product(token,datas.gift_datas.product_gift_id,res);
		if(	check_owner_product_gift_resuilt == "1" ){
			//go
		}
		else{
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "345",
				"position" : "api->controller->discount->manage->product->save-gift",
				"message": error_send 
			}); 
						
		}				
	}
	//return res.send([check_role_result,"product_gift_ok"]);
	//
	
	
	
	
	

	
	
	//@
	//@
	//@ 
	//@ run		
	var discount_product_insert_result = await discount_product_insert(datas,res);
	
	return res.send({"error":"","datas": discount_product_insert_result});
	


}













//@
//@
//@ 
//@ export
module.exports = function_export;










//@
//@
//@ 
//@ end



