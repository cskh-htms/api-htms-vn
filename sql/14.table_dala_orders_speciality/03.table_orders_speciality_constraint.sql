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




