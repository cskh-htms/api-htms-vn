-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
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




