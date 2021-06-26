-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


ALTER TABLE `dala_adress_meta` 
ADD CONSTRAINT `adress_meta_user_id` 
FOREIGN KEY (`dala_adress_meta_user_id`) 
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




