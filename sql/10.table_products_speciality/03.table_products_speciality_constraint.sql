-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- products_speciality_store_id
ALTER TABLE `dala_products_speciality` 
ADD CONSTRAINT `products_speciality_store_id` 
FOREIGN KEY (`dala_products_speciality_store_id`) 
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




