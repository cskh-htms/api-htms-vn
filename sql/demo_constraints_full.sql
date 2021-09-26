-- 
-- 
-- 
-- 
-- 
-- add tất cả các constraints
-- star constaints all

START TRANSACTION;

-- 
-- -----------------------------------------------------------------------------------------------------
 


-- 
-- users
-- 
ALTER TABLE   dala_users 
ADD CONSTRAINT check_users_phone_unique  
UNIQUE (dala_users_phone);

--
-- user type id
ALTER TABLE `dala_users` 
ADD CONSTRAINT `users_users_type_id` 
FOREIGN KEY (`dala_users_users_type_id`) 
REFERENCES `dala_users_type`(`dala_users_type_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;




-- ----------------------------
-- brands
-- ----------------------------
ALTER TABLE `dala_brands` 
ADD CONSTRAINT `brands_stores_id` 
FOREIGN KEY (`dala_brands_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 



-- ----------------------------
-- category_general_speciality
-- ----------------------------
ALTER TABLE `dala_category_general_speciality` 
ADD CONSTRAINT `category_general_speciality_stores_id` 
FOREIGN KEY (`dala_category_general_speciality_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
 
 
-- ----------------------------
-- category_general_speciality_link
-- ----------------------------
ALTER TABLE `dala_category_general_speciality_link` 
ADD CONSTRAINT `category_general_speciality_link_category_general_id` 
FOREIGN KEY (`dala_category_general_speciality_link_category_general_id`) 
REFERENCES `dala_category_general_speciality`(`dala_category_general_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE;
  
--
-- category_general_speciality_link_product_id
ALTER TABLE `dala_category_general_speciality_link` 
ADD CONSTRAINT `category_general_speciality_link_product_id` 
FOREIGN KEY (`dala_category_general_speciality_link_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
 
 
 
-- ----------------------------
-- options_product_speciality
-- ----------------------------
ALTER TABLE `dala_options_product_speciality` 
ADD CONSTRAINT `options_product_speciality_stores_id` 
FOREIGN KEY (`dala_options_product_speciality_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
 
 
 -- ----------------------------
-- options_product_speciality_link
-- ----------------------------
 
--
-- options_product_speciality_link_option_id
ALTER TABLE `dala_options_product_speciality_link` 
ADD CONSTRAINT `options_product_speciality_link_option_id` 
FOREIGN KEY (`dala_options_product_speciality_link_option_id`) 
REFERENCES `dala_options_product_speciality`(`dala_options_product_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
--
-- options_product_speciality_link_product_id
ALTER TABLE `dala_options_product_speciality_link` 
ADD CONSTRAINT `options_product_speciality_link_product_id` 
FOREIGN KEY (`dala_options_product_speciality_link_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
 
 
-- ----------------------------
-- stores
-- ----------------------------
  
 --
-- user id 
ALTER TABLE `dala_stores` 
ADD CONSTRAINT `stores_user_id` 
FOREIGN KEY (`dala_stores_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_stores` 
ADD CONSTRAINT `stores_service_type_id` 
FOREIGN KEY (`dala_stores_service_type_id`) 
REFERENCES `dala_service_type`(`dala_service_type_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 

 
 
 
-- ----------------------------
-- products_speciality
-- ----------------------------
 
 --
-- products_speciality_store_id
ALTER TABLE `dala_products_speciality` 
ADD CONSTRAINT `products_speciality_store_id` 
FOREIGN KEY (`dala_products_speciality_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
 
 
-- ----------------------------
-- dala_category_news_link
-- ----------------------------
-- 
-- news_id
--
 ALTER TABLE `dala_category_news_link` 
 ADD CONSTRAINT `category_news_link_news_id` 
 FOREIGN KEY (`dala_category_news_link_news_id`) 
 REFERENCES `dala_news`(`dala_news_ID`) 
 ON DELETE CASCADE ON UPDATE CASCADE;
 
-- ---------------------------------------- 
 
 
-- 
-- category_news_id
--
ALTER TABLE `dala_category_news_link` 
ADD CONSTRAINT `category_news_link_category_news_id` 
FOREIGN KEY (`dala_category_news_link_category_news_id`) 
REFERENCES `dala_category_news`(`dala_category_news_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
-- ----------------------------------------  
  
 
 
 
-- ----------------------------
-- orders_details_speciality
-- ----------------------------
 
 --
-- orders_details_speciality_order_id
ALTER TABLE `dala_orders_details_speciality` 
ADD CONSTRAINT `orders_details_speciality_order_id` 
FOREIGN KEY (`dala_orders_details_speciality_order_id`) 
REFERENCES `dala_orders_speciality`(`dala_orders_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE;
 
 
 
 
-- ----------------------------
-- orders_speciality
-- ---------------------------- 
 
--
-- orders_speciality_user_id
ALTER TABLE `dala_orders_speciality` 
ADD CONSTRAINT `orders_speciality_user_id` 
FOREIGN KEY (`dala_orders_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;  
 
 
 
 
-- ----------------------------
-- shipping_tracking
-- ---------------------------- 
 
--
-- shipping_tracking_users_id
ALTER TABLE `dala_shipping_tracking` 
ADD CONSTRAINT `shipping_tracking_users_id` 
FOREIGN KEY (`dala_shipping_tracking_users_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
--
-- shipping_tracking_orders_id
ALTER TABLE `dala_shipping_tracking` 
ADD CONSTRAINT `shipping_tracking_orders_id` 
FOREIGN KEY (`dala_shipping_tracking_orders_id`) 
REFERENCES `dala_orders_speciality`(`dala_orders_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;


 
-- ----------------------------
-- adress_meta
-- ---------------------------- 
 
 ALTER TABLE `dala_adress_meta` 
ADD CONSTRAINT `adress_meta_user_id` 
FOREIGN KEY (`dala_adress_meta_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
 
 
 
-- ----------------------------
-- reviews_store_speciality
-- ----------------------------
 
 --
-- user id 
ALTER TABLE `dala_reviews_store_speciality` 
ADD CONSTRAINT `reviews_store_speciality_user_id` 
FOREIGN KEY (`dala_reviews_store_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_reviews_store_speciality` 
ADD CONSTRAINT `reviews_store_speciality_store_id` 
FOREIGN KEY (`dala_reviews_store_speciality_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 

 
 
-- ----------------------------
-- reviews_speciality
-- ---------------------------- 
 
--
-- user id 
ALTER TABLE `dala_reviews_speciality` 
ADD CONSTRAINT `reviews_speciality_user_id` 
FOREIGN KEY (`dala_reviews_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_reviews_speciality` 
ADD CONSTRAINT `reviews_speciality_product_id` 
FOREIGN KEY (`dala_reviews_speciality_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 


 
-- ----------------------------
-- notes
-- ----------------------------  
 
ALTER TABLE `dala_notes` 
ADD CONSTRAINT `notes_user_id` 
FOREIGN KEY (`dala_notes_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
  
 

-- ----------------------------
-- uploads_infomation
-- ----------------------------   
 
ALTER TABLE `dala_uploads_infomation` 
ADD CONSTRAINT `uploads_infomation_user_id` 
FOREIGN KEY (`dala_uploads_infomation_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;  
 
 
  
 
 
-- ----------------------------
-- users_tracking
-- ----------------------------   
 
ALTER TABLE `dala_users_tracking` 
ADD CONSTRAINT `users_tracking_user_id` 
FOREIGN KEY (`dala_users_tracking_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 






-- ----------------------------
-- comments_speciality
-- ---------------------------- 
--
-- user id 
ALTER TABLE `dala_comments_speciality` 
ADD CONSTRAINT `comments_speciality_user_id` 
FOREIGN KEY (`dala_comments_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_comments_speciality` 
ADD CONSTRAINT `comments_speciality_product_id` 
FOREIGN KEY (`dala_comments_speciality_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 










-- ----------------------------
-- like_product
-- ---------------------------- 
--
-- like_product_user_id
ALTER TABLE `dala_like_product` 
ADD CONSTRAINT `like_product_user_id` 
FOREIGN KEY (`dala_like_product_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- like_product_product_id 
ALTER TABLE `dala_like_product` 
ADD CONSTRAINT `like_product_product_id` 
FOREIGN KEY (`dala_like_product_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 






-- ----------------------------
-- like_store
-- ----------------------------

--
-- user id 
ALTER TABLE `dala_like_store` 
ADD CONSTRAINT `like_store_user_id` 
FOREIGN KEY (`dala_like_store_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_like_store` 
ADD CONSTRAINT `like_store_store_id` 
FOREIGN KEY (`dala_like_store_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 






-- ----------------------------
-- view_product
-- ----------------------------

--
-- like_product_user_id
ALTER TABLE `dala_view_product` 
ADD CONSTRAINT `view_product_user_id` 
FOREIGN KEY (`dala_view_product_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- like_product_product_id 
ALTER TABLE `dala_view_product` 
ADD CONSTRAINT `view_product_product_id` 
FOREIGN KEY (`dala_view_product_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 







-- ----------------------------
-- discount_program
-- ----------------------------
--
-- like_product_user_id
ALTER TABLE `dala_discount_program` 
ADD CONSTRAINT `discount_program_store_id_created` 
FOREIGN KEY (`dala_discount_program_store_id_created`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
  
  
  
  
  
  
  
  
-- ----------------------------
-- discount_program_details
-- ---------------------------- 
--
-- discount_program_details_discount_program_id
ALTER TABLE `dala_discount_program_details` 
ADD CONSTRAINT `discount_program_details_discount_program_id` 
FOREIGN KEY (`dala_discount_program_details_discount_program_id`) 
REFERENCES `dala_discount_program`(`dala_discount_program_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- discount_program_details_store_id
ALTER TABLE `dala_discount_program_details` 
ADD CONSTRAINT `discount_program_details_store_id` 
FOREIGN KEY (`dala_discount_program_details_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 

  
  
  
  
-- ----------------------------
-- discount_program_product_link
-- ---------------------------- 
  
--
-- user id 
ALTER TABLE `dala_discount_program_product_link` 
ADD CONSTRAINT `discount_program_product_link_discount_program_details_id` 
FOREIGN KEY (`dala_discount_program_product_link_discount_program_details_id`) 
REFERENCES `dala_discount_program_details`(`dala_discount_program_details_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_discount_program_product_link` 
ADD CONSTRAINT `discount_program_product_link_product_speciality_id` 
FOREIGN KEY (`dala_discount_program_product_link_product_speciality_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 





-- ----------------------------
-- coupon_speciality
-- ---------------------------- 

ALTER TABLE `dala_coupon_speciality` 
ADD CONSTRAINT `coupon_speciality_stores_id_created` 
FOREIGN KEY (`dala_coupon_speciality_stores_id_created`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 






-- ----------------------------
-- shipping_speciality
-- ---------------------------- 
ALTER TABLE dala_shipping_speciality 
ADD CONSTRAINT shipping_speciality_unique_code 
UNIQUE (dala_shipping_speciality_code);









--
-- -------------------------------------------------------------------------------------------------------
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 




