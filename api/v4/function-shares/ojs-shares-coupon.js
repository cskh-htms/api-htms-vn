

/*

1. [check_coupon_condition]

	- 2. [check_sum_order]

	- 3. [check_qty]

	- 4. [check_first_sale]

5. [caution_price]

	- 6. [price_percen]

	- 7. [price_fixed]

	- 8. [free_shipping]



*/











const models_users = require('../models/models-users');
const models_orders_spaciality = require('../models/models-orders-spaciality');
const models_coupon_speciality = require('../models/models-coupon-speciality');

const ojs_configs = require('../../../configs/config');
const jwt = require('jsonwebtoken');







//@@
//@@ 5. [caution_price]
const caution_price = async function(datas){
	//return datas;
	
	
	var date_return = 0;
	if(datas.formula == 0){
		
		//date_return =  0;
		date_return = await price_percen(datas.datas, datas.value);
		
	}else if(datas.formula == 1){
		
		//date_return =  1;
		date_return = await price_fixed(datas.datas, datas.value);

	}else if(datas.formula == 2){
		
		//date_return =  2;
		date_return = await free_shipping(datas.datas, datas.value);
		
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
const free_shipping = async function(datas,value){
	
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


//@@
//@@ 6. [price_percen]
const price_percen = async function(datas,value){
	
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


//@@
//@@ 7. [price_fixed]
const price_fixed = async function(datas,value){
	
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






//
//
//@@
//@@ 1. [check_coupon_condition]
const check_coupon_condition = async function(datas){
	//return datas;
	var date_return = 0;
	if(datas.consition == 0){
		date_return = await price_percen(datas.datas, datas.value);
		
	}else if(datas.consition == 1){
		date_return = await check_qty(datas.datas, datas.value);
		
	}else if(datas.consition == 2){
		date_return = 1;	
	
	}else if(datas.consition == 3){
		date_return = await check_first_sale(datas.datas, datas.value,datas.user_id);	
	
	}else{
		date_return = 555;
	}
	

	
	return date_return;
}	





//@@
//@@ 4. [check_first_sale]
const check_first_sale = async function(datas,value,user_id){
	
	var data_sum = 0;
	var data_return = 0;
	
	var user_check = await models_coupon_speciality.get_user_taget(user_id);
	
	if(user_check.length > 0){
		data_return = 0
	}else{
		data_return = 1
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




//@@
//@@ 3. [check_qty]
const check_qty = async function(datas,value){
	
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




//
//@@@@@@@
//@@
//@@
//@@@@@@@@
//@@@@@@@@
//@@
//@@
module.exports = {
	check_coupon_condition,
	caution_price
}