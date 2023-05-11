

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//const jwt = require('jsonwebtoken');
const config_api = require('./configs/config');



const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = require('../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const fields_get = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-get.js');
const check_role = require('../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner = require('../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const order_search = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const get_meta_order = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-orders.js');
//@






//@@
//@@thogn tin don hang
const function_export = async function(order_id,res){
	
	let txt_return = '';

	//return res.send([order_id]); 
	//return;	
	
	
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

	//return res.send({"error":"","datas":data_get}); 
	//return;

	//@ get datas
	var order_result = await order_search(data_get,res);
	
	//return res.send([order_result]); 
	//return;	
	

	var order_arr = [];
	if(order_result.length > 0){
		for(x in order_result){
			if(order_result[x].orders_speciality_ID){
				order_arr.push(order_result[x].orders_speciality_ID);
			}
		}
	}	


	var get_meta_order_resuilt = await get_meta_order(order_result,order_arr,res);

	//return res.send({"error":"","datas":get_meta_order_resuilt}); 
	//return;



	var payload = { 
		"order_id": order_id,
		"sdf":"fdsdfsdf"
	};
	var url_code = jwt.sign(payload, config_api.jwt_secret, {});

	//let url_arr = [{"id":order_result[0].orders_ID}];	
	//let url_code = crypto.AES.encrypt(JSON.stringify(url_arr),config_api.hash_secret).toString();


	//@
	txt_return = '<h1 style="text-align:center;"><img  style="max-width:200px;" src="https://appdala.com/images/dala-logo.jpg"/></h1>';
	
	
	//@
	//@
	//@
	//@ div main
	txt_return = txt_return + 
	'<div style="background-color:#fbe6a3; display:flex; padding:50px; margin-top:100px; justify-content: center; align-item:center;">' + 
	'<div style="max-width:500px; background-color: white; padding:50px; margin:0px auto;">'; 
	
	
	
		txt_return = txt_return + 
		
		'<div style="text-align:center;">' + 
			'<p><span style="font-size: 26px;font-weight: bold;color: #096e36;">Đơn hàng mới  <strong> # [ ' +  order_id + ' ] </strong></span></p>' + 
		'</div>' +
		'<div style="text-align:center;margin-bottom:60px;">' + 
			'<p><a style="padding: 7px 30px; border-radius: 15px;' + 
			'background-color: #4a914b;color: white;display: inline-flex;text-decoration: none;" ' + 
			'href="' + config_api.domain + '/api/appdalacom/v5/orders/xac-nhan-don-hang?c1=' + url_code + '">Xác nhận đơn hàng </a></p>' + 
		'</div>';
		
		//@
		//@
		//@ thong tin table
		txt_return = txt_return + 
		'<table style="width:100%;border-collapse: collapse;line-height: 40px;font-size: 16px;">' + 
		  '<tr style="">' + 
			'<td style="vertical-align: top;">' + 
				'<div style="font-size:18px; color:#4f9453;border-bottom:3px solid #fd9071;display: inline-block;font-weight:bold;margin-bottom:30px;">Thông tin</div>' + 
				'<div style="font-size:12px; color:#000;font-weight:bold;">Cửa hàng : ' + order_result[0].stores_name + '</div>' + 
				'<div style="font-size:12px; color:#000;">ngày đặt hàng : ' + order_result[0].orders_speciality_date_orders + '</div>' + 				
			'</td>' + 
			'<td style="vertical-align: top;">' + 
				'<div style="font-size:18px; color:#4f9453;border-bottom:3px solid #fd9071;display: inline-block;font-weight:bold;margin-bottom:30px;">Giao hàng đến</div>' + 
				'<div style="font-size:12px; color:#000;font-weight:bold;"><span>' + 
					order_result[0].orders_speciality_name + 
					' : ' + order_result[0].orders_speciality_phone + '</span>' + 
				'</div>' + 
				'<div style="font-size:12px; color:#000;">' + 
					order_result[0].orders_speciality_adress + ' / ' + 
					order_result[0].orders_speciality_wards + ' / ' +
					order_result[0].orders_speciality_district + ' / ' +
					order_result[0].orders_speciality_province + '' +
				'</div>' + 				
			'</td>' + 
		  '</tr>' +
		  '</table>';			
		
		
		
		//@
		//@
		//@ orders table	
		txt_return = txt_return + 
		'<div style="font-size:18px; color:#4f9453;border-bottom:3px solid #fd9071;display: inline-block;font-weight:bold;margin-top:40px;">Sản phẩm </div>'; 
	
		txt_return = txt_return + 
		'<table style="width:100%;border-collapse: collapse;line-height: 40px;font-size: 13px;">' ;

		
		var txt_table = "";
		var total_line = 0;
		for(let x in get_meta_order_resuilt[0].order_details){
		  txt_table = txt_table + 
		  '<tr>' + 
			'<td style="padding:5px 10px;">' + 
				'<img style="width:30px;" src="' + get_meta_order_resuilt[0].order_details[x].products_speciality_featured_image + '"/>' + 
			'</td>' + 
			'<td style="padding:5px 10px;">' + 
				get_meta_order_resuilt[0].order_details[x].products_speciality_name + 
			'</td>' + 
			'<td style="padding:5px 10px;">' + 
				ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].order_details[x].orders_details_speciality_price,0,",",".","đ") + 
			'</td>' + 
			'<td style="padding:5px 10px;"> x ' + 
				get_meta_order_resuilt[0].order_details[x].orders_details_speciality_qty + 
				'</td>' + 
			'<td style="padding:5px 10px;">' + 
				ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].order_details[x].price_caution,0,",",".","đ") + 
			'</td>' + 
		  '</tr>'; 		
		  total_line = total_line + get_meta_order_resuilt[0].order_details[x].price_caution;
		}
		
		
		//@ total line
			txt_table = txt_table + 
		  '<tr>' + 
			'<td style="" colspan="4">Tạm tính</td>' + 
			'<td style="">' + 
				ojs_shares_all_api.show_price_format(total_line,0,",",".","đ") + 
			'</td>' + 
		  '</tr>' ; 
		
		
		
		//@ coupon
		var coupon = 0;
		if(get_meta_order_resuilt[0].order_coupon.length > 0){
			for(let x in get_meta_order_resuilt[0].order_coupon){
			  txt_table = txt_table + 
				'<tr>' + 
				'<td style="" colspan="4">' + 
					'Mã khuyến mãi [ ' + get_meta_order_resuilt[0].order_coupon[x].orders_details_medium_text + ' ] giảm ' + 
				'</td>' + 
				'<td style="">' + 
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
				'<td style="" colspan="4">' + 
					' ' + get_meta_order_resuilt[0].fee[x].fee_name + '  ' + 
				'</td>' + 
				'<td style="">' + 
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
				'<td style="" colspan="4">Phí vận chuyển</td>' + 
				'<td style="">' + 
					ojs_shares_all_api.show_price_format(get_meta_order_resuilt[0].shipping_price[0].price,0,",",".","đ") + 
				'</td>' + 
			  '</tr>' ; 
			  shipping = shipping + get_meta_order_resuilt[0].shipping_price[0].price;
		}
		
		
		
		//@ total
		var total = (total_line + fee + shipping ) - coupon ;
		if(get_meta_order_resuilt[0].shipping_price[0].price){
			txt_table = txt_table + 
			  '<tr>' + 
				'<td style="" colspan="4">Tổng tiền thanh toán</td>' + 
				'<td style="">' + 
					ojs_shares_all_api.show_price_format(total,0,",",".","đ") + 
				'</td>' + 
			  '</tr>' ; 
			  shipping = shipping + get_meta_order_resuilt[0].shipping_price[0].price;
		}	
		
		
		txt_return = txt_return + txt_table;
		txt_return = txt_return + 
		'</table>';	
		//@
		//@
	
	
	
	//@
	//@
	//@
	//@ end div main
	txt_return = txt_return +  
	'</div>' + 
	'</div>';
	
	
	
	
	
	//@ ghi chú
	if(get_meta_order_resuilt[0].orders_speciality_notes.length > 0){
		txt_return = txt_return +  
		  '<div style="">' + 
			'<div style="">' + 
				'<p>Ghi chú : ' + get_meta_order_resuilt[0].orders_speciality_notes + '</p>' + 
				'</p>';
			'</div>' + 
		  '</div>' ; 		
	}
	
	
	
	
	//@ bonus
	txt_return = txt_return +  
	  '<div style="">' + 
		'<div style="">' + 
			'<p>Cảm ơn Bạn đã tin tưởng và mua hàng tại DALA</p>' + 
			'<p>DALA sẽ giao hàng cho bạn trong thời gian sớm nhất. hãy vào App DALA theo dõi đơn hàng của mình</p>' + 
			'<p>' + 
				'<a href="' + config_api.domain + '/stores/manage/orders/' + order_result[0].stores_ID + '/all">Quản lý đơn hàng </a> ' +
			'</p>' + 
		'</div>' + 
	  '</div>' ; 	



	//@
	//@
	//@
	//@ footer
	txt_return = txt_return +  
	'<div style="margin-top:60px;"border-top:3px solod #fd9071;padding-top:20px;>'
	'<h1 style="text-align:center;"><img  style="max-width:200px;" src="https://appdala.com/images/dala-logo.jpg"/></h1>' + 
	'</div>';









	  
	
	return txt_return;		
}	




/* --------------------------------------
shares
----------------------------------------*/




module.exports = function_export;


