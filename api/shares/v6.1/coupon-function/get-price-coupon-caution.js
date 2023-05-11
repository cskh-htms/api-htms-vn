
//const jwt = require('jsonwebtoken');
const config_api = require('../configs/config');



const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const coupon_search = 
	require('../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');

//@@
//@@
//@@
//@@
//@@  [check qty]
const  function_export = async function(datas,coupon_list,res){
	var date_return = 0;
	if(coupon_list[0].coupon_speciality_formula_price == 0){
		
		//date_return =  0;
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



//@
//@
//@
//@
//@ 
module.exports = function_export;


//@
//@
//@
//@
//@ end