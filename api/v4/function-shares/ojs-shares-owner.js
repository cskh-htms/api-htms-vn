

/*

mục đích : check quyền user

1. check_owner

	1.1. [check_role]
	1.2. [check_role]
	1.3. [owner_store] 
	1.3. [owner_cat] 

*/










const models_token = require('../models/models-token');
const models_users = require('../models/models-users');
const models_category_gemeral_speciality = require('../models/models-category-gemeral-speciality');
const models_option_speciality = require('../models/models-option-speciality');
const models_brands = require('../models/models-brands');
const models_products_spaciality = require('../models/models-products-spaciality');
const models_orders_spaciality = require('../models/models-orders-spaciality');
const models_adress_meta = require('../models/models-adress-meta');
const models_shipping_tracking = require('../models/models-shipping-tracking');
const models_reviews_spaciality = require('../models/models-reviews-spaciality');
const models_comments_spaciality = require('../models/models-comments-spaciality');
const models_reviews_store_spaciality = require('../models/models-reviews-store-spaciality');
const models_discount_program_details = require('../models/models-discount-program-details');
const models_discount_program = require('../models/models-discount-program');
const models_discount_program_product_link = require('../models/models-discount-program-product-link');
const models_coupon_speciality = require('../models/models-coupon-speciality');
const models_like_product = require('../models/models-like-product');
const models_like_store = require('../models/models-like-store');
const models_notes = require('../models/models-notes');
const models_uploads_infomation = require('../models/models-uploads-infomation');

const ojs_configs = require('../../../configs/config');
const jwt = require('jsonwebtoken');



//
//
//@@
//@@
const check_owner = async function(datas_check){
		//@
		//@
		//@	
		try{		
			var token = datas_check.token;
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get request data" );
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 1", "message": error_send } ; 
		
		}
		
		//@
		//@
		//neu không có token thì trỏ ra login page
		if(token == "" || token == null || token == undefined){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,"no-token", "no-token" );
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 2", "message": error_send } ; 			
		}

		//@
		//@
		//@
		//check role
		//xem role là gì
		//@ 1.1. [check_role]
		try {
			var send_datas_check_role = { 
				"datas" : {
					"token" : token
				}
			}
			//@
			//@
			var check_role;
			check_role = await models_users.get_role(send_datas_check_role);
			if(check_role.error != ""){
				return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 3", "message": check_role };
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->check_role->error_number: 1 ", "message": error_send };
		}		
		//@ 1.1. end of check_role
		
		
		
		
		//@
		//@
		//@
		//so sánh user_ID của token và User_ID của reouter
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.2. [check_owner_user]
		owner_user = 0;
		if(datas_check.user_id){
			try {
				var send_datas_check_owner_user = { 
					"datas" : {
						"token" 	: datas_check.token,
						"user_id"	: datas_check.user_id
					}
				}
				
				//return send_datas_check_owner_user;
				var check_owner_user;				
				check_owner_user = await models_users.get_owner_user(send_datas_check_owner_user);
				
				//return [check_owner_user];
				
				
				if(check_owner_user.error && check_owner_user.error != "") { 
					return {"error":"ojs_shares_owner-->user_owner : 1","message":check_owner_user.error} ;
				}else{
					owner_user = check_owner_user.datas;
				}
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->check_owner_user->error_number : 2", "message": error_send };	
			}			
		}
		//@ end of  1.2. [check_owner_user]
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.3. [owner_store] 
		var owner_store = 0;
		if(datas_check.store_id){
			
			var owner_store_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var store_id = datas_check.store_id;
				//return {"datas": [user_id,store_id]};
				//@
				//@
				//@@
				var send_datas_check_owner_store = { 
					"datas" : {
						"user_id" 	: user_id,
						"store_id"	: store_id
					}
				}				
				owner_store_get = await await models_category_gemeral_speciality.get_owner_store(send_datas_check_owner_store);	
				
				//@
				//@
				if(owner_store_get.error) { return {"error":owner_store_get.error,"message":owner_store_get.error} }	
				if(owner_store_get.length > 0) { owner_store = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->owner_storer->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.3. [owner_store] 		
		
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.4. [owner_cat] 
		
		var owner_cat = 0;
		if(datas_check.cat_id){
			
			var owner_cat_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var cat_id = datas_check.cat_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@
				//@@
				var send_datas_check_owner_cat = { 
					"datas" : {
						"user_id" 	: user_id,
						"cat_id"	: cat_id
					}
				}				
				owner_cat_get = await await models_category_gemeral_speciality.get_owner_cat(send_datas_check_owner_cat);	
				//return  owner_cat_get;
				//@
				//@
				if(owner_cat_get.error) { return {"error":owner_cat_get.error,"message":owner_cat_get.error} }	
				if(owner_cat_get.length > 0) { owner_cat = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->owner_cat->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.3. [owner_store] 		
				

		//@
		//@
		//@
		//@
		//@ 1.4 owner options
		var owner_option = 0;
		if(datas_check.option_id){
			
			var owner_option_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var option_id = datas_check.option_id;
				
				//return {"datas": [user_id,option_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_option = { 
					"datas" : {
						"user_id" 	: user_id,
						"option_id"	: option_id
					}
				}				
				owner_option_get = await models_option_speciality.get_owner_option(send_datas_check_owner_option);	
				//return owner_option_get;
				//@
				//@
				if(owner_option_get.error) { return {"error":owner_option_get.error,"message":owner_option_get.error} }	
				if(owner_option_get.length > 0) { owner_option = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_option->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.4. [owner_option] 

		//@
		//@
		//@
		//@
		//@ 1.5 owner brand
		var owner_brand = 0;
		if(datas_check.brand_id){
			
			var owner_brand_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var brand_id = datas_check.brand_id;
				
				//return {"datas": [user_id,brand_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_brand = { 
					"datas" : {
						"user_id" 	: user_id,
						"brand_id"	: brand_id
					}
				}				
				owner_brand_get = await models_brands.get_owner_brand(send_datas_check_owner_brand);	
				//return owner_brand_get;
				//@
				//@
				if(owner_brand_get.error) { return {"error":owner_brand_get.error,"message":owner_brand_get.error} }	
				if(owner_brand_get.length > 0) { owner_brand = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_brand->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.5. [owner_product] 



		//@
		//@
		//@
		//@
		//@ 1. owner product
		var owner_product = 0;
		if(datas_check.product_id){
			
			var owner_product_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var product_id = datas_check.product_id;
				
				//return {"datas": [user_id,product_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_product = { 
					"datas" : {
						"user_id" 	: user_id,
						"product_id"	: product_id
					}
				}			


				//return send_datas_check_owner_product;

				
				owner_product_get = await models_products_spaciality.get_owner_product(send_datas_check_owner_product);	
				
				//return owner_product_get;
				
				
				//@
				//@
				if(owner_product_get.error) { return {"error":owner_product_get.error,"message":owner_product_get.error} }	
				if(owner_product_get.length > 0) { owner_product = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_product->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.5. [owner_product] 




		//@
		//@
		//@
		//@
		//@ 1.7 owner product
		var owner_order = 0;
		if(datas_check.order_id){
			
			var owner_order_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var order_id = datas_check.order_id;
				
				//return {"datas": [user_id,order_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_order = { 
					"datas" : {
						"user_id" 	: user_id,
						"order_id"	: order_id
					}
				}			


				//return send_datas_check_owner_order;

				owner_order_get = await models_orders_spaciality.get_owner_order(send_datas_check_owner_order);	
				//return [owner_order_get];
				//@
				//@
				//@
				//@
				if(owner_order_get.error) { return {"error":owner_order_get.error,"message":owner_order_get.error} }	
				if(owner_order_get.length > 0) { owner_order = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_order_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.7. [owner_order] 







		//@
		//@
		//@
		//@
		//@ 1.8 owner adress
		var owner_adress = 0;
		if(datas_check.adress_id){
			
			var owner_adress_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var adress_id = datas_check.adress_id;
				
				//return {"datas": [user_id,adress_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_adress = { 
					"datas" : {
						"user_id" 	: user_id,
						"adress_id"	: adress_id
					}
				}			


				//return send_datas_check_owner_adress;

				owner_adress_get = await models_adress_meta.get_owner_adress(send_datas_check_owner_adress);	
				//return [owner_adress_get];
				//@
				//@
				//@
				//@
				if(owner_adress_get.error) { return {"error":owner_adress_get.error,"message":owner_adress_get.error} }	
				if(owner_adress_get.length > 0) { owner_adress = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_adress_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.8. [owner_adress] 




		//@
		//@
		//@
		//@
		//@ 1.9 owner tracking
		var owner_order_tracking = 0;
		if(datas_check.order_tracking_id){
			
			var owner_order_tracking_get;
			//@
			//@
			try {
				var user_id = datas_check.user_id;
				var order_tracking_id = datas_check.order_tracking_id;
				
				//return {"datas": [user_id,order_tracking_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_order_tracking = { 
					"datas" : {
						"user_id" 	: user_id,
						"order_tracking_id"	: order_tracking_id
					}
				}			


				//return send_datas_check_owner_order_tracking;

				owner_order_tracking_get = await models_shipping_tracking.get_owner_order_tracking(send_datas_check_owner_order_tracking);	
				//return [owner_order_tracking_get];
				//@
				//@
				//@
				//@
				if(owner_order_tracking_get.error) { return {"error":owner_order_tracking_get.error,"message":owner_order_tracking_get.error} }	
				if(owner_order_tracking_get.length > 0) { owner_order_tracking = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_order_tracking_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.9. [owner_order_tracking] 







		//@
		//@
		//@
		//@
		//@ 2.0 owner tracking
		var owner_tracking = 0;
		if(datas_check.review_id){
			
			var owner_review_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var review_id = datas_check.review_id;
				
				//return {"datas": [user_id,review_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_tracking = { 
					"datas" : {
						"user_id" 	: user_id,
						"review_id"	: review_id
					}
				}			


				//return send_datas_check_owner_tracking;

				owner_tracking_get = await models_shipping_tracking.get_owner_tracking(send_datas_check_owner_tracking);	
				//return [owner_tracking_get];
				//@
				//@
				//@
				//@
				if(owner_tracking_get.error) { return {"error":owner_tracking_get.error,"message":owner_tracking_get.error} }	
				if(owner_tracking_get.length > 0) { owner_tracking = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_tracking_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.0 [owner_tracking] 




		//@
		//@
		//@
		//@
		//@ 2.1 owner review
		var owner_review = 0;
		if(datas_check.review_id){
			
			var owner_review_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var review_id = datas_check.review_id;
				
				//return {"datas": [user_id,review_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"review_id"	: review_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_review_get = await models_reviews_spaciality.get_owner_review(send_datas_check_owner_review);	
				//return [owner_review_get];
				//@
				//@
				//@
				//@
				if(owner_review_get.error) { return {"error":owner_review_get.error,"message":owner_review_get.error} }	
				if(owner_review_get.length > 0) { owner_review = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_review_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.1 [owner_review] 



		//@
		//@
		//@
		//@
		//@ 2.2 owner tracking
		var owner_comment = 0;
		if(datas_check.comment_id){
			
			var owner_comment_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var comment_id = datas_check.comment_id;
				
				//return {"datas": [user_id,review_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_comment = { 
					"datas" : {
						"user_id" 		: user_id,
						"comment_id"	: comment_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_comment_get = await models_comments_spaciality.get_owner_comment(send_datas_check_owner_comment);	
				//return [owner_comment_get];
				//@
				//@
				//@
				//@
				if(owner_comment_get.error) { return {"error":owner_comment_get.error,"message":owner_comment_get.error} }	
				if(owner_comment_get.length > 0) { owner_comment = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_comment_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.2 [owner_comment] 






		//@
		//@
		//@
		//@
		//@ 2.3 owner review store
		var owner_review_store = 0;
		if(datas_check.review_store_id){
			
			var owner_review_store_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var review_store_id = datas_check.review_store_id;
				
				//return {"datas": [user_id,review_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"review_store_id"	: review_store_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_review_store_get = await models_reviews_store_spaciality.get_owner_review_store(send_datas_check_owner_review);	
				//return [owner_review_store_get];
				//@
				//@
				//@
				//@
				if(owner_review_store_get.error) { return {"error":owner_review_store_get.error,"message":owner_review_store_get.error} }	
				if(owner_review_store_get.length > 0) { owner_review_store = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_review_store_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.3 [owner_review_store] 





		//@
		//@
		//@
		//@
		//@ 2.3 owner review store
		var owner_discount_program_details = 0;
		if(datas_check.discount_program_details_id){
			
			var owner_discount_program_details_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var discount_program_details_id = datas_check.discount_program_details_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"discount_program_details_id"	: discount_program_details_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_discount_program_details_get = await models_discount_program_details.get_owner_discount_program_details(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_discount_program_details_get.error) { return {"error":owner_discount_program_details_get.error,"message":owner_discount_program_details_get.error} }	
				if(owner_discount_program_details_get.length > 0) { owner_discount_program_details = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_discount_program_details_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.3 [owner_discount_program_details] 




		//@
		//@
		//@
		//@
		//@ 2.4 owner discount_program
		var owner_discount_program = 0;
		if(datas_check.discount_program_id){
			
			var owner_discount_program_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var discount_program_id = datas_check.discount_program_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"discount_program_id"	: discount_program_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_discount_program_get = await models_discount_program.get_owner_discount_program(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_discount_program_get.error) { return {"error":owner_discount_program_get.error,"message":owner_discount_program_get.error} }	
				if(owner_discount_program_get.length > 0) { owner_discount_program = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_discount_program_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.4 [owner_discount_program] 



		//@
		//@
		//@
		//@
		//@ 2.5 owner discount_program product link
		var owner_discount_program_product_link = 0;
		if(datas_check.discount_program_product_link_id){
			
			var owner_discount_program_product_link_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var discount_program_product_link_id = datas_check.discount_program_product_link_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"discount_program_product_link_id"	: discount_program_product_link_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_discount_program_product_link_get = await models_discount_program_product_link.get_owner_discount_program_product_link(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_discount_program_product_link_get.error) { return {"error":owner_discount_program_product_link_get.error,"message":owner_discount_program_product_link_get.error} }	
				if(owner_discount_program_product_link_get.length > 0) { owner_discount_program_product_link = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_discount_program_product_link_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.5 [owner_discount_program_product_link] 






		//@
		//@
		//@
		//@
		//@ 2.6 owner_coupon_speciality
		var owner_coupon_speciality = 0;
		if(datas_check.coupon_speciality_id){
			
			var owner_coupon_speciality_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var coupon_speciality_id = datas_check.coupon_speciality_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"coupon_speciality_id"	: coupon_speciality_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_coupon_speciality_get = await models_coupon_speciality.get_owner_coupon_speciality(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_coupon_speciality_get.error) { return {"error":owner_coupon_speciality_get.error,"message":owner_coupon_speciality_get.error} }	
				if(owner_coupon_speciality_get.length > 0) { owner_coupon_speciality = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_coupon_speciality_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.6 [owner_coupon_speciality] 





		//@
		//@
		//@
		//@
		//@ 2.7 owner_like_product
		var owner_like_product = 0;
		if(datas_check.like_product_id){
			
			var owner_like_product_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var like_product_id = datas_check.like_product_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"like_product_id"	: like_product_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_like_product_get = await models_like_product.get_owner_like_product(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_like_product_get.error) { return {"error":owner_like_product_get.error,"message":owner_like_product_get.error} }	
				if(owner_like_product_get.length > 0) { owner_like_product = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_like_product_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.7 [owner_like_product] 



		//@
		//@
		//@
		//@
		//@ 2.8 owner_like_store
		var owner_like_store = 0;
		if(datas_check.like_store_id){
			
			var owner_like_store_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var like_store_id = datas_check.like_store_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"like_store_id"	: like_store_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_like_store_get = await models_like_store.get_owner_like_store(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_like_store_get.error) { return {"error":owner_like_store_get.error,"message":owner_like_store_get.error} }	
				if(owner_like_store_get.length > 0) { owner_like_store = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_like_store_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.8 [owner_like_store] 


		//@
		//@
		//@
		//@
		//@ 2.8 owner_like_store
		var owner_note = 0;
		if(datas_check.note_id){
			
			var owner_note_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var note_id = datas_check.note_id;
				
				//return {"datas": [user_id,discount_program_details_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"note_id"	: note_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_note_get = await models_notes.get_owner_notes(send_datas_check_owner_review);	
				//return [owner_discount_program_details_get];
				//@
				//@
				//@
				//@
				if(owner_note_get.error) { return {"error":owner_note_get.error,"message":owner_note_get.error} }	
				if(owner_note_get.length > 0) { owner_note = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_note_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.8 [owner_note] 





		//@
		//@
		//@
		//@
		//@ 2.9 owner_uploads_infomation
		var owner_uploads_infomation = 0;
		if(datas_check.uploads_infomation_id){
			
			var owner_uploads_infomation_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var uploads_infomation_id = datas_check.uploads_infomation_id;
				
				//return {"datas": [user_id,uploads_infomation_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"uploads_infomation_id"	: uploads_infomation_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_uploads_infomation_get = await models_uploads_infomation.get_owner_uploads_infomation(send_datas_check_owner_review);	
				//return [owner_uploads_infomation_get];
				//@
				//@
				//@
				//@
				if(owner_uploads_infomation_get.error) { return {"error":owner_uploads_infomation_get.error,"message":owner_uploads_infomation_get.error} }	
				if(owner_uploads_infomation_get.length > 0) { owner_uploads_infomation = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_uploads_infomation_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.9 [owner_uploads_infomation] 



		//@
		//@
		//@
		//@
		//@ 3.0 owner_image
		var owner_image = 0;
		if(datas_check.image_id){
			
			var owner_image_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var image_id = datas_check.image_id;
				
				//return {"datas": [user_id,image_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_review = { 
					"datas" : {
						"user_id" 	: user_id,
						"image_id"	: image_id
					}
				}			


				//return send_datas_check_owner_review;

				owner_image_get = await models_uploads_infomation.get_owner_image(send_datas_check_owner_review);	
				//return [get_owner_image];
				//@
				//@
				//@
				//@
				if(owner_image_get.error) { return {"error":owner_image_get.error,"message":owner_image_get.error} }	
				if(owner_image_get.length > 0) { owner_image = 1 }				
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_image_get->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 2.9 [owner_image] 












		//@
		//@
		//@
		let data_return = {
			"error":"",
			"user_role": check_role.message,
			"owner_user" : owner_user,
			"owner_store":owner_store,
			"owner_cat":owner_cat,
			"owner_option":owner_option,
			"owner_brand":owner_brand,
			"owner_product":owner_product,
			"owner_order":owner_order,
			"owner_adress":owner_adress,
			"owner_order_tracking" : owner_order_tracking,
			"owner_tracking" : owner_tracking,
			"owner_review" : owner_review,
			"owner_comment" : owner_comment ,
			"owner_review_store" : owner_review_store,
			"owner_discount_program_details" : owner_discount_program_details,
			"owner_discount_program" : owner_discount_program,
			"owner_discount_program_product_link" : owner_discount_program_product_link,
			"owner_coupon_speciality" :owner_coupon_speciality,
			"owner_like_product" :owner_like_product,
			"owner_like_store" :owner_like_store,
			"owner_note": owner_note,
			"owner_uploads_infomation": owner_uploads_infomation,
			"owner_image":owner_image
			}
		return data_return;
		//@
		//@
		//@
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
		check_owner
}