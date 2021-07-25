
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check stores_name insert
DROP TRIGGER  IF EXISTS  trig_users_tracking_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_users_tracking_insert BEFORE INSERT ON dala_users_tracking  
FOR EACH ROW  
BEGIN  




-- 
--
-- kiểm tra xem user có bị log chưa
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
	@check_login_fail > 5 
	or @check_lost_pass > 5 
	or @check_verification_fail > 5 
	or @check_verification > 5  	
	) THEN  
	

	UPDATE dala_users set dala_users_status = '1' where  dala_users_ID = NEW.dala_users_tracking_user_id ;
	
	SIGNAL SQLSTATE '01000' 
	SET MESSAGE_TEXT = 'ok'; 
	
END IF;	


-- 
-- 
-- check exit


END $$ 
DELIMITER ;










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