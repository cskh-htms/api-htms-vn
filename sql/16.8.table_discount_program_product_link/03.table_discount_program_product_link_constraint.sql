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
ALTER TABLE `dala_discount_program_product_link` 
ADD CONSTRAINT `discount_program_product_link_discount_program_details_id` 
FOREIGN KEY (`dala_discount_program_product_link_discount_program_details_id`) 
REFERENCES `dala_discount_program_details`(`dala_discount_program_details_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
 
--
-- service id  
ALTER TABLE `dala_discount_program_product_link` 
ADD CONSTRAINT `discount_program_product_link_product_speciality_id` 
FOREIGN KEY (`dala_discount_program_product_link_product_speciality_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 


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




