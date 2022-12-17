-- @
-- @
-- @
START TRANSACTION;



-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_before_insert BEFORE INSERT ON dala_orders_details_speciality  
FOR EACH ROW  
BEGIN  
--
--
	
	
	
	--
	-- cac line order sau moi dc add vao ch tiet don hang
	IF(
	NEW.dala_orders_details_speciality_line_order = 'product' 
	or NEW.dala_orders_details_speciality_line_order = 'shipping' 
	or NEW.dala_orders_details_speciality_line_order = 'coupon' 
	or NEW.dala_orders_details_speciality_line_order = 'add_fee' 
	) THEN 
		SIGNAL SQLSTATE '01000';
	ELSE 
		SIGNAL SQLSTATE '22381' 
		SET MESSAGE_TEXT = 'Chỉ hổ trợ line order product,shipping,coupon,add_fee'; 
	END IF;	
	
	
	
	
	
	
	--
	-- lay ten product de gui thong bao
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 		
		SET @name = ( select dala_products_speciality_name 
						 from dala_products_speciality 
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
						);
		IF (LENGTH(@name) > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '22300' 
			SET MESSAGE_TEXT = 'Không tìm thấy tên sản phẩm'; 
		END IF;		
	END IF;	
	
	
	
	
	
	
	--
	-- check order link
	-- kiem tra xem don hang co trong he thong chua
	SET @check_order_id = 
		( select dala_orders_speciality_ID 
		 from dala_orders_speciality 
		 where dala_orders_speciality_ID = NEW.dala_orders_details_speciality_order_id 
		);	
	IF( @check_order_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '22301' 
		SET MESSAGE_TEXT = 'Đơn hàng không có trong hệ thống'; 
	END IF;		
	
	
	
	
	
	--
	-- check product id
	-- kiem tra xem san pham co trong he thong hay khong
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 		
		SET @checkID = ( select dala_products_speciality_ID
						 from dala_products_speciality 
						 LEFT JOIN dala_stores  ON 
						 dala_products_speciality_store_id = dala_stores_ID  						 
						 where dala_products_speciality_ID = NEW.dala_orders_details_speciality_product_id 
						 and dala_products_speciality_status_admin = 1 
						 and dala_stores_status_admin = 1 
						);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE		
			set @m = CONCAT('sản phẩm [ ',NEW.dala_orders_details_speciality_product_id,' ] ',@name,' không có trong hệ thống'); 		
			SIGNAL SQLSTATE '22302' 
			SET MESSAGE_TEXT = @m; 
		END IF;		
	END IF;
	
	
	
	
	
	--
	-- check qty
	-- kiem tra bat buoc so luong phai mua lon hon 0
	IF(NEW.dala_orders_details_speciality_line_order = 'product' ) THEN 		
		IF (NEW.dala_orders_details_speciality_qty < 1) THEN  
			SIGNAL SQLSTATE '22303' 
			SET MESSAGE_TEXT = 'Số lượng mua phải lớn hơn [0]'; 
		END IF;		
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
				set @m = CONCAT('sản phẩm [',@name,' ] giá bán đã thay đổi '); 
				SIGNAL SQLSTATE '22391' 
				SET MESSAGE_TEXT = @m; 	
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
				set @m = CONCAT('sản phẩm [ ',NEW.dala_orders_details_speciality_product_id,' ] ',@name,'  giá bán đã thay đổi '); 
				SIGNAL SQLSTATE '22392' 
				SET MESSAGE_TEXT = @m;  	
			END IF;			
		END IF;	
	END IF;
	
	
	


	--
	-- check ton kho
	-- kiem tra so luong ton con du de ban hay khong
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
			set @m = CONCAT('sản phẩm [ ',NEW.dala_orders_details_speciality_product_id,' ] ',@name,' số lượng tồn không đủ'); 
			SIGNAL SQLSTATE '22304' 
			SET MESSAGE_TEXT = @m; 
		END IF;		
	END IF;		




	--
	-- check coupon
	-- kiem tra coupon co trong he thong và con han hay khong hay khong
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
				set @m = CONCAT('mã giảm giá  [ ',NEW.dala_orders_details_medium_text,' ] ',' không có trong hệ thống'); 
				SIGNAL SQLSTATE '22305' 
				SET MESSAGE_TEXT = @m; 
			END IF;	
		ELSE 
			SIGNAL SQLSTATE '22306' 
			SET MESSAGE_TEXT = 'Không tìm thấy mã giảm giá'; 		
		END IF;		
	END IF;
	
	

	
	
-- 
-- 
END $$
DELIMITER ;











-- @
-- @
-- @
-- @
-- @
-- @ trigger chay sau khi inser chi tiet order
-- @ update lai ton kho
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_after_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_after_insert AFTER INSERT ON dala_orders_details_speciality  
FOR EACH ROW  
BEGIN  
--
--


	IF(NEW.dala_orders_details_speciality_line_order = 'product') THEN 		
		SET @discounID = ( select  dala_discount_program_ID 
			 from dala_discount_program 
			 
			 left join dala_discount_program_product_link on 
				dala_discount_program_product_link_discount_program_id = dala_discount_program_ID 	
			 
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
		
		--
		-- tru ton kho
		-- tru so luong ton khi ban 
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




-- 
-- 
END $$
DELIMITER ;









-- @
-- @
COMMIT ;



