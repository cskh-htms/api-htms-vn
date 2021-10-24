
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
--
-- 
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_update BEFORE UPDATE ON dala_orders_details_speciality 
FOR EACH ROW  
BEGIN  
	-- kiểm tra product có tồn tại không
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
		SET @checkID = ( select dala_products_speciality_ID
						 from dala_products_speciality 
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id
						);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_product_id_not_refer'; 
		END IF;	
	END IF;
	-- end of kiểm tra product có tồn tại không
	
	-- kiểm tra discount có tồn tại không
	IF(NEW.dala_orders_details_speciality_line_order = 'coupon' ) THEN 	
		SET @checkID2 = ( select  dala_discount_program_ID 
						 from dala_view_discount_program   
						 where dala_discount_program_ID = NEW.dala_orders_details_speciality_product_id 
						 and dala_check_expired = 1 
						);
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_discount_id_not_refer'; 
		END IF;	
	END IF;
	-- end of kiểm tra product có tồn tại không	
	
END $$
DELIMITER ;




--
-- 
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_after_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_after_update BEFORE UPDATE ON dala_orders_details_speciality 
FOR EACH ROW  
BEGIN  

	-- update bảng details discount
	IF(NEW.dala_orders_details_speciality_line_order = 'product') THEN 
		-- lấy mã giảm giá
		update dala_orders_details_speciality_discount set 
		dala_orders_details_speciality_discount_qty = NEW.dala_orders_details_speciality_qty, 
		dala_orders_details_speciality_discount_price = NEW.dala_orders_details_speciality_price 
		where dala_orders_details_speciality_discount_order_details_id = NEW.dala_orders_details_speciality_ID;
	END IF;		
	
END $$
DELIMITER ;


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