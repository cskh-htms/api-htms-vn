
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 



-- ---------------------
-- check product id
-- --------------------

--
-- 
DROP TRIGGER  IF EXISTS  trig_check_orders_details_product_id_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_orders_details_product_id_insert BEFORE INSERT ON dala_orders_details_speciality 
FOR EACH ROW  
BEGIN  

IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
	SET @checkID = ( select dala_products_speciality_ID
					 from dala_products_speciality 
					 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id
					);
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_orders_details_product_id_not_refer'; 
	END IF;	
END IF;

END $$
DELIMITER ;





-- 
--  check product id
-- 



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