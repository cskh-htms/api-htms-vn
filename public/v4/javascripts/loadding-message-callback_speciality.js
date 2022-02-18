




/*

---------------------------------------------------------
1. DISCOUNT
	* 1.1 [huy_tham_gia_discount]

2. ORDER
	* 2.1 [push_dala]
	* 2.2 [push_ghtk]
	* 2.3 [yeu_cau_rut_tien]
	* 2.4 [thanh_toan_yeu_cau_rut_tien]	

3. SHIPPER
	* 3.1 [shipper_cap_nhat_order]


4. REVIEW
	* 4.1 [duyet_danh_gia]




----------------------------------------------------------
*/





$(document).ready(function($){
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*callback function message*/
ojs_loadding_message_callback = {
	callback_test:function(a){
		alert("hú hú test test");
	},
	





	//@
	//@
	/*---------------------------------------
	          4. REVIEWS
	// -------------------------------------*/
	//@
	//@
	//@
	//@
	//@ 3.1 [shipper_cap_nhat_order]
	duyet_danh_gia:function(datas){
		let datas_parse = JSON.parse(datas);
		let review_id = datas_parse.review_id;
		//let datas = datas_parse.datas;
		
		//console.log(review_id);
		//return;
		
		ojs_reviews_speciality.duyet_danh_gia(review_id);
		
	},//huy_tham_gia_discount







	//@
	//@
	/*---------------------------------------
	          3. SHIPPER
	// -------------------------------------*/
	//@
	//@
	//@
	//@
	//@ 3.1 [shipper_cap_nhat_order]
	shipper_cap_nhat_order:function(datas){
		let datas_parse = JSON.parse(datas);
		//let sipper_id = datas_parse.shipper_id;
		//let datas = datas_parse.datas;
		
		//console.log(datas_parse);
		//return;
		
		ojs_shipping_speciality.shipper_cap_nhat_order(datas_parse);
		
	},//huy_tham_gia_discount







	//@
	//@
	/*---------------------------------------
	         2. ORDER
	// -------------------------------------*/
	//@
	//@
	//@ 2.1 [push_dala]
	push_dala:function(datas){
		let datas_parse = JSON.parse(datas);
		//let sipper_id = datas_parse.shipper_id;
		//let datas = datas_parse.datas;
		
		//console.log(datas_parse);
		//return;
		
		ojs_orders.push_dala(datas_parse);
		
	},//huy_tham_gia_discount


	//@
	//@
	//@ 2.2 [push_ghtk]
	push_ghtk:function(datas){
		let datas_parse = JSON.parse(datas);
		//let sipper_id = datas_parse.shipper_id;
		//let datas = datas_parse.datas;
		
		//console.log(datas_parse);
		//return;
		
		ojs_orders.push_ghtk(datas_parse);
		
	},//huy_tham_gia_discount


	//@
	//@
	//@ 2.3 [yeu_cau_rut_tien]
	yeu_cau_rut_tien:function(datas){
		let datas_parse = JSON.parse(datas);
		let order_id = datas_parse.order_id;
		let datas_send = datas_parse.datas;
		
		//console.log(datas_send);
		//return;
		
		ojs_orders.yeu_cau_rut_tien(datas_send,order_id);
		
	},//huy_tham_gia_discount

	//@
	//@
	//@ 2.4 [thanh_toan_yeu_cau_rut_tien]
	thanh_toan_yeu_cau_rut_tien:function(datas){
		let datas_parse = JSON.parse(datas);
		let order_id = datas_parse.order_id;
		let datas_send = datas_parse.datas;
		
		//console.log(datas_send);
		//return;
		
		ojs_orders.thanh_toan_yeu_cau_rut_tien(datas_send,order_id);
		
	},//huy_tham_gia_discount

	//@
	//@
	/*---------------------------------------
	          1. DISCOUNT
	// -------------------------------------*/
	//@
	//@
	//@ 1.1 [huy_tham_gia_discount]
	huy_tham_gia_discount:function(datas){
		let datas_parse = JSON.parse(datas);
		let discount_detail_id = datas_parse.discount_detail_id;
		
		//alert(discount_detail_id);
		//return;
		
		ojs_discount_program_speciality.huy_tham_gia_discount(discount_detail_id);
		
	},//huy_tham_gia_discount



	//
	//
	//xoa discount program
	delete_discount_program_id:function(datas){
		let datas_parse = JSON.parse(datas);
		let discount_program_id = datas_parse.discount_program_id;
		
		//alert(discount_program_id);
		//return;
		
		ojs_discount_program_speciality.delete_discount_program(discount_program_id);
		
	},//end of xoa san pham dac san	



	//
	//
	//xoa san pham dac san
	discount_add:function(datas){
		let datas_parse = JSON.parse(datas);
		let link_add_id = datas_parse.link_add_id;
		
		ojs_discount_program_speciality.add_product_to_discount(link_add_id);
		
	},//end of xoa san pham dac san	



	//@
	//@
	/*---------------------------------------
	          end of 1. DISCOUNT
	// -------------------------------------*/
	//@
	//@






	//
	//
	//xoa san pham dac san
	delete_news:function(datas){
		let datas_parse = JSON.parse(datas);
		let news_id = datas_parse.news_id;
		
		
		//alert(coupon_id);
		//return;
		
		ojs_news_general.ajax_delete(news_id);
		
	},//end of xoa san pham dac san	

	
	
	//
	//
	//xoa san pham dac san
	delete_coupon:function(datas){
		let datas_parse = JSON.parse(datas);
		let coupon_id = datas_parse.coupon_id;
		
		
		//alert(coupon_id);
		//return;
		
		ojs_coupon_speciality.ajax_delete(coupon_id);
		
	},//end of xoa san pham dac san	
	
	
	
	
	//
	//
	//xoa san pham dac san
	delete_discount_program_link_id:function(datas){
		//alert("asdasd");
		//return;
		let datas_parse = JSON.parse(datas);
		let discount_program_link_id = datas_parse.discount_program_link_id;
		ojs_discount_program_speciality.ajax_delete_discount_link(discount_program_link_id);
	},//end of xoa san pham dac san
	//
	//
	//
	//xoa category
	delete_category_general_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let cat_id = datas_parse.cat_id;
		ojs_category_general_speciality.ajax_delete(cat_id);
	},
	//
	//
	//
	//xoa option
	delete_option_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let option_id = datas_parse.option_id;
		ojs_option_speciality.ajax_delete(option_id);
	},
	//
	//
	//
	//xoa brands
	delete_brand:function(datas){
		let datas_parse = JSON.parse(datas);
		let brand_id = datas_parse.brand_id;
		ojs_brands.ajax_delete(brand_id);
	},
	//
	//
	//
	//xoa product speciality
	delete_product_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let product_id = datas_parse.product_id;
		ojs_products_speciality.ajax_delete(product_id);
	},//end of xoa san pham dac san
	//
	//	
	//
	//
	//
	//xoa users
	delete_users:function(datas){
		let datas_parse = JSON.parse(datas);
		let user_id = datas_parse.user_id;
		ojs_users.ajax_delete(user_id);
	},//end of xoa san pham dac san
	//
	//	
		
	//
	//
	//xoa users
	delete_store:function(datas){
		let datas_parse = JSON.parse(datas);
		let store_id = datas_parse.store_id;
		ojs_bussiness.ajax_delete(store_id);
	},//end of xoa san pham dac san
	//
	//	
	//
	//
	//xoa order detail
	delete_order_speciality_detail:function(datas){
		let datas_parse = JSON.parse(datas);
		let detail_id = datas_parse.detail_id;
		ojs_orders.ajax_delete_detail(detail_id);
	},//end of xoa san pham dac san
	//
	//				
	//	
	//
	//
	//xoa shipping
	delete_shipping_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let shipping_id = datas_parse.shipping_id;
		ojs_shipping_speciality.ajax_delete(shipping_id);
	},//end of xoa san pham dac san
	//
	//				
	//	
	//
	//
	//xoa cat tin tuc
	delete_category_news_general:function(datas){
		let datas_parse = JSON.parse(datas);
		let cat_id = datas_parse.cat_id;
		ojs_category_news_general.ajax_delete(cat_id);
	},//end of xoa san pham dac san
	//
	//				
	//	
	//
	//
	//xoa tin tuc
	delete_news_general:function(datas){
		let datas_parse = JSON.parse(datas);
		let news_id = datas_parse.news_id;
		ojs_news_general.ajax_delete(news_id);
	},//end of xoa san pham dac san
	//
	//				
	//	
	//
	//
	//xoa binh luan
	delete_comment_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let comment_id = datas_parse.comment_id;
		ojs_comments_speciality.ajax_delete(comment_id);
	},//end of xoa san pham dac san
	//
	//				
	//	
	//
	//
	//xoa reviews
	delete_review_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let review_id = datas_parse.review_id;
		ojs_reviews_speciality.ajax_delete(review_id);
	},//end of xoa san pham dac san
	//
	//	

	//
	//
	//xoa reviews
	delete_orders_speciality:function(datas){
		let datas_parse = JSON.parse(datas);
		let order_id = datas_parse.order_id;
		ojs_orders.ajax_delete(order_id);
	}//end of xoa san pham dac san
	//
	//	
		
		
	
}	
	
	
	
	
	
//end of massage	
////////////////////////////////////////////////////////////////////////////////////////////
});//enf od document ready	
	
	
	