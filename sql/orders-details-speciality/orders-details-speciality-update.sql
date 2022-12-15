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
	-- neu chua co don hang thi bao loi
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
	-- khong cho update id product
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 
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
	-- check product price
	-- kiem tra gia ban la gia moi nhat chua
	-- bao dam luon lay gia moi nhat
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 		
		SET @productID = ( select count(dala_products_speciality_price_meta_ID) 
			 from dala_products_speciality_price_meta 			

			 LEFT JOIN  dala_discount_program_product_link  ON 
			 dala_products_speciality_price_meta_product_id = dala_discount_program_product_link_product_speciality_id 

			 LEFT JOIN  dala_discount_program  ON 
			 dala_discount_program_product_link_discount_program_id = dala_discount_program_product_link_discount_program_id 
			 
			 where dala_products_speciality_price_meta_product_id = NEW.dala_orders_details_speciality_product_id 
			 and dala_discount_program_product_link_status = 1 
			 and dala_discount_program_status_admin = 4 
			 and 			
				(CASE  
					WHEN ( dala_discount_program_time_type  = 0 ) THEN  1  					
					WHEN ( UNIX_TIMESTAMP(dala_discount_program_date_end) - UNIX_TIMESTAMP() > 0 ) THEN 1 
					ELSE  0 
				END )  = 1
			 );
			 
		--
		-- nếu co trong chuong trinh khuyen mai mua nhiu tang nhieu	
		-- kiem tra gia trong discoutn neu dung thi ok ko thi bao error
		IF (@productID > 0) THEN  			
			SET @productPrice = ( select dala_products_speciality_price_meta_price  
				 from dala_products_speciality_price_meta 
				 where 
				 dala_products_speciality_price_meta_from < NEW.dala_orders_details_speciality_qty 
				 and 
				 dala_products_speciality_price_meta_to > NEW.dala_orders_details_speciality_qty 
				 );			
			IF(@productPrice = NEW.dala_orders_details_speciality_price ) THEN 
				SIGNAL SQLSTATE '01000'; 
			ELSE 
				SIGNAL SQLSTATE '12391' 
				SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_insert_price_not_ok'; 	
			END IF;
			
		--
		-- nếu khong co trong chuong trinh khuyen mai mua nhiu tang nhieu
		-- kiem tra gia = nhau thi cho qua con khong thi bao error		
		ELSE 			
			SET @productPrice = (select  
			(CASE   
				WHEN    
					dala_products_speciality_sale_of_price IS NULL   
				THEN   
					dala_products_speciality_price   					
					
				-- date_star = null 	
				-- date_end = null 
				WHEN    
					dala_products_speciality_date_start IS NULL and   
					dala_products_speciality_date_end IS NULL   
				THEN   
					dala_products_speciality_sale_of_price  					
					
				-- date_star = yes 	
				-- date_end = null 
				-- date_now - date_star > 0 (da toi han khuyen mai)
				WHEN    
					dala_products_speciality_date_start IS NOT NULL and   
					dala_products_speciality_date_end IS NULL and   
					UNIX_TIMESTAMP(NOW()) -   
					UNIX_TIMESTAMP(  dala_products_speciality_date_start ) > 0   
				THEN   
					dala_products_speciality_sale_of_price   		

					
				-- date_star = null 	
				-- date_end = yes 
				-- date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
				WHEN    
					dala_products_speciality_date_start IS NULL and   
					dala_products_speciality_date_end IS NOT NULL and   
					UNIX_TIMESTAMP(NOW()) -   
					UNIX_TIMESTAMP(  dala_products_speciality_date_end ) < 0   
				THEN   
					dala_products_speciality_sale_of_price   																	
					
					
				-- date_star = yes 	
				-- date_end = yes 
				-- date_now - date_star > 0 (da toi han khuyen mai)
				-- date_now - date_star > 0 (da toi han khuyen mai)
				WHEN    
					dala_products_speciality_date_start IS NOT NULL and   
					dala_products_speciality_date_end IS NOT NULL and   
					UNIX_TIMESTAMP(NOW()) -   
					UNIX_TIMESTAMP(  dala_products_speciality_date_start ) > 0  and   
					UNIX_TIMESTAMP(NOW()) -   
					UNIX_TIMESTAMP(  dala_products_speciality_date_end ) < 0    								
				THEN   
					dala_products_speciality_sale_of_price   			

				ELSE    
					dala_products_speciality_price   
			END )				
			from dala_products_speciality 			
			LEFT JOIN  dala_stores  ON 
			 dala_products_speciality_store_id = dala_stores_ID 			
			 where 
			 dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id  
			 and 
			 dala_products_speciality_status_admin = 1 
			 and 			 
			 dala_stores_status_admin = 1 
			 );							
			IF(@productPrice = NEW.dala_orders_details_speciality_price ) THEN 
				SIGNAL SQLSTATE '01000'; 
			ELSE 
				SIGNAL SQLSTATE '12392' 
				SET MESSAGE_TEXT = 'trig_orders_details_speciality_before_insert_price_not_ok'; 	
			END IF;			
		END IF;	
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



