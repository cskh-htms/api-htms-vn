-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;



--
-- options_product_speciality_stores_id
ALTER TABLE `dala_options_product_speciality` 
ADD CONSTRAINT `options_product_speciality_stores_id` 
FOREIGN KEY (`dala_options_product_speciality_stores_id`) 
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




