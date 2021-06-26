-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;



--
-- category_general_speciality_stores_id
ALTER TABLE `dala_category_general_speciality` 
ADD CONSTRAINT `category_general_speciality_stores_id` 
FOREIGN KEY (`dala_category_general_speciality_stores_id`) 
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




