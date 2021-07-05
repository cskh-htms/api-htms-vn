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
DROP TRIGGER  IF EXISTS  trig_like_store_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_like_store_update BEFORE UPDATE ON dala_like_store 
FOR EACH ROW  
BEGIN  

	SET @user_id_old = (select dala_like_store_user_id  
		from dala_like_store  
		where dala_like_store_ID  =  NEW.dala_like_store_ID );

	SET @store_id_old = (select dala_like_store_store_id   
		from dala_like_store  
		where dala_like_store_ID  =  NEW.dala_like_store_ID );
		
	IF (@user_id_old <> NEW.dala_like_store_user_id or @store_id_old <> NEW.dala_like_store_store_id) THEN  
		-- 
		-- neu cua hang da tham gia rui thi ko the update
		SET @checkID2 = (select dala_like_store_ID  
			from dala_like_store 
			where dala_like_store_user_id  = NEW.dala_like_store_user_id  
			and dala_like_store_store_id  = NEW.dala_like_store_store_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_like_store_double'; 	
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




