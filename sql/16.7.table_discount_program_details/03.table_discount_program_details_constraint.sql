-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- discount_program_details_discount_program_id
ALTER TABLE `dala_discount_program_details` 
ADD CONSTRAINT `discount_program_details_discount_program_id` 
FOREIGN KEY (`dala_discount_program_details_discount_program_id`) 
REFERENCES `dala_discount_program`(`dala_discount_program_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT; 
 
 
 
--
-- discount_program_details_store_id
ALTER TABLE `dala_discount_program_details` 
ADD CONSTRAINT `discount_program_details_store_id` 
FOREIGN KEY (`dala_discount_program_details_store_id`) 
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




