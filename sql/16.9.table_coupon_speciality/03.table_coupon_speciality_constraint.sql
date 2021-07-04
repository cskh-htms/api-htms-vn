-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- coupon_speciality_stores_id_created
-- 
ALTER TABLE `dala_coupon_speciality` 
ADD CONSTRAINT `coupon_speciality_stores_id_created` 
FOREIGN KEY (`dala_coupon_speciality_stores_id_created`) 
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




