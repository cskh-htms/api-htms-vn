

const express = require('express');
const router = express.Router();




//const jwt = require('jsonwebtoken');
const config_database = require('../../configs/config-database');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = require('../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const fields_get = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-get.js');
const check_role = require('../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner = require('../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const order_search = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const get_meta_order = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-orders.js');
//@






//@@
//@@[coupon_condition]
const function_export = async function(order_id,res){
	
	let txt_return = '';


	let data_get =    
	{
	   "select_type" : "DISTINCT",
	   "select_field" :fields_get.fields_search_arr,
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_speciality_ID",
					"value"     : order_id,
					"compare" : "="
				}
				]    
			}         
		]   
	}

	//res.send({"error":"","datas":data_get}); 
	//return;

	//@ get datas
	var order_result = await order_search(data_get,res);

	var order_arr = [];
	if(order_result.length > 0){
		for(x in order_result){
			if(order_result[x].orders_speciality_ID){
				order_arr.push(order_result[x].orders_speciality_ID);
			}
		}
	}	


	var get_meta_order_resuilt = await get_meta_order(order_result,order_arr,res);

	//res.send({"error":"","datas":get_meta_order_resuilt}); 
	//return;

	//@
	txt_return = '<h1 style="text-align:center;"><img  style="max-width:200px;" src="https://appdala.com/images/dala-logo.jpg"/></h1>';
	
	//@
	txt_return = txt_return + 
	
	'<div style="text-align:center;">' + 
		'<p><span>Chào bạn <strong>[ ' +  get_meta_order_resuilt[0].orders_speciality_name + ' ] </strong></span></p>' + 
		'<p><span>Bạn vừa đặt một đơn hàng tại DALA mã đơn hàng <strong>[ ' +  order_id + ' ] </strong></span></p>' + 
	'</div>' +
	'<div style="text-align:center;">' + 
		'<p><span>Chi tiết đơn hàng như sau ;</span></p>' + 
	'</div>';
	
	txt_return = txt_return + 
	'<table style="width:100%;border-collapse: collapse;line-height: 40px;font-size: 16px;">' + 
	  '<tr style="background-color:#096e36;">' + 
		'<th style="border:1px solid #fff;color:white;">STT</th>' + 
		'<th style="border:1px solid #fff;color:white;">Hình</th>' +
		'<th style="border:1px solid #fff;color:white;">Tên sản phẩm</th>' +
		'<th style="border:1px solid #fff;color:white;">Giá</th>' +
		'<th style="border:1px solid #fff;color:white;">số lượng</th>' +
		'<th style="border:1px solid #fff;color:white;">tổng tiền</th>' +
	  '</tr>';	
	
	let txt_table = "";
	var total_line = 0;
	for(let x in get_meta_order_resuilt[0].order_details){
	  txt_table = txt_table + 
	  '<tr>' + 
		'<td style="text-align:center;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + x + '</td>' + 
		'<td style="text-align:center;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			'<img style="width:30px;" src="' + get_meta_order_resuilt[0].order_details[x].products_speciality_featured_image + '"/>' + 
		'</td>' + 
		'<td style="text-align:left;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			get_meta_order_resuilt[0].order_details[x].products_speciality_name + 
		'</td>' + 
		'<td style="text-align:center;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].order_details[x].orders_details_speciality_price,0,",",".","đ") + 
		'</td>' + 
		'<td style="text-align:center;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			get_meta_order_resuilt[0].order_details[x].orders_details_speciality_qty + 
			'</td>' + 
		'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].order_details[x].price_caution,0,",",".","đ") + 
		'</td>' + 
	  '</tr>' ; 		
	  total_line = total_line + get_meta_order_resuilt[0].order_details[x].price_caution;
	}
	
	
	//@ total line
		txt_table = txt_table + 
	  '<tr>' + 
		'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;" colspan="5">Tạm tính</td>' + 
		'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
			ojs_shares_all_api.show_price_format(total_line,0,",",".","đ") + 
		'</td>' + 
	  '</tr>' ; 
	
	
	
	//@ coupon
	var coupon = 0;
	if(get_meta_order_resuilt[0].order_coupon.length > 0){
		for(let x in get_meta_order_resuilt[0].order_coupon){
		  txt_table = txt_table + 
			'<tr>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;" colspan="5">' + 
				'Mã khuyến mãi [ ' + get_meta_order_resuilt[0].order_coupon[x].orders_details_medium_text + ' ] giảm ' + 
			'</td>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
				ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].order_coupon[x].orders_details_speciality_price,0,",",".","đ") + 
			'</td>' + 
			'</tr>' ; 	
			coupon = coupon + 	get_meta_order_resuilt[0].order_coupon[x].orders_details_speciality_price;		
		}		  
		  
	}
	
	
	//@ fee
	var fee = 0;
	if(get_meta_order_resuilt[0].fee.length > 0){
		for(let x in get_meta_order_resuilt[0].fee){
		  txt_table = txt_table + 
			'<tr>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;" colspan="5">' + 
				' ' + get_meta_order_resuilt[0].fee[x].fee_name + '  ' + 
			'</td>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
				ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].fee[x].fee_price,0,",",".","đ") + 
			'</td>' + 
			'</tr>' ; 		
		}		  
		 fee = fee +  get_meta_order_resuilt[0].fee[x].fee_price;
	}	
		
	
	//@ shipping
	var shipping = 0;
	if(get_meta_order_resuilt[0].shipping_price[0].price){
		txt_table = txt_table + 
		  '<tr>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: ' + 
			'1px solid #fff;color:white;" colspan="5">Phí vận chuyển</td>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:white;">' + 
				ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].shipping_price[0].price,0,",",".","đ") + 
			'</td>' + 
		  '</tr>' ; 
		  shipping = shipping + get_meta_order_resuilt[0].shipping_price[0].price;
	}
	
	
	
	//@ total
	var total = (total_line + fee + shipping) - shipping -coupon ;
	if(get_meta_order_resuilt[0].shipping_price[0].price){
		txt_table = txt_table + 
		  '<tr>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: ' + 
			'1px solid #fff;color:white;" colspan="5">Tổng tiền thanh toán</td>' + 
			'<td style="text-align:right;padding:10px;vertical-align: middle;background-color: #78a78d;border: 1px solid #fff;color:red;">' + 
				ojs_shares_all_api.show_price_format(total,0,",",".","đ") + 
			'</td>' + 
		  '</tr>' ; 
		  shipping = shipping + get_meta_order_resuilt[0].shipping_price[0].price;
	}	
	
	
	
	
	txt_return = txt_return + txt_table;
	
	//@
	//@
	
	
	txt_return = txt_return + 
	'</table>';
	
	
	return txt_return;		
}	




/* --------------------------------------
shares
----------------------------------------*/




module.exports = function_export;


