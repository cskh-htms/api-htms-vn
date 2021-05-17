-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;




--
-- brands_stores_id
ALTER TABLE `dala_brands` 
ADD CONSTRAINT `brands_stores_id` 
FOREIGN KEY (`dala_brands_stores_id`) 
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




