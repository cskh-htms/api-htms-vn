

const mysql = require('mysql');

const ojs_configs = require('../../../configs/config');
const config_database = require ('../../configs/config-database');
const config_api = require ('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors.js');


//@
const order_details_search = require('../../lib/' + 
config_api.API_LIB_VERSION + 
'/order-details/order-detail-search-by-coupon.js');


//@
//@
//@
//@
const function_export = async function (data_user,model_user_arr,res) {
	var data_return = {};
	
	//@
	//@
	//@
	//@ 3. get coupon
	try{
		let data_get =    
		{
		   "select_field" :
			[
				"users_ID",
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_intro_price",
				"sum(orders_details_speciality_price)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : model_user_arr,
						"compare" : "in"
					},
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "coupon",
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}	
					]    
				}         
			],
			"group_by": 
			[
				"users_ID",
				"coupon_speciality_code"
			]			
		}
		
		//@ get datas
		var data_user_meta = await order_details_search(data_get,res);
		for(let x in data_user){
			let add_data_line = [];
			for(let y in data_user_meta){
				if(data_user[x].users_ID == data_user_meta[y].users_ID){
					let data_push_line = {
						"coupon": data_user_meta[y].coupon_speciality_code,
						"tong_ban": (data_user_meta[y].sum_orders_details_speciality_price  * data_user_meta[y].coupon_speciality_intro_price) / 100
					}
					add_data_line.push(data_push_line);
				}							
			}
			data_user[x].coupon_sale = add_data_line;
		}	
	}
	catch(error){
		let evn = ojs_configs.evn;
		evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get data, liên hệ admin" 
		);
		res.send ({ 
			"error" : "222", 
			"position" : "api/shares/get meta user",
			"message": error_send 
		});
	}			
	
	
	
	
	res.send(data_user); 
	return;	


};	





module.exports = function_export;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














