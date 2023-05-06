-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_coupon_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_coupon_speciality_before_insert BEFORE INSERT ON dala_coupon_speciality 
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
			SIGNAL SQLSTATE '12301' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_data_type';   
		END IF;   	
	else 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_empty';   
	END IF;	




	--
	--

	
	
	if(NEW.dala_coupon_speciality_time_type = 0) then 
		SIGNAL SQLSTATE '01000';
	else 	
		IF(NEW.dala_coupon_speciality_date_star is null  or  NEW.dala_coupon_speciality_date_end is null) THEN 
			SIGNAL SQLSTATE '12393' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_date_null'; 
		ELSE 
			set @sda = UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_coupon_speciality_date_star);
			if(@sda <= 0 ) then 
				SIGNAL SQLSTATE '12303' 
				SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_date_end_less_star';  	
			end if;		
		END IF;	
	end if;	
	
	
	
	--
	-- check store link
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
			SIGNAL SQLSTATE '12305' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_user_not_refer'; 
		END IF;		
	END IF;	
	
	
	
	--
	-- kiem tra neu coupon cua cua hang thi 
	-- khong cho insert nguoi gioi thieu
	-- neu cua hang <> 17 là coupon cua cua hang
	if(NEW.dala_coupon_speciality_intro  > 0 ) THEN 
		IF (NEW.dala_coupon_speciality_stores_id_created <> 17) THEN  
			SIGNAL SQLSTATE '12306' 
			SET MESSAGE_TEXT = 'trig_coupon_speciality_before_insert_intro_user_not_store'; 
		END IF;		
	END IF;		
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



