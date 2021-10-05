//@
//@
//@
//@
//@ loader express
const express = require('express');
const router = express.Router();


//@
//@
//@
//@ loader extends module
const fetch = require('node-fetch');


//@
//@
//@
//@ loader configs
const ojs_configs = require('../../configs/config');



//@

//@
//@
//@ loader function shares
const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_data_shipping_tracking = require('../../models/ojs-datas-shipping-tracking');


const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
-------------------------------------------------------------------

1. [/]


--------------------------------------------------------------------
*/




//@
//@
//@
//@
//@ 1. [/]
router.get('/', async function(req, res, next) {
	res.send("heloo");
	return;	
	
})	
	
	
//@
//@
//@
//@
//@
//@
//@ 2. [/:shipper_id]
router.get('/:shipper_id', async function(req, res, next) {
try {
	//@
	//@
	//@
	//lấy token
	try {
		var token = req.session.token;	
		var shipper_id = req.params.shipper_id;

		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers shipper web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
	//@
	//@
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	//@	
	//@ Lấy option tager
	var shipper_taget;
	try {
		
		//res.send(brand_id);
		//return;
		
		
		shipper_taget = await ojs_shares_fetch_data.get_data_send_token_get(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/' + shipper_id,token);
		
		//res.send(brand_tager);
		//return;
	
		if(shipper_taget.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, shipper_taget.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(shipper_taget.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}

	
	//res.send(shipper_taget);
	//return;
		
	
	
	//@
	//@
	//@
	//@
	//@	
	//@ Lấy option tager
	var orders_tracking_list;
	try {
		
		//res.send(brand_id);
		//return;
		
		var datas_send = ojs_data_shipping_tracking.get_orders_list(shipper_id);
		orders_tracking_list = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/shipping-tracking/search',datas_send,ojs_configs.token_supper_job);
		
		//res.send(orders_tracking_list);
		//return;
	
		if(orders_tracking_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_tracking_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(orders_tracking_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}	
	
	var order_arr = [];
	if(orders_tracking_list.datas.length > 0){
		for(let x in orders_tracking_list.datas){
			order_arr.push(orders_tracking_list.datas[x].shipping_tracking_orders_id);
		}
	}
	
	//res.send(  order_arr );
	//return;	
	
	//@
	//@
	//@
	//@
	//@	
	//@ Lấy option tager
	var orders_list;
	try {
		
		//res.send(brand_id);
		//return;
		
		var datas_send = ojs_data_shipping_tracking.get_orders_list_arr(order_arr);
		orders_list = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_customer/',datas_send,ojs_configs.token_supper_job);
		
		//res.send(orders_list);
		//return;
	
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_list.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(orders_list.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}	
	
	//res.send(  orders_list );
	//return;		
	
	
	//@
	//@
	//@
	//@
	//@	
	//@ Lấy option tager
	var orders_list_details;
	try {
		
		//res.send(brand_id);
		//return;
		
		var datas_send = ojs_data_shipping_tracking.get_orders_list_details(order_arr);
		orders_list_details = await ojs_shares_fetch_data.get_data_send_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_customer/',datas_send,ojs_configs.token_supper_job);
		
		//res.send(orders_list_details);
		//return;
	
		if(orders_list_details.error != ""){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, orders_list_details.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}
	catch(error){
		if(orders_list_details.error != ""){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "31.router_app->barnd->show", "message": error_send } ); 
			return;				
		}
	}	
	
	//res.send(  orders_list_details );
	//return;		
		
	
	
	

	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 				: 'shipper',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: shipper_id,			
			'shipper_id' 			: shipper_id,
			'js_css_version'		: ojs_configs.js_css_version,
			'shipper_taget'			: shipper_taget.datas,
			'orders_tracking_list'	: orders_tracking_list.datas,
			'orders_list'			: orders_list.datas,
			'orders_list_details'	: orders_list_details.datas
		}	
	
		data_send = {
			'title' 				: 'shipper',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: shipper_id,			
			'shipper_id' 			: shipper_id,
			'js_css_version'		: ojs_configs.js_css_version,
			'shipper_taget'			: shipper_taget.datas,
			'orders_tracking_list'	: orders_tracking_list.datas,
			'orders_list'			: orders_list.datas,
			'orders_list_details'	: orders_list_details.datas,
			'datas_info':datas_info
		}
		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/shipper/show-all', data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "35.router_app->shipper->get", "message": error_send } ); 
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "353.router_app->shipper->get", "message": error_send } ); 
		return;	
}	
})		
	
	
	
	
	
	
module.exports = router;
	
	
	

	