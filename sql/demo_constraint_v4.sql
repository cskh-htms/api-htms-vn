-- 
-- 
-- 
-- 
-- 
-- 
-- star
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


-- =====================================================
--         table USERS
-- =====================================================


--
-- user type id
ALTER TABLE `dala_users` 
ADD CONSTRAINT `users_users_type_id` 
FOREIGN KEY (`dala_users_users_type_id`) 
REFERENCES `dala_users_type`(`dala_users_type_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
 
-- =====================================================
--         end of table USERS
-- =====================================================
 
 
 
 

 
-- =====================================================
--         table STORES
-- =====================================================

 
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


 
-- =====================================================
--         end of table STORES
-- =====================================================
 
  
 
 
 
 
-- =====================================================
--         table Brands
-- =====================================================

 
--
-- brands_stores_id
ALTER TABLE `dala_brands` 
ADD CONSTRAINT `brands_stores_id` 
FOREIGN KEY (`dala_brands_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 


-- =====================================================
--         end of table Brands
-- =====================================================






-- =====================================================
--    table option speciality
-- =====================================================

   
--
-- options_product_speciality_stores_id
ALTER TABLE `dala_options_product_speciality` 
ADD CONSTRAINT `options_product_speciality_stores_id` 
FOREIGN KEY (`dala_options_product_speciality_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
 
 
-- =====================================================
--   end of  table option speciality
-- =====================================================
 
 
-- =====================================================
--    table option speciality link
-- =====================================================

   
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



-- =====================================================
--   end of  table option speciality link
-- =====================================================
 
 
 
  
 
 
 
 
 
 
 
 
 
 
 
-- =====================================================
--    table category speciality
-- =====================================================

   
--
-- category_general_speciality_stores_id
ALTER TABLE `dala_category_general_speciality` 
ADD CONSTRAINT `category_general_speciality_stores_id` 
FOREIGN KEY (`dala_category_general_speciality_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
-- =====================================================
--    end of table category speciality
-- =====================================================
 
 
 
 
 
 
 
 
 
 
 
-- =====================================================
--    table category speciality link
-- =====================================================

   
--
-- category_general_speciality_link_category_general_id
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
 
 
 
 
-- =====================================================
--    end of table category speciality link
-- =====================================================
 
 
 
 
 
 
 -- =====================================================
--   table news
-- =====================================================
 
 
--
-- news_stores_id
ALTER TABLE `dala_news` 
ADD CONSTRAINT `news_stores_id` 
FOREIGN KEY (`dala_news_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
--
-- news_user_id

 
 
 -- =====================================================
--   end of table news
-- =====================================================
  
 
 
 
 
 -- =====================================================
--   table category news
-- =====================================================
 
 
--
-- category_news_stores_id
ALTER TABLE `dala_category_news` 
ADD CONSTRAINT `category_news_stores_id` 
FOREIGN KEY (`dala_category_news_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;


 
 -- =====================================================
--   end of table category news
-- ===================================================== 
 
 
 
 
 -- =====================================================
--   table category news link
-- =====================================================
 
 
--
-- category_news_stores_id 
 ALTER TABLE `dala_category_news_link` 
 ADD CONSTRAINT `category_news_link_category_news_id` 
 FOREIGN KEY (`dala_category_news_link_category_news_id`) 
 REFERENCES `dala_category_news`(`dala_category_news_ID`) 
 ON DELETE CASCADE ON UPDATE CASCADE;
 
 
 
  
-- =====================================================
--   end of table category news link
-- =====================================================
 
 
 
 
 
 
-- =====================================================
--   table category products_speciality
-- =====================================================
 
 
--
-- products_speciality_store_id
ALTER TABLE `dala_products_speciality` 
ADD CONSTRAINT `products_speciality_store_id` 
FOREIGN KEY (`dala_products_speciality_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- products_speciality_brand
ALTER TABLE `dala_products_speciality` 
ADD CONSTRAINT `products_speciality_brand` 
FOREIGN KEY (`dala_products_speciality_brand`) 
REFERENCES `dala_brands`(`dala_brands_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
 
 
 
 
 
 
 
-- =====================================================
--   end of table category products_speciality
-- =====================================================
 
 
 
 
 
 
 
 
-- =====================================================
--   table category products_speciality
-- =====================================================
 
 
--
-- orders_speciality_user_id
ALTER TABLE `dala_orders_speciality` 
ADD CONSTRAINT `orders_speciality_user_id` 
FOREIGN KEY (`dala_orders_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
--
-- orders_details_speciality_order_id
ALTER TABLE `dala_orders_details_speciality` 
ADD CONSTRAINT `orders_details_speciality_order_id` 
FOREIGN KEY (`dala_orders_details_speciality_order_id`) 
REFERENCES `dala_orders_speciality`(`dala_orders_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
 
 
 
 
 
--
--
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

 
 
 
 
 
 
 
 
 
 
 
 
 