-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_before_update BEFORE UPDATE ON dala_orders_details_speciality  
FOR EACH ROW  
BEGIN  
--
--

	--
	-- check don hàng
	IF(NEW.dala_orders_details_speciality_ID > 0) THEN 
		SET @order_detail_id = ( select dala_orders_details_speciality_order_id  
			 from dala_orders_details_speciality   
			 where dala_orders_details_speciality_ID = 	NEW.dala_orders_details_speciality_ID		 				 
			 );		
		IF(@order_detail_id <> NEW.dala_orders_details_speciality_order_id) THEN 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_order_id_nor_refer'; 	
		END IF;
	END IF;
	


	
	--
	-- check product id
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 

		--
		-- khong cho update id product
		SET @checkID = 
			( select dala_orders_details_speciality_product_id
			 from dala_orders_details_speciality  
			 where dala_orders_details_speciality_ID = NEW.dala_orders_details_speciality_ID 
			);
		IF (@checkID <> NEW.dala_orders_details_speciality_product_id) THEN  
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_product_id_not_update'; 
		END IF;	
		
		
		--
		-- check stock
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
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_qty_not_ok'; 
		END IF;	

		--
		--
		IF (NEW.dala_orders_details_speciality_qty < 1) THEN  
			SIGNAL SQLSTATE '12314' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_qty_empty'; 
		END IF;				
	END IF;	
	
	



	--
	-- check coupon
	IF(NEW.dala_orders_details_speciality_line_order = 'coupon' ) THEN 		
		IF(LENGTH(NEW.dala_orders_details_medium_text) > 0) THEN 	
			SET @checkID = ( 
				select dala_coupon_speciality_ID 
					 from dala_coupon_speciality 
					 where dala_coupon_speciality_code = NEW.dala_orders_details_medium_text 
					 and 			
						(CASE  
							WHEN ( (UNIX_TIMESTAMP(dala_coupon_speciality_date_end) - UNIX_TIMESTAMP()) > 0 ) THEN  1  					
							ELSE  0 
						END )  = 1 						 
					);
			IF (@checkID > 0) THEN  
				SIGNAL SQLSTATE '01000'; 
			ELSE
				SIGNAL SQLSTATE '12315' 
				SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_coupon_id_not_refer'; 
			END IF;	
		ELSE 
			SIGNAL SQLSTATE '12306' 
			SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_update_coupon_text_empty'; 		
		END IF;		
	END IF;



	
-- 
-- 	
END $$
DELIMITER ;





-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_after_update;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_after_update AFTER UPDATE ON dala_orders_details_speciality  
FOR EACH ROW  
BEGIN  
--
--
	
	IF(NEW.dala_orders_details_speciality_line_order = 'product') THEN 		
		update dala_orders_details_speciality_discount set 
		dala_orders_details_speciality_discount_qty = NEW.dala_orders_details_speciality_qty, 
		dala_orders_details_speciality_discount_price = NEW.dala_orders_details_speciality_price 
		where dala_orders_details_speciality_discount_order_details_id = NEW.dala_orders_details_speciality_ID;
	END IF;		
	

-- 
-- 	
END $$
DELIMITER ;










-- @
-- @
COMMIT ;



