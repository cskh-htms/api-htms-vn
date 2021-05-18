-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
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




