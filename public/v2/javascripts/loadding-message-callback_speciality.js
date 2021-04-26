$(document).ready(function($){
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*callback function message*/
ojs_loadding_message_callback = {
	callback_test:function(a){
		alert("hú hú test test");
	},
	//
	//
	//xoa san pham dac san
	delete_product:function(datas){

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
	
	
	