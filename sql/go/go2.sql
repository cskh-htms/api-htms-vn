	
START TRANSACTION;	
	--
	--
	--
	DELETE FROM `dala_discount_program_product_link`;
	DELETE FROM `dala_discount_program_details`;
	DELETE FROM `dala_discount_program_gift_link`;
	DELETE FROM `dala_orders_speciality`;
	DELETE FROM `dala_shipping_tracking`;
	
--
--
--
-- commit 
COMMIT;



