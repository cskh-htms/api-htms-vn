-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- like_product_user_id
ALTER TABLE `dala_discount_program` 
ADD CONSTRAINT `discount_program_store_id_created` 
FOREIGN KEY (`dala_discount_program_store_id_created`) 
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




