-- 
-- 
-- 
-- 
-- 
-- 
-- star
START TRANSACTION;



-- ---------------------
-- keim tra quyen tham gia chương trình
-- --------------------

--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_owner_discount_program_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_owner_discount_program_update BEFORE UPDATE ON dala_discount_program_details 
FOR EACH ROW  
BEGIN  

	-- kiểm tra id  program refer
	SET @program_id = (select dala_discount_program_ID    
		from dala_discount_program 
		where dala_discount_program_ID = NEW.dala_discount_program_details_discount_program_id);
	IF( @program_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12001' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_update_program_id_not_refer'; 
	END IF;	
	
	
	-- 
	-- kiểm tra cửa hàng này đoực phép tham gia chương trình khuyến mãi này không
	SET @store_id_old = (select dala_discount_program_details_store_id 
		from dala_discount_program_details 
		where dala_discount_program_details_ID  = NEW.dala_discount_program_details_ID );

	SET @discount_program_id_old = (select dala_discount_program_details_discount_program_id  
		from dala_discount_program_details 
		where dala_discount_program_details_ID  = NEW.dala_discount_program_details_ID );
		
	IF (@store_id_old <> NEW.dala_discount_program_details_store_id or @discount_program_id_old <> NEW.dala_discount_program_details_discount_program_id) THEN  
		-- 
		-- neu cua hang da tham gia rui thi ko the update
		SET @checkID2 = (select dala_discount_program_details_ID 
			from dala_discount_program_details  
			where dala_discount_program_details_discount_program_id  = NEW.dala_discount_program_details_discount_program_id 
			and dala_discount_program_details_store_id = NEW.dala_discount_program_details_store_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_owner_discount_program_double'; 	
		END IF;			
	END IF;
	
	-- 
	-- kiểm tra cửa hàng có đủ quyền update không
	-- 
	SET @checkID = (select dala_discount_program_store_id_created 
		from dala_discount_program 
		where dala_discount_program_ID  = NEW.dala_discount_program_details_discount_program_id);

		
	IF (@checkID > 0) THEN  
		IF (@checkID = NEW.dala_discount_program_details_store_id or @checkID = 17) THEN 
			SIGNAL SQLSTATE '01000';
		ELSE 
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_owner'; 		
		END IF;
	ELSE 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_no_discount_program'; 	
	END IF;	
	
END $$
DELIMITER ;


--
-- 
DROP TRIGGER  IF EXISTS  trig_discount_program_details_after_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_discount_program_details_after_update AFTER UPDATE ON dala_discount_program_details 
FOR EACH ROW  
BEGIN  

	-- update bảng details discount
	IF(NEW.dala_discount_program_details_status_admin = '4') THEN 
		update  dala_products_speciality 
		INNER JOIN dala_discount_program_product_link 
		ON dala_products_speciality_ID = dala_discount_program_product_link_product_speciality_id  
		
		INNER JOIN  dala_discount_program_details  
		ON dala_discount_program_product_link_discount_program_details_id = dala_discount_program_details_ID 	
		set dala_products_speciality_date_end = ADDDATE(NEW.dala_discount_program_details_date_created, 
			NEW.dala_discount_program_details_limit_day )   
		where dala_discount_program_product_link_discount_program_details_id = NEW.dala_discount_program_details_ID;
	END IF;		
	
END $$
DELIMITER ;




-- 
--        end of 
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
-- 




