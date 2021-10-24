
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
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_insert BEFORE INSERT ON dala_orders_details_speciality 
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
		SET @checkID2 = ( select  dala_coupon_speciality_ID 
						 from dala_view_coupons   
						 where dala_coupon_speciality_ID = NEW.dala_orders_details_speciality_product_id 
						 and dala_check_expired = 1 
						);
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_coupon_id_not_refer'; 
		END IF;	
	END IF;
	-- end of kiểm tra product có tồn tại không	
	
END $$
DELIMITER ;





-- 
--
-- 
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_after_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_after_insert AFTER INSERT ON dala_orders_details_speciality 
FOR EACH ROW  
BEGIN  
	-- insert vào bảng orders discount detail 
	IF(NEW.dala_orders_details_speciality_line_order = 'product') THEN 
		-- lấy mã giảm giá
		SET @discounID = ( select  dala_discount_program_ID 
						 from dala_view_discount_program_product   
						 where dala_discount_program_product_link_product_speciality_id = NEW.dala_orders_details_speciality_product_id 
						 and dala_check_expired = 1 	
						 and dala_check_date < 0 
						 and dala_discount_program_product_link_status = 1 
		);
		IF(@discounID > 0) THEN 	
			insert into dala_orders_details_speciality_discount set 
			dala_orders_details_speciality_discount_order_id = NEW.dala_orders_details_speciality_order_id, 
			dala_orders_details_speciality_discount_order_details_id = NEW.dala_orders_details_speciality_ID,
			dala_orders_details_speciality_discount_discount_id = @discounID, 
			dala_orders_details_speciality_discount_product_id = NEW.dala_orders_details_speciality_product_id, 
			dala_orders_details_speciality_discount_qty = NEW.dala_orders_details_speciality_qty, 
			dala_orders_details_speciality_discount_price = NEW.dala_orders_details_speciality_price,
			dala_orders_details_speciality_discount_medium_text = NEW.dala_orders_details_medium_text;
		END IF;
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
