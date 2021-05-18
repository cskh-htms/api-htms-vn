-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
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




