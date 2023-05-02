
//const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const coupon_search_limit_user = 
	require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-user.js');
const coupon_search_limit_number = 
	require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-number.js');
const coupon_search_user_first_sale = 
	require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-user-first-sale.js');
const ojs_shares_all_api = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


//@@
//@@[coupon_condition]
const coupon_condition = async function(datas,coupon_list,user_id,res){
	//return datas;
	try{
		var date_return = {};
		//@store check
		if(datas.store_id == coupon_list[0].stores_ID){
			date_return.store_check = 1;
		}else{
			date_return.store_check = 0;
		}
		
		//@limit number
		let coupon_limit_result =  await check_limit_number(
			coupon_list[0].coupon_speciality_ID,
			coupon_list[0].coupon_speciality_limit_number,
			res
		);

		if(coupon_limit_result.error == ""){
			date_return.coupon_limit = 1;
		}else{
			date_return.coupon_limit = coupon_limit_result.message;
		}
		
		
		//@limit user
		let user_limit_result =  await check_limit_user(
			coupon_list[0].coupon_speciality_ID,
			coupon_list[0].coupon_speciality_limit_user,
			res
		);

		if(user_limit_result.error == ""){
			date_return.user_limit = 1;
		}else{
			date_return.coupon_limit = user_limit_result.message;
		}	




		//@
		//@
		//@ check
		if(coupon_list[0].coupon_speciality_condition == 0){
			//return datas;
			date_return.check = "1";			
			
		}else if(coupon_list[0].coupon_speciality_condition == 1){			
			let check_price_percen_result =  await check_price_percen(datas.line_order,coupon_list[0].coupon_speciality_condition_value,res);
			//date_return.check = check_price_percen_result			
			if(check_price_percen_result.error == ""){
				date_return.check = 1;
			}else{
				date_return.check = check_price_percen_result.message;
			}	
			
		}else if(coupon_list[0].coupon_speciality_condition == 2){	
			let check_qty_result = await check_qty(datas.line_order,coupon_list[0].coupon_speciality_condition_value,res);			
			//date_return.check = check_qty_result			
			if(check_qty_result.error == ""){
				date_return.check = 1;
			}else{
				date_return.check = check_qty_result.message;
			}				

		}else if(coupon_list[0].coupon_speciality_condition == 3){	
			let check_qty_result = await check_qty(datas.line_order,coupon_list[0].coupon_speciality_condition_value,res);
			let check_first_sale_result = await check_first_sale(datas.line_order,coupon_list[0].coupon_speciality_condition_value,user_id,res);			
			//date_return.check = check_first_sale_result			
			if(check_first_sale_result.error == ""){
				date_return.check = 1;
			}else{
				date_return.check = check_first_sale_result.message;
			}	
		}else{
			date_return.check = "555";	
		}		

		//@ return 
		//@
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
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": error_send 
		}); 
		return;				
	}		
}	
//@@
//@@[caution_price]
const caution_price = async function(datas,coupon_list,res){
	//return datas;
	
	
	var date_return = 0;
	if(coupon_list[0].coupon_speciality_formula_price == 0){
		
		//date_return =  100;
		date_return = await price_percen(
			datas,
			coupon_list[0].coupon_speciality_formula_price_value,
			coupon_list[0].coupon_speciality_price_max
		);
		
	}else if(coupon_list[0].coupon_speciality_formula_price == 1){
		//date_return =  1;
		date_return = await price_fixed(
			datas,
			coupon_list[0].coupon_speciality_formula_price_value,
			coupon_list[0].coupon_speciality_price_max
		);

	}else if(coupon_list[0].coupon_speciality_formula_price == 2){
		
		//date_return =  2;
		date_return = await free_shipping(
			datas,
			coupon_list[0].coupon_speciality_formula_price_value,
			coupon_list[0].coupon_speciality_price_max
		);
		
	}else{
		date_return = 555;
	}
	

	//@
	//@
	//@
	return date_return;
}	

//@@
//@@  [check_limit_number]
const check_limit_number = async function(coupon_id,number,res){
	try{
		var data_sum = 0;
		var data_return = {};

		if(number <= 0){
			data_return.error = "";
		}else{	
			var limit_number_result = await coupon_search_limit_number(coupon_id,res);
			//return limit_number_result;
			
			if(limit_number_result.length > 0){
				if(parseInt(limit_number_result[0].coupons_sum) < number){
					data_return.error = ""
				}else{
					data_return.error = "01",
					data_return.message = "Số lượng đã hết, Tối da chỉ dùng được [ " + number + " ] mã";
				}
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
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": error_send 
		}); 
		return;				
	}			
}	



//@@
//@@  [check_limit_user]
const check_limit_user = async function(coupon_id,number,user_id,res){
	try{
		var data_sum = 0;
		var data_return = {};

		if(number <= 0){
			data_return.error = "";
		}else{	
			var limit_user_result = await coupon_search_limit_user(coupon_id,user_id,res);
			//return limit_number_result;
			
			if(limit_user_result.length > 0){
				if(parseInt(limit_user_result[0].user_sum) < number){
					data_return.error = ""
				}else{
					data_return.error = "02",
					data_return.message = "Khách ah2ng đã dùng coupon quá số lượng qui định, mỗi khách ah2ng chỉ dùng [ " + number + " ] mã";
				}
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
			"error" : "5",
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": error_send 
		}); 
		return;				
	}			
}	



//@@
//@@  [check_first_sale]
const check_first_sale = async function(datas,value,user_id,res){
	try{
		var data_sum = 0;
		var data_return = {};
		
		var user_first_sale_result = await coupon_search_user_first_sale(user_id,res);
		//return user_first_sale_result;
		
		
		if(user_first_sale_result.length > 0){
			data_return.error = "05",
			data_return.message = "Mã giảm giá không đủ điều kiện áp dụng, Khách hàng này đã có đơn hàng trong hệ thống DALA ";
			
		}else{
			data_return.error = "";
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
		return;				
	}			
}	

//@@
//@@ [check_qty]
const check_qty = async function(datas,value,res){
	try{	
		var data_sum = 0;
		var data_return = {};
		
		for(x in datas){
			var line_sum = datas[x].orders_details_speciality_qty;
			data_sum = data_sum + line_sum;
		}
		
		if(data_sum >= value){
			data_return.error = ""
		}else{
			data_return.error = "04",
			data_return.message = "Mã giảm giá không đủ điều kiện áp dụng, Tổng số sản phẩm mua trong đơn hàng của cửa hàng này phải tối thiểu phải bằng " + 
			ojs_shares_all_api.show_price_format(value,0,",","."," Sản phẩm");
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
		return;				
	}			
}	




//@@
//@@ [price_percen]
const check_price_percen = async function(datas,value,res){
	//return [datas,value];
	try{
		var data_sum = 0;
		var data_return = {};
		
		for(x in datas){
			var line_sum = datas[x].orders_details_speciality_qty * datas[x].orders_details_speciality_price;
			data_sum = data_sum + line_sum;
		}
		//data_return = data_sum;
		
		if(data_sum >= value){
			data_return.error = ""
		}else{
			data_return.error = "03",
			data_return.message = "Mã giảm giá không đủ điều kiện áp dụng, Tổng đơn hàng của cửa hàng này phải tối thiểu phải bằng " + 
			ojs_shares_all_api.show_price_format(value,0,",",".","đ");
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


