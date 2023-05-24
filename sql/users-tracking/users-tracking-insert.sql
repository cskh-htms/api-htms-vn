-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_users_tracking_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_users_tracking_before_insert BEFORE INSERT ON dala_users_tracking 
FOR EACH ROW  
BEGIN  
--
--

	--
	--
	SET @check_user_id = ( select dala_users_ID   
		 from dala_users 
		 where dala_users_ID = NEW.dala_users_tracking_user_id  
		);	
	IF( @check_user_id > 0 ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_users_tracking_before_insert_user_id_not_refer'; 
	END IF;	



	SET @check_login_ok = (
			select count(dala_users_tracking_ID) 
			from dala_users_tracking 
			where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
			and dala_users_tracking_action = 0 
			and dala_users_tracking_status = 0 
		);




	SET @check_login_fail = (
			select count(dala_users_tracking_ID) 
			from dala_users_tracking 
			where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
			and dala_users_tracking_action = 0 
			and dala_users_tracking_status = 1 
		);

	SET @check_lost_pass = (
			select count(dala_users_tracking_ID) 
			from dala_users_tracking 
			where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
			and dala_users_tracking_action = 1 
			and dala_users_tracking_status = 1 
		);
		
	SET @check_verification_fail = (
			select count(dala_users_tracking_ID) 
			from dala_users_tracking 
			where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
			and dala_users_tracking_action = 2 
			and dala_users_tracking_status = 1 
		);	
		
	SET @check_verification = (
			select count(dala_users_tracking_ID) 
			from dala_users_tracking 
			where dala_users_tracking_user_id = NEW.dala_users_tracking_user_id 
			and dala_users_tracking_action = 3 
			and dala_users_tracking_status = 1 
		);	


		
		
	IF (
		@check_lost_pass > 10   	
		) THEN  
		

		UPDATE dala_users set dala_users_status = '5' where  dala_users_ID = NEW.dala_users_tracking_user_id ;
		
		SIGNAL SQLSTATE '01000' 
		SET MESSAGE_TEXT = 'ok'; 
		
	END IF;	

	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



