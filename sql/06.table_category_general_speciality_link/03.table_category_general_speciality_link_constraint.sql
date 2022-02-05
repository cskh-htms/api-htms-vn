-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;



   
--
-- category_general_speciality_link_category_general_id
ALTER TABLE `dala_category_general_speciality_link` 
ADD CONSTRAINT `category_general_speciality_link_category_general_id` 
FOREIGN KEY (`dala_category_general_speciality_link_category_general_id`) 
REFERENCES `dala_category_general_speciality`(`dala_category_general_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 

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




