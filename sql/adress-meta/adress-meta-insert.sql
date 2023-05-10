-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_adress_meta_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_adress_meta_before_insert BEFORE INSERT ON dala_adress_meta 
FOR EACH ROW  
BEGIN  
--
-- 


	-- 
	-- @ kiem tra user da co trong he thong chua
	IF(LENGTH(NEW.dala_adress_meta_user_id ) > 0 ) THEN 	
		SET @check_user_relation = (select dala_users_ID 
			from dala_users  
			where dala_users_ID = NEW.dala_adress_meta_user_id limit 1
			);			
		if(@check_user_relation > 0) then 
			SIGNAL SQLSTATE '01000'; 
		else 
			SIGNAL SQLSTATE '11101' 
			SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_user_id_no_relation'; 
		end if;		
	ELSE  
		SIGNAL SQLSTATE '11102' 
		SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_user_id_empty'; 		
	END IF;
		
		
		
		
		
	-- 
	-- @ kiem tra so dien thoai co dung chuan chua
	IF(  NEW.dala_adress_meta_phone REGEXP '^[0-9]{9,11}*$' ) THEN 	
		SIGNAL SQLSTATE '01000'; 
	ELSE  
		SIGNAL SQLSTATE '11103' 
		SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_phone_data_type'; 	
	END IF;
		
		
		
		
		
		
	-- 
	-- @ kiem tra dia chi user nay co chua
	-- @ neu co roi thi khong insert nua
	-- @ neu insert lan dau thi set default  = 1
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
		and dala_adress_meta_street  = NEW.dala_adress_meta_street  limit 1 
		);
		
		
	IF(@check_user_id > 0) then 
		if ( @check_all > 0 ) then 	
			SIGNAL SQLSTATE '11104' 
			SET MESSAGE_TEXT = 'trig_adress_meta_before_insert_douple'; 
		end if;
	ELSE  
		SET NEW.dala_adress_meta_status = 1;
	END IF;	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



