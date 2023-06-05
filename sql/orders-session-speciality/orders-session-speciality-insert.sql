-- @
-- @
-- @
START TRANSACTION;



-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_session_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_session_speciality_before_insert BEFORE INSERT ON dala_orders_session_speciality  
FOR EACH ROW  
BEGIN  
--
--
	
	
	
	--
	-- cac line order sau moi dc add vao ch tiet don hang
	IF(
	NEW.dala_orders_session_speciality_line_order = 'product' 
	or NEW.dala_orders_session_speciality_line_order = 'shipping' 
	or NEW.dala_orders_session_speciality_line_order = 'coupon' 
	or NEW.dala_orders_session_speciality_line_order = 'add_fee' 
	or NEW.dala_orders_session_speciality_line_order = 'gift' 
	or NEW.dala_orders_session_speciality_line_order = 'user'
	) THEN 
		SIGNAL SQLSTATE '01000';
	ELSE 
		SIGNAL SQLSTATE '11101' 
		SET MESSAGE_TEXT = 'Chỉ hổ trợ line order product,shipping,coupon,add_fee,gift'; 
	END IF;	
	
	
	
	
	
	
	--
	-- lay ten product de gui thong bao
	IF(NEW.dala_orders_session_speciality_line_order = 'product' ) THEN 		
		SET @name = ( select dala_products_speciality_name 
						 from dala_products_speciality 
						 where dala_products_speciality_ID = NEW.dala_orders_session_speciality_product_id 
						);
		IF (LENGTH(@name) > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			SIGNAL SQLSTATE '11102' 
			SET MESSAGE_TEXT = 'Không tìm thấy tên sản phẩm'; 
		END IF;		
	END IF;	
	
	
	
	
	

	
	
	--
	-- check product id
	-- kiem tra xem san pham co trong he thong hay khong
	IF(NEW.dala_orders_session_speciality_line_order = 'product' ) THEN 		
		SET @checkID = ( select dala_products_speciality_ID
						 from dala_products_speciality 
						 LEFT JOIN dala_stores  ON 
						 dala_products_speciality_store_id = dala_stores_ID  						 
						 where dala_products_speciality_ID = NEW.dala_orders_session_speciality_product_id 
						 and dala_products_speciality_status_admin = 1 
						 and dala_stores_status_admin = 1 
						);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE		
			set @m = CONCAT('sản phẩm [ ',NEW.dala_orders_session_speciality_product_id,' ] ',@name,' không có trong hệ thống hoặc chưa được phê duyệt nội dung'); 		
			SIGNAL SQLSTATE '11103' 
			SET MESSAGE_TEXT = @m; 
		END IF;		
	END IF;
	
	
	
	
	
	--
	-- check qty
	-- kiem tra bat buoc so luong phai mua lon hon 0
	IF(NEW.dala_orders_session_speciality_line_order = 'product' ) THEN 		
		IF (NEW.dala_orders_session_speciality_qty < 1) THEN  
			SIGNAL SQLSTATE '11103' 
			SET MESSAGE_TEXT = 'Số lượng mua phải lớn hơn [0]'; 
		END IF;		
	END IF;

	
		
	

	--
	-- check ton kho
	-- kiem tra so luong ton con du de ban hay khong
	IF(NEW.dala_orders_session_speciality_line_order = 'product' ) THEN  
	
		-- lay trang thai quan ly ton
		SET @check_stock_status = ( select  dala_products_speciality_stock_status 
			from dala_products_speciality    
			where dala_products_speciality_ID = NEW.dala_orders_session_speciality_product_id);
			
		-- neu la san pham co bien the	
		-- lấy so lượng tồn biến thể
		if(length(NEW.dala_orders_session_speciality_medium_text) > 0) then 
			SET @check_stock_number = ( select  dala_options_variant_link_stock   
				 from dala_products_speciality 
				 left join dala_options_variant_link 
					on dala_products_speciality_ID = 
						dala_options_variant_link_product_id 
				 where dala_products_speciality_ID = 
					NEW.dala_orders_session_speciality_product_id 
				 and dala_options_variant_link_option_name = 
					dala_orders_session_speciality_medium_text 
				limit 1	);					 
		else 
			SET @check_stock_number = ( select  dala_products_speciality_stock  
				 from dala_products_speciality    
				 where dala_products_speciality_ID = NEW.dala_orders_session_speciality_product_id );			
		end if;
		
						
		IF (
			(@check_stock_status = 1 and  NEW.dala_orders_session_speciality_qty <= @check_stock_number) 
			or (@check_stock_status = 0)
		) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE
			set @m = CONCAT('sản phẩm [ ',NEW.dala_orders_session_speciality_product_id,' ] ',@name,' số lượng tồn không đủ'); 
			SIGNAL SQLSTATE '11104'  
			SET MESSAGE_TEXT = @m; 
		END IF;		
	END IF;		








	--
	-- check price
	-- kiem tra giá sản phẩm có thay đổi chưa
	IF(NEW.dala_orders_session_speciality_line_order = 'product' ) THEN  
	
		-- neu la san pham co bien the	
		-- lấy giá
		if(length(NEW.dala_orders_session_speciality_medium_text) > 0) then 
			SET @price = ( select  
			CASE 
				WHEN  
					dala_products_speciality_sale_of_price IS NULL 
				THEN 
					dala_options_variant_link_price 
				WHEN   
					dala_products_speciality_date_start IS NULL and 
					dala_products_speciality_date_end IS NULL 
				THEN 
					dala_options_variant_link_sale_of_price  		
				WHEN   
					dala_products_speciality_date_start IS NOT NULL and 
					dala_products_speciality_date_end IS NULL and " + 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP(" + dala_products_speciality_date_start ) > 0 
				THEN  
					dala_options_variant_link_sale_of_price  	
				WHEN  
					dala_products_speciality_date_start IS NULL and 
					dala_products_speciality_date_end IS NOT NULL and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP( dala_products_speciality_date_end ) < 0 
				THEN 
					dala_options_variant_link_sale_of_price  																	
				WHEN 
					dala_products_speciality_date_start IS NOT NULL and 
					dala_products_speciality_date_end IS NOT NULL and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0  and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP( dala_products_speciality_date_end ) < 0  								
				THEN 
					dala_options_variant_link_sale_of_price  
				ELSE  
					dala_options_variant_link_price 
			END 
			from dala_products_speciality 
			left join dala_options_variant_link 
				on dala_products_speciality_ID = 
					dala_options_variant_link_product_id 
			where dala_products_speciality_ID = 
				NEW.dala_orders_session_speciality_product_id 
			and dala_options_variant_link_option_name = 
				dala_orders_session_speciality_medium_text 
			limit 1	);	
		else 
			SET @price = ( select   
			CASE 
				WHEN  
					dala_products_speciality_sale_of_price IS NULL 
				THEN 
					dala_products_speciality_price 
				WHEN   
					dala_products_speciality_date_start IS NULL and 
					dala_products_speciality_date_end IS NULL 
				THEN 
					dala_products_speciality_sale_of_price 		
				WHEN   
					dala_products_speciality_date_start IS NOT NULL and 
					dala_products_speciality_date_end IS NULL and " + 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP(" + dala_products_speciality_date_start ) > 0 
				THEN  
					dala_products_speciality_sale_of_price 	
				WHEN  
					dala_products_speciality_date_start IS NULL and 
					dala_products_speciality_date_end IS NOT NULL and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP( dala_products_speciality_date_end ) < 0 
				THEN 
					dala_products_speciality_sale_of_price  																	
				WHEN 
					dala_products_speciality_date_start IS NOT NULL and 
					dala_products_speciality_date_end IS NOT NULL and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0  and 
					UNIX_TIMESTAMP(NOW()) - 
					UNIX_TIMESTAMP( dala_products_speciality_date_end ) < 0  								
				THEN 
					dala_products_speciality_sale_of_price 
				ELSE  
					dala_products_speciality_price 
			END	 
			from dala_products_speciality 
			left join dala_options_variant_link 
				on dala_products_speciality_ID = 
					dala_options_variant_link_product_id 
			where dala_products_speciality_ID = 
				NEW.dala_orders_session_speciality_product_id 
			and dala_options_variant_link_option_name = 
				dala_orders_session_speciality_medium_text 
			limit 1	);				
		end if;		
		

		-- so sanh gia 
		if(@price <> NEW.dala_orders_session_speciality_price) then 
				set @m = CONCAT('Giá sàn phẩm (',
					NEW.dala_orders_session_speciality_product_id,
					') - [ ',
					@name,' ] ',
					' Đã thay đổi thành ',
					@price,
					'Vui lòng đặt hàng lại '
					); 
				SIGNAL SQLSTATE '22305' 
				SET MESSAGE_TEXT = @m; 	
		end if;		
	END IF;		





	--
	-- check coupon
	-- kiem tra coupon co trong he thong và con han hay khong hay khong
	IF(NEW.dala_orders_session_speciality_line_order = 'coupon' ) THEN 		
		IF(LENGTH(NEW.dala_orders_session_medium_text) > 0) THEN 	
			SET @checkID = ( 
				select dala_coupon_speciality_ID 
					 from dala_coupon_speciality 
					 
					 where dala_coupon_speciality_code = NEW.dala_orders_session_medium_text 
					 and 			
						(CASE  
							WHEN (dala_coupon_speciality_time_type = 0 ) THEN  1  					
							WHEN ( (UNIX_TIMESTAMP(dala_coupon_speciality_date_end) - UNIX_TIMESTAMP()) > 0 ) THEN  1  					
							ELSE  0 
						END )  = 1 						 
					);
			IF (@checkID > 0) THEN  
				SIGNAL SQLSTATE '01000'; 
			ELSE
				set @m = CONCAT('mã giảm giá  [ ',NEW.dala_orders_session_medium_text,' ] ',' không có trong hệ thống'); 
				SIGNAL SQLSTATE '22305' 
				SET MESSAGE_TEXT = @m; 
			END IF;	
		ELSE 
			SIGNAL SQLSTATE '11105' 
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
DROP TRIGGER  IF EXISTS  trig_orders_session_speciality_after_insert;
DELIMITER $$ 
CREATE TRIGGER trig_orders_session_speciality_after_insert AFTER INSERT ON dala_orders_session_speciality  
FOR EACH ROW  
BEGIN  
--
--

	-- 
	-- 
	-- xoa line shipping
	delete from dala_orders_session_speciality 
	where dala_orders_session_speciality_line_order = 'shipping' 
	and dala_orders_session_speciality_name = 
		NEW.dala_orders_session_speciality_name ;

-- 
-- 
END $$
DELIMITER ;









-- @
-- @
COMMIT ;



