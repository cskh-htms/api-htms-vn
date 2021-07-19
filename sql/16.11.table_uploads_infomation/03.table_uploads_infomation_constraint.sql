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
ALTER TABLE `dala_uploads_infomation` 
ADD CONSTRAINT `uploads_infomation_user_id` 
FOREIGN KEY (`dala_uploads_infomation_user_id`) 
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




