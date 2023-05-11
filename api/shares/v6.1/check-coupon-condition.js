
//const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const coupon_search_limit_user = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-user.js');
const coupon_search_limit_number = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-number.js');
const coupon_search_user_first_sale = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-user-first-sale.js');



//@@
//@@[coupon_condition]
const coupon_condition = async function(datas,res){
	
	try{
		var date_return = 0;
		
		if(datas.condition == 0){
			let coupon_limit_result =  await check_limit_number(datas.coupon_id,datas.limit_number,res);
			let user_limit_result =  await check_limit_user(datas.coupon_id,datas.user_limit,datas.user_id,res);
			
			if(
			coupon_limit_result == 1 
			&& user_limit_result == 1 
			){
				
				date_return = 1;
			}	

			
		}else if(datas.condition == 1){
			//@check limit number
			let coupon_limit_result =  await check_limit_number(datas.coupon_id,datas.limit_number,res);
			let user_limit_result =  await check_limit_user(datas.coupon_id,datas.user_limit,datas.user_id,res);
			let check_price_percen_result =  await check_price_percen(datas.datas,datas.value,res);
			
			
			if(
			coupon_limit_result == 1 
			&& user_limit_result == 1 
			&& check_price_percen_result == 1 
			){
				
				date_return = 1;
			}
			
		}else if(datas.condition == 2){
			let check_qty_result = await check_qty(datas.datas,datas.value);	
			let coupon_limit_result =  await check_limit_number(datas.coupon_id,datas.limit_number,res);
			let user_limit_result =  await check_limit_user(datas.coupon_id,datas.user_limit,datas.user_id,res);			
			
			if(
			coupon_limit_result == 1 
			&& user_limit_result == 1 
			&& check_qty_result == 1 
			){
				
				date_return = 1;
			}			
			
			
		}else if(datas.condition == 3){
			
			let check_first_sale_result = await check_first_sale(datas.datas,datas.value,datas.user_id,res);
			let coupon_limit_result =  await check_limit_number(datas.coupon_id,datas.limit_number,res);
			let user_limit_result =  await check_limit_user(datas.coupon_id,datas.user_limit,datas.user_id,res);	

			if(
			coupon_limit_result == 1 
			&& user_limit_result == 1 
			&& check_first_sale_result == 1 
			){
				
				date_return = 1;
			}	

			
		}else{
			date_return = 555;
		}		
		
		return date_return;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}		
}	





//@@
//@@[caution_price]
const caution_price = async function(datas){
	//return datas;
	
	
	var date_return = 0;
	if(datas.formula == 0){
		
		//date_return =  0;
		date_return = await price_percen(datas.datas, datas.price,datas.price_max);
		
	}else if(datas.formula == 1){
		
		//date_return =  1;
		date_return = await price_fixed(datas.datas, datas.price,datas.price_max);

	}else if(datas.formula == 2){
		
		//date_return =  2;
		date_return = await free_shipping(datas.datas, datas.price,datas.price_max);
		
	}else{
		date_return = 555;
	}
	

	//@
	//@
	//@
	return date_return;
}	


//@@
//@@  [check_limit_user]
const check_limit_user = async function(coupon_id,number,user_id,res){
	try{
		var data_sum = 0;
		var data_return = 0;

		if(number == 0){
			data_return = 1;
		}


		var limit_user_result = await coupon_search_limit_user(coupon_id,user_id,res);
		//return limit_user_result;
		
		if(limit_user_result.length > 0){
			if(parseInt(limit_user_result[0].user_sum) < number){
				data_return = 1;
			}
		}
		return data_return;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_limit_user, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "6",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}			
}	



//@@
//@@  [check_limit_number]
const check_limit_number = async function(coupon_id,number,res){
	try{
		var data_sum = 0;
		var data_return = 0;
		
		
		if(number == 0){
			data_return = 1;
		}
						
		var limit_number_result = await coupon_search_limit_number(coupon_id,res);
		//return [coupon_id,number];
		
		if(limit_number_result.length > 0){
			if(parseInt(limit_number_result[0].coupons_sum) < number){
				data_return = 1;
			}
		}			

		return data_return;		
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_limit_number, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "5",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}			
}	




//@@
//@@  [check_first_sale]
const check_first_sale = async function(datas,value,user_id,res){
	try{
		var data_sum = 0;
		var data_return = 0;
		
		var user_first_sale_result = await coupon_search_user_first_sale(user_id,res);
		//return user_first_sale_result;
		
		
		if(user_first_sale_result.length > 0){
			data_return = 0
		}else{
			data_return = 1
		}
		
		return data_return;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_first_sale, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "4",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}			
}	



//@@
//@@ [check_qty]
const check_qty = async function(datas,value,res){
	try{	
		var data_sum = 0;
		var data_return = 0;
		
		for(x in datas){
			var line_sum = datas[x].orders_details_speciality_qty;
			data_sum = data_sum + line_sum;
		}
		
		if(data_sum >= value){
			data_return = 1;
		}
		
		return data_return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_qty, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}			
}	




//@@
//@@ [price_percen]
const check_price_percen = async function(datas,value,res){
	//return datas;
	try{
		var data_sum = 0;
		var data_return = 0;
		
		for(x in datas){
			var line_sum = datas[x].orders_details_speciality_qty * datas[x].orders_details_speciality_price;
			data_sum = data_sum + line_sum;
		}
		
		if(data_sum >= value){
			data_return = 1;
		}
	
		return data_return;
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_price_percen, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
						
	}		
		
}



//@@
//@@ 8. [free_shipping]
const free_shipping = async function(datas,value,max){
	
	var data_return = max;
	return data_return;
	
	
}	


//@@
//@@ 6. [price_percen]
const price_percen = async function(datas,value,max){
	
	var data_sum = 0;
	var data_return = 0;
	
	for(x in datas){
		var line_sum = datas[x].orders_details_speciality_qty * datas[x].orders_details_speciality_price;
		data_sum = data_sum + line_sum;
	}
	
	var percen_return = data_sum * value / 100;
	
	
	data_return = percen_return;
	if(max > 0){
		if(percen_return >= max){
			data_return = max;
		}else{
			data_return = percen_return;
		}
	}
	
	return data_return;
}	


//@@
//@@ 7. [price_fixed]
const price_fixed = async function(datas,value,max){
	
	var data_return = 0;
	data_return = value;
	
	if(max > 0){
		if(value >= max){
			data_return = max;
		}else{
			data_return = value;
		}
	}
	
	return data_return;
}	


//@@
//@@ 2. [check_sum_order]
const check_sum_order = async function(datas,value){
	
	var data_sum = 0;
	var data_return = 0;
	
	for(x in datas){
		var line_sum = datas[x].orders_details_speciality_qty * datas[x].orders_details_speciality_price;
		data_sum = data_sum + line_sum;
	}
	
	if(data_sum >= value){
		data_return = 1;
	}
	
	return data_return;
}	



/* --------------------------------------
shares
----------------------------------------*/




module.exports = {
	coupon_condition,
	caution_price
}


