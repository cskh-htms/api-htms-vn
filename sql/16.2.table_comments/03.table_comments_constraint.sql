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
ALTER TABLE `dala_comments_speciality` 
ADD CONSTRAINT `comments_speciality_user_id` 
FOREIGN KEY (`dala_comments_speciality_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_comments_speciality` 
ADD CONSTRAINT `comments_speciality_product_id` 
FOREIGN KEY (`dala_comments_speciality_product_id`) 
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




