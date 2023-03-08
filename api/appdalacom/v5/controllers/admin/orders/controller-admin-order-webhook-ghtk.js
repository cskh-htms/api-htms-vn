//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');




//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');





//@
//@
//@
//@
//@ model
const shipping_tracking_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/shipping-tracking/shipping-tracking-insert.js');
const order_update = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update.js');





//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	

		//@
		//@
		//@ lấy data req	
		try {
			var datas = req.body;		
			var hash = req.query.hash;			
			var order_id = datas.partner_id.split("_")[1];
			
			//res.send([order_id]);
			//return;				
			
			
			//@
			//@

			if(hash != "e429d202bbe3a8fe595d5030ca122f66"){
				res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->admin->orders->webhook-ghtk",
					"message": "HASH sai"
				}); 		
			}				
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
				"position" : "api->appdalacom->controller->admin->orders->webhook-ghtk",
				"message": error_send 
			}); 
			return;	
		}			
		//res.send([order_id,datas]);
		//return;
		


		//@
		//@	
		//@ insert shipping tracking
		var datas_tracking = {
			"shipping_tracking_users_id" : "90" ,
			"shipping_tracking_orders_id" : order_id,
			"shipping_tracking_orders_status" : datas.status_id
		}		
	
		var result = await shipping_tracking_insert(datas_tracking,res);
		
		
		
		
		
		//@
		//@	
		//@ update order
		var data_update = {
			"orders_speciality_shipper_id" : "90" ,
			"orders_speciality_status_orders" : datas.status_id
		}		
	
		var result2 = await order_update(data_update,order_id,res);		
		
		
		
		
		
		
	
		
		
		
		
		//@
		//@	
		//@ return;
		res.sendStatus( 200 ); 
		return;	
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->admin->orders->webhook-ghtk",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->admin->orders->webhook-ghtk",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;		
}






//@
//@
//@
//@
//@ export
module.exports = function_export;







//@
//@
//@
//@
//@ file end





