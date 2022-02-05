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




