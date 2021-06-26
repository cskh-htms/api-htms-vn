-- 
-- 
-- 
-- 
-- 
-- 
-- star
START TRANSACTION;



-- ----------------------
-- user phone field
-- ----------------------

-- 
-- *unique-------
-- alter table dala_users drop index check_users_phone_unique;
-- 
ALTER TABLE   dala_users 
ADD CONSTRAINT check_users_phone_unique  
UNIQUE (dala_users_phone);



--
-- user type id
ALTER TABLE `dala_users` 
ADD CONSTRAINT `users_users_type_id` 
FOREIGN KEY (`dala_users_users_type_id`) 
REFERENCES `dala_users_type`(`dala_users_type_ID`) 
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




