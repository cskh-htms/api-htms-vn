
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
	-- khong cho thay đổi order id
	SET @order_detail_id = ( select dala_orders_details_speciality_order_id  
		 from dala_orders_details_speciality   
		 where dala_orders_details_speciality_ID = 	NEW.dala_orders_details_speciality_ID		 				 
		 );	
	
	IF(@order_detail_id <> NEW.dala_orders_details_speciality_order_id) THEN 
		SIGNAL SQLSTATE '12201' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_update_order_id_nor_refer'; 	
	END IF;
	
	-- khong cho thay doi id san pham
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
		SET @checkID = ( select dala_orders_details_speciality_product_id
						 from dala_orders_details_speciality  
						 where dala_orders_details_speciality_ID = NEW.dala_orders_details_speciality_ID 
						);
		IF (@checkID <> NEW.dala_orders_details_speciality_product_id) THEN  
			SIGNAL SQLSTATE '12202' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_update_product_id_not_update'; 
		END IF;	
		
		
		-- kiểm tra tồn kho 	
		SET @stock_status= ( select  dala_products_speciality_stock_status 
						 from dala_products_speciality    
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);
		SET @stock_number_line_old = ( select  dala_orders_details_speciality_qty   
			 from dala_orders_details_speciality   
			 where dala_orders_details_speciality_ID =  NEW.dala_orders_details_speciality_ID 
			 );	

		SET @stock_number_product = ( select  dala_products_speciality_stock    
			 from dala_products_speciality   
			 where dala_products_speciality_ID =  NEW.dala_orders_details_speciality_product_id  
			 );							 
				
		SET @stock_check = @stock_number_line_old + @stock_number_product;
		
		IF (NEW.dala_orders_details_speciality_qty <= @stock_check) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_update_qty_not_ok'; 
		END IF;	

		-- số lượng phải lớn hơn 0	
		IF (NEW.dala_orders_details_speciality_qty < 1) THEN  
			SIGNAL SQLSTATE '12101' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_qty_empty'; 
		END IF;		
		
	END IF;
	
	
	-- kiểm tra discount có tồn tại  và còn hạn không
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