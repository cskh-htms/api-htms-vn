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
DROP TRIGGER  IF EXISTS  trig_adress_meta_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_adress_meta_insert BEFORE INSERT ON dala_adress_meta  
FOR EACH ROW  
BEGIN  

IF(LENGTH(NEW.dala_adress_meta_user_id ) > 0 ) THEN 
	-- 
	-- kiểm tra xem địa chỉ này đã có chưa có rùi thì thôi ko tạo nữa
	-- 	
	
	SET @check_user_id = (select dala_adress_meta_ID    
		from dala_adress_meta  
		where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id 
		limit 1
		);	

	
	
	
	
	SET @check_all = (select dala_adress_meta_ID    
		from dala_adress_meta  
		where dala_adress_meta_user_id  = NEW.dala_adress_meta_user_id  
		and dala_adress_meta_name  = NEW.dala_adress_meta_name 
		and dala_adress_meta_phone  = NEW.dala_adress_meta_phone  
		and dala_adress_meta_province  = NEW.dala_adress_meta_province  
		and dala_adress_meta_district  = NEW.dala_adress_meta_district   
		and dala_adress_meta_wards  = NEW.dala_adress_meta_wards    
		and dala_adress_meta_street  = NEW.dala_adress_meta_street  
		);
		
	IF ( @check_all > 0 ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_adress_meta_insert_douple'; 	
	ELSE 
		IF (@check_user_id is null or @check_user_id = "null" or @check_user_id = "NULL") THEN 
			SET NEW.dala_adress_meta_status = 1;
		ELSE 
			SET NEW.dala_adress_meta_status = 0 ;
		END IF;
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




