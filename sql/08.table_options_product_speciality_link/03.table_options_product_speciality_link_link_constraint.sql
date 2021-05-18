-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;



   
--
-- options_product_speciality_link_option_id
ALTER TABLE `dala_options_product_speciality_link` 
ADD CONSTRAINT `options_product_speciality_link_option_id` 
FOREIGN KEY (`dala_options_product_speciality_link_option_id`) 
REFERENCES `dala_options_product_speciality`(`dala_options_product_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
--
-- options_product_speciality_link_product_id
ALTER TABLE `dala_options_product_speciality_link` 
ADD CONSTRAINT `options_product_speciality_link_product_id` 
FOREIGN KEY (`dala_options_product_speciality_link_product_id`) 
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




