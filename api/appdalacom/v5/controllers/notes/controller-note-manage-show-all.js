const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');



const store_get_one = require('../../../../lib/' + 
	config_api.API_LIB_VERSION + '/stores/store-get-one');
		
const note_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/notes/note-search.js');





//@
//@
//@
//@
//@ 
async  function store_order_get_all(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];

		//@
		//@
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->note->manage->show-all",
				"message": "vui lòng nhập id"
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
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api->appdalacom->controller->note->manage->show-all",
			"message": error_send 
		}); 
		return;	
	}		
	//res.send([store_id]);
	//return;
	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	
	
	
	
	//@
	//@
	//@ 
	//@ check owner store		
	if(check_role_result == "bussiness"){			
		const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
		if(	check_owner_store_resuilt == "1" ){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "333",
				"position" : "api->appdalacom->controller->note->manage->show-all",
				"message": error_send 
			}); 
			return;			
		}				
	}
	//res.send([check_role_result,"store_ok"]);
	//return;
	
	
	
	//@
	//@			
	//@
	//@
	//@lấy note list	
	var store_taget = await store_get_one(store_id,res);	
	
	//res.send([store_taget]);
	//return;
	

	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);



		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);



		
		//@
		//@			
		//@
		//@
		//@lấy note list
		var data_note_list =    
		{
		   "select_field" :
			[
				"notes_date_created",
				"notes_ID",
				"notes_user_id",
				"notes_title",
				"notes_contents",				
				"notes_status"		
			 ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : store_taget[0].stores_user_id,
						"compare" : "="
					}           
					]    
				}         
			],
			"order" :
			 [
					{    
						"field"  :"notes_date_created",
						"compare" : "DESC"
					}   
			]  
		}
		
		var fn_get_note_list = new Promise((resolve, reject) => {
			let result = note_search(data_note_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_note_list);				
				
		


		
		
		
		var promise_result = await Promise.all(promise_all);
		
		
		
	//@
	//@
	//@	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "api->appdalacom->controller->note->manage->show-all",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",	
		"4":"category_list",
		"5":"product_count_all",
	}
	promise_result.push(store_taget);
	promise_result.push(notes);
	
	
	
	res.send(promise_result);
	return;
	
}


//@
//@
//@
//@
//@ 
module.exports = store_order_get_all;












//@
//@
//@
//@
//@ 








