const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');

const discount_product_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-insert.js');
const discount_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search');

//@
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
			//@
			//@
			var discount_id = 0;
			if(req.query.c1){
				discount_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->disocount->manage->view-discount",
					"message": "vui lòng nhập id"
				}); 	
				
			}	
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
			"position" : "api->appdalacom->controller->disocount->manage->view-discount",
			"message": error_send 
		}); 
			
	}		
	//return res.send([discount_id]);
	//
	



	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);

		
		

		//@ 2. discunt list
		var data_discount = 		
		{
			"select_field" :
			[
			"discount_program_ID",
			"discount_program_date_created",
			"discount_program_name",
			"discount_program_store_id_created",
			"discount_program_featured_image",
			"discount_program_position",
			"discount_program_status_admin",
			"discount_program_status_update",
			"discount_program_information",
			"discount_program_type",
			"discount_program_time_type",
			"discount_program_date_star",
			"discount_program_date_end",
			"check_expired",
			"stores_name",
			"stores_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"discount_program_ID",
						"value"     : discount_id,
						"compare" 	: '='
					}
					] 				
				}         
			]	

		}

		var fn_get_data_discount = new Promise((resolve, reject) => {
			let result = discount_search(data_discount,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_discount);				

		




		//@
		//@
		//@
		//@ promise go 
		var promise_result = await Promise.all(promise_all);
		
		
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api->appdalacom->controller->disocount->manage->view-discount",
			"message": error_send 
		}); 
			
	}	

	
	

	//@
	//@
	//@ add notes
	let notes = {
		"0":"no", 
		"1":"discount_taget",
		"2":"notes"
	}

	promise_result.push(notes);
	
	
	
	
	
	
	//@
	//@
	//@ send data result
	return res.send(promise_result);
	
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



