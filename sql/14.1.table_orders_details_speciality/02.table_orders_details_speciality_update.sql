
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
			SIGNAL SQLSTATE '12301' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_product_id_not_refer'; 
		END IF;	
		
		
		-- kiểm tra tồn kho 	
		SET @check_data = ( select  dala_products_speciality_stock_status,dala_products_speciality_stock  
						 from dala_products_speciality    
						 where products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);
		SET @check_data_line = ( select  dala_orders_details_speciality_qty   
						 from dala_orders_details_speciality   
						 where dala_orders_details_speciality_ID = NEW.dala_orders_details_speciality_product_id  
						 and dala_orders_details_speciality_ID =  NEW.dala_orders_details_speciality_ID 
							);							
		IF (
			@check_data.dala_products_speciality_stock_status = 1 
			and  
			NEW.dala_orders_details_speciality_qty < (@check_data.dala_products_speciality_stock  + dala_orders_details_speciality_qty)   
		) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_update_qty_not_ok'; 
		END IF;			
	END IF;
	
	
	-- kiểm tra discount có tồn tại không
	IF(NEW.dala_orders_details_speciality_line_order = 'coupon' ) THEN 	
		SET @checkID2 = ( select  dala_coupon_speciality_ID 
						 from coupon_speciality   
						 where dala_coupon_speciality_ID = NEW.dala_orders_details_speciality_product_id 
						 and 
							(CASE 
								WHEN ( 	dala_discount_program_time_type  = 0 ) THEN  
									1 
									
								WHEN ( UNIX_TIMESTAMP(dala_discount_program_date_end) < UNIX_TIMESTAMP() ) THEN 
									1 
									
								ELSE   
									0
							END) = 1 
						);
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12304' 
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