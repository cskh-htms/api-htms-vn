-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_before_update BEFORE UPDATE ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  
--
--

	--
	--
	IF(length(NEW.dala_coupon_speciality_code) > 0 ) THEN 
		IF (NEW.dala_coupon_speciality_code REGEXP '^[a-zA-Z0-9-]*$' ) THEN 		
			set NEW.dala_coupon_speciality_code = UPPER(NEW.dala_coupon_speciality_code);
			SIGNAL SQLSTATE '01000';
		else 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_update_data_type';   
		END IF;   	
	END IF;	




	--
	--
	if(NEW.dala_coupon_speciality_time_type = 0) then 
		SIGNAL SQLSTATE '01000';
	else 	
		IF(NEW.dala_coupon_speciality_date_star is null  or  NEW.dala_coupon_speciality_date_end is null) THEN 
			SIGNAL SQLSTATE '12393' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_update_date_empty'; 
		ELSE 
			set @sda = UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star);
			if(@sda <= 0 ) then 
				SIGNAL SQLSTATE '12303' 
				SET MESSAGE_TEXT = 'trig_coupon_speciality_before_update_date_end_less_star';  	
			end if;	
		END IF;	
	end if;
	

	
	
	
	
	--
	-- check store link
	IF(NEW.dala_coupon_speciality_stores_id_created > 0 ) THEN 
		SET @checkID = (
				select dala_stores_ID   
				from dala_stores  
				where dala_stores_ID  = NEW.dala_coupon_speciality_stores_id_created 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12304' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_store_not_refer'; 
		END IF;		
	END IF;		
	
	
	
	--
	-- check user gioi thieu
	-- xem nguoi gioi thieu da co hay chya
	if(NEW.dala_coupon_speciality_intro  > 0 ) THEN 
		SET @checkID = (
				select dala_users_ID   
				from dala_users   
				where dala_users_ID  =  NEW.dala_coupon_speciality_intro 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12315' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_user_not_refer'; 
		END IF;		
	END IF;	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;










-- @
-- @
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_after_update;
DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_after_update AFTER UPDATE ON dala_coupon_speciality 
FOR EACH ROW  
BEGIN  
--
--

	--
	-- không cho update tên mã giảm giá
	IF(NEW.dala_coupon_speciality_code <> OLD.dala_coupon_speciality_code ) THEN 
		SIGNAL SQLSTATE '12321' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_after_update_code_name_not_update';   
	END IF;	

	--
	-- không cho update id coupon
	IF(NEW.dala_coupon_speciality_ID <> OLD.dala_coupon_speciality_ID ) THEN 
		SIGNAL SQLSTATE '12322' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_after_update_id_not_update';   
	END IF;	
	
	
	--
	-- kiem tra neu coupon cua cua hang thi 
	-- khong cho insert nguoi gioi thieu
	-- neu cua hang <> 17 là coupon cua cua hang
	if(OLD.dala_coupon_speciality_intro  > 0 ) THEN 
		IF (OLD.dala_coupon_speciality_stores_id_created <> 17) THEN  
			SIGNAL SQLSTATE '22203' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_after_update_intro_user_not_store'; 
		END IF;		
	END IF;		
		
	
	--
	-- không cho update id nguoi gioi thieu
	IF(NEW.dala_coupon_speciality_intro <> OLD.dala_coupon_speciality_intro ) THEN 
		SIGNAL SQLSTATE '22223' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_after_update_id_user_intro_not_update';   
	END IF;		
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;













-- @
-- @
COMMIT ;



