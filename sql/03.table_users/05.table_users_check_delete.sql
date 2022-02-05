
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
DROP TRIGGER  IF EXISTS  trig_users_delete;
--

DELIMITER $$ 
CREATE TRIGGER trig_users_delete AFTER DELETE ON dala_users 
FOR EACH ROW  
BEGIN  
	-- xoa line bên dala_users_tracking
		DELETE FROM dala_users_tracking 
		where dala_users_tracking_user_id = OLD.dala_users_ID;


		
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