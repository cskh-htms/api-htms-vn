const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');


const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-get.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');
const shipping_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/shippings/shipping-search.js');





//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//return res.send([token,datas]);
		//
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/controller/controllers-shipping-caution-web",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/web/v5/controller/controllers-shipping-caution-web", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//







	//@
	//@
	//@ kiểm tra data gữi lên đúng chuẩn hay chưa
	//@ nếu không đúng thì return
	if(!datas.adress || !datas.orders_details || !datas.type){
		return res.send({ "error" : "2" ,"position":"ctl-shipping_spaciality->caution", "message" : "đata gữi lên bị thiếu, vui lòng xem hướng dẫn api"}); 
					
	}
	
	if(datas.orders_details[0].orders_details_speciality_product_id){
		
		let data_get =    
		{
		   "select_field" :
		   [
				"products_speciality_store_id",
				"stores_name",
				"stores_district",
				"stores_wards",
				"stores_phone",
				"stores_province",
				"stores_adress"			
		   ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : datas.orders_details[0].orders_details_speciality_product_id,
						"compare" : "="
					}	
					] 				
				}         
			]   
		}
		
		var product_search_redult= await product_search(data_get,res);
		//return res.send(product_search_redult);
		//return ;
		
		
		
		var store_id = product_search_redult[0].products_speciality_store_id; 
		//return res.send([store_id]); 
		//					
		
		if( Array.isArray(product_search_redult)){
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, product_search_redult, "Lỗi code get chi tiết cửa hàng , vui lòng liên hệ admin" );					
			return res.send({ "error" : "1222" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
										
		}		
		

	}else{
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi data gữi lên bị thiếu dữ liệu, Liên hệ HTKT dala" );
		return res.send({ "error" : "1000" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send}); 
					
	}



	//@
	//@
	//@ kiểm tra type 
	//@ nếu type = dala thì tính giá theo shipping speciality
	// @ nếu type = ghtk thì tính giá = giao hàng tiết kiệm
	if(datas.type == "dala"){
		
		//@
		//@
		//@
		//@ nếu có phường thì tính giá theo phường
		if(datas.adress.Wards && datas.adress.Wards.length > 0){
			let data_get =    
			{
			   "select_field" :
			   [
					"shipping_speciality_price"	
			   ],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"shipping_speciality_name",
							"value"     : datas.adress.Wards,
							"compare" : "="
						}	
						] 				
					}         
				]   
			}				
			
			var price_caution = await shipping_search(data_get,res);
			if(price_caution.length > 0){
				return res.send({ "error" : "" ,"store_id": store_id, "datas" : price_caution[0].shipping_speciality_price});  
					
			}	
		}			
		

		//@
		//@
		//@
		//@ nếu có quận thì tính giá theo quận
		if(datas.adress.Districts && datas.adress.Districts.length > 0){
			let data_get =    
			{
			   "select_field" :
			   [
					"shipping_speciality_price"	
			   ],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"shipping_speciality_name",
							"value"     : datas.adress.Districts,
							"compare" : "="
						}	
						] 				
					}         
				]   
			}				
			
			var price_caution = await shipping_search(data_get,res);
			if(price_caution.length > 0){
				return res.send({ "error" : "" ,"store_id": store_id, "datas" : price_caution[0].shipping_speciality_price});  
					
			}	
		}	


		//@
		//@
		//@
		//@ nếu có tỉnh thì tính giá theo tỉnh
		if(datas.adress.province && datas.adress.province.length > 0){
			let data_get =    
			{
			   "select_field" :
			   [
					"shipping_speciality_price"	
			   ],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"shipping_speciality_name",
							"value"     : datas.adress.province,
							"compare" : "="
						}	
						] 				
					}         
				]   
			}				
			
			var price_caution = await shipping_search(data_get,res);
			if(price_caution.length > 0){
				return res.send({ "error" : "" ,"store_id": store_id, "datas" : price_caution[0].shipping_speciality_price});  
					
			}			
		}

		return res.send({ "error" : "12" ,"position":"ctl-shipping_spaciality->caution", "message" : "Địa chỉ không có trong hệ thống dala"}); 
			
		
		
	//@
	//@
	//@
	//@	
	}else if(datas.type == "ghtk"){
		//@
		//@
		//@ 
		//@ lấy id sản phẩm lưu vào mảng arr_id
		//@ lấy giá sản phẩm theo id arr_id (select in (arr_id)) -> price_list
		//@ loop qua price_list cộng tổng ía sản phẩm đưa vào weight_sum
		//@ xong xui gữi lên ghtk lấy giá vận chuyển
		let arr_id = [];
		let weight_sum = 0;
		
		for(let x in datas.orders_details){
			arr_id.push(datas.orders_details[x].orders_details_speciality_product_id);
		}
		//@
		//@		
		
		//return res.send(arr_id);
		//
		
		
		let data_get =    
		{
		   "select_type" : "DISTINCT",			
		   "select_field" :
		   [
				"products_speciality_ID",
				"products_speciality_weight",
				"products_speciality_price_caution",				
		   ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : arr_id,
						"compare" : "in"
					}	
					] 				
				}         
			]   
		}				
		
		var price_list = await product_search(data_get,res);		
		//return res.send(price_caution_ghtk);  
		//

		if( Array.isArray(price_list) ){
			if(price_list.length > 0){
				for(let x in price_list){
					for(let y in datas.orders_details){
						if(price_list[x].products_speciality_ID == datas.orders_details[y].orders_details_speciality_product_id){
							weight_sum = weight_sum + ( price_list[x].products_speciality_weight * datas.orders_details[y].orders_details_speciality_qty)
						}
					}						
				}				
				//return res.send({ "error" : "" , "datas" : price_list,"weight":weight_sum}); 
				//
			}
		}
		//return res.send(price_caution_ghtk);  
		//	

		let data_get_store =    
		{
		   "select_field" :
		   [
				"products_speciality_store_id",
				"stores_name",
				"stores_district",
				"stores_wards",
				"stores_phone",
				"stores_province",
				"stores_adress"			
		   ],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : datas.orders_details[0].orders_details_speciality_product_id,
						"compare" : "="
					}	
					] 				
				}         
			]   
		}
		
		var stores_info = await product_search(data_get_store,res);
		//return res.send(stores_info);
		//return ;


	//Lấy danh sách loại danh mục
		let url = ojs_configs.domain_ghtk + 
		"pick_province=" + stores_info[0].stores_province + "&" + 
		"pick_district=" + stores_info[0].stores_district + "&" +  
		"province=" + datas.adress.province + "&" + 
		"district=" + datas.adress.Districts + "&" + 
		"weight=" + weight_sum + "&" + 
		"deliver_option=none";							
		
		let token = ojs_configs.token_ghtk;
		//return res.send({ "error" : "" , "datas" : [url,token]}); 
		//							
		
		
		var result = await ojs_shares_fetch_data.get_data_send_token_get_ghtk(url,token);
		
		//return res.send({ "error" : "" , "datas" : result}); 
		//	
		
		
		if(result.fee.fee){
			return res.send({ "error" : "" ,"store_id": store_id, "datas" : result.fee.fee}); 	
			
		}else{
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares.show_error( evn, "Không tìm thấy giá của khu vực này", "Không tìm thấy giá của khu vực này" );
			return res.send({ "error" : "13" ,"position":"ctl-shipping_spaciality->caution", "message" : error_send }); 
											
		}

	//@
	//@
	//@
	//@		
	}else{
		return res.send({ "error" : "18" ,"position":"ctl-shipping_spaciality->caution", "message" : "Chưa có type này, chỉ có dala và ghtk"}); 
					
	}
}

module.exports = function_export;