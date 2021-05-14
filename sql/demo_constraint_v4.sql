-- 
-- 
-- 
-- 
-- 
-- 
-- star
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


-- =====================================================
--         table USERS
-- =====================================================


--
-- user type id
ALTER TABLE `dala_users` 
ADD CONSTRAINT `users_users_type_id` 
FOREIGN KEY (`dala_users_users_type_id`) 
REFERENCES `dala_users_type`(`dala_users_type_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 
 
 
-- =====================================================
--         end of table USERS
-- =====================================================
 
 
 
 
 

-- =====================================================
--         table STORES
-- =====================================================

 
--
-- user id 
ALTER TABLE `dala_stores` 
ADD CONSTRAINT `tores_user_id` 
FOREIGN KEY (`dala_stores_user_id`) 
REFERENCES `dala_users`(`dala_users_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- service id  
ALTER TABLE `dala_stores` 
ADD CONSTRAINT `tores_service_type_id` 
FOREIGN KEY (`dala_stores_service_type_id`) 
REFERENCES `dala_service_type`(`dala_service_type_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 


 
-- =====================================================
--         end of table STORES
-- =====================================================
 
 
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

 
 
 
 
 
 
 
 
 
 
 
 
 