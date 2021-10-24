-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


-- 
--
ALTER TABLE `dala_orders_details_speciality_discount` 
ADD CONSTRAINT `dala_orders_details_speciality_discount_order_id` 
FOREIGN KEY (`dala_orders_details_speciality_discount_order_id`) 
REFERENCES `dala_orders_speciality`(`dala_orders_speciality_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE;


-- 
--
ALTER TABLE `dala_orders_details_speciality_discount` 
ADD CONSTRAINT `dala_orders_details_speciality_discount_product_id` 
FOREIGN KEY (`dala_orders_details_speciality_discount_product_id`) 
REFERENCES `dala_products_speciality`(`dala_products_speciality_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;



-- 
--
ALTER TABLE `dala_orders_details_speciality_discount` 
ADD CONSTRAINT `dala_orders_details_speciality_discount_discount_id` 
FOREIGN KEY (`dala_orders_details_speciality_discount_discount_id`) 
REFERENCES `dala_discount_program`(`dala_discount_program_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;



-- 
-- 
ALTER TABLE `dala_orders_details_speciality_discount` 
ADD CONSTRAINT `dala_orders_details_speciality_discount_order_details_id` 
FOREIGN KEY (`dala_orders_details_speciality_discount_order_details_id`) 
REFERENCES `dala_orders_details_speciality`(`dala_orders_details_speciality_ID`) 
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




