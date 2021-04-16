/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_orders_spaciality = require('../models/models-orders-spaciality');
const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');

const default_field = require('../const-tables/const-tables-orders-spaciality');
const default_field2 = require('../const-tables/const-tables-orders-spaciality-detail');

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
async  function get_all_orders_spaciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality.get_all_orders_spaciality().then( results => {
			
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
		models_orders_spaciality.search(datas).then( results => {
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
async  function search_view(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_orders_spaciality.search_view(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2_search_view", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3_search_view", "message" : error_send  } );
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
async  function get_one_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality.get_one_orders_spaciality(order_id).then( results => {
			
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
async function update_orders_spaciality(req, res, next) {
	let datas = req.body.datas;
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}
	//@
	//#end of check chủ sỡ hữu commnet

	//@
	try {
		models_orders_spaciality.update_orders_spaciality(datas,order_id).then( results => {
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
async  function insert_orders_spaciality(req, res, next) {
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
		models_orders_spaciality.insert_orders_spaciality(datas_assign).then( results => {
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
async  function delete_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);
	//res.send([order_id]);
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
					"orders_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field"     :"orders_speciality_ID",
							"value"     : order_id,
							"compare" 	: "="
						},  
						{   "field"     :"orders_speciality_user_id",
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
		check_chu_so_huu = await models_orders_spaciality.search( data_check.datas );
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
		models_orders_spaciality.delete_orders_spaciality(order_id).then( results => {
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
async  function insert_orders_spaciality_app(req, res, next) {
	let datas = req.body.datas;
	//res.send([datas.orders,datas.orders_detail]);
	//return;
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas.orders);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = await default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "c_data_1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality_app(datas_assign,datas.orders_detail).then( results => {
			res.send( {"error" : "", "datas" : results} );
			//
		}, error => {
			var error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		var error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
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
	get_all_orders_spaciality,
	get_one_orders_spaciality,
	update_orders_spaciality,
	insert_orders_spaciality,
	delete_orders_spaciality,
	search,
	search_view,
	insert_orders_spaciality_app
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























