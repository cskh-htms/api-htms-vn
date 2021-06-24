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
ON DELETE CASCADE ON UPDATE CASCADE;
 
 
 
--
-- category_general_speciality_link_product_id
ALTER TABLE `dala_category_general_speciality_link` 
ADD CONSTRAINT `category_general_speciality_link_product_id` 
FOREIGN KEY (`dala_category_general_speciality_link_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
 
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




