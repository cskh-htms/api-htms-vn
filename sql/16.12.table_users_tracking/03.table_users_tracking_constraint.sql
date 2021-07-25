-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- coupon_speciality_stores_id_created
-- 
ALTER TABLE `dala_users_tracking` 
ADD CONSTRAINT `users_tracking_user_id` 
FOREIGN KEY (`dala_users_tracking_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
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




