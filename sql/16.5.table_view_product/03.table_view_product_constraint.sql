-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
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




