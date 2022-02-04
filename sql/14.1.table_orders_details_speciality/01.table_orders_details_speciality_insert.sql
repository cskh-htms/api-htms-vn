
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
	-- kiểm tra có đơn hàng chưa
	SET @check_order_id = ( select dala_orders_speciality_ID 
						 from dala_orders_speciality 
						 where dala_orders_speciality_ID = NEW.dala_orders_details_speciality_order_id 
						);	
	IF( @check_order_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12001' 
		SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_order_id_not_refer'; 
	END IF;		
	
	
	
	
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 
		-- kiểm tra product có tồn tại không	
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
		
		-- số lượng phải lớn hơn 0	
		IF (NEW.dala_orders_details_speciality_qty < 1) THEN  
			SIGNAL SQLSTATE '12101' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_qty_empty'; 
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
			SIGNAL SQLSTATE '12302' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_coupon_id_not_refer'; 
		END IF;	
	END IF;
	-- end of kiểm tra product có tồn tại không	
	
	
	-- kiểm tra tồn kho 
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 	
		SET @check_stock_status = ( select  dala_products_speciality_stock_status 
						 from dala_products_speciality    
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);
		SET @check_stock_number = ( select  dala_products_speciality_stock  
						 from dala_products_speciality    
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);							
		IF (
			(@check_stock_status = 1 and  NEW.dala_orders_details_speciality_qty <= @check_stock_number) 
			or (@check_stock_status = 0)
		) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_insert_qty_not_ok'; 
		END IF;	
	-- end of kiểm tra tồn kho		
	END IF;		
	
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
						 from dala_discount_program 
						 
						 left join dala_discount_program_details on 
							dala_discount_program_ID = dala_discount_program_details_discount_program_id 
						 
						 left join dala_discount_program_product_link on 
							dala_discount_program_details_ID = dala_discount_program_product_link_discount_program_details_id 	
						 
						 where 
							 dala_discount_program_product_link_product_speciality_id = NEW.dala_orders_details_speciality_product_id 
							 and 							 
								(CASE 
									WHEN ( 	dala_discount_program_time_type  = 0 ) THEN  
										1 
									WHEN ( UNIX_TIMESTAMP(dala_discount_program_date_end) < UNIX_TIMESTAMP() ) THEN 
										1 
									ELSE   
										0
								END) = 1 				
							 and 
								IF(dala_discount_program_details_limit_day = 0,-1,
									UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(dala_discount_program_details_date_created) + (dala_discount_program_details_limit_day * 24 * 60 * 60) )
								) < 0 
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
		
		-- update ton kho
		SET @stock_status = ( select  dala_products_speciality_stock_status 
						 from dala_products_speciality    
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);
		SET @check_stock_number = ( select  dala_products_speciality_stock  
						 from dala_products_speciality    
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
							);									
		IF ( @stock_status = 1 ) THEN  
			update  dala_products_speciality set 
			dala_products_speciality_stock = @check_stock_number  -  NEW.dala_orders_details_speciality_qty 
			where 
			dala_products_speciality_ID  =  NEW.dala_orders_details_speciality_product_id ;
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
