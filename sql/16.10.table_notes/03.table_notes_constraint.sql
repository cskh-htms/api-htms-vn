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
ALTER TABLE `dala_notes` 
ADD CONSTRAINT `notes_user_id` 
FOREIGN KEY (`dala_notes_user_id`) 
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




