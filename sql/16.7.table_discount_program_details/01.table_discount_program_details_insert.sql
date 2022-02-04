-- 
-- 
-- 
-- 
-- 
-- 
-- star
START TRANSACTION;



--
-- *data type
DROP TRIGGER  IF EXISTS  trig_check_owner_discount_program_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_check_owner_discount_program_insert BEFORE INSERT ON dala_discount_program_details 
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
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_insert_program_id_not_refer'; 
	END IF;	



IF(LENGTH(NEW.dala_discount_program_details_store_id) > 0 and  LENGTH(NEW.dala_discount_program_details_discount_program_id) > 0 ) THEN 
	-- 
	-- kiểm tra cửa hàng này đoực phép tham gia chương trình khuyến mãi này không
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
	
	-- 
	-- neu cua hang da tham gia rui thi ko the add them
	--
	SET @checkID2 = (select dala_discount_program_details_ID 
		from dala_discount_program_details  
		where dala_discount_program_details_discount_program_id  = NEW.dala_discount_program_details_discount_program_id 
		and dala_discount_program_details_store_id = NEW.dala_discount_program_details_store_id);	
	IF (@checkID2 > 0) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_check_owner_discount_program_double'; 	
	END IF;			
		
		
	
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




