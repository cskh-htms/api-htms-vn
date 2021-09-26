-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


 
--
-- shipping_speciality
ALTER TABLE dala_shipping_speciality 
ADD CONSTRAINT shipping_speciality_unique_code 
UNIQUE (dala_shipping_speciality_code);

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




