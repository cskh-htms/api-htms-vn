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
ALTER TABLE `dala_like_store` 
ADD CONSTRAINT `like_store_user_id` 
FOREIGN KEY (`dala_like_store_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_like_store` 
ADD CONSTRAINT `like_store_store_id` 
FOREIGN KEY (`dala_like_store_store_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
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




